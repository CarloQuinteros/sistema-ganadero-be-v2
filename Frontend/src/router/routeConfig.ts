export enum RoutePath {
  HOME = "/",
  LOGIN = "/login",
  SIGNUP = "/signup",
  DASHBOARD = "/dashboard",
  ANIMALS = "/animals",
  ERROR = "/error",
  NOT_FOUND = "/404",
}

export const RouteTitles: Partial<Record<RoutePath, string>> = {
  [RoutePath.HOME]: "Inicio",
  [RoutePath.LOGIN]: "Iniciar Sesión",
  [RoutePath.SIGNUP]: "Registrarse",
  [RoutePath.DASHBOARD]: "Panel de Control",
  [RoutePath.ANIMALS]: "Animales",
  [RoutePath.ERROR]: "Error",
  [RoutePath.NOT_FOUND]: "Página No Encontrada",
};
