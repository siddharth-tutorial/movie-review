import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaCircleArrowUp } from "react-icons/fa6";

function Footer() {
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [loading, setLoading] = useState(true); // simulate loading

  useEffect(() => {
    // Scroll handler
    const handleScroll = () => {
      setShowTopBtn(window.pageYOffset > 300);
    };
    window.addEventListener("scroll", handleScroll);

    // Simulate loading for 1.5 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <footer
        style={{
          backgroundColor: "#141414",
          color: "#999",
          padding: "40px 0",
          borderTop: "1px solid #333",
          fontFamily: "'Netflix Sans', Arial, sans-serif",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "120px",
        }}
      >
        <div
          style={{
            width: 20,
            height: 20,
            borderRadius: "50%",
            backgroundColor: "#e50914",
            boxShadow: "0 0 10px #e50914",
            animation: "pulse 1.5s infinite",
          }}
        />
        <style>{`
          @keyframes pulse {
            0%, 100% {
              opacity: 1;
              transform: scale(1);
            }
            50% {
              opacity: 0.5;
              transform: scale(1.2);
            }
          }
        `}</style>
      </footer>
    );
  }

  return (
    <>
      <footer
        style={{
          backgroundColor: "#141414",
          color: "#999",
          padding: "40px 0",
          borderTop: "1px solid #333",
          fontFamily: "'Netflix Sans', Arial, sans-serif",
        }}
      >
        <Container>
          <Row className="text-center text-md-start">
            <Col md={6} className="mb-3 mb-md-0">
              <h5 style={{ color: "#e50914", fontWeight: "bold", marginBottom: "15px" }}>
                Netflix Clone
              </h5>
              <p style={{ fontSize: "14px", maxWidth: "500px", marginLeft: 0 }}>
                © {new Date().getFullYear()} Netflix Clone by Siddharth Vanecha
              </p>
              <p
                style={{
                  fontSize: "12px",
                  maxWidth: "500px",
                  marginLeft: 0,
                  color: "#666",
                }}
              >
                This project uses data from the OMDb API and is intended for educational purposes only.
              </p>
            </Col>
            <Col
              md={6}
              className="d-flex justify-content-center justify-content-md-end align-items-center"
            >
              {/* Optional social icons or links */}
            </Col>
          </Row>
        </Container>

        {showTopBtn && (
          <Button
            onClick={scrollToTop}
            variant="danger"
            style={{
              position: "fixed",
              bottom: "40px",
              right: "40px",
              borderRadius: "50%",
              width: "50px",
              height: "50px",
              padding: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
              zIndex: 1000,
            }}
            aria-label="Back to top"
          >
            <FaCircleArrowUp size={32} />
          </Button>
        )}
      </footer>
    </>
  );
}

export default Footer;
