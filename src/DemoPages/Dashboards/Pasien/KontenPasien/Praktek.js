import React, {Fragment} from 'react'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import {Row, Col} from 'reactstrap';
import {Modal, Card, Button, ButtonToolbar, Nav} from 'react-bootstrap';
import {AddModalKunjungan} from './AddModalKunjungan'
import DataTable from 'react-data-table-component';
import axios from 'axios';

export class Praktek extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            editModalShow :  false,
            initialState : {
                idPraktek:'', namaLengkap:'', userName:'', tanggalLahir:'', posisi:'',
                mulaiBekerja:'', gaji:''
        
            },
            sendIdDokter:'',
            sendIdPraktek:''

        };
        this.columns = [
            {
                name:'Id',
                selector:'idPraktek',
                sortable: true,
                filterable: true,
            },
            {
                name:'Poli',
                selector:'poli',
                sortable: true,
                filterable: true,
            },
            {
                name:'Jadwal',
                selector:'jadwal',
                sortable: true,
                filterable: true,
            },
            {
                name:'Jam',
                selector:'jam',
                sortable: true,
                filterable: true,
            },
            {   
                name:'Id  Dokter',
                selector:'idDokter',
                sortable: true,
                filterable: true,
            },
            {
                name:'Buat Janji',
                button: true,
                cell: (praktek) => {
                return (
                <Fragment>
                    <button size='sm' className="btn btn-primary"
                    onClick={() => this.setState({editModalShow: true,
                    sendIdPraktek: praktek.idPraktek,
                    sendIdDokter: praktek.idDokter})}>
                        Buat Janji
                    </button>
                </Fragment>
                );
                }  
            }
        ];
        this.kunjunganChange = this.kunjunganChange.bind(this);
    }

    editPraktek = (idPraktek) => {
        axios
        .get("http://localhost:1212/v1/app/praktek/" + idPraktek)
        .then((response) => response.data.data)
        .then((data) => {
            this.setState({
            idPraktek: data.data.idPraktek,
            idDokter: data.data.idDokter,
            });
        });
    };

    kunjunganChange(event) {
        this.setState({
        [event.target.name]: event.target.value,
        });
    }

    render() {
        console.log(this.props.jadwal);
        let editModalClose = () => this.setState({editModalShow:false});
        return (
            <Modal {...this.props} size="lg" backdrop="static" className="Mymodal" id="modal_form" animation={true}>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    JADWAL PRAKTEK
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Fragment>
                <CSSTransitionGroup
                    component="div"
                    transitionName="TabsAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={0}
                    transitionEnter={false}
                    transitionLeave={false}>
                    <div>
                        {/* <PageTitle
                            heading="Data Tables"
                            subheading="Choose between regular React Bootstrap tables or advanced dynamic ones."
                            icon="pe-7s-medal icon-gradient bg-tempting-azure"
                        /> */}
                    </div>
                    <Row>
                        <Col md="12">
                            <Card className="main-card mb-3">
                                <Card.Header>
                                </Card.Header>
                                <Card.Body class="card-hover-shadow card-border mb-3 card">
                                    {
                                        this.props.jadwal.length === 0 ?
                                        <div></div> :
                                        <DataTable
                                        columns={this.columns} 
                                        pagination={true}
                                        defaultSortField="jadwal"
                                        highlightOnHover
                                        data={this.props.jadwal}
                                        />
                                    }
                                </Card.Body>
                                <Card.Footer>
                                <ButtonToolbar>
                                        <AddModalKunjungan
                                        show={this.state.editModalShow}
                                        onHide={editModalClose}
                                        idPraktek={this.state.sendIdPraktek}
                                        idDokter={this.state.sendIdDokter}/>
                                    </ButtonToolbar>
                                </Card.Footer>
                            </Card>
                        </Col>
                    </Row>
                </CSSTransitionGroup>
            </Fragment>
            </Modal.Body>
                <Modal.Footer>
                   
                </Modal.Footer>
            </Modal>
        )
    }
}
