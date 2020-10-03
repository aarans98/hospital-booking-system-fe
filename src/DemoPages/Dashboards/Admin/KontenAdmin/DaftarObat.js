import React, {Fragment} from 'react'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import {Row, Col} from 'reactstrap';
import {Card, Button, ButtonToolbar} from 'react-bootstrap';
import {AddModalObat} from './AddModalObat';
import {EditModalObat} from './EditModalObat';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import PageTitle from '../../../../Layout/AppMain/PageTitle';
import CountUp from 'react-countup';
import axios from 'axios';
import Swal from 'sweetalert2';

export default class DaftarObat extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            daftarObat:[],
            jumlahObat:0,
            addModalShow : false,
            editModalShow :  false,
            modal: false,
            initialState : {
                idObat:'', namaObat:'', kategori:'', deskripsi:''
            },
        };
        this.columns = [
            {
                name:'Id',
                selector:'idObat',
                sortable: true,
                filterable: true,
            },
            {
                name:'Nama Obat',
                selector:'namaObat',
                sortable: true,
                filterable: true,
            },
            {
                name:'Kategori',
                selector:'kategori',
                sortable: true,
                filterable: true,
            },
            {
                name:'Deskripsi',
                selector:'deskripsi',
                sortable: true,
                filterable: true,
            },
            {
                name: 'Perbarui',
                button: true,
                cell: (daftarObat) => {
                return (
                <Fragment>
                    <button size='sm' className="btn btn-primary"
                    onClick={() => this.setState({editModalShow: true,
                    sendIdObat: daftarObat.idObat,
                    sendNamaObat: daftarObat.namaObat,
                    sendKategori: daftarObat.kategori,
                    sendDeskripsi: daftarObat.deskripsi,
                    })}>Perbarui</button>
                </Fragment>
                );
                }  
            },
        ];
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
        axios.get("http://localhost:1212/v1/app/obat")
        .then(
            response => {
                this.setState({daftarObat:response.data.data});
            });
        
        this.refreshList();
        this.refreshListObat();
    }

    refreshListObat = () => {
        axios
          .get("http://localhost:1212/v1/app/informasiStaf/jumlahobat")
          .then((response) => {
            this.setState({ jumlahObat: response.data.jumlah });
        });
    }

    refreshList = () => {
        axios.get("http://localhost:1212/v1/app/obat")
        .then(
            response => {
                this.setState({daftarObat:response.data.data});
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

    render() {
        let addModalClose = () => this.setState({addModalShow:false});
        let editModalClose = () => this.setState({editModalShow:false});
        const tableData = {
            columns:this.columns,
            data:this.state.daftarObat.map((daftarObat) => (
                {idObat:daftarObat.idObat,
                namaObat:daftarObat.namaObat,
                kategori:daftarObat.kategori,
                deskripsi: daftarObat.deskripsi}
            ))
        };
        console.log(this.state.idObat)
        console.log(this.state.deskripsi);
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
                        <Col md="12">
                            <div className="card mb-3 widget-chart">
                                <div className="icon-wrapper rounded-circle">
                                    <div className="icon-wrapper-bg bg-primary"/>
                                    <i className="lnr-plus-circle text-primary"/>
                                </div>
                                <div className="widget-numbers">
                                    <CountUp start={0}
                                             end={this.state.jumlahObat?this.state.jumlahObat:0} 
                                             separator=""
                                             decimals={0}
                                             decimal=","
                                             prefix=""
                                             suffix=""
                                             useEasing={false}
                                             duration="2"/>
                                </div>
                                <div className="widget-subheading">
                                    Jumlah Jenis Obat
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
                                        title="Daftar Obat"
                                        pagination={true}
                                        defaultSortField="idObat"
                                        pagination
                                        highlightOnHover
                                    />
                                    </DataTableExtensions>
                                </Card.Body>
                                <Card.Footer>
                                    <ButtonToolbar>
                                      <Button color="btn btn-primary" onClick={() => this.setState({addModalShow: true})}>Tambah</Button>
                                            <AddModalObat
                                            show={this.state.addModalShow}
                                            onHide={addModalClose}
                                            refreshList={this.refreshList}
                                            refreshListObat={this.refreshListObat}
                                            />
                                            <EditModalObat
                                            show={this.state.editModalShow}
                                            onHide={editModalClose}
                                            refreshList={this.refreshList}
                                            refreshListObat={this.refreshListObat}
                                            idObat={this.state.sendIdObat}
                                            namaObat={this.state.sendNamaObat}
                                            kategori={this.state.sendKategori}
                                            deskripsi={this.state.sendDeskripsi}
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