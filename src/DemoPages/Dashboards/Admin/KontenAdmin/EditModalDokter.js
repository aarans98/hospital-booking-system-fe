import React, { Component } from 'react';
import {Modal, Button, Col, Form, Card} from 'react-bootstrap';
import axios from 'axios';

export default class EditModalInformasiStaf extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.show = false;
        this.updateDokterChange = this.updateDokterChange.bind(this);
        this.updateInformasiStaf = this.updateInformasiStaf.bind(this);
    }

    initialState = {
        idDokter: '',
        namaLengkap: '',
        spesialisasi: '',
        tanggalLahir: '',
        username: '',
        email: '',
        password: '',
        passwordrep: '',
        user_role: 'dokter'
    }
    
    updateInformasiStaf = (event) =>  {
        alert("Data berhasil di update!");
        event.preventDefault();
        const updateDokter = {
            idDokter:event.target.idDokter.value,
            namaLengkap:event.target.namaLengkap.value,
            spesialisasi:event.target.spesialisasi.value,
            tanggalLahir:event.target.tanggalLahir.value,
            // username:event.target.username.value,
            // email:event.target.email.value,
            // password:event.target.password.value,
            // passwordrep:event.target.passwordrep.value
        };
        
        axios.post("http://localhost:1212/v1/app/dokter", updateDokter)
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

    updateDokterChange(event) {
        this.setState({
            [event.target.name]:event.target.value
        })
    };
    
    render() {
        let {idDokter, namaLengkap, spesialisasi, 
            tanggalLahir, username, email, password, passwordrep} = this.state;
        return (
            <Modal {...this.props} size="lg" backdrop="static" className="Mymodal" id="modal_form" animation={true}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        FORM UPDATE DOKTER
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div className="container">
                        <div style={{"display":this.state.show ? "block":"none"}}>
                        </div>
                        <Card border="light">
                            <Card.Header> Update Dokter </Card.Header>
                            <Form 
                            onSubmit={this.updateInformasiStaf} 
                            initialValues={{ idDokter, namaLengkap, spesialisasi, 
                                             tanggalLahir, username, email, password, passwordrep}}
                            enableReinitialize={true}
                            id="informasiStaf">
                            <Card.Body>
                                    <Form.Group as={Col} controlId="idStaf">
                                        <Form.Label>Id</Form.Label>
                                        <Form.Control required autoComplete="off"
                                        type="number"
                                        defaultValue={this.props.idDokter}
                                        onChange={this.updateDokterChange} 
                                        name="idDokter"
                                        placeholder="Id Dokter" />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="namaLengkap">
                                        <Form.Label>Nama Lengkap</Form.Label>
                                        <Form.Control required autoComplete="off"
                                        type="text" 
                                        defaultValue={this.props.namaLengkap}
                                        onChange={this.updateDokterChange} 
                                        name="namaLengkap"
                                        placeholder="Nama Lengkap" />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="spesialisasi">
                                        <Form.Label>Spesialisasi</Form.Label>
                                        <Form.Control required autoComplete="off"
                                        type="text" 
                                        defaultValue={this.props.spesialisasi}
                                        onChange={this.updateDokterChange} 
                                        name="spesialisasi"
                                        placeholder="Spesialisasi" />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="tanggalLahir">
                                        <Form.Label>Tanggal Lahir</Form.Label>
                                        <Form.Control required autoComplete="off"
                                        type="date" 
                                        defaultValue={this.props.tanggalLahir}
                                        onChange={this.updateDokterChange} 
                                        name="tanggalLahir"
                                        placeholder="Tanggal Lahir" />
                                    </Form.Group>
                                    {/* <Form.Group as={Col} controlId="username">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control required autoComplete="off"
                                        type="text" 
                                        defaultValue={this.props.username}
                                        onChange={this.updateDokterChange} 
                                        name="username"
                                        placeholder="username" />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="email">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control required autoComplete="off"
                                        type="text" 
                                        defaultValue={this.props.email}
                                        onChange={this.updateDokterChange} 
                                        name="email"
                                        placeholder="Email" />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="password">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control required autoComplete="off"
                                        type="text" 
                                        defaultValue={this.props.password}
                                        onChange={this.updateDokterChange} 
                                        name="password"
                                        placeholder="Password" />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="passwordrep">
                                        <Form.Label>Passwordrep</Form.Label>
                                        <Form.Control required autoComplete="off"
                                        type="text" 
                                        defaultValue={this.props.passwordrep}
                                        onChange={this.updateDokterChange} 
                                        name="passwordrep"
                                        placeholder="Passwordrep" />
                                    </Form.Group> */}
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
