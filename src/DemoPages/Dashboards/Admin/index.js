import React, { Fragment } from "react";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import {Row, Col} from 'reactstrap';

import PageTitle from "../../../Layout/AppMain/PageTitle";

import Tabs, { TabPane } from "rc-tabs";
import TabContent from "rc-tabs/lib/SwipeableTabContent";
import ScrollableInkTabBar from "rc-tabs/lib/ScrollableInkTabBar";
import InformasiStaf from './KontenAdmin/InformasiStaf'
import JadwalPraktek from './KontenAdmin/JadwalPraktek'
import TambahDokter from "./KontenAdmin/TambahDokter";
// Examples

export default class MainAdmin extends React.Component {
  render() {
    return (
      <Row>
        <Col>
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
              <Tabs
                defaultActiveKey="1"
                renderTabBar={() => <ScrollableInkTabBar />}
                renderTabContent={() => <TabContent />}
              >
                <TabPane tab="Tambah Dokter" key="1">
                  <TambahDokter/>
                </TabPane>
                <TabPane tab="Informasi Staf" key="3">
                  <InformasiStaf/>
                </TabPane>
              </Tabs>
            </CSSTransitionGroup>
          </Fragment>
        </Col>
      </Row>
    );
  }
}
