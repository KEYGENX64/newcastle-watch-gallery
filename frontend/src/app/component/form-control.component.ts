import { Directive, inject, output } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Observable, switchMap, tap } from "rxjs";
import { DialogConfirmComponent } from "./dialog/confirm/confirm.component";
import { DialogInformationComponent } from "./dialog/information/information.component";
import { BaseComponent } from "./base-component";
import { ActivatedRoute, Router } from "@angular/router";
import { result } from "lodash";

@Directive()
export abstract class FormControlComponent<T = any, D = any> extends BaseComponent {

  protected readonly _dialogRef = inject<MatDialogRef<T>>(MatDialogRef<T>, { optional: true });
  protected readonly _dialogData = inject<D>(MAT_DIALOG_DATA, { optional: true });
  protected readonly _route: ActivatedRoute = inject(ActivatedRoute);
  protected readonly _router: Router = inject(Router);

  protected _mode: 'popup' | 'route' | 'embedded' = 'embedded';

  onCancell = output();

  get isPopup(): boolean {
    return !!this._dialogRef;
  }

  get isRoute(): boolean {
    const routeData = this._route.snapshot.data;
    return !!routeData && routeData['hasRoute'] === true;
  }

  get isEmbedded(): boolean {
    return !this.isPopup && !this.isRoute;
  }

  openDialog<D>(component: any, data?: D) {
    this._dialog.open(component, { data });
  }

  constructor() {
    super()
    if (this.isPopup) this._mode = 'popup';
    else if (this.isRoute) this._mode = 'route';
    else this._mode = 'embedded';
  }

  protected onBack() {


    if (this.isPopup) this._dialogRef.close();
    else if (this.isRoute) this._location.back();
    else this.onCancell.emit();


  }

  protected onRetry(): Observable<boolean> {

    var informationRef = this._dialog.open(DialogInformationComponent, {
      data: { title: 'Dialog.Success.Title', message: 'Dialog.Success.Message' }
    })

    return informationRef.afterClosed().pipe(
      switchMap(_ => {
        var confirmRef = this._dialog.open(DialogConfirmComponent, {
          data: { title: 'Dialog.Back.Title', message: 'Dialog.Back.Message' }
        })

        return confirmRef.afterClosed().pipe(
          tap((confirm: boolean) => {
            if (confirm == true) this.onBack();
          })
        ) as Observable<boolean>;
      })
    )
  }
}
