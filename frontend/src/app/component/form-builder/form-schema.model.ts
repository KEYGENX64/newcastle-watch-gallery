import { Pager } from "app/core/api/models/pager.type";
import { Observable } from "rxjs";

export interface IValidation {
    required?: boolean;
    minLength?: number;
    pattern?: string;
    maxLength?: number;
    email?: boolean;
    max?: number;
    min?: number;
    maxRef?: string;
}

// form-schema.model.ts
export interface WidthConfig {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
}

export interface LookupResponse {
    id: number | string | boolean;
    name: string;
    selected?: boolean;
    description?: string;
}

export interface WidgetConfig {
    widgetType: 'input' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'date' | 'file' | 'inputPassword' | 'inputNumber' | 'inputPhone' | 'inputEmail';
    name: string; // uniq
    label?: string;
    decimal?: boolean;
    decimalCount?: number;
    intCount?: number;
    negetive?: boolean;
    minDate?: Date;
    maxDate?: Date;
    icon?: string;
    placeholder?: string;
    options?: LookupResponse[],
    perfixTranslate?: string,
    update?: (currentPage: number, pageSize: number, search?: string) => Observable<Pager<LookupResponse>>,
    init?: (search?: string) => Observable<LookupResponse[]>,
    validation?: IValidation;
    defaultValue?: any;
    style?: Record<string, string>;
    accept?: string;
    maxFileSizeMb?: number;
}


export interface WidgetInvisible {
    name: string;
    defaultValue?: any;
    validation?: IValidation;
}

export interface ColumnConfig {
    width: WidthConfig
    widgets: WidgetConfig[];
}

export interface RowConfig {
    columns: ColumnConfig[];
    style?: Record<string, string>;
}

export interface FormSchema {
    invisible?: WidgetInvisible[];
    init?: Observable<any>;
    rows: RowConfig[];
    formStyle?: Record<string, string>;
    validation?: {
        passwordsMatch?: {
            from: string,
            to: string
        },
        passwordsMisMatch?: {
            from: string,
            to: string
        }
    };
}
