import React, { Fragment } from "react";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import { Row, Col, Card, CardBody, CardFooter } from "reactstrap";
import DataTable from "react-data-table-component";
import PageTitle from "../../../../Layout/AppMain/PageTitle";
import axios from "axios";
import Rodal from "rodal";
import { ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
// import TambahDokterModal from "./TambahDokterModal";

export default class TambahDokter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dokter: [],
      modal: false,
    };

    this.columns = [
      {
        name: "Id",
        selector: "idDokter",
        sortable: true,
        filterable: true,
      },
      {
        name: "Nama",
        selector: "namaLengkap",
        sortable: true,
        filterable: true,
      },
      {
        name: "Spesialisasi",
        selector: "spesialisasi",
        sortable: true,
        filterable: true,
      },
      {
        name: "Tanggal Lahir",
        selector: "tanggalLahir",
        sortable: true,
        filterable: true,
      },
      {
        name: "Username",
        selector: "username",
        sortable: true,
        filterable: true,
      },
      {
        name: "Action",
        sortable: "true",
        cell: () =>
        <div>
            <Button mb="2"raised primary onClick={this.handleAction}>Update</Button>
            
            <Button raised primary onClick={this.handleAction}>Delete</Button>
        </div>,
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
      },
    ];
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
  }

  tambahDokter = (event) => {
      event.preventDefault();

      const register = {
        user_role: this.state.user_role,
        username: this.state.username,
        password: this.state.password,
        passwordrep: this.state.passwordrep,
        email: this.state.email,
      }

      axios
        .post("http://localhost:1212/v1/app/register", register)
        .then((response) => {
            if (response.data != null) {
                this.setState(this.initialState);
                this.setState({show:true});
            }
        })
  };

  componentDidMount() {
    this.refreshList();
  }

  componentDidUpdate() {
    this.refreshList();
  }

  refreshList() {
    axios
      .get("http://localhost:1212/v1/app/dokter")
      .then((response) => {
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
              subheading="Halaman Tambah Dokter."
              icon="pe-7s-medal icon-gradient bg-tempting-azure"
            />
          </div>
          <Row>
              <Col md="12">
                <Button float-right onClick={this.state.modal=true}>Tambah Dokter</Button>
              </Col>
          </Row>
          <Row>
            <Col md="12">
              <Card className="main-card mb-3">
                <CardBody class="card-hover-shadow card-border mb-3 card">
                  <DataTable    
                    title="List Dokter"
                    columns={this.columns}
                    pagination={true}
                    highlightOnHover
                    data={this.state.dokter.map((dokter) => ({
                      idDokter: dokter.idDokter,
                      namaLengkap: dokter.namaLengkap,
                      spesialisasi: dokter.spesialisasi,
                      tanggalLahir: dokter.tanggalLahir,
                      username: dokter.username,
                    //   action:   
                    }))}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
          
          <TambahDokterModal/>
          
        </CSSTransitionGroup>
      </Fragment>
    );
  }
}
