import React, { Fragment } from "react";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import { Row, Col, Card, CardBody, CardFooter } from "reactstrap";
import DataTable from "react-data-table-component";
import PageTitle from "../../../../Layout/AppMain/PageTitle";
import axios from "axios";

export default class DataTableBasic extends React.Component {
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
          <div>
            <PageTitle
              heading='Data Tables'
              subheading='Choose between regular React Bootstrap tables or advanced dynamic ones.'
              icon='pe-7s-medal icon-gradient bg-tempting-azure'
            />
          </div>
          <Row>
            <Col md='12'>
              <Card className='main-card mb-3'>
                <CardBody class='card-hover-shadow card-border mb-3 card'>
                  <DataTable
                    title='List Praktek'
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
                  <button class='mb-2 mr-2 btn btn-alternate'>
                    Buat Janji
                  </button>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </CSSTransitionGroup>
      </Fragment>
    );
  }
}
