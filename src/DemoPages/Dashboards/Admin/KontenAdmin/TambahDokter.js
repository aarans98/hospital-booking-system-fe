import React, { Fragment } from "react";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import { Row, Col, Card, CardBody, CardFooter, Button } from "reactstrap";
import {ButtonToolbar} from 'react-bootstrap';
import DataTable from "react-data-table-component";
import PageTitle from "../../../../Layout/AppMain/PageTitle";
import axios from "axios";
import TambahDokterModal from "./TambahDokterModal";
import JadwalPraktek from './JadwalPraktek';

export default class TambahDokter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dokter: [],
      modal: false,
      addModalShow: false,
      praktekModalShow: false,
      initialState: {
          idDokter:'',
          namaLengkap:'',
          spesialisasi:'',
          tanggalLahir:'',
          username:''
      },
      sendIdDokter:''
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
        name: "Update Jadwal",
        sortable: "true",
        button: true,
        cell: (dokter) => {
        return(
            <Fragment>
              <button className="btn btn-primary" 
                onClick={() => this.setState({
                    praktekModalShow:true,
                    sendIdDokter: dokter.idDokter})}>
                    Update
                </button>
            </Fragment>
          );
        }
      },
      {
        name: "Update Dokter",
        sortable: "true",
        cell: (updateDokter) => 
        <Button className="btn btn-primary" raised primary 
        onClick={() => this.setState({
            editModalShow:true,
            sendIdPraktek: updateDokter.idPraktek,
            sendidDokter: updateDokter.idDokter,
            sendJadwal: updateDokter.jadwal,
            sendJam: updateDokter.jam,
            sendPoli: updateDokter.poli
        })}>
            Update
        </Button>,
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
      },
      {
        name: "Delete",
        sortable: "true",
        cell: (tambahDokter) => 
        <Button className="btn btn-danger" raised primary 
        onClick={() => this.deleteDokter(tambahDokter.idDokter)}>
            Delete
        </Button>,
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
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
      .get("http://localhost:1212/v1/app/dokter")
      .then((response) => {
        this.setState({ dokter: response.data.data});
      });
  }

  deleteDokter = (idDokter) => {
      axios.delete("http://localhost:1212/v1/app/dokter/"+idDokter)
      .then(response => {
          if(response.data != null) {
              alert("Data berhasil dihapus!");
              this.setState({
                  dokter: this.state.dokter.filter(dokter=> dokter.idDokter !== idDokter)
              })
          }
      })
  }

  render() {
    console.log(this.state.sendIdDokter);
    let addModalClose = () => this.setState({addModalShow:false});
    let praktekModalClose = () => this.setState({praktekModalShow:false});
    let editModalClose = () => this.setState({editModalShow:false});
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
                <Button className="btn btn-primary" onClick={() => this.setState({addModalShow: true})}>
                    Tambah Dokter
                </Button>
                <TambahDokterModal
                    show={this.state.addModalShow}
                    onHide={addModalClose}
                    />
                <ButtonToolbar>
                  <JadwalPraktek
                    show={this.state.praktekModalShow}
                    onHide={praktekModalClose}
                    sendIdDokter={this.state.sendIdDokter}
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
                    //   action:   
                    }))}
                  />
                  {/* <JadwalPraktek
                  show={this.state.praktekModalShow}
                  onHide={praktekModalClose}
                  idDokter={this.state.sendIdDokter}
                  /> */}
                </CardBody>
              </Card>
            </Col>
          </Row>
          
        </CSSTransitionGroup>
      </Fragment>
    );
  }
}
