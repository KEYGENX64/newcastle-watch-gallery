import { Injectable, signal } from "@angular/core";
import { AlertType } from "./alert.d";

@Injectable({ providedIn: 'root' })
export class AlertService {
    private _alerts = signal<AlertType[]>([]);
    alerts = this._alerts.asReadonly();

    addAlert(alert: AlertType) {
        this._alerts.update(list => [...list, alert]);

        setTimeout(() => {
            this.removeAlert(alert);
        }, 5000);
    }

    removeAlert(alert: AlertType) {
        this._alerts.update(list => list.filter(a => a !== alert));
    }
}