import { Outlet } from "react-router";

export default function MainLayout() {
  return (
    <>
      <main>
        <div>
          <Outlet />
        </div>
      </main>
    </>
  );
}
