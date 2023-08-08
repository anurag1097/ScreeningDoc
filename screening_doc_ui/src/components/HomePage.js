import {React, useEffect} from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './HomePage.css';

function HomePage() {
  const points = [
    'Discover eligibility for cancer screening tests.',
    'Personalized recommendations based on health profile.',
    'Latest medical guidelines and insights.',
    'Empowerment through early detection and knowledge.'
  ];

  useEffect(() => {
    // Set the document title when the component is mounted
    document.title = 'ScreeningDoc - Your Cancer Screening Partner';
  }, []);

  return (
    <Container fluid className="vh-100" style={{"marginTop": "70px"}}>
      <Row className="justify-content-center align-items-center h-100">
        <Col md={20}>
          <Card className="outlined" style={{ backgroundSize: 'cover' }}>
            <Card.Header style={{ backgroundColor: '#1e88e5', color: 'white', "font-family": "Times New Roman" }}>
              <h2 className="mb-0">Welcome To ScreeningDoc!</h2>
            </Card.Header>
            <Card.Body>
              <div className="mt-4">
                {points.map((point, index) => (
                  <div key={index} className="highlight-box" style={{"font-family": "Times New Roman"}}>
                    <h5>{point}</h5>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;
