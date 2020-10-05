import React, { Fragment, Component } from "react";

import Slider from "react-slick";

import bg1 from "../../../assets/utils/images/originals/city.jpg";
import bg2 from "../../../assets/utils/images/originals/citydark.jpg";
import bg3 from "../../../assets/utils/images/originals/citynights.jpg";

import { Col, Row, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";

import Logo from '../../../img/logo-bahagya-long.png';

export default class Login extends Component {
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
  };

  loginChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    const { username, password } = this.state;
    let settings = {
      dots: true,
      infinite: true,
      speed: 500,
      arrows: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      fade: true,
      initialSlide: 0,
      autoplay: true,
      adaptiveHeight: true,
    };

    var style = {
      
    }
    return (
      <Fragment>
        <div className="h-100">
          <Row className="h-100 no-gutters">
            <Col lg="4" className="d-none d-lg-block">
              <div className="slider-light">
                <Slider {...settings}>
                  <div className="h-100 d-flex justify-content-center align-items-center bg-plum-plate">
                    <div
                      className="slide-img-bg"
                      style={{
                        backgroundImage: "url(" + bg1 + ")",
                      }}
                    />
                    <div className="slider-content">
                      <h3>Perfect Balance</h3>
                      <p>
                        ArchitectUI is like a dream. Some think it's too good to
                        be true! Extensive collection of unified React Boostrap
                        Components and Elements.
                      </p>
                    </div>
                  </div>
                  <div className="h-100 d-flex justify-content-center align-items-center bg-premium-dark">
                    <div
                      className="slide-img-bg"
                      style={{
                        backgroundImage: "url(" + bg3 + ")",
                      }}
                    />
                    <div className="slider-content">
                      <h3>Scalable, Modular, Consistent</h3>
                      <p>
                        Easily exclude the components you don't require.
                        Lightweight, consistent Bootstrap based styles across
                        all elements and components
                      </p>
                    </div>
                  </div>
                  <div className="h-100 d-flex justify-content-center align-items-center bg-sunny-morning">
                    <div
                      className="slide-img-bg opacity-6"
                      style={{
                        backgroundImage: "url(" + bg2 + ")",
                      }}
                    />
                    <div className="slider-content">
                      <h3>Complex, but lightweight</h3>
                      <p>
                        We've included a lot of components that cover almost all
                        use cases for any type of application.
                      </p>
                    </div>
                  </div>
                </Slider>
              </div>
            </Col>
            <Col
              lg="8"
              md="12"
              className="h-100 d-flex bg-white justify-content-center align-items-center"
            >
              <Col lg="9" md="10" sm="12" className="mx-auto app-login-box">
                {/* <div className="app-logo" /> */}
                <div>
                  <img src={Logo} />
                </div>
                <h4 className="mb-0">
                  <div>Selamat Datang!</div>
                  <span>
                    Silahkan masukkan username dan password untuk menggunakan
                    akses
                  </span>
                </h4>
                <h6 className="mt-3">
                  Tidak punya akun?{" "}
                  <Link
                    to={"/pages/register"}
                    className="btn btn-sm btn-outline-primary"
                  >
                    Daftar sekarang
                  </Link>{" "}
                </h6>
                <Row className="divider" />
                <div>
                  <Form onSubmit={this.submitLogin}>
                    <Row form>
                      <Col md={6}>
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
                      </Col>
                      <Col md={6}>
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
                          <Button color="danger" size="lg" type="submit">
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
                </div>
              </Col>
            </Col>
          </Row>
        </div>
      </Fragment>
    );
  }
}
