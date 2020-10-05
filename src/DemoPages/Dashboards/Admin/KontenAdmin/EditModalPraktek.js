import React, { Component } from 'react';
import {Modal, Button, Col, Form, Card} from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';

export class EditModalPraktek extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.show = false;
        this.praktekChange = this.praktekChange.bind(this);
        this.updatePraktek = this.updatePraktek.bind(this);
    }

    initialState = {
        idPraktek:'',
        poli:'',
        jam:'',
        jadwal:'',
        idDokter:''
    }

    updatePraktek = (event) =>  {
        event.preventDefault();
        const praktek = {
            idPraktek:event.target.idPraktek.value,
            poli:event.target.poli.value,
            jam:event.target.jam.value,
            jadwal:event.target.jadwal.value,
            idDokter:event.target.idDokter.value,
        };
        console.log(praktek);

        axios.post("http://localhost:1212/v1/app/praktek", praktek)
            .then(response => {
                if(response.data.data != null) {
                    this.handleClick();
                    this.setState({"show":true});
                    setTimeout(() => this.setState({"show":false}), 1500);
                } else {
                    this.setState({"show":false});
                }
            });
        this.setState(this.initialState);
    };

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
          icon: 'warning',
          title: 'Data berhasil diperbarui!'
        })
    }

    praktekChange(event) {
        this.setState({
            [event.target.name]:event.target.value
        })
    };
    
    render() {
        let {idPraktek, poli, jam,
            jadwal, idDokter} = this.state;
        return (
            <Modal {...this.props} size="lg" backdrop="static" className="Mymodal" id="modal_form" animation={true}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        FORM PRAKTEK
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div className="container">
                        <div style={{"display":this.state.show ? "block":"none"}}>
                        </div>
                        <Card border="light">
                            <Card.Header> Praktek </Card.Header>
                            <Form 
                            onSubmit={this.updatePraktek} 
                            id="praktek">
                            <Card.Body>
                                    <Form.Group as={Col} controlId="idStaf">
                                        <Form.Control required autoComplete="off"
                                        type="number"
                                        hidden
                                        defaultValue={this.props.idPraktek}
                                        onChange={this.praktekChange} 
                                        name="idPraktek"
                                        placeholder="Id Praktek" />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="poli">
                                        <Form.Label>Poli</Form.Label>
                                        <Form.Control required autoComplete="off"
                                        type="text" 
                                        defaultValue={this.props.poli}
                                        onChange={this.praktekChange} 
                                        name="poli"
                                        placeholder="Poli" />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="jadwal">
                                        <Form.Label>Jadwal</Form.Label>
                                        <Form.Control required autoComplete="off"
                                        type="date" 
                                        value={this.props.jadwal}
                                        onChange={this.praktekChange} 
                                        name="jadwal"
                                        placeholder="Jadwal" />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="jam">
                                        <Form.Label>Jam</Form.Label>
                                        <Form.Control required autoComplete="off"
                                        as = "select"
                                        defaultValue={this.props.jam}
                                        onChange={this.praktekChange} 
                                        name="jam"
                                        placeholder="Jam" >
                                        <option defaultValue={this.props.jam}>Pilih Jam</option>
                                                <option value="07.00-07.30">07.00-07.30</option>
                                                <option value="08.30-09.00">08.30-09.00</option>
                                                <option value="09.00-09.30">09.00-09.30</option>
                                                <option value="09.30-10.00">09.30-10.00</option>
                                                <option value="10.00-10.30">10.00-10.30</option>
                                                <option value="10.30-11.00">10.30-11.00</option>
                                                <option value="11.00-11.30">11.00-11.30</option>
                                                <option value="11.30-12.00">11.30-12.00</option>
                                                <option value="12.00-12.30">12.00-12.30</option>
                                                <option value="12.30-13.00">12.30-13.00</option>
                                                <option value="13.00-13.30">13.00-13.30</option>
                                                <option value="13.30-14.00">13.30-14.00</option>
                                                <option value="14.00-14.30">14.00-14.30</option>
                                                <option value="14.30-15.00">14.30-15.00</option>
                                                <option value="15.00-15.30">15.00-15.30</option>
                                                <option value="15.30-16.00">15.30-16.00</option>
                                                <option value="16.00-16.30">16.00-16.30</option>
                                                <option value="16.30-17.00">16.30-17.00</option>
                                                <option value="17.00-17.30">17.00-17.30</option>
                                                <option value="17.30-18.00">17.30-18.00</option>
                                                <option value="18.00-18.30">18.00-18.30</option>
                                                <option value="18.30-19.00">18.30-19.00</option>
                                                <option value="19.00-19.30">19.00-19.30</option>
                                                <option value="19.30-20.00">19.30-20.00</option>
                                                <option value="20.00-20.30">20.00-20.30</option>
                                                <option value="20.30-21.00">20.30-21.00</option>
                                                <option value="21.00-21.30">21.00-21.30</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="idDokter">
                                        <Form.Control required autoComplete="off"
                                        type="number" 
                                        hidden
                                        defaultValue={this.props.idDokter}
                                        onChange={this.praktekChange} 
                                        name="idDokter"
                                        placeholder="Id Dokter" />
                                    </Form.Group>
                            </Card.Body>
                            <Card.Footer style={{"textAlign":"right"}} >
                                    <Button class="btn btn-primary" type="submit" onClick={this.props.onHide}>
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

