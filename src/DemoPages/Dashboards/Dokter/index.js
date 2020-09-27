import React, { Fragment } from "react";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";

import PageTitle from "../../../Layout/AppMain/PageTitle";

import Tabs, { TabPane } from "rc-tabs";
import TabContent from "rc-tabs/lib/SwipeableTabContent";
import ScrollableInkTabBar from "rc-tabs/lib/ScrollableInkTabBar";
import RekamMedik from "../Pasien/KontenPasien/RekamMedik";

// Examples

export default class MainDokter extends React.Component {
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
            heading="Dokter"
            subheading="Ini Halaman Dokter~"
            icon="pe-7s-stopwatch icon-gradient bg-amy-crisp"
          />
          <Tabs
            defaultActiveKey="1"
            renderTabBar={() => <ScrollableInkTabBar />}
            renderTabContent={() => <TabContent />}
          >
            <TabPane tab="Pasien" key="1">
              <p>List Pasien Dokter</p>
            </TabPane>
            <TabPane tab="Rekam Medik" key="2">
              <RekamMedik/>
            </TabPane>
            {/* <TabPane tab='Color States' key='3'>
              <CardsColors />
            </TabPane>
            <TabPane tab='Block Loading' key='4'>
              <CardsBlockLoadingExample />
            </TabPane> */}
          </Tabs>
        </CSSTransitionGroup>
      </Fragment>
    );
  }
}
