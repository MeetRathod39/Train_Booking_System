import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Toast {
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
  id: number;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private counter = 0;
  toasts$ = new Subject<Toast>();

  show(type: Toast['type'], title: string, message: string) {
    this.toasts$.next({ type, title, message, id: ++this.counter });
  }

  success(title: string, message = '') { this.show('success', title, message); }
  error(title: string, message = '')   { this.show('error',   title, message); }
  warning(title: string, message = '') { this.show('warning', title, message); }
  info(title: string, message = '')    { this.show('info',    title, message); }
}
