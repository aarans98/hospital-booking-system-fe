import React from "react";
// import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Card,
//     CardHeader, CardBody, CardFooter, Row, Col, Form } from 'reactstrap';
import { Modal, Button, Row, Col, Form, Card } from "react-bootstrap";
import axios from "axios";

export class AddModalKunjungan extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.state.show = false;
    this.kunjunganChange = this.kunjunganChange.bind(this);
    this.submitKunjungan = this.submitKunjungan.bind(this);
  }

  initialState = {
    alamat: "",
    berat_badan: "",
    idDokter: "",
    idPraktek: "",
    jenis_kelamin: "",
    nama_lengkap: "",
    tanggal_lahir: "",
    tinggi_badan: "",
    username: "",
    jenis_kelamin: "",
    usia: "",
  };

  submitKunjungan = (event) => {
    event.preventDefault();
    const pasien = {
      alamat: this.state.alamat,
      berat_badan: this.state.berat_badan,
      idDokter: this.state.idDokter,
      idPraktek: this.state.idPraktek,
      jenis_kelamin: this.state.jenis_kelamin,
      nama_lengkap: this.state.nama_lengkap,
      jenis_kelamin: this.state.jenis_kelamin,
      tanggal_lahir: this.state.tanggal_lahir,
      tinggi_badan: this.state.tinggi_badan,
      username: this.state.username,
      usia: this.state.usia,
    };

    axios
      .post("http://localhost:1212/v1/app/pasien", pasien)
      .then((response) => {
        if (response.data != null) {
          this.setState({ show: true });
          setTimeout(() => this.setState({ show: false }), 3000);
          alert("Data berhasil masuk!");
        } else {
          this.setState({ show: false });
        }
      });
    this.setState(this.initialState);
  };
  kunjunganChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    const {
      alamat,
      berat_badan,
      idDokter,
      idPraktek,
      jenis_kelamin,
      nama_lengkap,
      tanggal_lahir,
      tinggi_badan,
      username,
      usia,
    } = this.state;
    return (
      <Modal
        {...this.props}
        size="lg"
        backdrop="static"
        className="Mymodal"
        id="modal_form"
        animation={true}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            FORM KUNJUNGAN
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div style={{ display: this.state.show ? "block" : "none" }}></div>
            <Card border="light">
              <Card.Header> Pasien </Card.Header>
              <Form
                onSubmit={this.submitKunjungan}
                enableReinitialize={true}
                id="idPasien"
              >
                <Card.Body>
                  <Form.Group as={Col} controlId="idPraktek">
                    <Form.Label>Id Praktek</Form.Label>
                    <Form.Control
                      required
                      autoComplete="off"
                      type="number"
                      defaultValue={this.props.idPraktek}
                      onChange={this.kunjunganChange}
                      name="idPraktek"
                      placeholder="Id Praktek"
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="idDokter">
                    <Form.Label>Id Dokter</Form.Label>
                    <Form.Control
                      required
                      autoComplete="off"
                      type="number"
                      defaultValue={this.props.idDokter}
                      onChange={this.kunjunganChange}
                      name="idDokter"
                      placeholder="Id Dokter"
                    />
                  </Form.Group>
                  {/* <Form.Group as={Col} controlId="idPasien">
                                        <Form.Label>Id</Form.Label>
                                        <Form.Control required autoComplete="off"
                                        type="number"
                                        value={this.props.idPasien}
                                        onChange={this.praktekChange} 
                                        name="idPasien"
                                        placeholder="Id Pasien" />
                                    </Form.Group> */}
                  <Form.Group as={Col} controlId="nama_lengkap">
                    <Form.Label>Nama Lengkap</Form.Label>
                    <Form.Control
                      required
                      autoComplete="off"
                      type="text"
                      value={this.props.namaLengkap}
                      onChange={this.kunjunganChange}
                      name="namaLengkap"
                      placeholder="Nama Lengkap"
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="jenis_kelamin">
                    <Form.Label>Jenis Kelamin</Form.Label>
                    <Form.Control
                      required
                      autoComplete="off"
                      type="text"
                      value={this.props.jenis_kelamin}
                      onChange={this.kunjunganChange}
                      name="jenis_kelamin"
                      placeholder="Jenis Kelamin"
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="tanggal_lahir">
                    <Form.Label>Tanggal Lahir</Form.Label>
                    <Form.Control
                      required
                      autoComplete="off"
                      type="date"
                      value={this.props.tanggal_lahir}
                      onChange={this.kunjunganChange}
                      name="tanggal_lahir"
                      placeholder="Tanggal Lahir"
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="tinggi_badan">
                    <Form.Label>Tinggi Badan</Form.Label>
                    <Form.Control
                      required
                      autoComplete="off"
                      type="number"
                      value={this.props.tinggi_badan}
                      onChange={this.kunjunganChange}
                      name="tinggi_badan"
                      placeholder="Tinggi Badan"
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="berat_badan">
                    <Form.Label>Berat Badan</Form.Label>
                    <Form.Control
                      required
                      autoComplete="off"
                      type="number"
                      value={this.props.berat_badan}
                      onChange={this.kunjunganChange}
                      name="berat_badan"
                      placeholder="Berat Badan"
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="user_name">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control
                      required
                      autoComplete="off"
                      type="text"
                      value={this.props.username}
                      onChange={this.kunjunganChange}
                      name="user_name"
                      placeholder="User Name"
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="usia">
                    <Form.Label>Usia</Form.Label>
                    <Form.Control
                      required
                      autoComplete="off"
                      type="number"
                      value={this.props.usia}
                      onChange={this.kunjunganChange}
                      name="usia"
                      placeholder="Usia"
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="alamat">
                    <Form.Label>Alamat</Form.Label>
                    <Form.Control
                      required
                      autoComplete="off"
                      type="text"
                      value={this.props.alamat}
                      onChange={this.kunjunganChange}
                      name="alamat"
                      placeholder="Alamat"
                    />
                  </Form.Group>
                </Card.Body>
                <Card.Footer style={{ textAlign: "right" }}>
                  <Button
                    class="btn btn-primary"
                    type="submit"
                    onClick={this.props.onHide}
                  >
                    Save
                  </Button>{" "}
                </Card.Footer>
              </Form>
            </Card>
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    );
  }
}
