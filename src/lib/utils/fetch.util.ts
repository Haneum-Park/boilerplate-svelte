import { isProduction, setStringQuery } from '$util/common.util';

export interface FetchRequestConfig extends RequestInit {
  baseUrl: string;
  url?: string;
  query?: Record<string, any>;
}

export interface FetchResponse<T> {
  statusCode: number;
  message?: string;
  error?: string;
  data?: T extends T ? T : Record<string, any> | string;
}

export const fetchConfig: FetchRequestConfig = {
  baseUrl: isProduction ? 'https://api.allreva.com' : 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  credentials: 'include',
  mode: 'cors',
  cache: 'default',
};

class Fetch {
  constructor(private readonly config: FetchRequestConfig) {
    this.config = fetchConfig;
  }

  async post<T>(
    url: string,
    body: Record<string, any>,
    headers?: HeadersInit,
    query: Record<string, any> | null = null,
  ): Promise<Response['json'] & FetchResponse<T>> {
    const stringquery = query ? setStringQuery(query as Record<string, any>) : '';
    const result = await fetch(
      `${this.config.baseUrl}/${url}${stringquery ? `?${stringquery}` : ''}`,
      {
        method: 'POST',
        body: JSON.stringify(body),
        credentials: this.config.credentials,
        headers: {
          ...this.config.headers,
          ...(headers || {}),
        },
      },
    )
      .then((res) => res.json())
      .catch((err) => err);
    return result;
  }

  async get<T>(
    url: string,
    headers?: HeadersInit,
    query: Record<string, any> | null = null,
  ): Promise<Response['json'] & FetchResponse<T>> {
    const stringquery = query ? setStringQuery(query as Record<string, any>) : '';
    const result = await fetch(
      `${this.config.baseUrl}/${url}${stringquery ? `?${stringquery}` : ''}`,
      {
        method: 'GET',
        credentials: this.config.credentials,
        headers: {
          ...this.config.headers,
          ...(headers || {}),
        },
      },
    )
      .then((res) => res.json())
      .catch((err) => err);
    return result;
  }

  async patch<T>(
    url: string,
    body: Record<string, any>,
    headers?: HeadersInit,
    query: Record<string, any> | null = null,
  ): Promise<Response['json'] & FetchResponse<T>> {
    const stringquery = query ? setStringQuery(query as Record<string, any>) : '';
    const result = await fetch(
      `${this.config.baseUrl}/${url}${stringquery ? `?${stringquery}` : ''}`,
      {
        method: 'PATCH',
        body: JSON.stringify(body),
        credentials: this.config.credentials,
        headers: {
          ...this.config.headers,
          ...(headers || {}),
        },
      },
    )
      .then((res) => res.json())
      .catch((err) => err);
    return result;
  }

  async delete<T>(
    url: string,
    headers?: HeadersInit,
    query: Record<string, any> | null = null,
  ): Promise<Response['json'] & FetchResponse<T>> {
    const stringquery = query ? setStringQuery(query as Record<string, any>) : '';
    const result = await fetch(
      `${this.config.baseUrl}/${url}${stringquery ? `?${stringquery}` : ''}`,
      {
        method: 'DELETE',
        credentials: this.config.credentials,
        headers: {
          ...this.config.headers,
          ...(headers || {}),
        },
      },
    )
      .then((res) => res.json())
      .catch((err) => err);
    return result;
  }

  async create<T>(config: FetchRequestConfig): Promise<Response['json'] & FetchResponse<T>> {
    const stringquery = config.query ? setStringQuery(config.query as Record<string, any>) : '';
    const result = await fetch(
      `${config.baseUrl}/${config.url}${stringquery ? `?${stringquery}` : ''}`,
      {
        method: config.method,
        body: JSON.stringify(config.body),
        credentials: config.credentials,
        headers: {
          ...this.config.headers,
          ...(config.headers || {}),
        },
      },
    )
      .then((res) => res.json())
      .catch((err) => err);
    return result;
  }
}

const fetchAPI = new Fetch(fetchConfig);

export default fetchAPI;
