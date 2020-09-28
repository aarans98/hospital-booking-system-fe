import React, { Component } from 'react';
import {Modal, Button, Col, Form, Card} from 'react-bootstrap';
import axios from 'axios';

export class EditModalInformasiStaf extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.show = false;
        this.informasiStafChange = this.informasiStafChange.bind(this);
        this.updateInformasiStaf = this.updateInformasiStaf.bind(this);
    }

    initialState = {
        idStaf:'',
        namaLengkap:'',
        userName:'',
        tanggalLahir:'',
        posisi:'',
        mulaiBekerja:'',
        gaji:''
    }
    
    updateInformasiStaf = (event) =>  {
        alert("Data berhasil di update!");
        event.preventDefault();
        const informasiStaf = {
            idStaf:event.target.idStaf.value,
            namaLengkap:event.target.namaLengkap.value,
            userName:event.target.userName.value,
            tanggalLahir:event.target.tanggalLahir.value,
            posisi:event.target.posisi.value,
            mulaiBekerja:event.target.mulaiBekerja.value,
            gaji:event.target.gaji.value
        };
        
        axios.post("http://localhost:1212/v1/app/informasiStaf", informasiStaf)
            .then(response => {
                if(response.data.data != null) {
                    this.setState({"show":true});
                    setTimeout(() => this.setState({"show":false}), 1500);
                } else {
                    this.setState({"show":false});
                }
            });
        this.setState(this.initialState);
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
                            onSubmit={this.updateInformasiStaf} 
                            initialValues={{ idStaf, namaLengkap, userName,
                                             tanggalLahir, posisi, mulaiBekerja, gaji}}
                            enableReinitialize={true}
                            id="informasiStaf">
                            <Card.Body>
                                    <Form.Group as={Col} controlId="idStaf">
                                        <Form.Label>Id</Form.Label>
                                        <Form.Control required autoComplete="off"
                                        type="number"
                                        defaultValue={this.props.idStaf}
                                        onChange={this.informasiStafChange} 
                                        name="idStaf"
                                        placeholder="Id Staf" />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="namaLengkap">
                                        <Form.Label>Nama Lengkap</Form.Label>
                                        <Form.Control required autoComplete="off"
                                        type="text" 
                                        defaultValue={this.props.namaLengkap}
                                        onChange={this.informasiStafChange} 
                                        name="namaLengkap"
                                        placeholder="Nama Lengkap" />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="userName">
                                        <Form.Label>User Name</Form.Label>
                                        <Form.Control required autoComplete="off"
                                        type="text" 
                                        defaultValue={this.props.userName}
                                        onChange={this.informasiStafChange} 
                                        name="userName"
                                        placeholder="User Name" />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="tanggalLahir">
                                        <Form.Label>Tanggal Lahir</Form.Label>
                                        <Form.Control required autoComplete="off"
                                        type="date" 
                                        defaultValue={this.props.tanggalLahir}
                                        onChange={this.informasiStafChange} 
                                        name="tanggalLahir"
                                        placeholder="Tanggal Lahir" />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="posisi">
                                        <Form.Label>Posisi</Form.Label>
                                        <Form.Control required autoComplete="off"
                                        type="text" 
                                        defaultValue={this.props.namaLengkap}
                                        onChange={this.informasiStafChange} 
                                        name="posisi"
                                        placeholder="Posisi" />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="mulaiBekerja">
                                        <Form.Label>Mulai Bekerja</Form.Label>
                                        <Form.Control required autoComplete="off"
                                        type="date" 
                                        defaultValue={this.props.mulaiBekerja}
                                        onChange={this.informasiStafChange} 
                                        name="mulaiBekerja"
                                        placeholder="Mulai Bekerja" />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="gaji">
                                        <Form.Label>Gaji</Form.Label>
                                        <Form.Control required autoComplete="off"
                                        type="text" 
                                        defaultValue={this.props.gaji}
                                        onChange={this.informasiStafChange} 
                                        name="gaji"
                                        placeholder="Gaji" />
                                    </Form.Group>
                            </Card.Body>
                            <Card.Footer style={{"textAlign":"right"}} >
                                    <Button class="btn btn-primary" type="submit">
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
