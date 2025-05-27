
import React, { useState, useEffect } from "react";
import axios from "axios";
import YouTube from "react-youtube";
import { Container, Row, Col, Alert } from "react-bootstrap";
import NetflixLoader from "../pages/NetflixLoader";
import "./home.css";

const MovieRow = ({ title, fetchUrl }) => {
  const [items, setItems] = useState([]);
  const [trailerId, setTrailerId] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const response = await axios.get(fetchUrl);
      setItems(response.data.results);
    } catch (err) {
      setError("Failed to load movies.");
    } finally {
      setLoading(false);
    }
  };

  const fetchTrailer = async (id) => {
    try {
      const mediaType = fetchUrl.includes("/tv/") ? "tv" : "movie";
      const res = await axios.get(
        `https://api.themoviedb.org/3/${mediaType}/${id}/videos?api_key=32e720b6329b645232ba0cb509207657`
      );
      const trailer = res.data.results.find(
        (vid) => vid.type === "Trailer" && vid.site === "YouTube"
      );
      setTrailerId(trailer?.key || null);
      setIsPlaying(true);
    } catch {
      setTrailerId(null);
    }
  };

  const handleMouseEnter = (item) => {
    setHoveredId(item.id);
    fetchTrailer(item.id);
  };

  const handleMouseLeave = () => {
    setHoveredId(null);
    setTrailerId(null);
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  return (
    <Container fluid className="movie-row-container mb-5">
      <h3 className="row-title mb-3">{title}</h3>

      {loading ? (
        <NetflixLoader />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Row className="g-3">
          {items.map((item) => (
            <Col
              key={item.id}
              xs={6}
              sm={4}
              md={3}
              lg={2}
              className="d-flex justify-content-center"
            >
              <div
                className="movie-card"
                onMouseEnter={() => handleMouseEnter(item)}
                onMouseLeave={handleMouseLeave}
                onClick={togglePlayPause}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${
                    item.poster_path || item.backdrop_path
                  }`}
                  alt={item.title || item.name}
                  className="movie-image"
                  loading="lazy"
                />
                {hoveredId === item.id && trailerId && (
                  <div className="trailer-overlay">
                    <YouTube
                      videoId={trailerId}
                      opts={{
                        width: "100%",
                        height: "100%",
                        playerVars: {
                          autoplay: isPlaying ? 1 : 0,
                          controls: 0,
                          mute: 1,
                          loop: 1,
                          playlist: trailerId,
                        },
                      }}
                    />
                    <div className="playing-status">
                      {isPlaying ? "Playing" : "Paused"}
                    </div>
                  </div>
                )}
              </div>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

function Home() {
  return (
    <div className="home-page bg-dark text-white">
      <MovieRow
         title="Trending Now"
        fetchUrl={`https://api.themoviedb.org/3/trending/all/week?api_key=32e720b6329b645232ba0cb509207657`}
      />
      <MovieRow
        title="Top Rated Movies"
        fetchUrl={`https://api.themoviedb.org/3/movie/top_rated?api_key=32e720b6329b645232ba0cb509207657`}
      />
      <MovieRow
        title="Action Movies"
        fetchUrl={`https://api.themoviedb.org/3/discover/movie?api_key=32e720b6329b645232ba0cb509207657&with_genres=28`}
      />
      <MovieRow
        title="Popular TV Shows"
        fetchUrl={`https://api.themoviedb.org/3/tv/popular?api_key=32e720b6329b645232ba0cb509207657&language=en-US&page=1`}
      />
      <MovieRow
        title="Top Rated Series"
        fetchUrl={`https://api.themoviedb.org/3/tv/top_rated?api_key=32e720b6329b645232ba0cb509207657&language=en-US&page=1`}
      />
    </div>
  );
}

export default Home;
