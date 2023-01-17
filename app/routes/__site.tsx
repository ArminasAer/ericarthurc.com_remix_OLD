import Header from '~/components/header';
import Navbar from '~/components/navbar';
import Themer from '~/components/themer';

import { Outlet } from '@remix-run/react';

export default function Layout() {
  return (
    <>
      <Themer />
      <Header />
      <Navbar />
      <Outlet />
    </>
  );
}
