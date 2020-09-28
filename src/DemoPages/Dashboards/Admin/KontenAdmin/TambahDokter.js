import React, { Fragment } from "react";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import { Row, Col, Card, CardBody, CardFooter, Button } from "reactstrap";
import DataTable from "react-data-table-component";
import PageTitle from "../../../../Layout/AppMain/PageTitle";
import axios from "axios";
import TambahDokterModal from "./TambahDokterModal";

export default class TambahDokter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dokter: [],
      modal: false,
      addModalShow: false,
      initialState: {
          idDokter:'',
          namaLengkap:'',
          spesialisasi:'',
          tanggalLahir:'',
          username:''
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
        name: "Update Dokter",
        sortable: "true",
        cell: (tambahDokter) => 
        <Button className="btn btn-primary" raised primary 
        onClick={() => this.setState({
            editModalShow:true,
            sendIdStaf: tambahDokter.idStaf,
            sendNamaLengkap: tambahDokter.namaLengkap,
            sendUserName: tambahDokter.userName,
            sendTanggalLahir: tambahDokter.tanggalLahir,
            sendPosisi: tambahDokter.posisi,
            sendMulaiBekerja:tambahDokter.mulaiBekerja,
            sendGaji: tambahDokter.gaji
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
        this.setState({ dokter: response.data.data });
      });
  }

  deleteInformasiStaf = (idDokter) => {
      axios.delete("http//localhost:1212/v1/app/dokter/"+idDokter)
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
    let addModalClose = () => this.setState({addModalShow:false});
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
          
        </CSSTransitionGroup>
      </Fragment>
    );
  }
}
