import React from 'react';
import {Modal, Button, Col, Form, Card} from 'react-bootstrap';
import axios from 'axios';

export class AddModalInformasiStaf extends React.Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.show = false;
        this.state.shaw = false;
        this.informasiStafChange = this.informasiStafChange.bind(this);
        this.submitInformasiStaf = this.submitInformasiStaf.bind(this);
    }

    initialState = {
        idStaf:'',
        namaLengkap:'',
        tanggalLahir:'',
        posisi:'',
        mulaiBekerja:'',
        gaji:''
    }

    submitInformasiStaf = event =>  {
        // alert("Data berhasil masuk!");
        event.preventDefault();
        const informasiStaf = {
            idStaf: this.state.idStaf,
            namaLengkap: this.state.namaLengkap,
            tanggalLahir: this.state.tanggalLahir,
            posisi: this.state.posisi,
            mulaiBekerja: this.state.mulaiBekerja,
            gaji: this.state.gaji
    };

    axios.post("http://localhost:1212/v1/app/informasiStaf", informasiStaf)
        .then(response => {
            if(response.data.data != null) {
                this.setState({"show":true});
                alert("Data berhasil masuk!");
            } else {
                this.setState({"show":false});
            }
        });
    
    };

    informasiStafChange(event) {
        this.setState({
            [event.target.name]:event.target.value
        })
    };

    render() {
        let {idStaf, namaLengkap, userName,
            tanggalLahir, posisi, mulaiBekerja, gaji} = this.state;
        return (
            <Modal {...this.props} size="lg" backdrop="static" className="Mymodal" id="modal_form" animation={true}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        FORM INFORMASI STAF
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <div style={{"display":this.state.show ? "block":"none"}}>
                        </div>
                        <Card border="light">
                            <Card.Header> Informasi Staf </Card.Header>
                            <Form 
                            onSubmit={this.submitInformasiStaf} 
                            initialValues={{ idStaf, namaLengkap, userName,
                                             tanggalLahir, posisi, mulaiBekerja, gaji}}
                            enableReinitialize={true}
                            id="informasiStaf">
                            <Card.Body>
                                    <Form.Group as={Col} controlId="idStaf">
                                        <Form.Label>Id</Form.Label>
                                        <Form.Control required autoComplete="off"
                                        type="number"
                                        value={this.props.idStaf}
                                        onChange={this.informasiStafChange} 
                                        name="idStaf"
                                        placeholder="Id Staf" />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="namaLengkap">
                                        <Form.Label>Nama Lengkap</Form.Label>
                                        <Form.Control required autoComplete="off"
                                        type="text"
                                        value={this.props.namaLengkap}
                                        onChange={this.informasiStafChange} 
                                        name="namaLengkap"
                                        placeholder="Nama Lengkap"/>
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="tanggalLahir">
                                        <Form.Label>Tanggal Lahir</Form.Label>
                                        <Form.Control required autoComplete="off"
                                        type="date" 
                                        value={this.props.tanggalLahir}
                                        onChange={this.informasiStafChange} 
                                        name="tanggalLahir"
                                        placeholder="Tanggal Lahir" />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="posisi">
                                        <Form.Label>Posisi</Form.Label>
                                        <Form.Control required autoComplete="off"
                                        // type="text" 
                                        value={this.props.namaLengkap}
                                        onChange={this.informasiStafChange} 
                                        name="posisi"
                                        placeholder="Posisi" />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="mulaiBekerja">
                                        <Form.Label>Mulai Bekerja</Form.Label>
                                        <Form.Control required autoComplete="off"
                                        type="date" 
                                        value={this.props.mulaiBekerja}
                                        onChange={this.informasiStafChange} 
                                        name="mulaiBekerja"
                                        placeholder="Mulai Bekerja" />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="gaji">
                                        <Form.Label>Gaji</Form.Label>
                                        <Form.Control required autoComplete="off"
                                        type="text" 
                                        value={this.props.gaji}
                                        onChange={this.informasiStafChange} 
                                        name="gaji"
                                        placeholder="Gaji" />
                                    </Form.Group>
                            </Card.Body>
                            <Card.Footer style={{"textAlign":"right"}} >
                                    <Button class="btn btn-primary" type="submit"
                                        onClick={() => this.setState({show: true})}>
                                        Save
                                    </Button>{' '}
                            </Card.Footer>
                            </Form>
                        </Card>
                        </div>
                </Modal.Body>
                <Modal.Footer>
                   
                </Modal.Footer>
            </Modal>
        );
    }
}

