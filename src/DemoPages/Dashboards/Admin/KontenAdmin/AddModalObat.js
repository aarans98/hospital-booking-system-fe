import React from 'react';
import {Modal, Button, Col, Form, Card} from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';

export class AddModalObat extends React.Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.show = false;
        this.state.shaw = false;
        this.daftarObatChange = this.daftarObatChange.bind(this);
        this.submitDaftarObat = this.submitDaftarObat.bind(this);
    }

    initialState = {
        namaObat:'',
        kategori:'',
        deskripsi:'',
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
          icon: 'success',
          title: 'Data berhasil disimpan!'
        })
    }

    submitDaftarObat = event =>  {
        event.preventDefault();
        const daftarObat = {
            idObat: event.target.idObat.value,
            namaObat: this.state.namaObat,
            kategori: this.state.kategori,
            deskripsi: this.state.deskripsi,
        };

        axios.post("http://localhost:1212/v1/app/obat", daftarObat)
            .then(response => {
                this.props.updateObat();
                this.props.refreshList();
                this.props.refreshListObat();
                if(response.data.data != null) {
                    this.setState({"show":true});
                    this.handleClick();
                } else {
                    this.setState({"show":false});
                }
            });
        this.setState(this.initialState);
    };

    daftarObatChange(event) {
        this.setState({
            [event.target.name]:event.target.value
        })
    };

    render() {
        let { namaObat, kategori, deskripsi } = this.state;
        return (
            <Modal {...this.props} size="lg" backdrop="static" className="Mymodal" id="modal_form" animation={true}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        FORM DAFTAR OBAT
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <div style={{"display":this.state.show ? "block":"none"}}>
                        </div>
                        <Card border="light">
                            <Card.Header> Daftar Obat </Card.Header>
                            <Form 
                            onSubmit={this.submitDaftarObat} 
                            enableReinitialize={true}
                            id="daftarObat">
                            <Card.Body>
                                    <Form.Group as={Col} controlId="idObat">
                                        <Form.Label>Id Obat</Form.Label>
                                        <Form.Control disabled required autoComplete="off"
                                        type="text"
                                        defaultValue={this.props.idObat}
                                        onChange={this.daftarObatChange} 
                                        name="idObat"
                                        placeholder="Id Obat" />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="namaObat">
                                        <Form.Label>Nama Obat</Form.Label>
                                        <Form.Control required autoComplete="off"
                                        type="text"
                                        value={namaObat}
                                        onChange={this.daftarObatChange} 
                                        name="namaObat"
                                        placeholder="Nama Obat"/>
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="kategori">
                                        <Form.Label>Kategori</Form.Label>
                                        <Form.Control required autoComplete="off"
                                        type="text" 
                                        value={kategori}
                                        onChange={this.daftarObatChange} 
                                        name="kategori"
                                        placeholder="Kategori" />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="deskripsi">
                                        <Form.Label>Deskripsi</Form.Label>
                                        <Form.Control required autoComplete="off"
                                        as="textarea" 
                                        value={deskripsi}
                                        onChange={this.daftarObatChange} 
                                        name="deskripsi"
                                        placeholder="Deskripsi" />
                                    </Form.Group>
                            </Card.Body>
                            <Card.Footer style={{"textAlign":"right"}} >
                                    <Button class="btn btn-primary" type="submit"
                                        onClick={this.props.onHide}>
                                        Simpan
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

