import React, { Fragment, Component } from "react";

import Slider from "react-slick";

import bg1 from "../../../assets/utils/images/originals/city.jpg";
import bg2 from "../../../assets/utils/images/originals/citydark.jpg";
import bg3 from "../../../assets/utils/images/originals/citynights.jpg";

import { Col, Row, Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";

export default class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.state = { newpassword: [] };
    this.state = { mails: [] };
    this.updateLogin = this.updateLogin.bind(this);
    this.forgotChange = this.forgotChange.bind(this);
  }

  initialState = {
    username: "",
    password: "",
    passwordrep: "",
    emailauth: "",
  };

  componentDidMount() {
    axios
      .get(
        "http://localhost:1212/v1/app/register/authmail?username=" +
          this.props.location.forgot
      )
      .then((response) => response.data)
      .then((data) => {
        this.setState({ mails: data });
        console.log(this.state.mails.mail);
      });
  }

  updateLogin = (event) => {
    event.preventDefault();
    const newpassword = {
      password: this.state.password,
      passwordrep: this.state.passwordrep,
      username: this.props.location.forgot,
    };
    if (this.state.emailauth === this.state.mails.mail) {
      axios
        .post(
          "http://localhost:1212/v1/app/register/forgot?password=" +
            this.state.password +
            "&username=" +
            this.props.location.forgot,
          newpassword
        )
        .then((response) => response.data)
        .then((data) => {
          {
            this.props.history.push({
              pathname: "/pages/login",
            });
          }
        });
    } else {
      alert(
        "Email anda bukan email yang didaftarkan untuk username " +
          this.props.location.forgot
      );
    }
    this.setState(this.initialState);
  };

  forgotChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  render() {
    const { password, passwordrep, emailauth } = this.state;
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
              <Col lg="6" md="8" sm="12" className="mx-auto app-login-box">
                <div className="app-logo" />
                <h4>
                  <div>Forgot your Password?</div>
                  <span>Use the form below to recover it.</span>
                </h4>
                <div>
                  <Form onSubmit={this.updateLogin}>
                    <Row form>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="username">Username</Label>
                          <Input
                            disabled
                            type="text"
                            name="username"
                            id="username"
                            placeholder="Masukkan username.."
                            defaultValue={this.props.location.forgot}
                          />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="email">Masukkan email: </Label>
                          <Input
                            type="text"
                            name="email"
                            id="email"
                            placeholder="Masukkan email..."
                            value={emailauth}
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
                            onChange={this.forgotChange}
                            placeholder="Masukkan password baru..."
                          />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="password">Ulangi password</Label>
                          <Input
                            type="passwordrep"
                            name="passwordrep"
                            id="passwordrep"
                            value={passwordrep}
                            onChange={this.forgotChange}
                            placeholder="Ketik ulang password baru..."
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row className="divider" />
                    <div className="d-flex align-items-center">
                      <div className="ml-auto">
                        <Button color="primary" size="lg" type="submit">
                          {/* <Link
                            to={"/" + data.user_role}
                            className='btn btn-sm btn-outline-primary'> */}
                          Ubah
                          {/* </Link> */}
                        </Button>
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
