
import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  Form,
  Button,
  Pagination,
  Modal,
} from "react-bootstrap";
import NetflixLoader from "./NetflixLoader"; 
import "./Movie.css";

const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "hi", name: "Hindi" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "gu", name: "Gujarati" },
];

function Movie() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=32e720b6329b645232ba0cb509207657&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => setGenres(data.genres || []))
      .catch(() => setGenres([]));
  }, []);

  const fetchMovies = (
    search = "",
    pageNumber = 1,
    genre = "",
    language = ""
  ) => {
    setLoading(true);
    setError(null);

    let baseUrl = "";
    if (search) {
      baseUrl = `https://api.themoviedb.org/3/search/movie?api_key=32e720b6329b645232ba0cb509207657&language=en-US&page=${pageNumber}&query=${encodeURIComponent(
        search
      )}`;
    } else {
      let discoverUrl = `https://api.themoviedb.org/3/discover/movie?api_key=32e720b6329b645232ba0cb509207657&language=en-US&page=${pageNumber}`;
      if (genre) discoverUrl += `&with_genres=${genre}`;
      if (language) discoverUrl += `&with_original_language=${language}`;
      baseUrl = discoverUrl;
    }

    fetch(baseUrl)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch movies");
        return res.json();
      })
      .then((data) => {
        let results = data.results || [];
        if (search) {
          if (genre) {
            results = results.filter((movie) =>
              movie.genre_ids.includes(parseInt(genre))
            );
          }
          if (language) {
            results = results.filter(
              (movie) => movie.original_language === language
            );
          }
        }
        setMovies(results);
        setTotalPages(data.total_pages || 1);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchMovies(searchTerm, page, selectedGenre, selectedLanguage);
  }, [searchTerm, page, selectedGenre, selectedLanguage]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchMovies(searchTerm, 1, selectedGenre, selectedLanguage);
  };

  const openModal = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
    fetchTrailer(movie.id);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedMovie(null);
    setTrailerKey(null);
  };

  const fetchTrailer = (movieId) => {
    setModalLoading(true);
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=32e720b6329b645232ba0cb509207657&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => {
        const trailer = data.results.find(
          (vid) =>
            vid.site === "YouTube" &&
            (vid.type === "Trailer" || vid.type === "Teaser")
        );
        setTrailerKey(trailer ? trailer.key : null);
        setModalLoading(false);
      })
      .catch(() => {
        setTrailerKey(null);
        setModalLoading(false);
      });
  };

  const renderPagination = () => {
    let items = [];
    let startPage = Math.max(1, page - 2);
    let endPage = Math.min(totalPages, page + 2);

    for (let number = startPage; number <= endPage; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === page}
          onClick={() => setPage(number)}
        >
          {number}
        </Pagination.Item>
      );
    }

    return (
      <Pagination className="justify-content-center mt-4" size="sm">
        <Pagination.First onClick={() => setPage(1)} disabled={page === 1} />
        <Pagination.Prev onClick={() => setPage(page - 1)} disabled={page === 1} />
        {items}
        <Pagination.Next onClick={() => setPage(page + 1)} disabled={page === totalPages} />
        <Pagination.Last onClick={() => setPage(totalPages)} disabled={page === totalPages} />
      </Pagination>
    );
  };

  return (
    <div className="movie-page">
      {/* Full-page Loader */}
      {loading && <NetflixLoader />}

      <Container>
        <h2 className="mb-4 fw-bold">
          {searchTerm ? `Search results for "${searchTerm}"` : "Popular Movies"}
        </h2>

        {/* Search & Filters */}
        <Form className="mb-4" onSubmit={handleSearchSubmit}>
          <Row
            className="align-items-center gx-2"
            style={{ maxWidth: "700px", margin: "auto" }}
          >
            <Col xs={12} md={5} className="mb-2 mb-md-0">
              <Form.Control
                type="text"
                placeholder="Search movies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Col>
            <Col xs={6} md={3}>
              <Form.Select
                value={selectedGenre}
                onChange={(e) => {
                  setSelectedGenre(e.target.value);
                  setPage(1);
                }}
              >
                <option value="">All Genres</option>
                {genres.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.name}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col xs={6} md={3}>
              <Form.Select
                value={selectedLanguage}
                onChange={(e) => {
                  setSelectedLanguage(e.target.value);
                  setPage(1);
                }}
              >
                <option value="">All Languages</option>
                {LANGUAGES.map(({ code, name }) => (
                  <option key={code} value={code}>
                    {name}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col xs={12} md={1}>
              <Button type="submit" style={{ width: "150%" }}>
                Search
              </Button>
            </Col>
          </Row>
        </Form>

        {/* Movies */}
        {!loading && ( // only show content when NOT loading
          <>
            {error ? (
              <Alert variant="danger">Error: {error}</Alert>
            ) : movies.length === 0 ? (
              <Alert variant="warning">No movies found.</Alert>
            ) : (
              <>
                <Row>
                  {movies.map((movie) => (
                    <Col key={movie.id} xs={6} md={4} lg={3} className="mb-4">
                      <Card
                        bg="dark"
                        text="white"
                        className="h-100"
                        onClick={() => openModal(movie)}
                        style={{ cursor: "pointer", border: "none" }}
                      >
                        <Card.Img
                          variant="top"
                          src={
                            movie.poster_path
                              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                              : "https://via.placeholder.com/500x750?text=No+Image"
                          }
                          alt={movie.title}
                        />
                        <Card.Body>
                          <Card.Title className="text-truncate">
                            {movie.title}
                          </Card.Title>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
                {totalPages > 1 && renderPagination()}
              </>
            )}
          </>
        )}

        {/* Modal */}
        <Modal
          show={showModal}
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
              <div
                style={{ height: "300px" }}
                className="d-flex align-items-center justify-content-center"
              >
                <NetflixLoader />
              </div>
            ) : trailerKey ? (
              <div className="ratio ratio-16x9">
                <iframe
                  src={`https://www.youtube.com/embed/${trailerKey}`}
                  title="Trailer"
                  allowFullScreen
                  frameBorder="0"
                />
              </div>
            ) : (
              <p>No trailer available.</p>
            )}
            <hr className="border-secondary" />
            <p>{selectedMovie?.overview || "No description available."}</p>
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
}

export default Movie;
