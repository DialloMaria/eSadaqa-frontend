import { HttpEvent, HttpHandlerFn, HttpHeaders, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  let token = null;

  // Vérifier si l'application s'exécute dans un navigateur avant d'accéder à localStorage
  if (typeof window !== 'undefined' && window.localStorage) {
    token = localStorage.getItem("auth_token");
  }

  // Si pas de token, passer à la requête suivante sans modification
  if (!token) {
    return next(req);
  }

  // Cloner la requête en y ajoutant l'en-tête Authorization avec le Bearer token
  const newRequete = req.clone({
    setHeaders: {
      Authorization:`Bearer ${token}`
    }
  });

  return next(newRequete).pipe(
    catchError((error) => {
      // Gestion basique des erreurs dans l'interceptor
      console.error('Erreur interceptée dans authInterceptor : ', error);
      throw error;
    })
  );
}
