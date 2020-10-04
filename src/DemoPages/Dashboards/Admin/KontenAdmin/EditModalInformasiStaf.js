import React, { Component } from 'react';
import {Modal, Button, Col, Form, Card} from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';

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
        tanggalLahir:'',
        posisi:'',
        mulaiBekerja:'',
        gaji:''
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
          title: 'Data berhasil diperbarui!'
        })
    }
    
    updateInformasiStaf = (event) =>  {
        event.preventDefault();
        const informasiStaf = {
            idStaf:event.target.idStaf.value,
            namaLengkap:event.target.namaLengkap.value,
            tanggalLahir:event.target.tanggalLahir.value,
            posisi:event.target.posisi.value,
            mulaiBekerja:event.target.mulaiBekerja.value,
            gaji:event.target.gaji.value
        };
        
        axios.post("http://localhost:1212/v1/app/informasiStaf", informasiStaf)
            .then(response => {
                this.props.refreshList();
                this.props.refreshListStaf();
                if(response.data.data != null) {
                    this.setState({"show":true});
                    this.handleClick();
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
        let {idStaf, namaLengkap,
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
                            id="informasiStaf">
                            <Card.Body>
                                    <Form.Group as={Col} controlId="idStaf">
                                        <Form.Control autoComplete="off"
                                        disabled
                                        hidden
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
                                        as="select"
                                        defaultValue={this.props.posisi}
                                        onChange={this.informasiStafChange} 
                                        name="posisi"
                                        placeholder="Posisi">
                                            <option>Posisi</option>
                                                <option value="Dokter">Dokter</option>
                                                <option value="Perawat">Perawat</option>
                                                <option value="Apoteker">Apoteker</option>
                                                <option value="Admin">Admin</option>
                                                <option value="Office Boy">Office Boy</option>
                                                <option value="Bidan">Bidan</option>
                                                <option value="Programmer">Programmer</option>
                                                <option value="Laboran">Laboran</option>
                                                <option value="Satpam">Satpam</option>
                                        </Form.Control>
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
                                    <Button class="btn btn-primary" type="submit"
                                    onClick={this.props.onHide} >
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
