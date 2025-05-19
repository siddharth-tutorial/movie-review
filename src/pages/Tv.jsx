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
import "./tv.css"; // Optional for additional styling

const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "hi", name: "Hindi" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "gu", name: "Gujarati" },
];

function Tv() {
  const [tvShows, setTVShows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedTVShow, setSelectedTVShow] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/genre/tv/list?api_key=${"32e720b6329b645232ba0cb509207657"}&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => setGenres(data.genres || []))
      .catch(() => setGenres([]));
  }, []);

  const fetchTVShows = (
    search = "",
    pageNumber = 1,
    genre = "",
    language = ""
  ) => {
    setLoading(true);
    setError(null);

    let baseUrl = "";
    if (search) {
      baseUrl = `https://api.themoviedb.org/3/search/tv?api_key=${"32e720b6329b645232ba0cb509207657"}&language=en-US&page=${pageNumber}&query=${encodeURIComponent(
        search
      )}`;
    } else {
      let discoverUrl = `https://api.themoviedb.org/3/discover/tv?api_key=${"32e720b6329b645232ba0cb509207657"}&language=en-US&page=${pageNumber}`;
      if (genre) discoverUrl += `&with_genres=${genre}`;
      if (language) discoverUrl += `&with_original_language=${language}`;
      baseUrl = discoverUrl;
    }

    fetch(baseUrl)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch TV shows");
        return res.json();
      })
      .then((data) => {
        let results = data.results || [];
        if (search) {
          if (genre) {
            results = results.filter((show) =>
              show.genre_ids.includes(parseInt(genre))
            );
          }
          if (language) {
            results = results.filter(
              (show) => show.original_language === language
            );
          }
        }
        setTVShows(results);
        setTotalPages(data.total_pages || 1);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchTVShows(searchTerm, page, selectedGenre, selectedLanguage);
  }, [searchTerm, page, selectedGenre, selectedLanguage]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchTVShows(searchTerm, 1, selectedGenre, selectedLanguage);
  };

  const openModal = (tvShow) => {
    setSelectedTVShow(tvShow);
    setShowModal(true);
    fetchTrailer(tvShow.id);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedTVShow(null);
    setTrailerKey(null);
  };

  const fetchTrailer = (tvShowId) => {
    setModalLoading(true);
    fetch(
      `https://api.themoviedb.org/3/tv/${tvShowId}/videos?api_key=${"32e720b6329b645232ba0cb509207657"}&language=en-US`
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
        <Pagination.Prev
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        />
        {items}
        <Pagination.Next
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        />
        <Pagination.Last
          onClick={() => setPage(totalPages)}
          disabled={page === totalPages}
        />
      </Pagination>
    );
  };

  return (
    <div className="tvshows-page">
      {loading && <NetflixLoader />}
      <Container>
        <h2 className="mb-4 fw-bold">
          {searchTerm
            ? `Search results for "${searchTerm}"`
            : "Popular TV Shows"}
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
                placeholder="Search TV shows..."
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
              <Button type="submit" style={{ width: "100%" }}>
                Search
              </Button>
            </Col>
          </Row>
        </Form>

        {/* TV Shows List */}
        {error ? (
          <Alert variant="danger">Error: {error}</Alert>
        ) : tvShows.length === 0 ? (
          <Alert variant="warning">No TV shows found.</Alert>
        ) : (
          <>
            <Row>
              {tvShows.map((tv) => (
                <Col key={tv.id} xs={6} md={4} lg={3} className="mb-4">
                  <Card
                    bg="dark"
                    text="white"
                    className="h-100"
                    onClick={() => openModal(tv)}
                    style={{ cursor: "pointer", border: "none" }}
                  >
                    <Card.Img
                      variant="top"
                      src={
                        tv.poster_path
                          ? `https://image.tmdb.org/t/p/w500${tv.poster_path}`
                          : "https://via.placeholder.com/500x750?text=No+Image"
                      }
                      alt={tv.name}
                    />
                    <Card.Body>
                      <Card.Title className="text-truncate">
                        {tv.name}
                      </Card.Title>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
            {totalPages > 1 && renderPagination()}
          </>
        )}

        {/* Modal for Trailer & Info */}
        <Modal
          show={showModal}
          onHide={closeModal}
          size="lg"
          centered
          contentClassName="bg-dark text-white"
        >
          <Modal.Header closeButton closeVariant="white">
            <Modal.Title>{selectedTVShow?.name}</Modal.Title>
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
                ></iframe>
              </div>
            ) : (
              <p>No trailer available.</p>
            )}
            {selectedTVShow && (
              <div className="mt-3">
                <p>{selectedTVShow.overview || "No description available."}</p>
                <p>
                  <strong>First Air Date:</strong>{" "}
                  {selectedTVShow.first_air_date || "N/A"}
                </p>
                <p>
                  <strong>Language:</strong>{" "}
                  {selectedTVShow.original_language.toUpperCase()}
                </p>
                <p>
                  <strong>Rating:</strong> {selectedTVShow.vote_average} / 10 (
                  {selectedTVShow.vote_count} votes)
                </p>
              </div>
            )}
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
}

export default Tv;
