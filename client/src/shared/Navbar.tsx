import {
  NavigationMenu,
  //   NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  //   NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <NavigationMenu className="flex w-full max-w-full items-center justify-between bg-zinc-700 px-4 py-2 text-lg text-zinc-200">
      <NavigationMenuList className="flex gap-5">
        <NavigationMenuItem>
          <Link to={"/"}>Home</Link>
        </NavigationMenuItem>
        <Link to={"/tables"}>
          <NavigationMenuLink>Tables</NavigationMenuLink>
        </Link>
        <NavigationMenuItem>
          <Link to={"/mentors"}>Mentors</Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to={"/mentis"}>Mentis</Link>
        </NavigationMenuItem>
      </NavigationMenuList>
      <NavigationMenuList className="ml-auto">
        <NavigationMenuItem>
          <NavigationMenuLink>Profile</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Navbar;
