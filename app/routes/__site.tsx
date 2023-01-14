import { Outlet } from '@remix-run/react';

import Navbar from '~/components/navbar';
import Header from '~/components/header';
import Themer from '~/components/themer';

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
