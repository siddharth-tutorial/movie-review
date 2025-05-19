// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import YouTube from "react-youtube";
// import { Container, Row, Col, Alert } from "react-bootstrap";
// import "./home.css";

// const fetchMovies = async (url) => {
//   const res = await axios.get(url);
//   return res.data.results;
// };

// const SkeletonCard = () => (
//   <div className="skeleton-card">
//     <div className="skeleton-poster" />
//     <div className="skeleton-text" />
//   </div>
// );

// const MovieRow = ({ title, fetchUrl }) => {
//   const [items, setItems] = useState([]);
//   const [trailerId, setTrailerId] = useState(null);
//   const [hoveredId, setHoveredId] = useState(null);
//   const [isPlaying, setIsPlaying] = useState(true);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     setLoading(true);
//     setError(null);
//     fetchMovies(fetchUrl)
//       .then((data) => {
//         setItems(data);
//         setLoading(false);
//       })
//       .catch(() => {
//         setError("Failed to load movies.");
//         setLoading(false);
//       });
//   }, [fetchUrl]);

//   // Fetch trailer for hovered item
//   const fetchTrailer = async (id) => {
//     try {
//       const mediaType = fetchUrl.includes("/tv/") ? "tv" : "movie";
//       const res = await axios.get(
//         `${"https://api.themoviedb.org/3"}/${mediaType}/${id}/videos?api_key=${"32e720b6329b645232ba0cb509207657"}&language=en-US`
//       );
//       const trailer = res.data.results.find(
//         (vid) => vid.type === "Trailer" && vid.site === "YouTube"
//       );
//       if (trailer) {
//         setTrailerId(trailer.key);
//         setIsPlaying(true);
//       } else {
//         setTrailerId(null);
//       }
//     } catch {
//       setTrailerId(null);
//     }
//   };

//   const handleMouseEnter = (item) => {
//     setHoveredId(item.id);
//     fetchTrailer(item.id);
//   };

//   const handleMouseLeave = () => {
//     setHoveredId(null);
//     setTrailerId(null);
//     setIsPlaying(true);
//   };

//   const togglePlayPause = () => {
//     setIsPlaying((prev) => !prev);
//   };

//   return (
//     <Container fluid className="movie-row-container mb-5">
//       <h3 className="row-title mb-3">{title}</h3>

//       {loading ? (
//         // Show 6 skeleton cards mimicking layout while loading
//         <Row className="g-3 justify-content-start">
//           {[...Array(6)].map((_, i) => (
//             <Col key={i} xs={6} sm={4} md={3} lg={2} className="d-flex justify-content-center">
//               <SkeletonCard />
//             </Col>
//           ))}
//         </Row>
//       ) : error ? (
//         <Alert variant="danger">{error}</Alert>
//       ) : (
//         <Row className="g-3 justify-content-start">
//           {items.map((item) => (
//             <Col
//               key={item.id}
//               xs={6}
//               sm={4}
//               md={3}
//               lg={2}
//               className="d-flex justify-content-center"
//             >
//               <div
//                 className="movie-card"
//                 onMouseEnter={() => handleMouseEnter(item)}
//                 onMouseLeave={handleMouseLeave}
//                 onClick={togglePlayPause}
//                 role="button"
//                 tabIndex={0}
//                 aria-label={`Trailer for ${item.title || item.name}`}
//                 onKeyDown={(e) => {
//                   if (e.key === "Enter") togglePlayPause();
//                 }}
//               >
//                 <img
//                   src={`${"https://image.tmdb.org/t/p/w500"}${item.poster_path || item.backdrop_path}`}
//                   alt={item.title || item.name}
//                   className="movie-image"
//                   loading="lazy"
//                 />

//                 {hoveredId === item.id && trailerId && (
//                   <div className="trailer-overlay">
//                     <YouTube
//                       videoId={trailerId}
//                       opts={{
//                         width: "100%",
//                         height: "100%",
//                         playerVars: {
//                           autoplay: isPlaying ? 1 : 0,
//                           controls: 0,
//                           mute: 1,
//                           loop: 1,
//                           playlist: trailerId,
//                           modestbranding: 1,
//                           rel: 0,
//                         },
//                       }}
//                     />
//                     <div className="playing-status">
//                       {isPlaying ? "Playing" : "Paused"}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </Col>
//           ))}
//         </Row>
//       )}
//     </Container>
//   );
// };

// function Home() {
//   return (
//     <div
//       className="home-page"
//       style={{
//         backgroundColor: "#141414",
//         minHeight: "100vh",
//         padding: "20px",
//       }}
//     >
//       <MovieRow
//         title="Trending Now"
//         fetchUrl={`${"https://api.themoviedb.org/3"}/trending/all/week?api_key=${"32e720b6329b645232ba0cb509207657"}&language=en-US`}
//       />

//       <MovieRow
//         title="Top Rated Movies"
//         fetchUrl={`${"https://api.themoviedb.org/3"}/movie/top_rated?api_key=${"32e720b6329b645232ba0cb509207657"}&language=en-US`}
//       />

//       <MovieRow
//         title="Action Movies"
//         fetchUrl={`${"https://api.themoviedb.org/3"}/discover/movie?api_key=${"32e720b6329b645232ba0cb509207657"}&with_genres=28`}
//       />

//       <MovieRow
//         title="Popular TV Shows"
//         fetchUrl={`${"https://api.themoviedb.org/3"}/tv/popular?api_key=${"32e720b6329b645232ba0cb509207657"}&language=en-US&page=1`}
//       />

//       <MovieRow
//         title="Top Rated Series"
//         fetchUrl={`${"https://api.themoviedb.org/3"}/tv/top_rated?api_key=${"32e720b6329b645232ba0cb509207657"}&language=en-US&page=1`}
//       />
//     </div>
//   );
// }

// export default Home;
import React, { useState, useEffect } from "react";
import axios from "axios";
import YouTube from "react-youtube";
import { Container, Row, Col, Alert } from "react-bootstrap";
import "./home.css";

const fetchMovies = async (url) => {
  const res = await axios.get(url);
  return res.data.results;
};

const MovieRow = ({ title, fetchUrl }) => {
  const [items, setItems] = useState([]);
  const [trailerId, setTrailerId] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchMovies(fetchUrl)
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load movies.");
        setLoading(false);
      });
  }, [fetchUrl]);

  // Fetch trailer for hovered item
  const fetchTrailer = async (id) => {
    try {
      const mediaType = fetchUrl.includes("/tv/") ? "tv" : "movie";
      const res = await axios.get(
        `${"https://api.themoviedb.org/3"}/${mediaType}/${id}/videos?api_key=${"32e720b6329b645232ba0cb509207657"}&language=en-US`
      );
      const trailer = res.data.results.find(
        (vid) => vid.type === "Trailer" && vid.site === "YouTube"
      );
      if (trailer) {
        setTrailerId(trailer.key);
        setIsPlaying(true);
      } else {
        setTrailerId(null);
      }
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
        <Row className="g-3 justify-content-start">
          {[...Array(6)].map((_, i) => (
            <Col
              key={i}
              xs={6}
              sm={4}
              md={3}
              lg={2}
              className="d-flex justify-content-center"
            >
              <div className="netflix-loader" />
            </Col>
          ))}
        </Row>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Row className="g-3 justify-content-start">
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
                role="button"
                tabIndex={0}
                aria-label={`Trailer for ${item.title || item.name}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter") togglePlayPause();
                }}
              >
                <img
                  src={`${"https://image.tmdb.org/t/p/w500"}${
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
                          modestbranding: 1,
                          rel: 0,
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
    <div
      className="home-page"
      style={{
        backgroundColor: "#141414",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <MovieRow
        title="Trending Now"
        fetchUrl={`https://api.themoviedb.org/3/trending/all/week?api_key=32e720b6329b645232ba0cb509207657&language=en-US`}
      />

      <MovieRow
        title="Top Rated Movies"
        fetchUrl={`https://api.themoviedb.org/3/movie/top_rated?api_key=32e720b6329b645232ba0cb509207657&language=en-US`}
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
