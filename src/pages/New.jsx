// import React from 'react'

// function New() {
//   return (
//     <div>
//       new-popular page
//     </div>
//   )
// }

// export default New

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
  Breadcrumb,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "animate.css";
import "./Movie.css"; 
import Scrolltotop from "./Scrolltotop";

function New() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const apiKey = "fd765352";
  const trendingQueries = [
    "Jawan",
    "Raid 2 ",
    "Chhaava",
    "HIT ",
    "The Night Manager",
    "Jhamkudi",
    "Scam 2003",
    "Farzi",
    "Rocky Aur Rani",
    "Tiger 3",
    "Gadar 2",
    "Mirzapur",
    "Fakt Purusho Maate",
    "Kantara",
    "Faati Ne?",
    "Good Bad Ugly",
    "Transformers One"
  ];

  useEffect(() => {
    const fetchTrendingItems = async () => {
      try {
        const results = await Promise.all(
          trendingQueries.map(async (query) => {
            const res = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`);
            const data = await res.json();
            return data.Search || [];
          })
        );

        const combined = results.flat();

        const filtered = combined.filter((item) => {
          if (!item.Year) return false;

          // Extract 4-digit year from string
          const yearMatch = item.Year.match(/\d{4}/);
          const year = yearMatch ? parseInt(yearMatch[0]) : null;

          return year >= 2023 && year <= 2025;
        });

        setItems(filtered);
      } catch (error) {
        console.error("Error fetching popular content:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingItems();
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
          <Breadcrumb className="bg-transparent">
            <Breadcrumb.Item href="/" className="text-white">Home</Breadcrumb.Item>
            <Breadcrumb.Item active className="text-white">New & Popular</Breadcrumb.Item>
          </Breadcrumb>

          <h1 className="text-white text-center mb-4">🔥 New & Popular (2023–2025)</h1>

          {!loading && items.length === 0 && (
            <p className="text-white text-center fs-4">No new movies or series found between 2023 and 2025.</p>
          )}

          <Row xs={1} sm={2} md={3} lg={4} className="g-4">
            {loading ? (
              <>
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </>
            ) : (
              items.map((item, index) => (
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
                        onClick={() => navigate(`/detail/${item.imdbID}`, { state: item })}
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

export default New;
