import { Outlet } from "react-router-dom";
import { Navbar } from "components/Navbar/";

export const RootLayout = () => (
  <>
    <Navbar />
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Outlet />
    </main>
  </>
);
