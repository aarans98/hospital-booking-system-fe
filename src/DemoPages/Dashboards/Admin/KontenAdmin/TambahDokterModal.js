import React from 'react';
import {Modal, Button, Row, Col, Form, Card} from 'react-bootstrap';
import axios from 'axios';

export default class TambahDokterModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.show = false;
        this.tambahDokterChange = this.tambahDokterChange.bind(this);
        this.submitTambahDokter= this.submitTambahDokter.bind(this);
    }

    initialState = {
        idDokter: '',
        namaLengkap: '',
        spesialisasi: '',
        tanggalLahir: '',
        username: '',
    }

    submitTambahDokter = event =>  {
        alert(this.state.informasiStaf + " succesfully to submit");
        event.preventDefault();
        const dokter = {
            idDokter: this.state.idDokter,
            namaLengkap: this.state.namaLengkap,
            spesialisasi: this.state.spesialisasi,
            tanggalLahir: this.state.tanggalLahir,
            username: this.state.username,
    };

    axios.post("http://localhost:1212/v1/app/dokter", dokter)
        .then(response => {
            if(response.data.data != null) {
                this.setState({"show":true});
                alert("Data berhasil masuk!")
            } else {
                this.setState({"show":false});
            }
        });
    
    };

    tambahDokterChange(event) {
        this.setState({
            [event.target.name]:event.target.value
        })
    };

    render() {
        let { idDokter, namaLengkap, spesialisasi, tanggalLahir,
            username, email, password,
            passwordrep, user_role  }= this.state;
        return (
            <Modal
            {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Tambah Dokter
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="container">
                    <div style={{"display":this.state.show ? "block":"none"}}>
                    </div>
                    <Card border="light">
                            <Card.Header> Tambah Dokter </Card.Header>
                            <Form 
                            onSubmit={this.updateKunjungan} 
                            initialValues=
                            {{ 
                                idDokter, namaLengkap, spesialisasi, tanggalLahir,
                                username
                            }}
                            enableReinitialize={true}
                            id="idDokter">
                            <Card.Body>
                                    <Form.Group as={Col} controlId="idDokter">
                                        <Form.Label>Id Dokter</Form.Label>
                                        <Form.Control required autoComplete="off"
                                        type="number"
                                        defaultValue={this.props.idDokter}
                                        onChange={this.dokterChange} 
                                        name="idDokter"
                                        placeholder="Id Dokter" />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="namaLengkap">
                                        <Form.Label>Nama Lengkap</Form.Label>
                                        <Form.Control required autoComplete="off"
                                        type="text"
                                        defaultValue={this.props.namaLengkap}
                                        onChange={this.dokterChange} 
                                        name="idDokter"
                                        placeholder="Nama Lengkap" />
                                    </Form.Group>                         
                                    <Form.Group as={Col} controlId="spesialisasi">
                                        <Form.Label>Spesialisasi</Form.Label>
                                        <Form.Control required autoComplete="off"
                                        type="text" 
                                        value={this.props.spesialisasi}
                                        onChange={this.dokterChange} 
                                        name="spesialisasi"
                                        placeholder="Spesialisasi" />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="tanggalLahir">
                                        <Form.Label>Tanggal Lahir</Form.Label>
                                        <Form.Control required autoComplete="off"
                                        type="date" 
                                        value={this.props.tanggalLahir}
                                        onChange={this.dokterChange} 
                                        name="tanggalLahir"
                                        placeholder="Tanggal Lahir" />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="username">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control required autoComplete="off"
                                        type="text" 
                                        value={this.props.username}
                                        onChange={this.dokterChange} 
                                        name="username"
                                        placeholder="Username" />
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
                <Button onClick={this.props.onHide}>Close</Button>
            </Modal.Footer>
            </Modal>
        );
    }
}

