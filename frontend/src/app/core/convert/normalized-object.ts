import { HttpParams } from "@angular/common/http";

export const NormalizedObject = (data: any) => {
  const normalized: any = Object.fromEntries(
    Object.entries(data).filter(([_, v]) => v !== null && v !== undefined)
  );

  if (Array.isArray(normalized.orderBy)) {
    normalized.orderBy = normalized.orderBy.join(',');
  }

  return normalized;
}

export const ConvertObjectToQuaryString = (data: any) => {
  var normalized = NormalizedObject(data);
  let params = new HttpParams({ fromObject: normalized });
  return params;
}