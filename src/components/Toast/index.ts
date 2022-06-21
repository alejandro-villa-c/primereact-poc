import { Toast, ToastMessageType } from 'primereact/toast';

export declare class AppToastComponent extends Toast {
  public show(message: ToastMessageType): void;
  public clear(): void;
}

export { AppToast } from './Toast';