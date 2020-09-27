import React, { Fragment } from "react";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";

import PageTitle from "../../../Layout/AppMain/PageTitle";

import Tabs, { TabPane } from "rc-tabs";
import TabContent from "rc-tabs/lib/SwipeableTabContent";
import ScrollableInkTabBar from "rc-tabs/lib/ScrollableInkTabBar";

import MySchedulePasien from "./KontenPasien/MySchedulePasien";
import ListPraktek from "./KontenPasien/ListPraktek";
import RekamMedik from "./KontenPasien/RekamMedik";
import ListDokter from "./KontenPasien/ListDokter";

// Examples
// import CardsBasicExample from "./KontenPasien/Basic";
// import CardsColors from "./KontenPasien/Colors";
// import CardsBlockLoadingExample from "./KontenPasien/Loading";
// import CardsAdvanced from "./KontenPasien/Advanced";

export default class MainPasien extends React.Component {
  render() {
    return (
      <Fragment>
        <CSSTransitionGroup
          component="div"
          transitionName="TabsAnimation"
          transitionAppear={true}
          transitionAppearTimeout={0}
          transitionEnter={false}
          transitionLeave={false}
        >
          <PageTitle
            heading="Pasien"
            subheading="Ini Halaman Pasien~"
            icon="pe-7s-stopwatch icon-gradient bg-amy-crisp"
          />
          <Tabs
            defaultActiveKey="1"
            renderTabBar={() => <ScrollableInkTabBar />}
            renderTabContent={() => <TabContent />}
          >
            <TabPane tab="List Dokter" key="1">
              <ListDokter />
            </TabPane>
            <TabPane tab="List Praktek" key="2">
              <ListPraktek />
            </TabPane>
            <TabPane tab="Notifikasi Pasien" key="3">
              <MySchedulePasien />
            </TabPane>
            <TabPane tab="Rekam Medik" key="4">
              <RekamMedik/>
            </TabPane>
          </Tabs>
        </CSSTransitionGroup>
      </Fragment>
    );
  }
}
