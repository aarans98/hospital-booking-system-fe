import React, { Component } from 'react';
import {Modal, Button, Col, Form, Card} from 'react-bootstrap';
import axios from 'axios';


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
        alert("Data berhasil di update");
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
                    this.setState({"show":true});
                    setTimeout(() => this.setState({"show":false}), 1500);
                } else {
                    this.setState({"show":false});
                }
            });
        this.setState(this.initialState);
    };

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
                            initialValues={{ idPraktek, poli, jam,
                                jadwal, idDokter}}
                            enableReinitialize={true}
                            id="praktek">
                            <Card.Body>
                                    <Form.Group as={Col} controlId="idStaf">
                                        <Form.Label>Id</Form.Label>
                                        <Form.Control required autoComplete="off"
                                        type="number"
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
                                            <option value="08.30-10.00">08.30-10.00</option>
                                            <option value="10.00-11.30">10.00-11.30</option>
                                            <option value="11.30-12.00">11.30-12.00</option>
                                            <option value="12.00-13.30">12.00-13.30</option>
                                            <option value="13.30-15.00">13.30-15.00</option>
                                            <option value="13.30-15.00">15.00-16.30</option>
                                            <option value="16.30-18.00">16.30-18.00</option>
                                            <option value="18.00-19.30">18.00-19.30</option>
                                            <option value="19.30-21.00">19.30-21.00</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="idDokter">
                                        <Form.Label>Id Dokter</Form.Label>
                                        <Form.Control required autoComplete="off"
                                        type="number" 
                                        defaultValue={this.props.idDokter}
                                        onChange={this.praktekChange} 
                                        name="idDokter"
                                        placeholder="Id Dokter" />
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

