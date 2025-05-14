import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Tab,
  Carousel,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import "./home.css";
import Scrolltotop from "./Scrolltotop";
function Home() {
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [newMovies, setNewMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [newTvShows, setNewTvShows] = useState([]);
  const [popularTvShows, setPopularTvShows] = useState([]);
  const [activeKey, setActiveKey] = useState("movies");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await axios.get(
        "http://www.omdbapi.com/?s=batman&apikey=fd765352&type=movie"
      );
      setMovies(res.data.Search);
    };
    const fetchTvShows = async () => {
      const res = await axios.get(
        "http://www.omdbapi.com/?s=batman&apikey=fd765352&type=series"
      );
      setTvShows(res.data.Search);
    };
    const fetchNewMovies = async () => {
      const res = await axios.get(
        "http://www.omdbapi.com/?s=2023&apikey=fd765352&type=movie"
      );
      setNewMovies(res.data.Search);
    };
    const fetchPopularMovies = async () => {
      const res = await axios.get(
        "http://www.omdbapi.com/?s=popular&apikey=fd765352&type=movie"
      );
      setPopularMovies(res.data.Search);
    };
    const fetchNewTvShows = async () => {
      const res = await axios.get(
        "http://www.omdbapi.com/?s=2023&apikey=fd765352&type=series"
      );
      setNewTvShows(res.data.Search);
    };
    const fetchPopularTvShows = async () => {
      const res = await axios.get(
        "http://www.omdbapi.com/?s=popular&apikey=fd765352&type=series"
      );
      setPopularTvShows(res.data.Search);
    };

    fetchMovies();
    fetchTvShows();
    fetchNewMovies();
    fetchPopularMovies();
    fetchNewTvShows();
    fetchPopularTvShows();
  }, []);

  const featuredItems = [
    {
      title: "Avengers: Endgame",
      description:
        "The Avengers unite to battle their most powerful enemy yet — Thanos.",
      videoUrl: "https://www.youtube.com/embed/TcMBFSGVi1c",
      type: "movie",
      posterUrl:
        "https://m.media-amazon.com/images/I/91c-Jf2RxeL._AC_SY679_.jpg", // Example poster image
    },
    {
      title: "Batman Begins",
      description:
        "Bruce Wayne begins his journey to becoming Batman and fights Gotham's criminal underworld.",
      videoUrl: "https://www.youtube.com/embed/neY2xVmOfUM",
      type: "movie",
      posterUrl:
        "https://m.media-amazon.com/images/I/71Gf98-UwZL._AC_SY679_.jpg", 
    },
    {
      title: "Breaking Bad",
      description:
        "A high school chemistry teacher turns to making meth to support his family.",
      videoUrl: "https://www.youtube.com/embed/HhesaQXLuRY",
      type: "tv",
      posterUrl:
        "https://m.media-amazon.com/images/I/91DEZmFV1bL._AC_SY679_.jpg", 
    },
    {
      title: "Stranger Things",
      description:
        "A group of kids in a small town uncover supernatural mysteries and confront dangerous creatures.",
      videoUrl: "https://www.youtube.com/embed/b9EkMc79ZSU", 
      type: "series", 
      posterUrl:
        "https://m.media-amazon.com/images/I/81O5u5dLUoL._AC_SY679_.jpg", 
    },
  ];
  return (
    <div variant="dark" className="bg-dark">
      <Container fluid className="p-0">
        {/* carousel */}
        <Carousel fade interval={5000}>
          {/* Autoplay every 5 seconds */}
          {featuredItems.map((item, index) => (
            <Carousel.Item key={index}>
              <div className="carousel-item-container">
                <div className="carousel-video-container">
                  <div className="carousel-overlay">
                    <div className="carousel-caption-overlay text-start">
                      <h5>{item.title}</h5>
                      <p>{item.description}</p>
                      <Button
                        variant="danger"
                        onClick={() => window.open(item.videoUrl, "_blank")}
                      >
                        Watch Now
                      </Button>
                    </div>
                  </div>
                  <iframe
                    src={item.videoUrl}
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={item.title}
                    className="carousel-video"
                  />
                </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>
      {/* carousel complete */}

      {/*  New Releases  */}
      <Container>
        <Tab.Container
          id="left-tabs-example"
          activeKey={activeKey}
          onSelect={(k) => setActiveKey(k)}
        >
          <Tab.Content>
            <Tab.Pane eventKey="movies">
              <h1 className="font-weight-bold text-white pt-4">
            🎬 New Releases
              </h1>
              <Row>
                {newMovies?.map((movie) => (
                  <Col
                    key={movie.imdbID}
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    className="mb-4"
                  >
                    <Card>
                      <Card.Img
                        variant="top"
                        src={movie.Poster}
                        style={{
                          width: "100%",
                          height: "300px",
                          objectFit: "cover",
                        }}
                      />
                      <Card.Body>
                        <Card.Title className="font-weight-bold text-start">
                          {movie.Title}
                        </Card.Title>

                        <Button
                          variant="primary"
                          onClick={() =>
                            navigate(`/detail/${movie.imdbID}`, {
                              state: movie,
                            })
                          }
                        >
                          View Details
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
              {/*  New Releases  compleate */}

              {/* Popular Movies : */}
              <h1 className="font-weight-bold  text-white">
              🔥 Popular Movies
              </h1>
              <Row>
                {popularMovies?.map((movie) => (
                  <Col
                    key={movie.imdbID}
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    className="mb-4"
                  >
                    <Card>
                      <Card.Img
                        variant="top"
                        src={movie.Poster}
                        style={{
                          width: "100%",
                          height: "300px",
                          objectFit: "cover",
                        }}
                      />
                      <Card.Body>
                        <Card.Title className="font-weight-bold text-start">
                          {movie.Title}
                        </Card.Title>

                        <Button
                          variant="primary"
                          onClick={() =>
                            navigate(`/detail/${movie.imdbID}`, {
                              state: movie,
                            })
                          }
                        >
                          View Details
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
{/* Popular Movies  complete */}
{/*    All Movies : */}
              <h3 className="font-weight-bold  text-white">
               📽️ All Movies
              </h3>
              <Row>
                {movies?.map((movie) => (
                  <Col
                    key={movie.imdbID}
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    className="mb-4"
                  >
                    <Card>
                      <Card.Img
                        variant="top"
                        src={movie.Poster}
                        style={{
                          width: "100%",
                          height: "300px",
                          objectFit: "cover",
                        }}
                      />
                      <Card.Body>
                        <Card.Title className="font-weight-bold text-start">
                          {movie.Title}
                        </Card.Title>

                        <Button
                          variant="primary"
                          onClick={() =>
                            navigate(`/detail/${movie.imdbID}`, {
                              state: movie,
                            })
                          }
                        >
                          View Details
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Tab.Pane>
                {/*    All Movies : complete */}

                {/* New TV Shows : */}
            <Tab.Pane eventKey="tvshows">
              <h3 className="font-weight-bold  text-white">
              New TV Shows
              </h3>
              <Row>
                {newTvShows?.map((show) => (
                  <Col
                    key={show.imdbID}
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    className="mb-4"
                  >
                    <Card>
                      <Card.Img
                        variant="top"
                        src={show.Poster}
                        style={{
                          width: "100%",
                          height: "300px",
                          objectFit: "cover",
                        }}
                      />
                      <Card.Body>
                        <Card.Title className="font-weight-bold text-start">
                          {show.Title}
                        </Card.Title>

                        <Button
                          variant="primary"
                          onClick={() =>
                            navigate(`/detail/${show.imdbID}`, { state: show })
                          }
                        >
                          View Details
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>

              <h3 className="font-weight-bold  text-white">
            🌟 Popular TV Shows
              </h3>
              <Row>
                {popularTvShows?.map((show) => (
                  <Col
                    key={show.imdbID}
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    className="mb-4"
                  >
                    <Card>
                      <Card.Img
                        variant="top"
                        src={show.Poster}
                        style={{
                          width: "100%",
                          height: "300px",
                          objectFit: "cover",
                        }}
                      />
                      <Card.Body>
                        <Card.Title className="font-weight-bold text-start">
                          {show.Title}
                        </Card.Title>

                        <Button
                          variant="primary"
                          onClick={() =>
                            navigate(`/detail/${show.imdbID}`, { state: show })
                          }
                        >
                          View Details
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
{/* New TV Shows : complete */}

{/* All TV Shows : */}
              <h3 className="font-weight-bold text-white">
             📡 All TV Shows
              </h3>
              <Row>
                {tvShows?.map((show) => (
                  <Col
                    key={show.imdbID}
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    className="mb-4"
                  >
                    <Card>
                      <Card.Img
                        variant="top"
                        src={show.Poster}
                        style={{
                          width: "100%",
                          height: "300px",
                          objectFit: "cover",
                        }}
                      />
                      <Card.Body>
                        <Card.Title className="font-weight-bold text-start">
                          {show.Title}
                        </Card.Title>

                        <Button
                          variant="primary"
                          onClick={() =>
                            navigate(`/detail/${show.imdbID}`, { state: show })
                          }
                        >
                          View Details
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
              {/* All TV Shows : complete */}
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
        <Scrolltotop />
      </Container>
    </div>
  );
}

export default Home;

