import { io, Socket } from 'socket.io-client';
import {
  validateLocale,
  validateSecret,
  validatePushMessage,
  validateSuccessResponse,
  validateErrorResponse
} from './validator';

const BASE_URL = 'wss://gof.work.gd';
const SOCKET_PATH = '/v4/socket.io';

export interface RegistrationCredentials {
  name: string;
  password: string;
}

export class WebSocketRegistrationClient {
  private socket: Socket | null = null;
  private registrationPayload = {
    secret_key: '',
    type: 'AUTH:register',
    name: 'TestUser@test.test',
    password: 'password123'
  };
  private uniqueNumber: number = Date.now() % 1000000;
  private registrationSent = false;
  private registrationPromise: Promise<RegistrationCredentials>;
  private resolveRegistration!: (credentials: RegistrationCredentials) => void;
  private rejectRegistration!: (error: Error) => void;

  constructor() {
    this.registrationPromise = new Promise<RegistrationCredentials>((resolve, reject) => {
      this.resolveRegistration = resolve;
      this.rejectRegistration = reject;
    });
  }

  connect(): void {
    this.socket = io(BASE_URL, {
      path: SOCKET_PATH,
      transports: ['websocket']
    });
    this.socket.on('connect', () => console.log('Connected to server'));
    this.socket.on('disconnect', () => console.log('Disconnected from server'));
    this.socket.on('p', (rawMessage: any) => this.onPushMessage(rawMessage));
    this.socket.on('m', (rawMessage: any) => this.onRegistrationResponse(rawMessage));
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  async register(): Promise<RegistrationCredentials> {
    if (!this.socket) this.connect();
    return this.registrationPromise;
  }

  private onPushMessage(rawMessage: any): void {
    let message;
    try {
      message = typeof rawMessage === 'string'
        ? JSON.parse(rawMessage)
        : rawMessage;
    } catch (error) {
      console.error('JSON parse error:', error);
      return;
    }
    console.log('Received push message:', message);

    if (message.type === 'locale' && message.data === 'en') {
      const valid = validateLocale(message);
      console[valid ? 'log' : 'error'](
        'Locale message valid: data is "en"',
        valid ? '' : validateLocale.errors
      );
    } else if (message.secret_key) {
      const valid = validateSecret(message);
      console[valid ? 'log' : 'error'](
        'Secret message valid',
        valid ? '' : validateSecret.errors
      );
      this.registrationPayload.secret_key = message.secret_key;
      console.log('Updated registrationPayload:', this.registrationPayload);
    } else if (message.type !== undefined && message.data !== undefined) {
      const valid = validatePushMessage(message);
      console[valid ? 'log' : 'error'](
        `Push message valid: ${message.type}`,
        valid ? '' : validatePushMessage.errors
      );
    } else {
      console.warn('Received unknown message type');
    }

    if (!this.registrationSent && this.registrationPayload.secret_key) {
      this.registrationPayload.name = `TestUser${this.uniqueNumber}@test.test`;
      this.uniqueNumber++;
      this.registrationSent = true;
      console.log('Sending registrationPayload:', this.registrationPayload);
      this.socket?.emit('m', this.registrationPayload);
    }
  }

  private onRegistrationResponse(rawMessage: any): void {
    let message;
    try {
      message = typeof rawMessage === 'string'
        ? JSON.parse(rawMessage)
        : rawMessage;
    } catch (error) {
      console.error('JSON parse error (registration response):', error);
      return;
    }
    console.log('Received registration response:', message);

    if (validateSuccessResponse(message)) {
      console.log('Registration successful:', message.message);
      const credentials: RegistrationCredentials = {
        name: this.registrationPayload.name,
        password: this.registrationPayload.password
      };
      this.resolveRegistration(credentials);
    } else if (validateErrorResponse(message)) {
      console.error('Registration error:', message.error);
      this.rejectRegistration(new Error('Registration error: ' + message.error));
    } else {
      console.error('Invalid registration response schema');
      this.rejectRegistration(new Error('Invalid registration response schema'));
    }
  }
}
