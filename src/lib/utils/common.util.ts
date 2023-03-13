export const isProduction = (process.env.NODE_ENV || 'development') === 'production';

export function deepcopy<T extends Record<string, any> | Record<string, any>[]>(obj: T): T {
  let clone = {} as T;

  if (Array.isArray(obj)) clone = [] as Record<string, any>[] as T;
  (Object.keys(obj) as Array<keyof typeof obj>).forEach((key) => {
    if (typeof obj[key] === 'object' && obj[key] !== null && !(obj[key] instanceof Date)) {
      clone[key] = deepcopy(obj[key] as T) as any;
    } else if (obj[key] instanceof Date) {
      clone[key] = String(obj[key]) as any;
    } else {
      clone[key] = obj[key];
    }
  });

  return clone as T;
}

export function setObjectQuery<T>(url: string): T | Record<string, any> {
  if (url) {
    const query: Record<string, any> | T = {};
    const queries = url.replace('?', '').split('&');
    queries.forEach((data) => {
      let dataValue = data.split('=')[1] as string | number;
      if (dataValue) {
        if (Number.isNaN(parseInt(dataValue as string, 10))) {
          dataValue = decodeURI(dataValue as string);
        } else {
          dataValue = Number(data.split('=')[1]);
        }
      }
      query[data.split('=')[0] as string] = dataValue;
    });
    return query;
  }
  return {};
}

export function setStringQuery<T extends Record<string, any>>(value: T) {
  if (value) {
    const query: any[] = [];
    Object.keys(value).forEach((key) => {
      query.push(`${key}=${value[key]}`);
    });
    return query.join('&');
  }
  return '';
}

export function toChartPeriod(period: string) {
  const [periodNumber, periodType] = period.split('');
  switch (periodType) {
    case 'm':
      return `${periodNumber}분`;
    case 'h':
      return `${periodNumber}시간`;
    case 'd':
      return `${periodNumber}일`;
    default:
      return period;
  }
}

export const cookies = {
  set: (key: string, value: string, expTime?: number) => {
    const expires = expTime ? `expires=${new Date(Date.now() + expTime).toUTCString()}` : '';
    const cookie = [`${key}=${value}`, expires, 'path=/'];
    document.cookie = cookie.join('; ');
  },
  get: (key: string): string | null | undefined => {
    const value = document.cookie.match(`(^|;) ?${key}=([^;]*)(;|$)`);
    return value ? value[2] : null;
  },
  del: (key: string) => {
    document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  },
};
