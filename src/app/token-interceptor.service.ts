import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private api: ApiService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('INTERCEPTOR');

    const token = this.api.getToken();
    let newHeaders = req.headers;
    if (token) {
      newHeaders = newHeaders.append('Authorization', 'Bearer ' + token);
    }
    const authReq = req.clone({ headers: newHeaders });
    return next.handle(authReq);
  }
}
