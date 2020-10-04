import React, { Component, Fragment, useEffect, useState } from "react";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import classnames from "classnames";
import Tabs from "react-responsive-tabs";
import axios from "axios";
import dummyData from "../../Pasien/KontenPasien/dummyData";
import bg1 from "../../../../assets/utils/images/dropdown-header/abstract1.jpg";
import avatar4 from "../../../../assets/utils/images/avatars/3.jpg";
import FormRekamMedik from "./FormRekamMedik";
import RmPagination from "../../Pasien/KontenPasien/RmPagination";

import {
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Card,
  Button,
  Container,
} from "reactstrap";

function ScheduleDokter() {
  const [posts, setPosts] = useState([]);
  const [showPerPage, setShowPerPage] = useState(3);
  const [pagination, setPagination] = useState({
    start: 0,
    end: showPerPage,
  });

  const [username, setUsername] = useState(
    localStorage.getItem("username").slice(1, -1)
  );
  const [userRole, setUserRole] = useState(
    localStorage.getItem("role").slice(1, -1)
  );

  // change of contents
  const onPaginationChange = (start, end) => {
    setPagination({ start: start, end: end });
  };

  useEffect(() => {
    // console.log(username);
    if (userRole === "dokter") {
      axios
        .get("http://localhost:1212/v1/app/jadwal/dokter/" + username)
        .then((response) => setPosts(response.data));
    }
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);

  return (
    <div>
      <Container fluid>
        <RmPagination
          showPerPage={showPerPage}
          onPaginationChange={onPaginationChange}
          total={posts.length}
        />
        <Row className='justify-content-center'>
          {posts.length === 0 ? (
            <Col>
              <p style={{ textAlign: "center" }}>
                Tidak ada janji dengan pasien.
              </p>
            </Col>
          ) : (
            posts.slice(pagination.start, pagination.end).map((post) => (
              <Col sm='4' key={post.id}>
                <Card className='card-shadow-primary profile-responsive card-border mb-3'>
                  <div className='dropdown-menu-header'>
                    <div className='dropdown-menu-header-inner bg-success'>
                      <div
                        className='menu-header-image'
                        style={{
                          backgroundImage: "url(" + bg1 + ")",
                        }}
                      />
                      <div className='menu-header-content btn-pane-right'>
                        <div className='avatar-icon-wrapper mr-2 avatar-icon-xl'>
                          <div className='avatar-icon'>
                            <img src={avatar4} alt='Avatar 5' />
                          </div>
                        </div>
                        <div>
                          <h5 className='menu-header-title'>
                            {post.nama_lengkap}
                          </h5>
                          <h6 className='menu-header-subtitle'>
                            ID: {post.idPasien}
                          </h6>
                        </div>
                        <div className='menu-header-btn-pane'>
                          <FormRekamMedik id={post.idJadwalDokter} />
                          <Button
                            size='sm'
                            className='btn-icon'
                            color='primary'>
                            View Profile
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <ListGroup flush>
                    <ListGroupItem>
                      <div className='widget-content p-0'>
                        <div className='widget-content-wrapper'>
                          <div className='widget-content-left mr-3'>
                            <div className='icon-wrapper m-0'>
                              <i className='font-icon-wrapper lnr-calendar-full icon-gradient bg-arielle-smile '></i>
                            </div>
                          </div>
                          <div className='widget-content-left'>
                            <div className='widget-heading'>
                              Tanggal Kunjungan
                            </div>
                            <div className='widget-subheading'>
                              {post.tanggalKunjungan}
                            </div>
                          </div>
                          <div className='widget-content-right'>
                            <div className='widget-numbers widget-numbers-sm text-warning'></div>
                          </div>
                        </div>
                      </div>
                    </ListGroupItem>
                    <ListGroupItem>
                      <div className='widget-content p-0'>
                        <div className='widget-content-wrapper'>
                          <div className='widget-content-left mr-3'>
                            <div className='icon-wrapper m-0'>
                              <i className='font-icon-wrapper lnr-clock icon-gradient bg-arielle-smile'></i>
                            </div>
                          </div>
                          <div className='widget-content-left'>
                            <div className='widget-heading'>Jam Kunjungan</div>
                            <div className='widget-subheading'>{post.jam}</div>
                          </div>
                          <div className='widget-content-right'>
                            <div className='widget-numbers widget-numbers-sm text-danger'></div>
                          </div>
                        </div>
                      </div>
                    </ListGroupItem>
                  </ListGroup>
                </Card>
              </Col>
            ))
          )}
        </Row>
      </Container>
    </div>
  );
}
export default ScheduleDokter;
