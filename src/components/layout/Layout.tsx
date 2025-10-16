import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div>
      <header>헤더</header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
