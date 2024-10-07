import { HttpEvent, HttpHandlerFn, HttpHeaders, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const token = localStorage.getItem("access_token");

  // Si pas de token, passer à la requête suivante sans modification
  if (!token) {
    return next(req);
  }

  // Ajouter l'en-tête Authorization avec le Bearer token
  const newRequete = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    }
  });

  return next(newRequete);
}
