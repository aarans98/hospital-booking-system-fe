import React, { Fragment, Component } from "react";

import Slider from "react-slick";

import bg1 from "../../../assets/utils/images/originals/city.jpg";
import bg2 from "../../../assets/utils/images/originals/citydark.jpg";
import bg3 from "../../../assets/utils/images/originals/citynights.jpg";

import { Col, Row, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { data } from "jquery";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.state = { logins: [] };
    this.submitLogin = this.submitLogin.bind(this);
    this.loginChange = this.loginChange.bind(this);
  }
  initialState = {
    username: "",
    password: "",
  };

  submitLogin = (event) => {
    event.preventDefault();
    axios
      .get(
        "http://localhost:2000/v1/app/register/login?password=" +
          this.state.password +
          "&username=" +
          this.state.username
      )
      .then((response) => response.data)
      .then((data) => {
        this.setState({ logins: data });
        {
          this.props.history.push("/dashboard/" + data.user_role);
        }
      });
    //   this.setState(this.initialState);
  };

  //   const redirectToReferrer = this.state.redirectToReferrer;
  //         if (redirectToReferrer === true) {
  //             return <Redirect to="/home" />
  //     }

  loginChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  render() {
    // const stat = this.state.logins.stat;
    //     if (stat === true) {
    //         return <Redirect to="/home" />
    //     }
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
    return (
      <Fragment>
        <div className='h-100'>
          <Row className='h-100 no-gutters'>
            <Col lg='4' className='d-none d-lg-block'>
              <div className='slider-light'>
                <Slider {...settings}>
                  <div className='h-100 d-flex justify-content-center align-items-center bg-plum-plate'>
                    <div
                      className='slide-img-bg'
                      style={{
                        backgroundImage: "url(" + bg1 + ")",
                      }}
                    />
                    <div className='slider-content'>
                      <h3>Perfect Balance</h3>
                      <p>
                        ArchitectUI is like a dream. Some think it's too good to
                        be true! Extensive collection of unified React Boostrap
                        Components and Elements.
                      </p>
                    </div>
                  </div>
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
                  <div className='h-100 d-flex justify-content-center align-items-center bg-sunny-morning'>
                    <div
                      className='slide-img-bg opacity-6'
                      style={{
                        backgroundImage: "url(" + bg2 + ")",
                      }}
                    />
                    <div className='slider-content'>
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
              lg='8'
              md='12'
              className='h-100 d-flex bg-white justify-content-center align-items-center'>
              <Col lg='9' md='10' sm='12' className='mx-auto app-login-box'>
                <div className='app-logo' />
                <h4 className='mb-0'>
                  <div>Welcome back,</div>
                  <span>Please sign in to your account.</span>
                </h4>
                <h6 className='mt-3'>
                  No account?{" "}
                  <Link
                    to={"/pages/register"}
                    className='btn btn-sm btn-outline-primary'>
                    Sign up now
                  </Link>{" "}
                </h6>
                <Row className='divider' />
                <div>
                  <Form onSubmit={this.submitLogin}>
                    <Row form>
                      <Col md={6}>
                        <FormGroup>
                          <Label for='username'>Username</Label>
                          <Input
                            type='text'
                            name='username'
                            id='username'
                            placeholder='Masukkan username..'
                            onChange={this.loginChange}
                            value={username}
                          />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label for='password'>Password</Label>
                          <Input
                            type='password'
                            name='password'
                            id='password'
                            value={password}
                            onChange={this.loginChange}
                            placeholder='Password here...'
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <FormGroup check>
                      <Input type='checkbox' name='check' id='exampleCheck' />
                      <Label for='exampleCheck' check>
                        Keep me logged in
                      </Label>
                    </FormGroup>
                    <Row className='divider' />
                    <div className='d-flex align-items-center'>
                      <div className='ml-auto'>
                        <a
                          href='https://colorlib.com/'
                          onClick={(e) => e.preventDefault()}
                          className='btn-lg btn btn-link'>
                          Recover Password
                        </a>{" "}
<<<<<<< HEAD
                        <Button color='primary' size='lg' type='submit'>
=======
                        <Button color="primary" size="lg" type="submit">
                          {/* <Link
                            to={"/" + data.user_role}
                            className="btn btn-sm btn-outline-primary"
                          > */}
>>>>>>> 4c6755c6898f4d804dd217cd409ab63707d1ea61
                          Login to Dashboard
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
