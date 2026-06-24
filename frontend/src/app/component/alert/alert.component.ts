import { AlertType } from './alert.d';
import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, Signal } from "@angular/core";
import { AlertService } from './alert.service';
import { FuseAlertComponent } from '@fuse/components/alert';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrl:'./alert.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CommonModule, FuseAlertComponent,TranslocoModule]
})
export class AlertComponent {
    alerts: Signal<AlertType[]>;

    constructor(private alertService: AlertService) {
        this.alerts = this.alertService.alerts;
    }

    removeAlert(alert: AlertType) {
        this.alertService.removeAlert(alert);
    }
}