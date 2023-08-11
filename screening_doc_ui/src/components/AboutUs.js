import React from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { Instagram, LinkedIn } from '@mui/icons-material';
import profile from '../images/my_picture.png'
import './AboutUs.css'

function AboutUs() {
  return (
    <Container fluid className="about-us mt-4" style={{display: "flex", justifyContent: "space-between", margin: 20}}>
          <Card className="outlined" style={{ backgroundSize: 'cover' }}>
            <Card.Header style={{ backgroundColor: '#1e88e5', color: 'white', "font-family": "Times New Roman"}}>
              <h2 className="mb-0">About Us</h2>
            </Card.Header>
            <Card.Body className="flex-container" style={{"display": "flex", "justifyContent": "space-between", "align-items": "center"}}>
              <div>
                  <h2 className="mb-0" style={{"font-family": "Times New Roman" }}>On a mission to make cancer a history!</h2>
                  <br></br>
                  <ul>
                    <li>The journey is challenging, both for cancer survivors and caregivers.</li>
                    <li>Recently, I realised a lack of awareness about cancer screening guidelines.</li>
                    <li>Timely diagnosis is vital, as cancer is curable at an early, symptom-free stage.</li>
                    <li>Through ScreeningDoc, I aim to educate and reach a wider audience about the significance of cancer screening and available options.</li>
                  </ul>
              </div>
              <div className="vertical-separator"></div>
              <div>
                  <h2 className="mb-0" style={{"font-family": "Times New Roman" }}>Connect with Me!</h2>
                  <br></br>
                  <div style={{display: "flex", "align-items": "center"}}>
                  <Card.Img className="profile-image" src={profile} alt="Profile Image" />
                  <div className="profile-links">
                    <a href="https://www.linkedin.com/in/dr-aastha-poddar-5bab64161/" target="_blank" rel="noopener noreferrer">
                      <LinkedIn fontSize="large" />
                    </a>
                    <a href="https://www.instagram.com/draasthapoddar/" target="_blank" rel="noopener noreferrer">
                      <Instagram fontSize="large" />
                    </a>
                  </div>
                  </div>
              </div>
            </Card.Body>
          </Card>
    </Container>
  );
}

export default AboutUs;
