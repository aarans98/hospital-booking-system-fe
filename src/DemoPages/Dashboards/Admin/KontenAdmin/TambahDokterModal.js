import React from 'react';
import {Modal, Button, Row, Col, Form, Card} from 'react-bootstrap';
import axios from 'axios';

export default class TambahDokterModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.show = false;
        this.state.shaw = false;
        this.tambahDokterChange = this.tambahDokterChange.bind(this);
        this.submitTambahDokter= this.submitTambahDokter.bind(this);
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
        user_reole: 'dokter'
    }

    submitTambahDokter = event =>  {
        // alert("tes");
        event.preventDefault();
        const dokter = {
            // idDokter: this.state.idDokter,
            namaLengkap: this.state.namaLengkap,
            spesialisasi: this.state.spesialisasi,
            tanggalLahir: this.state.tanggalLahir,
            username: this.state.username,
            // email: this.state.email,
            // password: this.state.password,
            // passwordrep: this.state.passwordrep,
            // user_role: this.state.user_role,
        };

        const register = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            passwordrep: this.state.passwordrep,
            user_role: 'dokter',
        };

    axios.post("http://localhost:1212/v1/app/register", register)
        .then(response => {
            console.log(response.data.data);
            if(response.data.data != null) {
                console.log("success");
                axios.post("http://localhost:1212/v1/app/dokter", dokter)
                    .then(response => {
                        console.log(response.data.data);
                        if(response.data.data != null) {
                            alert("Data berhasil masuk!")
                            this.setState({"show":false});
                        } else {
                            console.log("failed")
                            alert("Data gagal dimasukkan");
                            this.setState({"show":false});
                        }
                    });
            } else {
                console.log("failed")
            }
        });
    }

    tambahDokterChange(event) {
        this.setState({
            [event.target.name]:event.target.value
        })
    };

    render() {
        let { idDokter, namaLengkap, spesialisasi, tanggalLahir,
            username, email, password, passwordrep, user_role }= this.state;
        return (
            <Modal
            {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop="static" className="Mymodal" id="modal_form" animation={true}
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
                            onSubmit={this.submitTambahDokter} 
                            initialValues=
                            {{ 
                                idDokter, namaLengkap, spesialisasi, tanggalLahir,
                                username, email, password, passwordrep, user_role
                            }}
                            enableReinitialize={true}
                            id="tambahDokter">
                            <Card.Body>
                                    <Form.Group as={Col} controlId="idDokter">
                                        <Form.Label>Id Dokter</Form.Label>
                                        <Form.Control required autoComplete="off"
                                        type="number"
                                        defaultValue={this.props.idDokter}
                                        onChange={this.tambahDokterChange} 
                                        name="idDokter"
                                        placeholder="Id Dokter" />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="namaLengkap">
                                        <Form.Label>Nama Lengkap</Form.Label>
                                        <Form.Control required autoComplete="off"
                                        type="text"
                                        defaultValue={this.props.namaLengkap}
                                        onChange={this.tambahDokterChange} 
                                        name="namaLengkap"
                                        placeholder="Nama Lengkap " />
                                    </Form.Group>                         
                                    <Form.Group as={Col} controlId="spesialisasi">
                                        <Form.Label>Spesialisasi</Form.Label>
                                        <Form.Control required autoComplete="off"
                                        type="text" 
                                        value={this.props.spesialisasi}
                                        onChange={this.tambahDokterChange} 
                                        name="spesialisasi"
                                        placeholder="Spesialisasi" />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="tanggalLahir">
                                        <Form.Label>Tanggal Lahir</Form.Label>
                                        <Form.Control required autoComplete="off"
                                        type="date" 
                                        value={this.props.tanggalLahir}
                                        onChange={this.tambahDokterChange} 
                                        name="tanggalLahir"
                                        placeholder="Tanggal Lahir" />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="username">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control required autoComplete="off"
                                        type="text" 
                                        value={this.props.username}
                                        onChange={this.tambahDokterChange} 
                                        name="username"
                                        placeholder="Username" />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="email">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control required autoComplete="off"
                                        type="text" 
                                        value={this.props.email}
                                        onChange={this.tambahDokterChange} 
                                        name="email"
                                        placeholder="Email" />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="password">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control required autoComplete="off"
                                        type="text" 
                                        value={this.props.password}
                                        onChange={this.tambahDokterChange} 
                                        name="password"
                                        placeholder="Password" />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="passwordrep">
                                        <Form.Label>Passwordrep</Form.Label>
                                        <Form.Control required autoComplete="off"
                                        type="text" 
                                        value={this.props.passwordrep}
                                        onChange={this.tambahDokterChange} 
                                        name="passwordrep"
                                        placeholder="Passwordrep" />
                                    </Form.Group>
                                    {/* <Form.Group as={Col} controlId="username">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control required autoComplete="off"
                                        type="text" 
                                        value={this.props.username}
                                        onChange={this.tambahDokterChange} 
                                        name="username"
                                        placeholder="Username" />
                                    </Form.Group> */}
                            </Card.Body>
                            <Card.Footer style={{"textAlign":"right"}} >
                                    <Button class="btn btn-primary" type="submit"
                                    onClick={() => this.setState({show: true})}>
                                        Save
                                    </Button>
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

