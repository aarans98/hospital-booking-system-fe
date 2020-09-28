import React, { Fragment } from "react";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "reactstrap";
import DataTable from "react-data-table-component";
import PageTitle from "../../../../Layout/AppMain/PageTitle";
import axios from "axios";
import Rodal from "rodal";
import { ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Button, ButtonToolbar} from "react-bootstrap";
import {Praktek} from './Praktek';

export default class ListPraktek extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dokter: [],
      addModalShow: false,
      modal: false,
      sendIdDokter:'',
    };
    // this.columns = [
    //   {
    //     name: "Id",
    //     selector: "idDokter",
    //     sortable: true,
    //     filterable: true,
    //   },
    //   {
    //     name: "Nama",
    //     selector: "namaLengkap",
    //     sortable: true,
    //     filterable: true,
    //   },
    //   {
    //     name: "Spesialisasi",
    //     selector: "jadwal",
    //     sortable: true,
    //     filterable: true,
    //   },
    // ];
    this.componentDidMount = this.componentDidMount.bind(this);
    // this.componentDidUpdate = this.componentDidUpdate.bind(this);
  }

  componentDidMount() {
    this.refreshList();
  }

  // componentDidUpdate() {
  //   this.refreshList();
  // }

  refreshList() {
    axios.get("http://localhost:1212/v1/app/dokter").then((response) => {
      this.setState({ dokter: response.data.data });
    });
  }

  show(animation) {
    this.setState({
      animation,
      visible: true,
    });
  }

  hide() {
    this.setState({ visible: false });
  }

  render() {
    const dokter = this.state.dokter;
    let addModalClose = () => this.setState({addModalShow:false});
    const renderCard = (card, index) => {
      const sendIdDokter = card.idDokter;
      return (
        <Card className='main-card mb-3'>
          <Row>
            <Col md='3'>
              <img
                src='img/doctor-default-image.jpg'
                className='card-img'
                alt='...'
              />
            </Col>

            <Col md='9'>
              <CardBody className='mb-0'>
                <h5 className='card-title'>{card.namaLengkap}</h5>
                <p>{card.spesialisasi}</p>
                <Button className='btn btn-primary float-right' onClick={() => this.setState({addModalShow: true})}>Pilih</Button>
                <Praktek 
                show={this.state.addModalShow}
                onHide={addModalClose}/>
              </CardBody>
            </Col>
          </Row>
        </Card>
      );
    };

    let types = ["door"];
    let buttons = types.map((value, index) => {
      let style = {
        animationDelay: index * 100 + "ms",
        WebkitAnimationDelay: index * 100 + "ms",
      };
      return (
        <Button
          key={index}
          className='mb-2 mr-2'
          color='primary'
          onClick={this.show.bind(this, value)}
          style={style}>
          Buat Janji
        </Button>
      );
    });

    return (
      <Fragment>
        <CSSTransitionGroup
          component='div'
          transitionName='TabsAnimation'
          transitionAppear={true}
          transitionAppearTimeout={0}
          transitionEnter={false}
          transitionLeave={false}>
          <Container>
            <Row>
              <Col md='12'>
                <div>
                  <PageTitle
                    heading='Data Tables'
                    subheading='List Dokter.'
                    icon='pe-7s-medal icon-gradient bg-tempting-azure'
                  />
                </div>
              </Col>
            </Row>

            <Row>
              <Col md='12'>
                {dokter.map(renderCard)}
                {/* <Card className="main-card mb-3">
                            <CardBody class="card-hover-shadow card-border mb-3 card">
                                <DataTable
                                    title="List Dokter"
                                    columns={this.columns}
                                    pagination={true}
                                    highlightOnHover
                                    data={this.state.dokter.map((dokter) => ({
                                    idDokter: dokter.idDokter,
                                    namaLengkap: dokter.namaLengkap,
                                    jadwal: dokter.spesialisasi,
                                    }))}
                                />
                            </CardBody>
                            <CardFooter>
                                {buttons}
                                <button class="mb-2 mr-2 btn btn-alternate">
                                    Buat Janji
                                </button>
                            </CardFooter>
                        </Card> */}
              </Col>
            </Row>

            <Rodal
              visible={this.state.visible}
              onClose={this.hide.bind(this)}
              animation={this.state.animation}
              showMask={false}>
              <ModalHeader>Modal title</ModalHeader>
              <ModalBody>{/* Diisi dengan form kunjungan */}</ModalBody>
              <ModalFooter>
                <Button color='primary' onClick={this.hide.bind(this)}>
                  Kirim
                </Button>
              </ModalFooter>
            </Rodal>
          </Container>
        </CSSTransitionGroup>
      </Fragment>
    );
  }
}
