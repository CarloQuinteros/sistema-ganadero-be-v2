import { Link, Outlet, useNavigate } from "react-router-dom";

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
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/animals">Animals</Link>

          <button
            className="mt-auto bg-red-500 p-2 rounded"
            onClick={handleLogout}
          >
            Logout
          </button>
        </nav>
      </aside>
      <main className="flex-1 p-6 w-full">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
