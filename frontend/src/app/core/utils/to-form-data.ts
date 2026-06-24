export function toFormData(value: Record<string, any>): FormData {
    const formData = new FormData();
    Object.keys(value).forEach(key => {
        const val = value[key];
        if (val === null || val === undefined) return;
        if (val instanceof File) {
            formData.append(key, val);
        } else if (typeof val === 'boolean') {
            formData.append(key, val ? '1' : '0');
        } else {
            formData.append(key, val);
        }
    });
    return formData;
}