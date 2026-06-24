import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'numberGrouping',
    pure: true,
    standalone: false
})
@Injectable({
    providedIn: 'root'
})
export class NumberGroupingPipe implements PipeTransform {

    transform(value: number | string): string {
        if (value === null || value === undefined) return '';

        const strValue = value.toString();

        const [integerPart, decimalPart] = strValue.split('.');

        const formattedInt = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

        return decimalPart ? `${formattedInt}.${decimalPart}` : formattedInt;
    }

}
