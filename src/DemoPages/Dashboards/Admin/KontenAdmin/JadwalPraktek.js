import React, {Fragment} from 'react'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import {Row, Col} from 'reactstrap';
import {Modal, Card, Button, ButtonToolbar} from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import {AddModalPraktek} from './AddModalPraktek';
import {EditModalPraktek} from './EditModalPraktek';
import PageTitle from '../../../../Layout/AppMain/PageTitle';
import axios from 'axios';

export default class JadwalPraktek extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            praktek:[],
            addModalShow : false,
            editModalShow :  false,
            modal: false,
            initialState : {
                idPraktek:'',
                poli:'',
                jam:'',
                jadwal:'',
                idDokter:''
            },
            sendIdPraktek:'',
            sendPoli:'',
            sendJam:'',
            sendJadwal:'',
            sendIdDokter:''
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
                name:'Id Dokter',
                selector:'idDokter',
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
                name: 'Update',
                button: true,
                cell: (praktek) => {
                return (
                <Fragment>
                    <button size='sm' className="btn btn-primary"
                    onClick={() => this.setState({editModalShow: true,
                        sendIdPraktek:praktek.idPraktek,
                        sendPoli:praktek.poli,
                        sendJam:praktek.jam,
                        sendJadwal:praktek.jadwal,
                        sendIdDokter:praktek.idDokter})}>Update</button>
                </Fragment>
                );
                }  
            }
        ];
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
        this.praktekChange = this.praktekChange.bind(this);
        this.submitPraktek = this.submitPraktek.bind(this);
    }

    componentDidMount() {
        this.refreshList();
    }

    componentDidUpdate() {
        fetch("http://localhost:1212/v1/app/praktek/dokter/2")
            .then(response =>  response.json())
            .then(data =>  {
                this.setState({praktek:data.data});
        });
    }

    refreshList() {
        axios
            .get("http://localhost:1212/v1/app/praktek/dokter/2") 
            .then(response => {
                this.setState({praktek:response.data.data});
            });
    }

    findAllPraktek() {
        axios.get("http://localhost:1212/v1/app/praktek/dokter/2")
            .then( response => response.data.data)
            .then((data) =>  {
                this.setState({praktek:data.data});
             });
    }

    submitPraktek = event =>  {
        alert("Data berhasil masuk");
        event.preventDefault();
        const praktek = {
            idPraktek: this.state.idPraktek,
            poli: this.state.poli,
            jam: this.state.jam,
            jadwal: this.state.jadwal,
            idDokter: this.state.idDokter
        };

        axios.post("http://localhost:1212/v1/app/praktek", praktek)
            .then(response => {
                if(response.data.data != null) {
                    this.setState({"show":true});
                } else {
                    this.setState({"show":false});
                }
            });
    };

    praktekChange(event) {
        this.setState({
            [event.target.name]:event.target.value
        })
    };

    render() {
        let addModalClose = () => this.setState({addModalShow:false});
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
                                    <DataTable
                                        title="List Praktek"
                                        columns={this.columns} 
                                        pagination={true}
                                        highlightOnHover
                                        data={this.state.praktek.map((praktek) => (
                                            {idPraktek:praktek.idPraktek,
                                            poli:praktek.poli,
                                            jadwal:praktek.jadwal,
                                            jam:praktek.jam,
                                            idDokter:praktek.idDokter}
                                        ))}
                                    />
                                </Card.Body>
                                <Card.Footer>
                                <ButtonToolbar>
                                <Button color="btn btn-primary" onClick={() => this.setState({addModalShow: true})}>Add</Button>
                                        <AddModalPraktek
                                        show={this.state.addModalShow}
                                        onHide={addModalClose}/>
                                        <EditModalPraktek
                                            show={this.state.editModalShow}
                                            onHide={editModalClose}
                                            idPraktek={this.state.sendIdPraktek}
                                            poli={this.state.sendPoli}
                                            jadwal={this.state.sendJadwal}
                                            jam={this.state.sendJam}
                                            idDokter={this.state.sendIdDokter}
                                            />
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