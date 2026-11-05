import { HttpInterceptorFn } from "@angular/common/http";

const API_URL = 'http://localhost:8080/api';

export const csrfInterceptor: HttpInterceptorFn = (req, next) =>
{
    const isApiRequest = req.url.startsWith(API_URL);

    if (!isApiRequest){
        return next(req);
    }

    const csrfCookie = document.cookie.split('; ').find(cookie => cookie.startsWith('XSRF-TOKEN='));

    const csrfToken = csrfCookie ? decodeURIComponent(csrfCookie.substring('XSRF-TOKEN='.length)) : "";
    const isMutation = ['POST','PUT', 'PATCH', 'DELETE'].includes(req.method);
    let headers = req.headers;

    if (isMutation && csrfCookie) {
        headers = headers.set('X-XSRF-TOKEN', csrfToken);
    }

    return next(req.clone({
        headers, withCredentials: true
    }));
}