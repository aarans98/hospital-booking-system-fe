import React, { Fragment } from "react";
import { Route } from "react-router-dom";

// DASHBOARDS

import MainDokter from "./Dokter";
import MainPasien from "./Pasien";
import MainAdmin from "./Admin";

// Layout

import AppHeader from "../../Layout/AppHeader/";
import AppSidebar from "../../Layout/AppSidebar/";
import AppFooter from "../../Layout/AppFooter/";

// Theme Options
import ThemeOptions from "../../Layout/ThemeOptions/";

const Dashboards = ({ match }) => (
  <Fragment>
    <ThemeOptions />
    <AppHeader />
    <div className="app-main">
      {/* <AppSidebar /> */}
      <div className="app-main__outer">
        <div className="app-main__inner">
          <Route path={`/dashboards/pasien`} component={MainPasien} />
          <Route path={`/dashboards/dokter`} component={MainDokter} />
          <Route path={`/dashboards/admin`} component={MainAdmin} />
        </div>
        <AppFooter />
      </div>
    </div>
  </Fragment>
);

export default Dashboards;
