import React, { Fragment, Component } from "react";
import { Col, Row, Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import Logo from "../../../img/logos2.png";
import bg1 from "../../../assets/img/bg1.jpg";
// Layout

export default class LoginBoxed extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.state = { logins: [] };
    this.state = { count: 0 };
    this.submitLogin = this.submitLogin.bind(this);
    this.loginChange = this.loginChange.bind(this);
    this.saveLocal = this.saveLocal.bind(this);
  }
  initialState = {
    username: "",
    password: "",
  };

  submitLogin = (event) => {
    event.preventDefault();
    this.setState((prev) => ({ count: prev.count + 1 }));
    axios
      .get(
        "http://localhost:1212/v1/app/register/login?password=" +
          this.state.password +
          "&username=" +
          this.state.username
      )
      .then((response) => response.data)
      .then((data) => {
        this.setState({ logins: data });
        if (this.state.count < 3) {
          if (this.state.logins.status === true) {
            if (this.state.logins.user_role === null) {
              alert("Password anda salah!");
              // this.props.history.push({
              //   pathname: "/pages/forgot-password",
              //   forgot: this.state.logins.username,
              // });
            } else {
              this.saveLocal();
              this.props.history.push({
                pathname: "/dashboards/" + data.user_role,
                // customName: this.state.logins,
              });
            }
          } else {
            alert("Username anda belum terdaftar");
            this.props.history.push({
              pathname: "/pages/register/",
            });
          }
        } else {
          if (this.state.logins.status === true) {
            if (this.state.logins.user_role === null) {
              alert("Password anda salah!");
              this.props.history.push({
                pathname: "/pages/forgot-password",
                forgot: this.state.logins.username,
              });
            } else {
              this.saveLocal();
              this.props.history.push({
                pathname: "/dashboards/" + data.user_role,
                // customName: this.state.logins,
              });
            }
          } else {
            alert("Username anda belum terdaftar");
            this.props.history.push({
              pathname: "/pages/register/",
            });
          }
        }
      });
    this.setState(this.initialState);
  };

  saveLocal = () => {
    localStorage.setItem(
      "username",
      JSON.stringify(this.state.logins.username)
    );
    localStorage.setItem("role", JSON.stringify(this.state.logins.user_role));
    localStorage.setItem(
      "fullname",
      JSON.stringify(this.state.logins.fullname)
    );
  };

  loginChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  render() {
    const { username, password } = this.state;
    return (
      <Fragment>
        <div
          className="h-100 bg-animation bg-black"
          style={{ backgroundImage: "url(" + bg1 + ")" }}
        >
          <div className="d-flex h-100 justify-content-center align-items-center">
            <Col md="8" className="mx-auto app-login-box">
              <div className="modal-dialog w-100 mx-auto">
                <div className="modal-content">
                  <div className="modal-body">
                    <div className="h5 modal-title text-center">
                      <img
                        src={Logo}
                        style={{ width: "150px" }}
                        className="mt-3"
                      />
                      <h4 className="mt-2">
                        <div>Selamat Datang!</div>
                        <span>Silahkan masuk untuk menggunakan akses!</span>
                      </h4>
                    </div>
                    <Form onSubmit={this.submitLogin}>
                      <Row form>
                        <Col md={12}>
                          <FormGroup>
                            <Label for="username">Username</Label>
                            <Input
                              type="text"
                              name="username"
                              id="username"
                              placeholder="Masukkan username.."
                              onChange={this.loginChange}
                              value={username}
                            />
                          </FormGroup>
                          {/* </Col> */}
                          {/* <Col md={12}> */}
                          <FormGroup>
                            <Label for="password">Password</Label>
                            <Input
                              type="password"
                              name="password"
                              id="password"
                              value={password}
                              onChange={this.loginChange}
                              placeholder="Masukkan password..."
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      {/* <FormGroup check>
                      <Input type="checkbox" name="check" id="exampleCheck" />
                      <Label for="exampleCheck" check>
                        Keep me logged in
                      </Label>
                    </FormGroup> */}
                      <Row className="divider" />
                      <div className="d-flex align-items-center">
                        <div className="ml-auto">
                          <Col md={10}>
                            <Button
                              color="primary"
                              className="btn-wide btn-pill btn-shadow btn-hover-shine"
                              size="lg"
                              type="submit"
                            >
                              {/* <Link
                            to={"/" + data.user_role}
                            className='btn btn-sm btn-outline-primary'> */}
                              Masuk
                              {/* </Link> */}
                            </Button>
                          </Col>
                        </div>
                      </div>
                    </Form>
                    {/* <div className="divider" />
                    <h6 className="mb-0">
                      No account?{" "}
                      <a
                        href="https://colorlib.com/"
                        onClick={(e) => e.preventDefault()}
                        className="text-primary"
                      >
                        Sign up now
                      </a>
                    </h6>
                  </div> */}
                    {/* <div className="modal-footer clearfix">
                    <div className="float-left">
                      <a
                        href="https://colorlib.com/"
                        onClick={(e) => e.preventDefault()}
                        className="btn-lg btn btn-link"
                      >
                        Recover Password
                      </a>
                    </div>
                    <div className="float-right">
                      <Button color="primary" size="lg">
                        Login to Dashboard
                      </Button>
                    </div>
                  </div> */}
                  </div>
                </div>
              </div>
              {/* <div className="text-center text-white opacity-8 mt-3">
                Copyright &copy; ArchitectUI 2019
              </div> */}
            </Col>
          </div>
        </div>
      </Fragment>
    );
  }
}
