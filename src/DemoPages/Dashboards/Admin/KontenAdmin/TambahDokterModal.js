import React from "react";
import { Modal, Button, Row, Col, Form, Card } from "react-bootstrap";
import axios from "axios";

export default class TambahDokterModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.state.show = false;
    this.tambahDokterChange = this.tambahDokterChange.bind(this);
    this.submitTambahDokter = this.submitTambahDokter.bind(this);
    // this.validate = this.validate.bind(this);
  }

  initialState = {
    namaLengkap: "",
    spesialisasi: "",
    tanggalLahir: "",
    username: "",
    email: "",
    password: "",
    passwordrep: "",
    user_role: "dokter",
  };

  validate() {
    let benar = false;
    let password = this.state.password;
    let passwordrep = this.state.passwordrep;
    let username = this.state.username;

    if (username.length <= 15) {
      this.setState({ errUsername: "" });
    } else if (username.length > 15) {
      this.setState({ errUsername: "username more than 15 characters" });
    }

    if (password.length < 6) {
      this.setState({ erorr2: "Password less than 6 characters" });
    } else if (password.length >= 6) {
      this.setState({ erorr2: "" });
    }

    if (password === passwordrep && password.length >= 6) {
      this.setState({ erorr: "" });
    } else if (password !== passwordrep) {
      this.setState({ erorr: "Password don't match" });
    }

    if (
      username.length <= 15 &&
      password.length >= 6 &&
      password === passwordrep
    ) {
      benar = true;
    }
    return benar;
  }

  submitTambahDokter = (event) => {
    event.preventDefault();
    this.validate();
    const dokter = {
      namaLengkap: this.state.namaLengkap,
      spesialisasi: this.state.spesialisasi,
      tanggalLahir: this.state.tanggalLahir,
      username: this.state.username,
    };

    const register = {
      email: this.state.email,
      fullname: this.state.namaLengkap,
      password: this.state.password,
      passwordrep: this.state.passwordrep,
      user_role: "dokter",
      username: this.state.username,
    };

    if (this.validate()) {
      console.log("Masuk validate")
      axios
        .post("http://localhost:1212/v1/app/register", register)
        .then((response) => {
          console.log(response);
          console.log(response.data);
          if (response.data != null) {
            console.log("success");
            axios
              .post("http://localhost:1212/v1/app/dokter", dokter)
              .then((response) => {
                this.props.refreshList();
                console.log(response.data.data);
                if (response.data.data != null) {
                  console.log("succes dokter")
                  alert("Data berhasil masuk!");
                  this.setState({ show: true });
                } else {
                  console.log("failed");
                  alert("Data gagal dimasukkan");
                  this.setState({ show: false });
                }
              });
          } else {
            console.log("failed register");
          }
        });
    }
  };

  tambahDokterChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    let {
      idDokter,
      namaLengkap,
      spesialisasi,
      tanggalLahir,
      username,
      email,
      password,
      passwordrep,
      user_role,
    } = this.state;
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
        className="Mymodal"
        id="modal_form"
        animation={true}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Tambah Dokter
          </Modal.Title>
        </Modal.Header>
        <Form
          onSubmit={this.submitTambahDokter}
          initialValues={{
            idDokter,
            namaLengkap,
            spesialisasi,
            tanggalLahir,
            username,
            email,
            password,
            passwordrep,
            user_role,
          }}
          enableReinitialize={true}
          id="tambahDokter"
        >
          <Modal.Body>
            <div className="container">
              <div
                style={{ display: this.state.show ? "block" : "none" }}
              ></div>

              <Form.Group as={Col} controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  required
                  autoComplete="off"
                  type="text"
                  value={this.props.username}
                  onChange={this.tambahDokterChange}
                  name="username"
                  placeholder="Username"
                />
                <span className="text-danger">{this.state.errUsername}</span>
              </Form.Group>
              <Form.Group as={Col} controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  required
                  autoComplete="off"
                  type="email"
                  value={this.props.email}
                  onChange={this.tambahDokterChange}
                  name="email"
                  placeholder="Email"
                />
              </Form.Group>
              <Form.Group as={Col} controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  required
                  autoComplete="off"
                  type="password"
                  value={this.props.password}
                  onChange={this.tambahDokterChange}
                  name="password"
                  placeholder="Password"
                />
                <span className="text-danger">{this.state.erorr2}</span>
              </Form.Group>
              <Form.Group as={Col} controlId="passwordrep">
                <Form.Label>Passwordrep</Form.Label>
                <Form.Control
                  required
                  autoComplete="off"
                  type="password"
                  value={this.props.passwordrep}
                  onChange={this.tambahDokterChange}
                  name="passwordrep"
                  placeholder="Passwordrep"
                />
                <span className="text-danger">{this.state.erorr}</span>
              </Form.Group>
              <Form.Group as={Col} controlId="namaLengkap">
                <Form.Label>Nama Lengkap</Form.Label>
                <Form.Control
                  required
                  autoComplete="off"
                  type="text"
                  defaultValue={this.props.namaLengkap}
                  onChange={this.tambahDokterChange}
                  name="namaLengkap"
                  placeholder="Nama Lengkap "
                />
              </Form.Group>
              <Form.Group as={Col} controlId="tanggalLahir">
                <Form.Label>Tanggal Lahir</Form.Label>
                <Form.Control
                  required
                  autoComplete="off"
                  type="date"
                  value={this.props.tanggalLahir}
                  onChange={this.tambahDokterChange}
                  name="tanggalLahir"
                  placeholder="Tanggal Lahir"
                />
              </Form.Group>
              <Form.Group as={Col} controlId="spesialisasi">
                <Form.Label>Spesialisasi</Form.Label>
                <Form.Control
                  required
                  autoComplete="off"
                  type="text"
                  value={this.props.spesialisasi}
                  onChange={this.tambahDokterChange}
                  name="spesialisasi"
                  placeholder="Spesialisasi"
                />
              </Form.Group>
            </div>
          </Modal.Body>
          <Modal.Footer style={{ textAlign: "right" }}>
            <Button
              class="btn btn-primary float-right"
              type="submit"
              onClick={this.props.onHide}
            >
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}
