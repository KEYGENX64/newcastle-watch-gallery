import { Inject, Injectable } from "@angular/core";
import { AppSetting } from "./app-setting.type";
import { Observable, ReplaySubject } from "rxjs";
import { TranslocoService } from "@ngneat/transloco";
import { DOCUMENT } from "@angular/common";
import { availableLangs } from "environments/available-langs";

@Injectable({ providedIn: 'root' })
export class AppSettingService {
    private _appSetting: ReplaySubject<AppSetting> = new ReplaySubject<AppSetting>(1);

    private set _localStorage(value: AppSetting) {
        localStorage.setItem('appSetting', JSON.stringify(value));
    }

    private get _localStorage(): AppSetting {
        var data = localStorage.getItem('appSetting') ?? '';
        if (data) return JSON.parse(data);

        return {
            lang: 'fa',
            localeData: 'fa'
        }
    }

    constructor(private _translocoService: TranslocoService, @Inject(DOCUMENT) private document: Document) {

        this._translocoService.setActiveLang(this._localStorage.lang);
        this._appSetting.next(this._localStorage);
        this.updateDomAttributes(this._localStorage.lang);

        this._translocoService.langChanges$.subscribe((activeLang) => {
            this._localStorage = {
                lang: activeLang,
                localeData: this._localStorage.localeData
            }
            this._appSetting.next(this._localStorage);
            this.updateDomAttributes(this._localStorage.lang);
        });

    }

    set appSetting(value: AppSetting) {
        this._translocoService.setActiveLang(value.lang);
        this._localStorage = value;
        this._appSetting.next(value);
    }

    get appSetting$(): Observable<AppSetting> {
        return this._appSetting.asObservable();
    }


    private updateDomAttributes(lang: string): void {
        const htmlTag = this.document.getElementsByTagName("html")[0] as HTMLHtmlElement;
        var _lang = availableLangs.find(x => x.id == lang);

        if (htmlTag) {
            htmlTag.dir = _lang!.dir;
            htmlTag.lang = _lang!.id;
        }

        if (this.document.body) {
            this.document.body.dir = _lang!.dir;
        }
    }
}