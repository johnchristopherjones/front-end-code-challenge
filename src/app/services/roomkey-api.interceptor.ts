import { Inject, Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

/**
 * Massage outgoing HTTP requests to the Romkey API to conform to expectations.
 *
 * The Roomkey API gives priority to non-JSON acceptable types. Angular defaults to:
 *     Accept: application/json, text/plain, *\/*
 *
 * So, to make successful API requests, we must drop the JSON alternatives for API requests.
 */
@Injectable()
export class RoomkeyApiInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // If making a request to the API, make some modifications.
    if (req.url.includes(environment.API)) {
      // Set the Accept header strictly.
      req = req.clone({ setHeaders: { 'Accept': 'application/json' } });
    }
    return next.handle(req);
  }
}
