import { CanActivateFn } from '@angular/router';

export const loggedoutGuardGuard: CanActivateFn = (route, state) => {
  return localStorage.getItem("token") ? false : true;
};
