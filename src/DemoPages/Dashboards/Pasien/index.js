import React, { Fragment } from "react";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";

import PageTitle from "../../../Layout/AppMain/PageTitle";

import Tabs, { TabPane } from "rc-tabs";
import TabContent from "rc-tabs/lib/SwipeableTabContent";
import ScrollableInkTabBar from "rc-tabs/lib/ScrollableInkTabBar";

import MySchedulePasien from "./KontenPasien/MySchedulePasien";
import ListPraktek from "./KontenPasien/ListPraktek";
import Praktek from "./KontenPasien/Praktek";
import RekamMedik from "./KontenPasien/RekamMedik";
import ListDokter from "./KontenPasien/ListDokter";
import {Row,Col,Carousel} from "react-bootstrap"
import Carousel1 from "../../../img/carousel-1.png"
import Carousel2 from "../../../img/carousel-2.png"
// import Carousel3 from "../../../img/carousel-3.jpg"


// Examples
// import CardsBasicExample from "./KontenPasien/Basic";
// import CardsColors from "./KontenPasien/Colors";
// import CardsBlockLoadingExample from "./KontenPasien/Loading";
// import CardsAdvanced from "./KontenPasien/Advanced";

var carouselStyle = {
  maxHeight: "600px",
};

export default class MainPasien extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: localStorage.getItem("username").slice(1, -1),
    };
  }

  render() {
    return (
      <Fragment>
        <Row>
          <Col md="8" className="offset-2" style={{'backgroundColor':'white'}}>
            <Carousel style={carouselStyle}>
              <Carousel.Item style={{'height':'400px'}}>
                <img
                  className="d-block w-100"
                  src={Carousel1}
                  // alt="First slide"
                />
                
              </Carousel.Item>
              <Carousel.Item style={{'height':'400px'}}>
                <img
                  className="d-block w-100"
                  src={Carousel2}
                  // alt="Second slide"
                />
              </Carousel.Item>
              
            </Carousel>
          </Col>  
        </Row>

        <CSSTransitionGroup
          component="div"
          transitionName="TabsAnimation"
          transitionAppear={true}
          transitionAppearTimeout={0}
          transitionEnter={false}
          transitionLeave={false}>
          
          <Row className="" >
            <Col className="border border-primary offset-2 bg-light mb-5 rounded-lg" md="8">
              <Tabs
                defaultActiveKey="1"
                renderTabBar={() => <ScrollableInkTabBar />}
                renderTabContent={() => <TabContent />}
              >
                <TabPane tab="List Dokter" key="1">
                  <ListDokter />
                </TabPane>
                <TabPane tab="Notifikasi Pasien" key="3">
                  <MySchedulePasien username={this.state.username} />
                </TabPane>
                <TabPane tab="Rekam Medik" key="4">
                  <RekamMedik />
                </TabPane>
              </Tabs>
            </Col>
          </Row>
        </CSSTransitionGroup>
      </Fragment>
    );
  }
}
