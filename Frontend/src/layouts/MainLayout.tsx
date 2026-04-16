import { Link, Outlet, useNavigate } from "react-router-dom";
import { menuItems } from "@/lib/menuItems";
import { Button } from "@/components/ui/button";

function MainLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4 flex flex-col">
        <h2 className="text-lg font-bold mb-6">Sistema Ganadero</h2>
        <nav className="flex flex-col gap-3 flex-1">
          {menuItems.map(({ label, path, icon: Icon }) => (
            <Link key={path} to={path}>
              <div className="flex items-center gap-2">
                <Icon size={16} />
                {label}
              </div>
            </Link>
          ))}
          <Button
            variant="destructive"
            className="mt-auto"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </nav>
      </aside>
      <main className="flex-1 p-6 w-full">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
