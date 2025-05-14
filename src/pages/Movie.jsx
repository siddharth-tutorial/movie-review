import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  Col,
  Container,
  Row,
  Button,
  Breadcrumb
} from "react-bootstrap";
import { useNavigate } from "react-router";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "animate.css";
import "./Movie.css"; // Custom styles
import Scrolltotop from "./Scrolltotop";

function Movie() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const apiKey = "fd765352";
  const searchQueries = [ "Fighter","Raid 2", "Chhello Divas", "Love Ni Bhavai","Fakt Purusho Maate","Golkeri","Fakt mahilao Maate","HIT: The Third Case (A)","avengers"];

  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        const results = await Promise.all(
          searchQueries.map(async (query) => {
            const res = await fetch(
              `https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`
            );
            const data = await res.json();
            return data.Search || [];
          })
        );
        const combined = results.flat();
        setMovies(combined);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllMovies();
  }, );

  const SkeletonCard = () => (
    <Col>
      <Card className="h-100 shadow-sm animate__animated animate__slideInUp bg-dark text-white">
        <Skeleton height={300} />
        <CardBody>
          <CardTitle><Skeleton width="80%" /></CardTitle>
          <CardSubtitle className="mb-2"><Skeleton width="50%" /></CardSubtitle>
          <Skeleton count={2} />
        </CardBody>
      </Card>
    </Col>
  );

  return (
    <div className="movie-page">
      <div className="overlay">
        <Container className="py-4">
          {/* Breadcrumb */}
          <Breadcrumb className="bg-transparent ">
            <Breadcrumb.Item href="/" className="text-white ">Home</Breadcrumb.Item>
            <Breadcrumb.Item active className="text-white ">Movies</Breadcrumb.Item>
          </Breadcrumb>

          <h1 className="text-white text-center mb-4">🎬 Explore Movies</h1>

          <Row xs={1} sm={2} md={3} lg={4} className="g-4">
            {loading ? (
              <>
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </>
            ) : (
              movies.map((item, index) => (
                <Col key={item.imdbID || index}>
                  <Card className="h-100 shadow-sm animate__animated animate__fadeInUp bg-dark text-white">
                    <Card.Img
                      variant="top"
                      src={item.Poster}
                      alt={item.Title}
                      style={{ height: "300px", objectFit: "cover" }}
                    />
                    <CardBody>
                      <CardTitle>{item.Title}</CardTitle>
                      <CardSubtitle className="mb-2 text-muted">
                        {item.Year}
                      </CardSubtitle>
                      <Button
                        variant="primary"
                        onClick={() =>
                          navigate(`/detail/${item.imdbID}`, { state: item })
                        }
                      >
                        View Details
                      </Button>
                    </CardBody>
                  </Card>
                </Col>
              ))
            )}
          </Row>
          <Scrolltotop />
        </Container>
      </div>
    </div>
  );
}

export default Movie;
