import React, { Fragment } from "react";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";

import PageTitle from "../../../Layout/AppMain/PageTitle";

import Tabs, { TabPane } from "rc-tabs";
import TabContent from "rc-tabs/lib/SwipeableTabContent";
import ScrollableInkTabBar from "rc-tabs/lib/ScrollableInkTabBar";
import RekamMedik from "../Pasien/KontenPasien/RekamMedik";
import MyScheduleDoctor from "./KontenDokter/MyScheduleDoctor";

// Examples

export default class MainDokter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: this.props.location.customName.username,
    };
  }
  render() {
    return (
      <Fragment>
        <CSSTransitionGroup
          component='div'
          transitionName='TabsAnimation'
          transitionAppear={true}
          transitionAppearTimeout={0}
          transitionEnter={false}
          transitionLeave={false}>
          <PageTitle
            heading='Dokter'
            subheading='Ini Halaman Dokter~'
            icon='pe-7s-stopwatch icon-gradient bg-amy-crisp'
          />
          <Tabs
            defaultActiveKey='1'
            renderTabBar={() => <ScrollableInkTabBar />}
            renderTabContent={() => <TabContent />}>
            <TabPane tab='Pasien' key='1'>
              <MyScheduleDoctor username={this.state.username} />
            </TabPane>
            <TabPane tab='Rekam Medik' key='2'>
              <RekamMedik />
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
