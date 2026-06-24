import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslocoService } from '@ngneat/transloco';
import { take } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PersianMatPaginatorIntlAdapter extends MatPaginatorIntl {

    private lang: string = 'fa';

    constructor(private _translocoService: TranslocoService) {
        super();
        // Subscribe to language changes
        this._translocoService.langChanges$.subscribe((activeLang) => {
            this.lang = activeLang;
        });
        this.getAndInitTranslations();
    }

    getAndInitTranslations() {

        this._translocoService.selectTranslate('Paginator.ItemsPerPageLabel')
            .subscribe((translation) => {
                this.itemsPerPageLabel = translation;
                this.changes.next();
            });

        this._translocoService.selectTranslate('Paginator.FirstPageLabel')
            .subscribe((translation) => {
                this.firstPageLabel = translation;
                this.changes.next();
            });

        this._translocoService.selectTranslate('Paginator.LastPageLabel')
            .subscribe((translation) => {
                this.lastPageLabel = translation;
                this.changes.next();
            });

        this._translocoService.selectTranslate('Paginator.NextPageLabel')
            .subscribe((translation) => {
                this.nextPageLabel = translation;
                this.changes.next();
            });

        this._translocoService.selectTranslate('Paginator.PreviousPageLabel')
            .subscribe((translation) => {
                this.previousPageLabel = translation;
                this.changes.next();
            });
    }

    getRangeLabel = (page: number, pageSize: number, length: number) => {
        if (length === 0 || pageSize === 0) {
            return this._translocoService.translate('Paginator.Empty', { startIndex: 0, length: length });
        }
        length = Math.max(length, 0);
        const startIndex = page * pageSize;
        const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
        return this._translocoService.translate('Paginator.RangeLabel', { startIndex: startIndex + 1, endIndex: endIndex, length: length });
    }

}

