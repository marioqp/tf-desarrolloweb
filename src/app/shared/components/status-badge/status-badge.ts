import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  template: `<span class="status" [class.pending]="status === 'Pendiente'"
                   [class.progress]="status === 'En atención'"
                   [class.waiting]="status === 'En espera'"
                   [class.closed]="status === 'Cerrada'">{{ status }}</span>`,
  styles: [`
    .status {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 5px 12px;
      border-radius: 16px;
      font-size: 12px;
      font-weight: 600;
      line-height: 1.3;
      white-space: nowrap;
      vertical-align: middle;
    }
    .pending { background: #fff3df; color: #a96b13; }
    .progress { background: #e9edff; color: #4755ad; }
    .waiting { background: #f1eaff; color: #8154b2; }
    .closed { background: #e5f5ec; color: #31815a; }
  `]
})
export class StatusBadge {
  @Input() status = 'Pendiente';
}
