import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardLink,
  CardHeader,
  CardFooter,
  Container,
} from "reactstrap";
import axios from "axios";
import RmPagination from "./RmPagination";

function RekamMedik() {
  //empty array in useState means the initial value of posts
  const [posts, setPosts] = useState([]);
  const [showPerPage, setShowPerPage] = useState(3);
  const [pagination, setPagination] = useState({
    start: 0,
    end: showPerPage,
  });

  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [userRole, setUserRole] = useState(localStorage.getItem("role"));

  const onPaginationChange = (start, end) => {
    setPagination({ start: start, end: end });
  };

  useEffect(() => {
    // console.log(username);
    if (userRole === "pasien") {
      axios
        .get("http://localhost:1212/v1/app/rekam-medik/pasien/" + username)
        .then((response) => setPosts(response.data));
    } else if (userRole === "dokter") {
      axios
        .get("http://localhost:1212/v1/app/rekam-medik/dokter/" + username)
        .then((response) => setPosts(response.data));
    }
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, [posts]);

  const margin = {
    marginTop: "5px",
    marginBottom: "5px",
  };
  // empty dependency array means this effect will only run once (like componentDidMount in classes)

  return (
    <div>
      <Container fluid>
        <RmPagination
          showPerPage={showPerPage}
          onPaginationChange={onPaginationChange}
          total={posts.length}
        />
        <Row>
          {posts.length === 0 ? (
            <Col>
              <p style={{ textAlign: "center" }}>
                Data rekam medik tidak tersedia.
              </p>
            </Col>
          ) : (
            posts.slice(pagination.start, pagination.end).map((post) => (
              <Col md="4" key={post.id}>
                <Card className="main-card mb-5">
                  <CardBody style={{ fontSize: "14px" }}>
                    {/* <Row>
                                            <Col sm={4}>
                                                <p>ID Rekam Medik </p>
                                            </Col>
                                            <Col sm={8}>
                                                <p>{": " + post.id}</p>
                                            </Col>
                                        </Row> */}
                    <Row>
                      <Col sm={4}>
                        <p style={margin}>Nama Pasien</p>
                      </Col>
                      <Col sm={8}>
                        <p style={margin}>{": " + post.namaPasien}</p>
                      </Col>
                    </Row>
                    <hr style={margin} />
                    <Row>
                      <Col sm={4}>
                        <p style={margin}>Tanggal Lahir</p>
                      </Col>
                      <Col sm={8}>
                        <p style={margin}>{": " + post.tanggalLahir}</p>
                      </Col>
                    </Row>
                    <hr style={margin} />
                    <Row>
                      <Col sm={4}>
                        <p style={margin}>Usia</p>
                      </Col>
                      <Col sm={8}>
                        <p style={margin}>{": " + post.usia}</p>
                      </Col>
                    </Row>
                    <hr style={margin} />
                    <Row>
                      <Col sm={4}>
                        <p style={margin}>Nama Dokter</p>
                      </Col>
                      <Col sm={8}>
                        <p style={margin}>{": " + post.namaDokter}</p>
                      </Col>
                    </Row>
                    <hr style={margin} />
                    <Row>
                      <Col sm={4}>
                        <p style={margin}>Spesialisasi</p>
                      </Col>
                      <Col sm={8}>
                        <p style={margin}>{": " + post.spesialisasi}</p>
                      </Col>
                    </Row>
                    <hr style={margin} />
                    <Row>
                      <Col sm={4}>
                        <p style={margin}>Gejala</p>
                      </Col>
                      <Col sm={8}>
                        <p style={margin}>{": " + post.gejala}</p>
                      </Col>
                    </Row>
                    <hr style={margin} />
                    <Row>
                      <Col sm={4}>
                        <p style={margin}>Poli</p>
                      </Col>
                      <Col sm={8}>
                        <p style={margin}>{": " + post.poli}</p>
                      </Col>
                    </Row>
                    <hr style={margin} />
                    <Row>
                      <Col sm={4}>
                        <p style={margin}>Jadwal</p>
                      </Col>
                      <Col sm={8}>
                        <p style={margin}>{": " + post.jadwal}</p>
                      </Col>
                    </Row>
                    <hr style={margin} />
                    <Row>
                      <Col sm={4}>
                        <p style={margin}>Jam</p>
                      </Col>
                      <Col sm={8}>
                        <p style={margin}>{": " + post.jam}</p>
                      </Col>
                    </Row>
                    <hr style={margin} />
                    <Row>
                      <Col sm={4}>
                        <p style={margin}>Tinggi Badan</p>
                      </Col>
                      <Col sm={8}>
                        <p style={margin}>{": " + post.tinggiBadan}</p>
                      </Col>
                    </Row>
                    <hr style={margin} />
                    <Row>
                      <Col sm={4}>
                        <p style={margin}>Berat Badan</p>
                      </Col>
                      <Col sm={8}>
                        <p style={margin}>{": " + post.beratBadan}</p>
                      </Col>
                    </Row>
                    <hr style={margin} />
                    <Row>
                      <Col sm={4}>
                        <p style={margin}>Diagnosa</p>
                      </Col>
                      <Col sm={8}>
                        <p style={margin}>{": " + post.diagnosa}</p>
                      </Col>
                    </Row>
                    <hr style={margin} />
                    <Row>
                      <Col sm={4}>
                        <p style={margin}>Nama Obat</p>
                      </Col>
                      <Col sm={8}>
                        <p style={margin}>{": " + post.namaObat}</p>
                      </Col>
                    </Row>
                    <hr style={margin} />
                    <Row>
                      <Col sm={4}>
                        <p style={margin}>Deskripsi</p>
                      </Col>
                      <Col sm={8}>
                        <p style={margin}>{": " + post.deskripsi}</p>
                      </Col>
                    </Row>
                    <hr style={margin} />
                    <Row>
                      <Col sm={4}>
                        <p style={margin}>Dosis</p>
                      </Col>
                      <Col sm={8}>
                        <p style={margin}>{": " + post.dosis}</p>
                      </Col>
                    </Row>
                    <hr style={margin} />
                  </CardBody>
                </Card>
              </Col>
            ))
          )}
        </Row>
      </Container>
    </div>
  );
}

export default RekamMedik;
