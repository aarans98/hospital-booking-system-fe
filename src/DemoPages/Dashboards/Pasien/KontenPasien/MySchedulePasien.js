import React, { Component, Fragment } from "react";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import classnames from "classnames";
import Tabs from "react-responsive-tabs";
import axios from "axios";
import dummyData from "../../Pasien/KontenPasien/dummyData";
import bg1 from "../../../../assets/utils/images/dropdown-header/abstract1.jpg";
import avatar4 from "../../../../assets/utils/images/avatars/3.jpg";

import {
  ListGroup,
  ListGroupItem,
  Progress,
  Form,
  FormGroup,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Button,
  Container,
} from "reactstrap";

export default class MySchedulePasien extends Component {
  constructor(props) {
    super(props);

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
      .get("http://localhost:1212/v1/app/jadwal/pasien/" + this.props.username)
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
        <Row className='justify-content-center'>
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
                      <h5 className='menu-header-title'>
                        {"dr. " + card.namaDokter}
                      </h5>
                      <h6 className='menu-header-subtitle'>
                        {card.spesialisasi}
                      </h6>
                    </div>
                    <div className='menu-header-btn-pane'>
                      <Button
                        size='sm'
                        className='btn-icon mr-2 btn-icon-only'
                        color='warning'>
                        <i className='pe-7s-config btn-icon-wrapper'> </i>
                      </Button>
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
                          <i className='font-icon-wrapper pe-7s-id icon-gradient bg-arielle-smile'></i>
                        </div>
                      </div>
                      <div className='widget-content-left'>
                        <div className='widget-heading'> Nama Pasien</div>
                        <div className='widget-subheading'>
                          {card.nama_lengkap}
                        </div>
                      </div>
                      <div className='widget-content'>
                        <div className='widget-numbers widget-numbers-sm text-primary'></div>
                      </div>
                    </div>
                  </div>
                </ListGroupItem>
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
        </Row>
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
          <Container fluid>{dokter.map(renderCard)}</Container>
        </CSSTransitionGroup>
      </Fragment>
    );
  }
}
