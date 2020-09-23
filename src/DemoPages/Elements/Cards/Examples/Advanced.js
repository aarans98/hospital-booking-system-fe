import React, { Component, Fragment } from "react";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import classnames from "classnames";
import Tabs from "react-responsive-tabs";

import dummyData from "./dummyData";

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

class CardsAdvanced extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
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

  render() {
    return (
      <Fragment>
        {/* <CSSTransitionGroup
          component='div'
          transitionName='TabsAnimation'
          transitionAppear={true}
          transitionAppearTimeout={0}
          transitionEnter={false}
          transitionLeave={false}> */}
        <Container fluid>
          <Row>
            <Col md='6'></Col>
          </Row>
          <Row>
            <Col md='6'>
              <Card className='main-card mb-3'>
                <CardHeader>
                  <i className='header-icon lnr-graduation-hat icon-gradient bg-happy-itmeo'>
                    {" "}
                  </i>
                  Header Menu
                  <div className='btn-actions-pane-right actions-icon-btn'>
                    <Button className='btn-icon btn-icon-only' color='link'>
                      <i className='pe-7s-leaf btn-icon-wrapper' />
                    </Button>
                    <Button className='btn-icon btn-icon-only' color='link'>
                      <i className='pe-7s-cloud-download btn-icon-wrapper' />
                    </Button>
                    <UncontrolledButtonDropdown>
                      <DropdownToggle
                        className='btn-icon btn-icon-only'
                        color='link'>
                        <i className='pe-7s-menu btn-icon-wrapper' />
                      </DropdownToggle>
                      <DropdownMenu className='dropdown-menu-shadow dropdown-menu-hover-link'>
                        <DropdownItem header>Header</DropdownItem>
                        <DropdownItem>
                          <i className='dropdown-icon lnr-inbox'> </i>
                          <span>Menus</span>
                        </DropdownItem>
                        <DropdownItem>
                          <i className='dropdown-icon lnr-file-empty'> </i>
                          <span>Settings</span>
                        </DropdownItem>
                        <DropdownItem>
                          <i className='dropdown-icon lnr-book'> </i>
                          <span>Actions</span>
                        </DropdownItem>
                        <DropdownItem divider />
                        <div className='p-3 text-right'>
                          <Button
                            className='mr-2 btn-shadow btn-sm'
                            color='link'>
                            View Details
                          </Button>
                          <Button
                            className='mr-2 btn-shadow btn-sm'
                            color='primary'>
                            Action
                          </Button>
                        </div>
                      </DropdownMenu>
                    </UncontrolledButtonDropdown>
                  </div>
                </CardHeader>
                <CardBody>
                  <p>
                    With supporting text below as a natural lead-in to
                    additional content.
                  </p>
                  <p className='mb-0'>
                    Lorem Ipsum has been the industry's standard dummy text ever
                    since the 1500s, when an unknown printer took a galley of
                    type and scrambled.
                  </p>
                </CardBody>
                <CardFooter className='d-block text-right'>
                  <Button size='sm' className='mr-2' color='link'>
                    Cancel
                  </Button>
                  <Button size='lg' color='success'>
                    Save
                  </Button>
                </CardFooter>
              </Card>
            </Col>
            <Col md='6'>
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
                    Lorem Ipsum has been the industry's standard dummy text ever
                    since the 1500s, when an unknown printer took a galley of
                    type and scrambled.
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
            </Col>
          </Row>
        </Container>
        {/* </CSSTransitionGroup> */}
      </Fragment>
    );
  }
}

export default CardsAdvanced;
