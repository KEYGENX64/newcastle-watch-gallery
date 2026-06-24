export interface AvailableLanguage {
    id: string;
    dir: 'ltr' | 'rtl';
    label: string;
    icon: string;
}
export const availableLangs: AvailableLanguage[] = [{
    id: 'fa',
    dir: 'rtl',
    label: 'lang.fa',
    icon: "FA"
}, {
    id: 'en',
    dir: 'ltr',
    label: 'lang.en',
    icon: "US"
}];
export const defaultLang = 'fa';