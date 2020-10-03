import React, { Fragment, Component } from "react";
import axios from "axios";

import Slider from "react-slick";
import Login from "../../UserPages/Login/index";

import bg3 from "../../../assets/img/medical.jpg";

import { Col, Row, Button, Form, FormGroup, Label, Input } from "reactstrap";
import SweetAlert from "sweetalert-react";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
    this.state = this.initialState;
    // this.state = { errors: [] };
  }

  initialState = {
    user_role: "pasien",
    username: "",
    password: "",
    passwordrep: "",
    email: "",
    fullname: "",
    erorr: "",
    erorr2: "",
    errUsername: "",
  };

  validate() {
    let benar = false;
    let password = this.state.password;
    let passwordrep = this.state.passwordrep;
    let username = this.state.username;

    if (
      username.length <= 15 &&
      password.length >= 6 &&
      password.length < 13 &&
      /^[a-z0-9._]{2,}$/i.test(username) &&
      password === passwordrep
    ) {
      benar = true;
    }

    if (username.length <= 15) {
      this.setState({ errUsername: "" });
    } else if (username.length > 15) {
      this.setState({ errUsername: "username more than 15 characters" });
    }

    if (password.length < 6) {
      this.setState({ erorr2: "Password less than 6 characters" });
    } else if (password.length >= 6 && password.length < 13) {
      this.setState({ erorr2: "" });
    } else if (password.length > 12) {
      this.setState({ erorr2: "  Password more than 12 characters" });
    }

    if (password === passwordrep && password.length >= 6) {
      this.setState({ erorr: "" });
    } else if (password !== passwordrep) {
      this.setState({ erorr: "Password don't match" });
    }

    if (!/^[a-z0-9._]{2,}$/i.test(username)) {
      this.setState({ errUsername: "username is invalid" });
      benar = false;
    }

    return benar;
  }

  submitAkun = (event) => {
    event.preventDefault();
    this.validate();

    const register = {
      user_role: this.state.user_role,
      username: this.state.username,
      password: this.state.password,
      passwordrep: this.state.passwordrep,
      email: this.state.email,
      fullname: this.state.fullname,
    };

    if (this.validate()) {
      axios
        .post("http://localhost:1212/v1/app/register", register)
        .then((response) => {
          if (response.data != null) {
            this.setState(this.initialState);
            this.setState({ show: true });
            //   alert(response.data.message);
          }
        });
    }
  };

  formChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const {
      username,
      email,
      password,
      user_role,
      passwordrep,
      fullname,
    } = this.state;
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
        <div className='h-100'>
          <Row className='h-100 no-gutters'>
            <SweetAlert
              title='Your Account Has Been Registered!'
              confirmButtonColor=''
              show={this.state.show}
              text='Thank You'
              type='success'
              onConfirm={() => this.setState({ show: false })}
            />

            <Col
              lg='7'
              md='12'
              className='h-100 d-md-flex d-sm-block bg-white justify-content-center align-items-center'>
              <Col lg='9' md='10' sm='12' className='mx-auto app-login-box'>
                <div className='app-logo' />
                <h4>
                  <div>Welcome,</div>
                  <span>
                    It only takes a{" "}
                    <span className='text-success'>few seconds</span> to create
                    your account
                  </span>
                </h4>
                <div>
                  <Form onSubmit={this.submitAkun}>
                    <Row form>
                      <Col md={6}>
                        <FormGroup>
                          <Label for='exampleName'>
                            <span className='text-danger'>*</span> Nama Lengkap
                          </Label>
                          <Input
                            onChange={this.formChange}
                            value={fullname}
                            type='text'
                            name='fullname'
                            id='exampleName'
                            placeholder='Nama Lengkap here...'
                            required
                          />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <Input
                          value={user_role}
                          type='text'
                          name='user_role'
                          id='text'
                          hidden
                        />

                        <FormGroup>
                          <Label for='exampleEmail'>
                            <span className='text-danger'>*</span> Email
                          </Label>
                          <Input
                            onChange={this.formChange}
                            value={email}
                            type='email'
                            name='email'
                            id='exampleEmail'
                            placeholder='Email here...'
                            required
                          />
                        </FormGroup>
                      </Col>

                      <Col md={6}>
                        <FormGroup>
                          <Label for='exampleName'>
                            <span className='text-danger'>*</span> Username
                          </Label>
                          <Input
                            onChange={this.formChange}
                            value={username}
                            type='text'
                            name='username'
                            id='exampleName'
                            placeholder='Username here...'
                            required
                          />
                          <span className='text-danger'>
                            {this.state.errUsername}
                          </span>
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label for='examplePassword'>
                            <span className='text-danger'>*</span> Password
                          </Label>
                          <Input
                            onChange={this.formChange}
                            value={password}
                            type='password'
                            name='password'
                            id='examplePassword'
                            placeholder='Password here...'
                            required
                          />
                          <span className='text-danger'>
                            {this.state.erorr2}
                          </span>
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label for='examplePasswordRep'>
                            <span className='text-danger'>*</span> Repeat
                            Password
                          </Label>
                          <Input
                            onChange={this.formChange}
                            value={passwordrep}
                            type='password'
                            name='passwordrep'
                            id='examplePasswordRep'
                            placeholder='Repeat Password here...'
                            required
                          />
                          <span className='text-danger'>
                            {this.state.erorr}
                          </span>
                        </FormGroup>
                      </Col>
                    </Row>

                    <div className='mt-4 d-flex align-items-center'>
                      <h5 className='mb-0'>
                        Already have an account?{" "}
                        <a
                          href='http://localhost:3000/#/pages/login'
                          className='text-primary'>
                          Sign in
                        </a>
                      </h5>
                      <div className='ml-auto'>
                        <Button
                          type='submit'
                          color='primary'
                          className='btn-wide btn-pill btn-shadow btn-hover-shine'
                          size='lg'>
                          Create Account
                        </Button>
                      </div>
                    </div>
                  </Form>
                </div>
              </Col>
            </Col>
            <Col lg='5' className='d-lg-flex d-xs-none'>
              <div className='slider-light'>
                <Slider {...settings}>
                  <div className='h-100 d-flex justify-content-center align-items-center bg-premium-dark'>
                    <div
                      className='slide-img-bg'
                      style={{
                        backgroundImage: "url(" + bg3 + ")",
                      }}
                    />
                    <div className='slider-content'>
                      <h3>Scalable, Modular, Consistent</h3>
                      <p>
                        Easily exclude the components you don't require.
                        Lightweight, consistent Bootstrap based styles across
                        all elements and components
                      </p>
                    </div>
                  </div>
                </Slider>
              </div>
            </Col>
          </Row>
        </div>
      </Fragment>
    );
  }
}
