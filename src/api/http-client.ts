import { throwError } from 'rxjs';
import { ajax, AjaxRequest, AjaxResponse } from 'rxjs/ajax';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, map, retry } from 'rxjs/operators';

/** types */
type PartAjaxRequest = Omit<AjaxRequest, 'url' | 'method' | 'body'>;
type HttpMethod = 'GET' | 'POST' | 'DELETE' | 'PUT';
type HeadersAjax = {
    Authorization: string,
    Accept: string;
    'Content-Type': string,
    'Sec-Fetch-Site'?: string
}

interface Param {
    url: string;
    data?: unknown;
    headers?: PartAjaxRequest;
}

/** functions */
function mapResponse(res: AjaxResponse<any>) {
    if (res.response) {
        return res.response;
    }
}

function handleError$(err: unknown): Observable<unknown> {
    return throwError(err);
}


function mapAjaxRequest(request?: PartAjaxRequest) {
    const mapHeaders = request?.headers ? { ...request.headers } as HeadersAjax : undefined;
    const newHeaders = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...mapHeaders,
    };
    return { ...request, headers: { ...newHeaders } }
}

function commonApiCall(method: HttpMethod, param: Param): Observable<unknown> {
    const { url, data, headers } = param;
    const newHeaders = mapAjaxRequest(headers);
    const body = data;
    return ajax({ url, method, body, ...newHeaders }).pipe(
        map((res: AjaxResponse<any>) => mapResponse(res)),
        retry(1),
        catchError((err) => handleError$(err))
    );
}

export default class HttpClient {
    static get(url: string, headers?: PartAjaxRequest): Observable<unknown> {
        return commonApiCall('GET', { url, headers })
    }

    static post(url: string, data: unknown, headers?: PartAjaxRequest): Observable<unknown> {
        return commonApiCall('POST', { url, data, headers })
    }
    static put(url: string, data: unknown, headers?: PartAjaxRequest): Observable<unknown> {
        return commonApiCall('PUT', { url, data, headers })
    }

    static delete(url: string, headers?: PartAjaxRequest): Observable<unknown> {
        return commonApiCall('DELETE', { url, headers })
    }
}