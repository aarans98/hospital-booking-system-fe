import React, {Fragment} from 'react'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import {Row, Col} from 'reactstrap';
import {Card, Button, ButtonToolbar} from 'react-bootstrap';
import {AddModalInformasiStaf} from './AddModalInformasiStaf';
import {EditModalInformasiStaf} from './EditModalInformasiStaf';
import DataTable from 'react-data-table-component';
import PageTitle from '../../../../Layout/AppMain/PageTitle';
import axios from 'axios';

export default class DataTableBasic extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            informasiStaf:[],
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
                name: 'Update',
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
                    sendGaji: informasiStaf.gaji})}>Update</button>
                </Fragment>
                );
                }  
            },
            {
                name: 'Delete',
                button: true,
                cell: (informasiStaf) => {
                return(
                <Fragment>
                    <button size='sm' className="btn btn-warning"
                    onClick={() => this.deleteInformasiStaf(informasiStaf.idStaf)}>Delete</button>
                </Fragment>
                );
                }
            }
        ];
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
        this.refreshList();
    }

    componentDidUpdate() {
        fetch("http://localhost:1212/v1/app/informasiStaf")
            .then(response => response.json())
            .then((data) => {
                this.setState({informasiStaf:data.data})
        });
    }

    refreshList() {
        axios.get("http://localhost:1212/v1/app/informasiStaf")
        .then(
            response => {
                this.setState({informasiStaf:response.data.data});
            });
    }

    deleteInformasiStaf = (idStaf) => {
        axios.delete("http://localhost:1212/v1/app/informasiStaf/"+idStaf)
        .then(response => {
            if(response.data != null) {
                alert("Data berhasil dihapus !");
                this.setState({
                    informasiStaf: this.state.informasiStaf.filter(informasiStaf=> informasiStaf.idStaf !== idStaf)
                })
            }
        });
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
                    transitionLeave={false}>
                    <div>
                        <PageTitle
                            heading="Tabel Informasi Staf"
                            subheading="Halaman ini berisi mengenai data informasi staf Rumah Sakit Bahagya"
                            icon="pe-7s-medal icon-gradient bg-tempting-azure"
                        />
                    </div>
                    <Row>
                        <Col md="12">
                            <Card className="main-card mb-3">
                                <Card.Header>
                                </Card.Header>
                                <Card.Body class="card-hover-shadow card-border mb-3 card">
                                    <DataTable
                                        title="Informasi Staf"
                                        columns={this.columns} 
                                        pagination={true}
                                        defaultSortField="idStaf"
                                        data={this.state.informasiStaf.map((informasiStaf) => (
                                            {idStaf:informasiStaf.idStaf,
                                            namaLengkap:informasiStaf.namaLengkap,
                                            tanggalLahir:informasiStaf.tanggalLahir,
                                            posisi: informasiStaf.posisi,
                                            mulaiBekerja: informasiStaf.mulaiBekerja,
                                            gaji: informasiStaf.gaji}
                                        ))}
                                    />
                                </Card.Body>
                                <Card.Footer>
                                    <ButtonToolbar>
                                      <Button color="btn btn-primary" onClick={() => this.setState({addModalShow: true})}>Add</Button>
                                            <AddModalInformasiStaf
                                            show={this.state.addModalShow}
                                            onHide={addModalClose}/>
                                            <EditModalInformasiStaf
                                            show={this.state.editModalShow}
                                            onHide={editModalClose}
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