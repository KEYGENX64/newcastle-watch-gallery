import { Location } from "@angular/common";
import { Directive, inject, OnDestroy } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Subject, } from "rxjs";

@Directive()
export abstract class BaseComponent implements OnDestroy {
  protected readonly _unsubscribeAll: Subject<void> = new Subject<void>();
  protected readonly _dialog: MatDialog = inject(MatDialog);
  protected readonly _location: Location = inject(Location);

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
