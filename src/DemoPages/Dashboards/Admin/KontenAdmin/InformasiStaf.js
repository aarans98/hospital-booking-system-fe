import React, {Fragment} from 'react'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import {Row, Col} from 'reactstrap';
import {Card, Button, ButtonToolbar} from 'react-bootstrap';
import {AddModalInformasiStaf} from './AddModalInformasiStaf';
import {EditModalInformasiStaf} from './EditModalInformasiStaf';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import PageTitle from '../../../../Layout/AppMain/PageTitle';
import CountUp from 'react-countup';
import axios from 'axios';
import Swal from 'sweetalert2';

export default class InformasiStaf extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            informasiStaf:[],
            jumlah:0,
            jumlahDokter:0,
            addModalShow : false,
            editModalShow :  false,
            modal: false,
            initialState : {
                idStaf:'', namaLengkap:'', userName:'', tanggalLahir:'', posisi:'',
                mulaiBekerja:'', gaji:''
            },
        };
        this.columns = [
            {
                name:'Id',
                selector:'idStaf',
                sortable: true,
                filterable: true,
            },
            {
                name:'Nama',
                selector:'namaLengkap',
                sortable: true,
                filterable: true,
            },
            {
                name:'Tanggal Lahir',
                selector:'tanggalLahir',
                sortable: true,
                filterable: true,
            },
            {
                name:'Posisi',
                selector:'posisi',
                sortable: true,
                filterable: true,
            },
            {
                name:'Mulai Bekerja',
                selector:'mulaiBekerja',
                sortable: true,
                filterable: true,
            },
            {
                name:'Gaji',
                selector:'gaji',
                sortable: true,
                filterable: true,
            },
            {
                name: 'Perbarui',
                button: true,
                cell: (informasiStaf) => {
                return (
                <Fragment>
                    <button size='sm' className="btn btn-primary"
                    onClick={() => this.setState({editModalShow: true,
                    sendIdStaf: informasiStaf.idStaf,
                    sendNamaLengkap: informasiStaf.namaLengkap,
                    sendTanggalLahir: informasiStaf.tanggalLahir,
                    sendPosisi: informasiStaf.posisi,
                    sendMulaiBekerja:informasiStaf.mulaiBekerja,
                    sendGaji: informasiStaf.gaji})}>Perbarui</button>
                </Fragment>
                );
                }  
            },
            {
                name: 'Hapus',
                button: true,
                cell: (informasiStaf) => {
                return(
                <Fragment>
                    <button size='sm' className="btn btn-warning"
                    onClick={() => this.deleteInformasiStaf(informasiStaf.idStaf)}>Hapus</button>
                </Fragment>
                );
                }
            }
        ];
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
        axios.get("http://localhost:1212/v1/app/informasiStaf")
        .then(
            response => {
                this.setState({informasiStaf:response.data.data});
            });
        
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

    refreshList = () => {
        axios.get("http://localhost:1212/v1/app/informasiStaf")
        .then(
            response => {
                this.setState({informasiStaf:response.data.data});
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

    deleteInformasiStaf = (idStaf) => {
        axios.delete("http://localhost:1212/v1/app/informasiStaf/"+idStaf)
        .then(response => {
            this.refreshList();
            this.refreshListStaf();
            if(response.data != null) {
                this.handleClick();
                this.setState({
                    informasiStaf: this.state.informasiStaf.filter(informasiStaf=> informasiStaf.idStaf !== idStaf)
                })
            }
        });
    }

    render() {
        let addModalClose = () => this.setState({addModalShow:false});
        let editModalClose = () => this.setState({editModalShow:false});
        const tableData = {
            columns:this.columns,
            data:this.state.informasiStaf.map((informasiStaf) => (
                {idStaf:informasiStaf.idStaf,
                namaLengkap:informasiStaf.namaLengkap,
                tanggalLahir:informasiStaf.tanggalLahir,
                posisi: informasiStaf.posisi,
                mulaiBekerja: informasiStaf.mulaiBekerja,
                gaji: informasiStaf.gaji}
            ))
        };
        return (
            <Fragment>
                <CSSTransitionGroup
                    component="div"
                    transitionName="TabsAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={0}
                    transitionEnter={false}
                    transitionLeave={false}>
                    <Row>
                        <Col md="6">
                            <div className="card mb-3 widget-chart">
                                <div className="icon-wrapper rounded-circle">
                                    <div className="icon-wrapper-bg bg-primary"/>
                                    <i className="lnr-user text-primary"/>
                                </div>
                                <div className="widget-numbers">
                                    <CountUp start={0}
                                             end={this.state.jumlahDokter?this.state.jumlahDokter:0} 
                                             separator=""
                                             decimals={0}
                                             decimal=","
                                             prefix=""
                                             suffix=" dokter"
                                             useEasing={false}
                                             duration="2"/>
                                </div>
                                <div className="widget-subheading">
                                    Jumlah Dokter
                                </div>
                            </div>
                        </Col>
                        <Col sm="6">
                            <div className="card mb-3 widget-chart">
                                <div className="icon-wrapper rounded-circle">
                                    <div className="icon-wrapper-bg bg-primary"/>
                                    <i className="lnr-user text-warning"/>
                                </div>
                                <div className="widget-numbers">
                                    <CountUp start={0}
                                             end={this.state.jumlah?this.state.jumlah:0}
                                             separator=","
                                             decimals={0}
                                             decimal=","
                                             prefix=""
                                             useEasing={false}
                                             suffix=" orang"
                                             duration="2"/>
                                </div>
                                <div className="widget-subheading">
                                    Jumlah Staf
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="12">
                            <Card className="main-card mb-3">
                                <Card.Header>
                                </Card.Header>
                                <Card.Body class="card-hover-shadow card-border mb-3 card">
                                    <DataTableExtensions {...tableData}>
                                    <DataTable
                                        noHeader
                                        title="Informasi Staf"
                                        pagination={true}
                                        defaultSortField="idStaf"
                                        pagination
                                        highlightOnHover
                                    />
                                    </DataTableExtensions>
                                </Card.Body>
                                <Card.Footer>
                                    <ButtonToolbar>
                                      <Button color="btn btn-primary" onClick={() => this.setState({addModalShow: true})}>Tambah</Button>
                                            <AddModalInformasiStaf
                                            show={this.state.addModalShow}
                                            onHide={addModalClose}
                                            refreshList={this.refreshList}
                                            refreshListStaf={this.refreshListStaf}
                                            refreshListDokter={this.refreshListDokter}/>
                                            <EditModalInformasiStaf
                                            show={this.state.editModalShow}
                                            onHide={editModalClose}
                                            refreshList={this.refreshList}
                                            refreshListStaf={this.refreshListStaf}
                                            refreshListDokter={this.refreshListDokter}
                                            idStaf={this.state.sendIdStaf}
                                            namaLengkap={this.state.sendNamaLengkap}
                                            tanggalLahir={this.state.sendTanggalLahir}
                                            posisi={this.state.sendPosisi}
                                            mulaiBekerja={this.state.sendMulaiBekerja}
                                            gaji={this.state.sendGaji}
                                            />
                                    </ButtonToolbar>
                                </Card.Footer>
                            </Card>
                        </Col>
                    </Row>
                </CSSTransitionGroup>
            </Fragment>
        )
    }
}