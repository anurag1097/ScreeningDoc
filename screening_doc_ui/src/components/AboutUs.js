import React from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { Instagram, LinkedIn } from '@mui/icons-material';
import profile from '../images/my_picture.png'
import './AboutUs.css'

function AboutUs(props) {

  const isMobile = props["isMobile"]

  return (
    <div>
    {
        !isMobile ? (
            <Container fluid style={{"display": "flex", "justifyContent": "space-between"}}>
              <Card className="outlined" style={{ backgroundSize: 'cover' }}>
                <Card.Header style={{ backgroundColor: '#1e88e5', color: 'white', "font-family": "Times New Roman"}}>
                  <h2 className="mb-0">About Us</h2>
                </Card.Header>
                <Card.Body style={{"display": "flex", "justifyContent": "space-between"}}>
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
                        <div style={{"display": "flex", "justifyContent": "space-between"}}>
                        <div className="vertical-separator"></div>
                          <div>
                            <h2 className="mb-0" style={{"font-family": "Times New Roman" }}>Connect with Me!</h2>
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
                        </div>
                  </Card.Body>
                  </Card>
            </Container>
        ) :(
            <Card className="outlined" style={{ "margin": "3%"}}>
                <Card.Header style={{ backgroundColor: '#1e88e5', color: 'white', "font-family": "Times New Roman"}}>
                  <h2 className="mb-0">About Us</h2>
                </Card.Header>
                <Card.Body style={{"display": "flex", "justifyContent": "space-between"}}>
                  <h2 className="mb-0" style={{"font-family": "Times New Roman" }}>On a mission to make cancer a history!</h2>
                  <div>
                  <ul>
                    <li>The journey is challenging, both for cancer survivors and caregivers.</li>
                    <li>Recently, I realised a lack of awareness about cancer screening guidelines.</li>
                    <li>Timely diagnosis is vital, as cancer is curable at an early, symptom-free stage.</li>
                    <li>Through ScreeningDoc, I aim to educate and reach a wider audience about the significance of cancer screening and available options.</li>
                  </ul>
                  </div>
                </Card.Body>
                <Card.Body>
                  <h2 className="mb-0" style={{"font-family": "Times New Roman" }}>Connect With Me!</h2>
                  <Card.Img className="profile-image" src={profile} alt="Profile Image" />
                  <a href="https://www.linkedin.com/in/dr-aastha-poddar-5bab64161/" target="_blank" rel="noopener noreferrer">
                    <LinkedIn fontSize="large" />
                  </a>
                  <a href="https://www.instagram.com/draasthapoddar/" target="_blank" rel="noopener noreferrer">
                    <Instagram fontSize="large" />
                  </a>
                </Card.Body>
                </Card>
        )
    }
    </div>
  );
}

export default AboutUs;
