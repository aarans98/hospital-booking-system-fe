import React, { Fragment } from "react";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import { Row, Col, Card, CardBody, CardFooter, Button } from "reactstrap";
import {ButtonToolbar} from 'react-bootstrap';
import DataTable from "react-data-table-component";
import PageTitle from "../../../../Layout/AppMain/PageTitle";
import axios from "axios";
import TambahDokterModal from "./TambahDokterModal";
import EditModalDokter from "./EditModalDokter";
import JadwalPraktek from './JadwalPraktek';
import Swal from  'sweetalert2';

export default class InformasiDokter extends React.Component {
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
          idDokter:'',
          namaLengkap:'',
          spesialisasi:'',
          tanggalLahir:'',
          username:'',
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
        name: "Update Jadwal",
        sortable: "true",
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
        cell: (dokter) => {
        return(
            <Fragment>
              <button className="btn btn-primary" 
                onClick={() => {this.refresh(dokter.idDokter); this.setState({
                    praktekModalShow:true,
                    sendIdDokter:dokter.idDokter})}}>
                    Perbarui
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
            sendIdDokter: updateDokter.idDokter,
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
        name: "Delete",
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
    axios.get("http://localhost:1212/v1/app/informasiStaf")
        .then(
            response => {
                this.setState({informasiStaf:response.data.data});
            });
        
    this.refreshList();
  }

  refresh = (id) => {
    console.log('id', this.props.id)
      if(id) {
        const url = "http://localhost:1212/v1/app/praktek/dokter/" + id
        console.log(url);
        axios.get(url).then(response => {
            console.log(response)
            this.setState({jadwal:response.data})
      })
    }
  }

  refreshList = () => {
    axios.get("http://localhost:1212/v1/app/dokter")
      .then(response => {
        console.log(response.data.data)
        this.setState({ dokter: response.data.data });

    //     axios.get("http://localhost:1212/v1/app/register"+)
    //         .then((response) => {
    //             this.setState({ dokter: response.data.data});
    //   });
      });
  }

  handleClick = () => {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: 'warning',
      title: 'Data berhasil dihapus!'
    })
  }

  deleteDokter = (idDokter) => {
      axios.delete("http://localhost:1212/v1/app/dokter/"+idDokter)
      .then(response => {
        this.refreshList();
          if(response.data != null) {
              axios.delete("http://localhost:1212/v1/app/register")
              // alert("Data berhasil dihapus!");
              this.handleClick();
              this.setState({
                  dokter: this.state.dokter.filter(dokter=> dokter.idDokter !== idDokter)
              })
          }
      })
  }

  render() {
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
          <JadwalPraktek
            show={this.state.praktekModalShow}
            onHide={praktekModalClose}
            jadwal={this.state.jadwal}
            id={this.state.sendIdDokter}
            />
            
          <Row>
            <Col>
              <Card className="main-card mb-3">
                <CardBody class="card-hover-shadow card-border mb-3 card">
                  <DataTable    
                    title="Informasi Dokter"
                    columns={this.columns}
                    pagination={true}
                    highlightOnHover
                    data={this.state.dokter.map((dokter) => ({
                      idDokter: dokter.idDokter,
                      namaLengkap: dokter.namaLengkap,
                      spesialisasi: dokter.spesialisasi,
                      tanggalLahir: dokter.tanggalLahir,
                      username: dokter.username,  
                    }))}
                  />
                </CardBody>
                <CardFooter>
                <Button className="btn btn-primary" onClick={() => this.setState({addModalShow: true})}>
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
                    refreshList={this.refreshList}
                    />
                <EditModalDokter
                    show={this.state.editModalShow}
                    onHide={editModalClose}
                    refreshList={this.refreshList}
                    idDokter={this.state.sendIdDokter}
                    namaLengkap={this.state.sendNamaLengkap}
                    spesialisasi={this.state.sendSpesialisasi}
                    tanggalLahir={this.state.sendTanggalLahir}
                />
              </Col>
          </Row>
          
        </CSSTransitionGroup>
      </Fragment>
    );
  }
}
