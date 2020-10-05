import React, { Fragment } from "react";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import { Row, Col } from "react-bootstrap";
import PageTitle from "../../../Layout/AppMain/PageTitle";

import Tabs, { TabPane } from "rc-tabs";
import TabContent from "rc-tabs/lib/SwipeableTabContent";
import ScrollableInkTabBar from "rc-tabs/lib/ScrollableInkTabBar";
import RekamMedik from "../Pasien/KontenPasien/RekamMedik";
import MyScheduleDoctor from "./KontenDokter/MyScheduleDoctor";
import DaftarObat from "./KontenDokter/DaftarObat";

// Examples

export default class MainDokter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: localStorage.getItem("username").slice(1, -1),
      count: 0,
    };
  }

  addCount = () =>{
    this.setState({count: this.state.count + 1});
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
          <Row>
            <Col>
              <Tabs
                defaultActiveKey='1'
                renderTabBar={() => <ScrollableInkTabBar />}
                renderTabContent={() => <TabContent />}
                onChange={this.addCount}
              >
                <TabPane tab='Pasien' key='1'>
                  <MyScheduleDoctor username={this.state.username} />
                </TabPane>
                <TabPane tab='Rekam Medik' key='2'>
                  <RekamMedik count={this.state.count}/>
                </TabPane>
                <TabPane tab='Daftar Obat' key='3'>
                  <DaftarObat />
                </TabPane>
                {/* <TabPane tab='Color States' key='3'>
                  <CardsColors />
                </TabPane>
                <TabPane tab='Block Loading' key='4'>
                  <CardsBlockLoadingExample />
                </TabPane> */}
              </Tabs>
            </Col>
          </Row>
        </CSSTransitionGroup>
      </Fragment>
    );
  }
}
