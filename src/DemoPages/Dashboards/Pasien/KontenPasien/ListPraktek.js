import React, { Fragment } from "react";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import { Row, Col, Card, CardBody, CardFooter } from "reactstrap";
import DataTable from "react-data-table-component";
import PageTitle from "../../../../Layout/AppMain/PageTitle";
import axios from "axios";
import Rodal from "rodal";
import { ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

export default class ListPraktek extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      praktek: [],
      modal: false,
    };
    this.columns = [
      {
        name: "Id",
        selector: "idPraktek",
        sortable: true,
        filterable: true,
      },
      {
        name: "Poli",
        selector: "poli",
        sortable: true,
        filterable: true,
      },
      {
        name: "Jadwal",
        selector: "jadwal",
        sortable: true,
        filterable: true,
      },
      {
        name: "Jam",
        selector: "jam",
        sortable: true,
        filterable: true,
      },
      {
        name: "Id Dokter",
        selector: "idDokter",
        sortable: true,
        filterable: true,
      },
    ];
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
  }

  componentDidMount() {
    this.refreshList();
  }

  componentDidUpdate() {
    this.refreshList();
  }

  refreshList() {
    axios
      .get("http://localhost:1212/v1/app/praktek/dokter/1")
      .then((response) => {
        this.setState({ praktek: response.data.data });
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
    let types = ["door"];
    let buttons = types.map((value, index) => {
      let style = {
        animationDelay: index * 100 + "ms",
        WebkitAnimationDelay: index * 100 + "ms",
      };
      return (
        <Button
          key={index}
          className="mb-2 mr-2"
          color="primary"
          onClick={this.show.bind(this, value)}
          style={style}
        >
          Buat Janji
        </Button>
      );
    });
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
          <div>
            <PageTitle
              heading="Data Tables"
              subheading="List praktek dokter."
              icon="pe-7s-medal icon-gradient bg-tempting-azure"
            />
          </div>
          <Row>
            <Col md="12">
              <Card className="main-card mb-3">
                <CardBody class="card-hover-shadow card-border mb-3 card">
                  <DataTable
                    title="List Praktek"
                    columns={this.columns}
                    pagination={true}
                    highlightOnHover
                    data={this.state.praktek.map((praktek) => ({
                      idPraktek: praktek.idPraktek,
                      poli: praktek.poli,
                      jadwal: praktek.jadwal,
                      jam: praktek.jam,
                      idDokter: praktek.idDokter,
                    }))}
                  />
                </CardBody>
                <CardFooter>
                  {buttons}
                  {/* <button class="mb-2 mr-2 btn btn-alternate">
                    Buat Janji
                  </button> */}
                </CardFooter>
              </Card>
            </Col>
          </Row>
          <Rodal
            visible={this.state.visible}
            onClose={this.hide.bind(this)}
            animation={this.state.animation}
            showMask={false}
          >
            <ModalHeader>Modal title</ModalHeader>
            <ModalBody>{/* Diisi dengan form kunjungan */}</ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.hide.bind(this)}>
                Kirim
              </Button>
            </ModalFooter>
          </Rodal>
        </CSSTransitionGroup>
      </Fragment>
    );
  }
}
