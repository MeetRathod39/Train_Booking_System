import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgFor, NgClass } from '@angular/common';
import { ToastService, Toast } from '../../services/toast';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [NgFor, NgClass],
  template: `
    <div class="toast-container">
      <div
        *ngFor="let t of toasts"
        class="toast-item"
        [ngClass]="'toast-' + t.type"
        (click)="remove(t.id)">
        <div class="toast-icon">{{ icons[t.type] }}</div>
        <div class="toast-body">
          <div class="toast-title">{{ t.title }}</div>
          <div class="toast-msg" *ngIf="t.message">{{ t.message }}</div>
        </div>
        <div class="toast-close">✕</div>
      </div>
    </div>
  `,
  styles: [`
    .toast-container {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 0.7rem;
      pointer-events: none;
    }
    .toast-item {
      pointer-events: all;
      display: flex;
      align-items: flex-start;
      gap: 0.9rem;
      padding: 1rem 1.2rem;
      border-radius: 14px;
      min-width: 300px;
      max-width: 400px;
      cursor: pointer;
      animation: slideIn 0.35s cubic-bezier(0.34,1.56,0.64,1) both;
      border: 1px solid transparent;
      backdrop-filter: blur(16px);
      box-shadow: 0 16px 40px rgba(0,0,0,0.5);
    }
    @keyframes slideIn {
      from { transform: translateX(120px); opacity: 0; }
      to   { transform: translateX(0);     opacity: 1; }
    }
    .toast-success { background: rgba(17,21,32,0.96); border-color: rgba(34,211,160,0.4); }
    .toast-error   { background: rgba(17,21,32,0.96); border-color: rgba(244,63,94,0.4);  }
    .toast-warning { background: rgba(17,21,32,0.96); border-color: rgba(245,166,35,0.4); }
    .toast-info    { background: rgba(17,21,32,0.96); border-color: rgba(96,165,250,0.4); }
    .toast-icon { font-size: 1.4rem; flex-shrink: 0; margin-top: 1px; }
    .toast-body { flex: 1; }
    .toast-title { font-weight: 700; font-size: 0.92rem; color: #e2e8f8; font-family: 'Syne', sans-serif; }
    .toast-msg   { font-size: 0.8rem; color: #8898c0; margin-top: 3px; line-height: 1.4; }
    .toast-close { font-size: 0.75rem; color: #4a5680; flex-shrink: 0; margin-top: 2px; transition: color 0.2s; }
    .toast-item:hover .toast-close { color: #e2e8f8; }
  `]
})
export class ToastComponent implements OnInit, OnDestroy {
  toasts: Toast[] = [];
  icons: Record<string, string> = {
    success: '✅',
    error:   '❌',
    warning: '⚠️',
    info:    'ℹ️'
  };
  private sub!: Subscription;

  constructor(private toastService: ToastService) {}

  ngOnInit() {
    this.sub = this.toastService.toasts$.subscribe(toast => {
      this.toasts.push(toast);
      setTimeout(() => this.remove(toast.id), 4000);
    });
  }

  remove(id: number) {
    this.toasts = this.toasts.filter(t => t.id !== id);
  }

  ngOnDestroy() { this.sub.unsubscribe(); }
}
