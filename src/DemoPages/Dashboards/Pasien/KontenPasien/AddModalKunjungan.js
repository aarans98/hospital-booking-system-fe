import React from "react";
import { CustomInput } from "reactstrap";
import { Modal, Button, Row, Col, Form, Card } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

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
    username: localStorage.getItem("username").slice(1, -1),
    jenis_kelamin: "",
    usia: "",
  };

  submitKunjungan = (event) => {
    event.preventDefault();
    const pasien = {
      alamat: this.state.alamat,
      berat_badan: this.state.berat_badan,
      idDokter: event.target.idDokter.value,
      idPraktek: event.target.idPraktek.value,
      jenis_kelamin: this.state.jenis_kelamin,
      nama_lengkap: this.state.nama_lengkap,
      jenis_kelamin: this.state.jenis_kelamin,
      tanggal_lahir: this.state.tanggal_lahir,
      tinggi_badan: this.state.tinggi_badan,
      username: this.state.username,
      usia: this.state.usia,
    };

    console.log(pasien);

    axios
      .post("http://localhost:1212/v1/app/pasien", pasien)
      .then((response) => {
        if (response.data != null) {
          this.setState({ show: true });
          setTimeout(() => this.setState({ show: false }), 3000);
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            onOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });
          Toast.fire({
            icon: "success",
            title: "Anda sudah membuat jadwal!",
          });
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
    // username = localStorage.getItem("username").slice(1, -1);
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
                      disabled
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
                      disabled
                      autoComplete="off"
                      type="number"
                      defaultValue={this.props.idDokter}
                      onChange={this.kunjunganChange}
                      name="idDokter"
                      placeholder="Id Dokter"
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="user_name">
                    <Form.Label>Nama Pengguna</Form.Label>
                    <Form.Control
                      disabled
                      autoComplete="off"
                      type="text"
                      value={this.state.username}
                      onChange={this.kunjunganChange}
                      name="username"
                      placeholder="Nama pengguna"
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="nama_lengkap">
                    <Form.Label>Nama Lengkap</Form.Label>
                    <Form.Control
                      required
                      autoComplete="off"
                      type="text"
                      value={this.state.nama_lengkap}
                      onChange={this.kunjunganChange}
                      name="nama_lengkap"
                      placeholder="Nama Lengkap"
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="jenis_kelamin">
                    <Form.Label for="exampleCheckbox">Jenis Kelamin</Form.Label>
                    <div>
                      <CustomInput
                        type="radio"
                        id="laki_laki"
                        name="jenis_kelamin"
                        label="Laki-laki"
                        value="Laki-laki"
                        onChange={this.kunjunganChange}
                      />
                      <CustomInput
                        type="radio"
                        id="perempuan"
                        name="jenis_kelamin"
                        label="Perempuan"
                        value="Perempuan"
                        onChange={this.kunjunganChange}
                      />
                    </div>
                  </Form.Group>
                  <Form.Group as={Col} controlId="tanggal_lahir">
                    <Form.Label>Tanggal Lahir</Form.Label>
                    <Form.Control
                      required
                      autoComplete="off"
                      type="date"
                      value={this.state.tanggal_lahir}
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
                      min="0"
                      type="number"
                      value={this.state.tinggi_badan}
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
                      min="0"
                      type="number"
                      value={this.state.berat_badan}
                      onChange={this.kunjunganChange}
                      name="berat_badan"
                      placeholder="Berat Badan"
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="usia">
                    <Form.Label>Usia</Form.Label>
                    <Form.Control
                      required
                      autoComplete="off"
                      min="0"
                      type="number"
                      value={this.state.usia}
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
                      value={this.state.alamat}
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
                    Kirim
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
