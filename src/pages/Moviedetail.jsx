import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FaRegStar, FaStar } from "react-icons/fa";

const Moviedetail = () => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams(); // get from URL
  const location = useLocation();
  const item = location.state; // optional if passed via navigate

  console.log(item)
  const renderStars = (rating) => {
    const stars = [];
    const starCount = Math.round(rating / 2); // IMDb is out of 10
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= starCount ? (
          <FaStar key={i} color="#FFD700" />
        ) : (
          <FaRegStar key={i} color="#ccc" />
        )
      );
    }
    return stars;
  };
  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `http://www.omdbapi.com/?i=${id}&apikey=fd765352`
        );
        setDetails(res.data);
      } catch (error) {
        console.error("Error fetching details:", error);
      }
      setLoading(false);
    };

    fetchDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="bg-dark text-white py-4">
    <Container className="text- light mt-4">
      <Row className="align-items-start">
        {/* Poster Image */}
        <Col md={4}>
          <Card className="bg-dark border-secondary">
            <Card.Img
              variant="top"
              src={
                details.Poster !== "N/A"
                  ? details.Poster
                  : "https://via.placeholder.com/300x450?text=No+Image"
              }
              alt="poster"
              style={{ width: "100%", height: "500px", objectFit: "cover" }}
            />
          </Card>
        </Col>

        {/* Movie/TV Details */}
        <Col md={8} className="text-start">
          <h2 className="fw-bold">{details.Title}</h2>
          <p>
            <strong>Type:</strong>{" "}
            {details.Type === "series" ? "TV Show" : "Movie"}
          </p>
          <p>
            <strong>Genre:</strong> {details.Genre}
          </p>
          <p>
            <strong>Released:</strong> {details.Rated}
          </p>
          <p>
            <strong>Rated:</strong> {details.Released}
          </p>
          <p>
            <strong>IMDB Rating:</strong> {details.imdbRating}{" "}
            {renderStars(Number(details.imdbRating))}
          </p>
          <p>
            <strong>Runtime:</strong> {details.Runtime}
          </p>
          <p>
            <strong>Director:</strong> {details.Director}
          </p>
          <p>
            <strong>Actors:</strong> {details.Actors}
          </p>
          <p>
            <strong>Plot:</strong> {details.Plot}
          </p>
          <Button variant="primary" size="lg" onClick={() => window.history.back()}>
            Go Back
          </Button>
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default Moviedetail;
