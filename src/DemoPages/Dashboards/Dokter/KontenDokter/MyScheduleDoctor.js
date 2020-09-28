import React, { Component, Fragment } from "react";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import classnames from "classnames";
import Tabs from "react-responsive-tabs";
import axios from "axios";
import dummyData from "../../Pasien/KontenPasien/dummyData";
import bg1 from "../../../../assets/utils/images/dropdown-header/abstract1.jpg";
import avatar4 from "../../../../assets/utils/images/avatars/3.jpg";
import FormRekamMedik from "./FormRekamMedik";

import {
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Card,
  Button,
  Container,
} from "reactstrap";

export default class MyScheduleDoctor extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.username);

    this.toggle = this.toggle.bind(this);

    this.state = {
      persons: [],
      activeTab: "1",
      showMore: true,
      transform: true,
      showInkBar: true,
      items: this.getSimpleTabs(),
      selectedTabKey: 0,
      transformWidth: 400,
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  getSimpleTabs = () =>
    dummyData.map(({ name, biography }, index) => ({
      key: index,
      title: name,
      getContent: () => biography,
    }));

  getAllDokter = () => {
    axios
      .get("http://localhost:1212/v1/app/jadwal/dokter/" + this.props.username)
      .then((response) => response.data)
      .then((data) => {
        this.setState({ persons: data });
      });
  };
  componentDidMount() {
    this.getAllDokter();
    // console.log(this.props.location.customName.username);
  }

  render() {
    console.log(this.state.persons);
    const dokter = this.state.persons;

    const renderCard = (card, index) => {
      return (
        <Col md='12' lg='6' xl='4'>
          <Card className='card-shadow-primary profile-responsive card-border mb-3'>
            <div className='dropdown-menu-header'>
              <div className='dropdown-menu-header-inner bg-success'>
                <div
                  className='menu-header-image'
                  style={{
                    backgroundImage: "url(" + bg1 + ")",
                  }}
                />
                <div className='menu-header-content btn-pane-right'>
                  <div className='avatar-icon-wrapper mr-2 avatar-icon-xl'>
                    <div className='avatar-icon'>
                      <img src={avatar4} alt='Avatar 5' />
                    </div>
                  </div>
                  <div>
                    <h5 className='menu-header-title'>{card.nama_lengkap}</h5>
                    <h6 className='menu-header-subtitle'>
                      ID: {card.idPasien}
                    </h6>
                  </div>
                  <div className='menu-header-btn-pane'>
                    <FormRekamMedik id={card.idJadwalDokter} />
                    <Button size='sm' className='btn-icon' color='primary'>
                      View Profile
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <ListGroup flush>
              <ListGroupItem>
                <div className='widget-content p-0'>
                  <div className='widget-content-wrapper'>
                    <div className='widget-content-left mr-3'>
                      <div className='icon-wrapper m-0'>
                        <i className='font-icon-wrapper lnr-calendar-full icon-gradient bg-arielle-smile '></i>
                      </div>
                    </div>
                    <div className='widget-content-left'>
                      <div className='widget-heading'>Tanggal Kunjungan</div>
                      <div className='widget-subheading'>
                        {card.tanggalKunjungan}
                      </div>
                    </div>
                    <div className='widget-content-right'>
                      <div className='widget-numbers widget-numbers-sm text-warning'></div>
                    </div>
                  </div>
                </div>
              </ListGroupItem>
              <ListGroupItem>
                <div className='widget-content p-0'>
                  <div className='widget-content-wrapper'>
                    <div className='widget-content-left mr-3'>
                      <div className='icon-wrapper m-0'>
                        <i className='font-icon-wrapper lnr-clock icon-gradient bg-arielle-smile'></i>
                      </div>
                    </div>
                    <div className='widget-content-left'>
                      <div className='widget-heading'>Jam Kunjungan</div>
                      <div className='widget-subheading'>{card.jam}</div>
                    </div>
                    <div className='widget-content-right'>
                      <div className='widget-numbers widget-numbers-sm text-danger'></div>
                    </div>
                  </div>
                </div>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      );
    };
    return (
      <Fragment>
        <CSSTransitionGroup
          component='div'
          transitionName='TabsAnimation'
          transitionAppear={true}
          transitionAppearTimeout={0}
          transitionEnter={false}
          transitionLeave={false}>
          <Container fluid>
            <Row className='justify-content-center'>
              {dokter.map(renderCard)}
            </Row>
          </Container>
        </CSSTransitionGroup>
      </Fragment>
    );
  }
}
