import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>Image</div>

      <div className="flex flex-col justify-center align-middle">
        <Button asChild>
          <Link to="/login">Let&lsquo;s get started</Link>
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
