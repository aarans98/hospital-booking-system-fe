import React, { Fragment } from "react";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import {Row,Col} from "react-bootstrap"

import PageTitle from "../../../Layout/AppMain/PageTitle";

import Tabs, { TabPane } from "rc-tabs";
import TabContent from "rc-tabs/lib/SwipeableTabContent";
import ScrollableInkTabBar from "rc-tabs/lib/ScrollableInkTabBar";
import InformasiStaf from './KontenAdmin/InformasiStaf';
import JadwalPraktek from './KontenAdmin/JadwalPraktek';
import InformasiDokter from "./KontenAdmin/InformasiDokter";
import DaftarObat from './KontenAdmin/DaftarObat';
import Coba from'./KontenAdmin/Coba';
// Examples

export default class MainAdmin extends React.Component {
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
          {/* <PageTitle
            heading="Admin"
            subheading="Ini Halaman Admin~"
            icon="pe-7s-stopwatch icon-gradient bg-amy-crisp"
          /> */}
          <Row>
            <Col md="10" className="offset-1">
              <Tabs
                defaultActiveKey="1"
                renderTabBar={() => <ScrollableInkTabBar />}
                renderTabContent={() => <TabContent />}
              >
                <TabPane tab="Tambah Dokter" key="1">
                  <InformasiDokter/>
                </TabPane>
                <TabPane tab="Informasi Staf" key="2">
                  <InformasiStaf/>
                </TabPane>
                <TabPane tab="Daftar Obat" key="3">
                  <DaftarObat/>
                </TabPane>
                <TabPane tab="Coba" key="4">
                  <Coba/>
                </TabPane>
              </Tabs>
            </Col>
          </Row>
        </CSSTransitionGroup>
      </Fragment>
    );
  }
}
