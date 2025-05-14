import React from 'react'
import { Container } from 'react-bootstrap'

function Footer() {
  return (
    <div>
       <footer style={{ backgroundColor: '#141414', color: '#999', padding: '20px 0',  }}>
      <Container className="text-center">
        <p style={{ marginBottom: '8px' }}>© {new Date().getFullYear()} Netflix Clone by Siddharth Vanecha</p>
        <p style={{ fontSize: '14px' }}>
          This project uses data from the OMDb API and is intended for educational purposes only.
        </p>
      </Container>
    </footer>
    </div>
  )
}

export default Footer
