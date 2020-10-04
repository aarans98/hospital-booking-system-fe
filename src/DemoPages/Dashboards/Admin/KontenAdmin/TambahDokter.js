import React, { Fragment } from "react";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import { Row, Col, Card, CardBody, CardFooter, Button } from "reactstrap";
import { ButtonToolbar } from 'react-bootstrap';
import DataTable from "react-data-table-component";
import PageTitle from "../../../../Layout/AppMain/PageTitle";
import axios from "axios";
import CountUp from 'react-countup';
import TambahDokterModal from "./TambahDokterModal";
import EditModalDokter from "./EditModalDokter";
import JadwalPraktek from './JadwalPraktek';

export default class TambahDokter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dokter: [],
      jadwal: [],
      modal: false,
      addModalShow: false,
      editModalShow: false,
      praktekModalShow: false,
      initialState: {
        idDokter: '',
        namaLengkap: '',
        spesialisasi: '',
        tanggalLahir: '',
        username: '',
        //   email:'',
        //   password:'',
        //   passwordrep:'',
        //   user_role:'dokter'
      }
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
        name: "Perbarui Jadwal",
        sortable: "true",
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
        cell: (dokter) => {
          return (
            <Fragment>
              <button className="btn btn-primary"
                onClick={() => {
                  this.refresh(dokter.idDokter); this.setState({
                    praktekModalShow: true,
                    sendIdDokter: dokter.idDokter
                  })
                }}>
                Perbarui
                </button>
            </Fragment>
          );
        }
      },
      {
        name: "Perbarui Dokter",
        sortable: "true",
        cell: (updateDokter) =>
          <Button className="btn btn-primary" raised primary
            onClick={() => this.setState({
              editModalShow: true,
              sendId: updateDokter.idDokter,
              sendNamaLengkap: updateDokter.namaLengkap,
              sendSpesialisasi: updateDokter.spesialisasi,
              sendTanggalLahir: updateDokter.tanggalLahir,
              // sendUsername: updateDokter.username,
              // sendEmail: updateDokter.email,
              // sendPassword: updateDokter.password,
              // sendPasswordrep: updateDokter.passwordrep
            })}>
            Perbarui
        </Button>,
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
      },
      {
        name: "Hapus",
        sortable: "true",
        cell: (tambahDokter) =>
          <Button className="btn btn-danger" raised primary
            onClick={() => this.deleteDokter(tambahDokter.idDokter)}>
            Hapus
        </Button>,
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
      },

    ];
    this.componentDidMount = this.componentDidMount.bind(this);
    // this.componentDidUpdate = this.componentDidUpdate.bind(this);
  }

  componentDidMount() {
    this.refreshList();
    this.refreshListStaf();
    this.refreshListDokter();
  }

  refreshListStaf = () => {
    axios
      .get("http://localhost:1212/v1/app/informasiStaf/jumlahstaf")
      .then((response) => {
        this.setState({ jumlah: response.data.jumlah });
    });
  }

  refreshListDokter= () => {
    axios
      .get("http://localhost:1212/v1/app/informasiStaf/jumlahdokter")
      .then((response) => {
        this.setState({ jumlahDokter: response.data.jumlah });
      });
  }

  refresh = (id) => {
    console.log('id', this.props.id)
    if (id) {
      const url = "http://localhost:1212/v1/app/praktek/dokter/" + id
      console.log(url);
      axios.get(url).then(response => {
        console.log(response)
        this.setState({ jadwal: response.data })
      })
    }
  }

  refreshList() {
    axios
      .get("http://localhost:1212/v1/app/dokter")
      .then((response) => {
        this.setState({ dokter: response.data.data });

        //     axios.get("http://localhost:1212/v1/app/register"+)
        //         .then((response) => {
        //             this.setState({ dokter: response.data.data});
        //   });
      });
  }

  deleteDokter = (idDokter) => {
    axios.delete("http://localhost:1212/v1/app/dokter/" + idDokter)
      .then(response => {
        if (response.data != null) {
          alert("Data berhasil dihapus!");
          this.setState({
            dokter: this.state.dokter.filter(dokter => dokter.idDokter !== idDokter)
          })
        }
      })
  }

  render() {
    let addModalClose = () => this.setState({ addModalShow: false });
    let praktekModalClose = () => this.setState({ praktekModalShow: false });
    let editModalClose = () => this.setState({ editModalShow: false });
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
          </div>
          <Row>
            <Col md="6">
              <div className="card mb-3 widget-chart">
                <div className="icon-wrapper rounded-circle">
                  <div className="icon-wrapper-bg bg-primary" />
                  <i className="lnr-user text-primary" />
                </div>
                <div className="widget-numbers">
                  <CountUp start={0}
                    end={this.state.jumlahDokter ? this.state.jumlahDokter : 0}
                    separator=""
                    decimals={0}
                    decimal=","
                    prefix=""
                    suffix=" dokter"
                    useEasing={false}
                    duration="2" />
                </div>
                <div className="widget-subheading">
                  Jumlah Dokter
                </div>
              </div>
            </Col>
            <Col sm="6">
              <div className="card mb-3 widget-chart">
                <div className="icon-wrapper rounded-circle">
                  <div className="icon-wrapper-bg bg-primary" />
                  <i className="lnr-user text-warning" />
                </div>
                <div className="widget-numbers">
                  <CountUp start={0}
                    end={this.state.jumlah ? this.state.jumlah : 0}
                    separator=","
                    decimals={0}
                    decimal=","
                    prefix=""
                    useEasing={false}
                    suffix=" orang"
                    duration="2" />
                </div>
                <div className="widget-subheading">
                  Jumlah Staf
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              {/* <Button className="btn btn-primary" onClick={() => this.setState({addModalShow: true})}>
                    Tambah Dokter
                </Button> */}
              <TambahDokterModal
                show={this.state.addModalShow}
                onHide={addModalClose}
              />
              <ButtonToolbar>
                <JadwalPraktek
                  show={this.state.praktekModalShow}
                  onHide={praktekModalClose}
                  jadwal={this.state.jadwal}
                  id={this.state.sendIdDokter}
                />
              </ButtonToolbar>
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
                      //   email: dokter.email,
                      //   password: dokter.password,
                      //   passwordrep: dokter.passwordrep
                      //   action:   
                    }))}
                  />
                  {/* <JadwalPraktek
                  show={this.state.praktekModalShow}
                  onHide={praktekModalClose}
                  idDokter={this.state.sendIdDokter}
                  /> */}
                </CardBody>
                <CardFooter>
                  <Button className="btn btn-primary" onClick={() => this.setState({ addModalShow: true })}>
                    Tambah Dokter
                </Button>
                </CardFooter>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              {/* <Button className="btn btn-primary" onClick={() => this.setState({addModalShow: true})}>
                    Tambah Dokter
                </Button> */}
              <TambahDokterModal
                show={this.state.addModalShow}
                onHide={addModalClose}
                refreshListDokter={this.refreshListDokter}
                refreshListStaf={this.refreshListStaf}
                />
              <EditModalDokter
                show={this.state.editModalShow}
                onHide={editModalClose}
                refreshListDokter={this.refreshListDokter}
                refreshListStaf={this.refreshListStaf}
                idDokter={this.state.sendIdDokter}
                namaLengkap={this.state.sendNamaLengkap}
                spesialisasi={this.state.sendSpesialisasi}
                tanggalLahir={this.state.sendTanggalLahir}
              // username={this.state.sendUsername}
              // email={this.state.sendEmail}
              // password={this.state.sendPassword}
              // passwordrep={this.state.sendPasswordrep}
              />
            </Col>
          </Row>

        </CSSTransitionGroup>
      </Fragment>
    );
  }
}
