import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Modal,
  Alert,
  Spinner,
} from "react-bootstrap";

import NetflixLoader from "./NetflixLoader";
import "./new.css";

function New() {
  const [newReleases, setNewReleases] = useState([]);
  const [popular, setPopular] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${"32e720b6329b645232ba0cb509207657"}&language=en-US&page=1`
      ).then((res) => res.json()),
      fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${"32e720b6329b645232ba0cb509207657"}&language=en-US&page=1`
      ).then((res) => res.json()),
    ])
      .then(([newData, popularData]) => {
        setNewReleases(newData.results || []);
        setPopular(popularData.results || []);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load movies");
        setLoading(false);
      });
  }, []);

  const openModal = (movie) => {
    setSelectedMovie(movie);
    fetchTrailer(movie.id);
  };

  const closeModal = () => {
    setSelectedMovie(null);
    setTrailerKey(null);
  };

  const fetchTrailer = (movieId) => {
    setModalLoading(true);
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${"32e720b6329b645232ba0cb509207657"}&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => {
        const trailer = data.results.find(
          (vid) =>
            vid.site === "YouTube" &&
            (vid.type === "Trailer" || vid.type === "Teaser")
        );
        setTrailerKey(trailer?.key || null);
        setModalLoading(false);
      })
      .catch(() => {
        setTrailerKey(null);
        setModalLoading(false);
      });
  };

  const renderMovies = (movies) => (
    <Row className="flex-nowrap overflow-auto" style={{ gap: "1rem" }}>
      {movies.map((movie) => (
        <Col key={movie.id} xs={6} sm={4} md={3} lg={2} className="p-0">
          <Card
            onClick={() => openModal(movie)}
            bg="dark"
            text="white"
            style={{
              border: "none",
              borderRadius: "10px",
              overflow: "hidden",
              cursor: "pointer",
            }}
          >
            <Card.Img
              src={
                movie.poster_path
                  ? "https://image.tmdb.org/t/p/w500" + movie.poster_path
                  : "https://via.placeholder.com/500x750?text=No+Image"
              }
              alt={movie.title}
            />
            <Card.Body style={{ padding: "10px" }}>
              <Card.Title style={{ fontSize: "0.9rem", fontWeight: "600" }}>
                {movie.title}
              </Card.Title>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );

  return (
    <div
      style={{
        backgroundColor: "#141414",
        minHeight: "100vh",
        padding: "20px 0",
        color: "white",
      }}
    >
      <Container fluid>
        {loading ? (
          <NetflixLoader />
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : (
          <>
            <h2 className="mb-3 px-3" style={{ fontWeight: "700" }}>
              New Releases
            </h2>
            {renderMovies(newReleases)}

            <h2 className="mt-5 mb-3 px-3" style={{ fontWeight: "700" }}>
              Popular
            </h2>
            {renderMovies(popular)}
          </>
        )}

        {/* Modal for Trailer and Overview */}
        <Modal
          show={!!selectedMovie}
          onHide={closeModal}
          size="lg"
          centered
          contentClassName="bg-dark text-white"
        >
          <Modal.Header closeButton closeVariant="white">
            <Modal.Title>{selectedMovie?.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {modalLoading ? (
              <div className="text-center my-4">
                <Spinner animation="border" variant="light" />
              </div>
            ) : trailerKey ? (
              <div className="ratio ratio-16x9 mb-3">
                <iframe
                  src={`${"https://www.youtube.com/embed/"}${trailerKey}`}
                  title="Trailer"
                  allowFullScreen
                  frameBorder="0"
                ></iframe>
              </div>
            ) : (
              <p>No trailer available.</p>
            )}
            <p>{selectedMovie?.overview || "No description available."}</p>
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
}

export default New;
