import { Home, PawPrint } from "lucide-react";
import { RouteTitles, RoutePath } from "@/router/routeConfig";

export const menuItems = [
  {
    label: RouteTitles[RoutePath.HOME],
    path: RoutePath.HOME,
    icon: Home,
  },
  {
    label: RouteTitles[RoutePath.ANIMALS],
    path: RoutePath.ANIMALS,
    icon: PawPrint,
  },
];
