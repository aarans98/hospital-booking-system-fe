import React, { Component, Fragment } from "react";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import classnames from "classnames";
import Tabs from "react-responsive-tabs";
import axios from "axios";
import dummyData from "../../Pasien/KontenPasien/dummyData";

import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Button,
  ButtonGroup,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
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

  componentDidMount() {
    this.getAllDokter();
  }

  getAllDokter = () => {
    axios
      .get("http://localhost:1212/v1/app/dokter")
      .then((response) => response.data)
      .then((data) => {
        this.setState({ persons: data.data });
      });
  };

  render() {
    console.log(this.state.persons);
    const dokter = this.state.persons;

    const renderCard = (card, index) => {
      return (
        <Col md="6">
          <Card className="main-card mb-3">
            <CardHeader>
              <i className="header-icon lnr-user icon-gradient bg-arielle-smile">
                {" "}
              </i>
              {"dr. " + card.namaLengkap}
            </CardHeader>
            <CardBody className="mb-0">
              <p>Spesialisasi:</p>
              <p className="mb-0">Jadwal:</p>
              <p className="mb-0">Jam:</p>
            </CardBody>
            <CardFooter className="d-block text-right">
              <Button size="lg" className="mr-2" color="primary">
                Rincian
              </Button>
              <Button size="lg" color="success">
                Selesai
              </Button>
            </CardFooter>
          </Card>
        </Col>
      );
    };
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
          <Container fluid>
            <Row className="justify-content-center">
              {dokter.map(renderCard)}

              {/* <Col md='6'>
                <Card className='main-card mb-3'>
                  <CardHeader>
                    <i className='header-icon lnr-graduation-hat icon-gradient bg-happy-itmeo'>
                      {" "}
                    </i>
                    Header Menu
                    <div className='btn-actions-pane-right actions-icon-btn'>
                      <ButtonGroup size='sm'>
                        <UncontrolledButtonDropdown>
                          <DropdownToggle
                            caret
                            color='warning'
                            className='btn-pill pl-3'>
                            Left
                          </DropdownToggle>
                          <DropdownMenu className='dropdown-menu-rounded'>
                            <DropdownItem header>Header</DropdownItem>
                            <DropdownItem>Menus</DropdownItem>
                            <DropdownItem>Settings</DropdownItem>
                            <DropdownItem>Actions</DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem>Dividers</DropdownItem>
                          </DropdownMenu>
                        </UncontrolledButtonDropdown>
                        <Button color='warning'>Middle</Button>
                        <Button color='warning' className='btn-pill pr-3'>
                          Right
                        </Button>
                      </ButtonGroup>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <p>
                      With supporting text below as a natural lead-in to
                      additional content.
                    </p>
                    <p className='mb-0'>
                      Lorem Ipsum has been the industry's standard dummy text
                      ever since the 1500s, when an unknown printer took a
                      galley of type and scrambled.
                    </p>
                  </CardBody>
                  <CardFooter className='d-block text-right'>
                    <Button size='sm' className='mr-2' color='link'>
                      Cancel
                    </Button>
                    <Button className='btn-wide btn-shadow' color='primary'>
                      Submit
                    </Button>
                  </CardFooter>
                </Card>
              </Col> */}
            </Row>
          </Container>
        </CSSTransitionGroup>
      </Fragment>
    );
  }
}
