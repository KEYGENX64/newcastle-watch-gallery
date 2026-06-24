import { Pipe, PipeTransform } from '@angular/core';
import moment from 'jalali-moment';
import { AppSettingService } from '../app-setting/app-setting.service';

@Pipe({
    name: 'jalali',
    pure: true,
    standalone: false
})
export class JalaliPipe implements PipeTransform {

    private localeData = 'fa';

    constructor(private readonly AppSettingService: AppSettingService) {
        this.AppSettingService.appSetting$.subscribe(app => {
            this.localeData = app.localeData;
        });
    }

    transform(value: any, format?: string): string {
        if (!value) return '';
        try {
            const momentDate = moment.utc(value).locale(this.localeData);
            if (!momentDate.isValid()) return 'فورمت زمان ناشناس';

            if (format) return momentDate.utcOffset(210).format(format);

            return momentDate.utcOffset(210).format('HH:mm YYYY/MM/DD');
        } catch (error) {
            console.error('Error in JalaliPipe:', error);
            return 'فورمت زمان ناشناس';
        }
    }
}
