import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Menu } from "lucide-react";

const Navbar = () => {
  const auth: any = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-blue-600 text-white shadow-md">

      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">

        <h2 className="font-bold text-lg sm:text-xl">
          Articles
        </h2>

       <button
        className="sm:hidden text-2xl"
        onClick={() => setMenuOpen(!menuOpen)}
        >
        <Menu size={25} />
        </button>

        <div className="hidden sm:flex items-center gap-3">

          <span className="bg-white text-blue-600 px-3 py-1 rounded-md text-sm font-medium capitalize">
            {auth.role}
          </span>

          <button
            onClick={auth.logout}
            className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md text-sm transition"
          >
            Logout
          </button>

        </div>
      </div>

      {menuOpen && (
        <div className="sm:hidden px-4 pb-4 flex flex-col gap-3">

          <span className="bg-white text-blue-600 px-3 py-1 rounded-md text-sm font-medium capitalize w-fit">
            {auth.role}
          </span>

          <button
            onClick={auth.logout}
            className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md text-sm w-fit"
          >
            Logout
          </button>

        </div>
      )}

    </div>
  );
};

export default Navbar;