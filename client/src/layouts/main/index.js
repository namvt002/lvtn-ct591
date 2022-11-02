import { Outlet } from 'react-router-dom';
// material
// components
//
import MainNavbar from './MainNavbar';
import MainFooter from './MainFooter';
import SidebarLeft from './SidebarLeft';
import { Grid } from '@material-ui/core';

// ----------------------------------------------------------------------

export default function MainLayout() {
  return (
    <>
      <div>
        <MainNavbar />
        <Grid container>
          <Grid item xs={1}>
            <SidebarLeft />
          </Grid>
          <Grid item xs={11}>
            <Outlet />
          </Grid>
        </Grid>
        <MainFooter />
      </div>
    </>
  );
}
