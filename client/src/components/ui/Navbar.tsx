import {
  NavigationMenu,
  NavigationMenuList,
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
            <Link to={"app/"}>Home</Link>
            <Link to={"app/dashboard"}>Dashboard</Link>
            <Link to={"app/tables"}>Tables</Link>
            <Link to={"app/mentors"}>Mentors</Link>
            <Link to={"app/mentis"}>Mentis</Link>
            
            {user.role === "admin" && (
              <Link to={"app/adminboard"}>Admin Board</Link>
            )}
          </>
        ) : (
          <Link to={"/login"}>Login</Link>
        )}
      </NavigationMenuList>

      {user && (
        <Link
          to={`/profile/${user.id}`}
          className="ml-auto"
        >{`Hello ${user.name}`}</Link>
      )}
    </NavigationMenu>
  );
};

export default Navbar;
