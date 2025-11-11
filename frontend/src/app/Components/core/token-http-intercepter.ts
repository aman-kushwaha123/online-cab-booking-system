//Http interceptor is used to connect same current browser request to with serve req and add some intercept(any modifications) in in req

import { HttpErrorResponse, HttpEvent, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, finalize, Observable, throwError } from "rxjs";
import { AuthService } from "../../services/auth.service";
import { LoadingService } from "../../services/loading.service";
import { ToastrService } from "ngx-toastr";

//next is handler of request
export const tokenHttpInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router)
  const authService = inject(AuthService)
  const loadingService = inject(LoadingService)
  const toastrService = inject(ToastrService)
  const token = localStorage.getItem("token")



  // URLs to exclude from adding Authorization header
  const excludedUrls = [
    'https://router.project-osrm.org',
    'https://nominatim.openstreetmap.org'
  ];

  const isExcluded = excludedUrls.some(url => req.url.startsWith(url));
  
  if (isExcluded) {
    // Forward the request without adding Authorization header
    return next(req)
  }

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      }
    })
  }         //to intercept in server req

  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401 || error.status === 403 || error.status === 0 || authService.istokenExpired(token)) {

        localStorage.removeItem('token')
        localStorage.removeItem('user'),
          localStorage.removeItem('driver')
        router.navigateByUrl('/')

      }


      return throwError(() => Error)
    })
    )
  
}

//go to app.congig and add withInterceptors in provideHttopClient
