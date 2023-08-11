import {React, useEffect} from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './HomePage.css';
import { Instagram, LinkedIn } from '@mui/icons-material';


function HomePage() {
  const points = [
    '* Eligibility for cancer screening based on personalised health profile.',
    '* Based on recent Screening Guidelines (source ACS, USPSTF).',
    '* Being eligible for screening DOES NOT mean you have the disease.',
    '* Cancer screening saves lives via early detection.',
    '* This tool is not meant to replace clinical judgement and individualised patient care.'
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
