import React from 'react';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
  Form, FormGroup, Label, Input, Container, Col, Row
} from 'reactstrap';
import axios from 'axios';
import { Multiselect, DropdownList } from 'react-widgets';
import Swal from 'sweetalert2';

class FormRekamMedik extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.toggle = this.toggle.bind(this);
  }

  initialState = {
    disable: false,
    modal: false,
    valueObat: [],
    obat: [],
    idRekamMedik: '',
    tinggiBadan: '',
    beratBadan: '',
    gejala: '',
    diagnosa: '',
    dosis: '',
    submittedData: [],
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  componentDidMount() {
    // this.findAllIdRm();
    this.findAllObat();
    this.findAllIdJadwal();
  }

  findAllIdRm = () => {
    axios.get("http://localhost:1212/v1/app/rekam-medik/jumlah")
      .then(response => {
        console.log(response.data);
        this.setState({ idRekamMedik: response.data + 1});
      })
  }

  findAllObat = () => {
    axios.get("http://localhost:1212/v1/app/obat")
      .then(response => {
        let namaObat = new Array();
        response.data.data.map(ob => namaObat.push(ob.namaObat))
        this.setState({ obat: namaObat });
      })
  }

  findAllIdJadwal = () => {
    axios.get("http://localhost:1212/v1/app/rekam-medik/jadwal/idJadwal")
      .then(response => {
        this.setState({ submittedData: response.data });
      })
  }

  formChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
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

  submitRekamMedik = (event) => {
    event.preventDefault();

    let { valueObat, idRekamMedik, tinggiBadan, beratBadan, gejala, diagnosa, dosis } = this.state;

    const rekam_medik = {
      id: idRekamMedik,
      idPasien: event.target.idPasien.value,
      idJadwal: event.target.idJadwal.value,
      tinggiBadan: tinggiBadan,
      beratBadan: beratBadan,
      gejala: gejala,
      namaObat: valueObat,
      diagnosa: diagnosa,
      dosis: dosis,
    };

    console.log(rekam_medik);

    axios.post("http://localhost:1212/v1/app/rekam-medik/trx", rekam_medik)
      .then(response => {
        console.log(response.data);
        this.setState({disable: true});
        this.findAllObat();
        this.handleClick();
      });
    this.setState(this.initialState);
  }

  render() {
    let { valueObat, obat, idRekamMedik, tinggiBadan, beratBadan, gejala, diagnosa, dosis, submittedData } = this.state;
    return (
      <span>
        <Button size='sm' className='btn-icon mr-2' color='warning' disabled={submittedData.includes(this.props.id) ? true : this.state.disable} onClick={() => {this.findAllIdRm(); this.toggle();}}>
          <i className='lnr-file-add btn-icon-wrapper'> </i>
          Rekam Medik
        </Button>
        <Modal size="lg" isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} backdrop={'static'}>
          <ModalHeader toggle={this.toggle}>FORM REKAM MEDIK PASIEN</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.submitRekamMedik}>
              <FormGroup row>
                <Label for="idRekamMedik" sm={2}>ID Rekam Medik</Label>
                <Col sm={10}>
                  <Input disabled required type="number" name="idRekamMedik" id="idRekamMedik"
                    min="1" defaultValue={idRekamMedik} onChange={this.formChange} placeholder="ID Rekam Medik" />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="idPasien" sm={2}>ID Pasien</Label>
                <Col sm={10}>
                  <Input disabled required type="number" name="idPasien" id="idPasien"
                    min="1" defaultValue={this.props.id} />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="idJadwal" sm={2}>ID Jadwal</Label>
                <Col sm={10}>
                  <Input disabled required type="number" name="idJadwal" id="idJadwal"
                    min="1" defaultValue={this.props.id} />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="tinggiBadan" sm={2}>Tinggi Badan</Label>
                <Col sm={10}>
                  <Input required type="number" name="tinggiBadan" id="tinggiBadan"
                    min="0" value={tinggiBadan} onChange={this.formChange} placeholder="Tinggi Badan" />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="beratBadan" sm={2}>Berat Badan</Label>
                <Col sm={10}>
                  <Input required type="number" name="beratBadan" id="beratBadan"
                    min="0" value={beratBadan} onChange={this.formChange} placeholder="Berat Badan" />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="gejala" sm={2}>Gejala</Label>
                <Col sm={10}>
                  <Input required type="textarea" name="gejala" id="gejala" value={gejala}
                    onChange={this.formChange} placeholder="Gejala" />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="diagnosa" sm={2}>Diagnosa</Label>
                <Col sm={10}>
                  <Input required type="textarea" name="diagnosa" id="diagnosa" value={diagnosa}
                    onChange={this.formChange} placeholder="Diagnosa" />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="namaObat" sm={2}>Nama Obat</Label>
                <Col sm={10}>
                  <Multiselect
                    data={obat}
                    value={valueObat}
                    allowCreate="onFilter"
                    onChange={valueObat => this.setState({ valueObat })}
                    textField="name"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="dosis" sm={2}>Dosis</Label>
                <Col sm={10}>
                  <Input type="textarea" name="dosis" value={dosis}
                    onChange={this.formChange} id="dosis" placeholder="Dosis" />
                </Col>
              </FormGroup>
              <FormGroup check row style={{ display: "flex", justifyContent: "space-around" }}>
                <Button color="primary" onClick={this.toggle}>Batal</Button>
                <Button type="submit">Kirim</Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </span>
    );
  }
}

export default FormRekamMedik;
