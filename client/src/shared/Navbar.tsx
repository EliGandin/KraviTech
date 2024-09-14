import {
  NavigationMenu,
  //   NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuList,
  //   NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { userAtom } from "@/state/atoms/userAtom";

const Navbar = () => {
  const user = useRecoilValue(userAtom);

  return (
    <NavigationMenu className="flex w-full max-w-full items-center justify-between bg-zinc-700 px-4 py-2 text-lg text-zinc-200">
      <NavigationMenuList className="flex gap-5">
        {user ? (
          <>
            <Link to={"/"}>Home</Link>
            <Link to={"/dashboard"}>Dashboard</Link>
            <Link to={"/tables"}>Tables</Link>
            <Link to={"/mentors"}>Mentors</Link>
            <Link to={"/mentis"}>Mentis</Link>
            <NavigationMenuList className="ml-auto">
              <NavigationMenuLink>Profile</NavigationMenuLink>
            </NavigationMenuList>
          </>
        ) : (
          <Link to={"/login"}>Login</Link>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Navbar;
