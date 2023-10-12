import {React, useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Form, Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BASE_URL } from '../constants.js'
import CircularProgress from '@mui/material/CircularProgress';

function FormPage(isAuthenticated) {
  const location = useLocation();
  const loadForm = location.state?.isAuthenticated;
  console.log(loadForm)
  const username = location.state?.name;
  const email = location.state?.email;
  const navigate = useNavigate();
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if(loadForm === false || loadForm === undefined){
      navigate("/")
    }
  }, [loadForm, navigate]);

  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    currentSmoker: '',
    pastSmoker: '',
    packsPerDay: '',
    yearsSmoked: '',
    personalHistoryCancer: '',
    familyHistoryCancer: '',
    personalHistoryIBD: '',
    ibdDiagnoseDate: '',
    hereditaryColorectalCancer: '',
    radiationHistory: '',
    brcaMutation: '',
    relativeWithMutation: '',
    chestRadiation: '',
    lrrSyndrome: '',
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const getResults = async(e) => {
    try {
        setLoading(true)
        var apiEndpoint = '/get-result'
        const response = await axios.get(`${apiEndpoint}`,
            {params: {"age": formData["age"],
                      "gender": formData["gender"],
                      "currentSmoker": formData["currentSmoker"],
                      "pastSmoker": formData["pastSmoker"],
                      "packsPerDay": formData["packsPerDay"],
                      "yearsSmoked": formData["yearsSmoked"],
                      "personalHistoryCancer": formData["personalHistoryCancer"],
                      "familyHistoryCancer": formData["familyHistoryCancer"],
                      "personalHistoryIBD": formData["personalHistoryIBD"],
                      "ibdDiagnoseDate": formData["ibdDiagnoseDate"],
                      "hereditaryColorectalCancer": formData["hereditaryColorectalCancer"],
                      "radiationHistory": formData["radiationHistory"],
                      "brcaMutation": formData["brcaMutation"],
                      "relativeWithMutation": formData["relativeWithMutation"],
                      "chestRadiation": formData["chestRadiation"],
                      "lrrSyndrome": formData["lrrSyndrome"]}});
        if (response["data"]["status"] === "success") {
            setResults(response["data"]["recommendation"])
        }
        else {
            setError(response["data"]["msg"])
        }
        setLoading(false)
    } catch (error) {
      console.error('API error:', error);
      setError('An error occurred. Please try again.');
      setLoading(false)
    }
  };

  return (
      !loading? (
      <Container className="mt-5">
      {results && (
        <>
        <p> {username}, Congratulations on taking one step ahead towards staying healthy.
        Remember, being eligible for cancer screening DOES NOT mean you have cancer or will develop cancer.
        Screening for cancers help us diagnose the condition before the symptoms appear,
        at a very early stage when CURATIVE treatment is possible.
        Kindly reach out to your health care provider for more details.
        </p>
        <div className="mt-4">
          <Card className="mb-3">
            <Card.Header style={{ backgroundColor: '#1e88e5', color: 'white' }}>
              <h2 className="mb-0">ScreeningDoc Recommendation</h2>
            </Card.Header>
            <Card.Body>
              {Object.keys(results).map(key => (
                <div key={key} className="mb-3">
                  <Card.Header>{key}</Card.Header>
                  <Card.Body>
                    {results[key].split('\n').map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                      ))}
                  </Card.Body>
                </div>
              ))}
            </Card.Body>
          </Card>
        </div>
        </>
      )}
      {
        !results && (<p> Hello {username}! Please in the below form to get started with your screening! </p>)
      }
      <Card>
        <Card.Header style={{ backgroundColor: '#1e88e5', color: 'white' }}>
          <h2 className="mb-0">ScreeningDoc Questionnaire</h2>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="age" style={{"margin": 10}}>
              <Form.Label>What is your age?</Form.Label>
              <Form.Control
                type="number"
                name="age"
                value={formData.age}
                onChange={handleFormChange}
                placeholder="Enter your age"
                required
              />
            </Form.Group>

            <Form.Group controlId="gender" style={{"margin": 10}}>
              <Form.Label>What is your gender?</Form.Label>
              <Form.Control
                as="select"
                name="gender"
                value={formData.gender}
                onChange={handleFormChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="currentSmoker" style={{"margin": 10}}>
              <Form.Label>Do you smoke currently?</Form.Label>
              <div>
                <Form.Check
                  inline
                  type="radio"
                  label="Yes"
                  name="currentSmoker"
                  value="yes"
                  checked={formData.currentSmoker === 'yes'}
                  onChange={handleFormChange}
                  required
                />
                <Form.Check
                  inline
                  type="radio"
                  label="No"
                  name="currentSmoker"
                  value="no"
                  checked={formData.currentSmoker === 'no'}
                  onChange={handleFormChange}
                  required
                />
              </div>
            </Form.Group>
            {
                formData["currentSmoker"] === "no" && (
                    <Form.Group controlId="pastSmoker" style={{"margin": 10}}>
                      <Form.Label>If not, have you ever smoked in the past 15 years?</Form.Label>
                      <div>
                        <Form.Check
                          inline
                          type="radio"
                          label="Yes"
                          name="pastSmoker"
                          value="yes"
                          checked={formData.pastSmoker === 'yes'}
                          onChange={handleFormChange}
                          required
                        />
                        <Form.Check
                          inline
                          type="radio"
                          label="No"
                          name="pastSmoker"
                          checked={formData.pastSmoker === 'no'}
                          value="no"
                          onChange={handleFormChange}
                          required
                        />
                      </div>
                    </Form.Group>
                )
            }
            <Form.Group controlId="packsPerDay" style={{"margin": 10}}>
              <Form.Label>How many packs of cigarettes do you smoke per day?</Form.Label>
              <Form.Control
                type="number"
                name="packsPerDay"
                value={formData.packsPerDay}
                onChange={handleFormChange}
                placeholder="Enter packs per day"
                required
              />
            </Form.Group>

            <Form.Group controlId="yearsSmoked" style={{"margin": 10}}>
              <Form.Label>How many years have you smoked for?</Form.Label>
              <Form.Control
                type="number"
                name="yearsSmoked"
                value={formData.yearsSmoked}
                onChange={handleFormChange}
                placeholder="Enter years smoked"
                required
              />
            </Form.Group>

            <Form.Group controlId="personalHistoryCancer" style={{"margin": 10}}>
              <Form.Label>
                Do you have a personal history of colorectal cancer or certain types of polyps?
              </Form.Label>
              <Form.Control
                as="select"
                name="personalHistoryCancer"
                value={formData.personalHistoryCancer}
                onChange={handleFormChange}
              >
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="familyHistoryCancer" style={{"margin": 10}}>
              <Form.Label>Do you have a family history of colorectal cancer?</Form.Label>
              <Form.Control
                as="select"
                name="familyHistoryCancer"
                value={formData.familyHistoryCancer}
                onChange={handleFormChange}
              >
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="personalHistoryIBD" style={{"margin": 10}}>
              <Form.Label>
                Do you have a personal history of inflammatory bowel disease (ulcerative colitis or Crohn’s disease)?
              </Form.Label>
              <Form.Control
                as="select"
                name="personalHistoryIBD"
                value={formData.personalHistoryIBD}
                onChange={handleFormChange}
              >
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </Form.Control>
            </Form.Group>

            {
                formData["personalHistoryIBD"] === "yes" && (
                    <Form.Group controlId="ibdDiagnoseDate" style={{"margin": 10}}>
                      <Form.Label>When was the inflammatory disease diagnosed?</Form.Label>
                      <Form.Control
                        type="date"
                        name="ibdDiagnoseDate"
                        value={formData.ibdDiagnoseDate}
                        onChange={handleFormChange}
                      />
                    </Form.Group>
                )
            }

            <Form.Group controlId="hereditaryColorectalCancer" style={{"margin": 10}}>
              <Form.Label>
                Do you have a confirmed or suspected hereditary colorectal cancer syndrome, such as
                familial adenomatous polyposis (FAP) or Lynch syndrome (hereditary non-polyposis
                colon cancer or HNPCC)?
              </Form.Label>
              <Form.Control
                as="select"
                name="hereditaryColorectalCancer"
                value={formData.hereditaryColorectalCancer}
                onChange={handleFormChange}
              >
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="radiationHistory" style={{"margin": 10}}>
              <Form.Label>
                Do you have a personal history of getting radiation to the abdomen (belly) or pelvic area to
                treat a prior cancer?
              </Form.Label>
              <Form.Control
                as="select"
                name="radiationHistory"
                value={formData.radiationHistory}
                onChange={handleFormChange}
              >
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="brcaMutation" style={{"margin": 10}}>
                  <Form.Label>Do have a known BRCA1 or BRCA2 gene mutation (based on having had genetic testing)?</Form.Label>
                  <div>
                    <Form.Check
                      type="radio"
                      name="brcaMutation"
                      value="yes"
                      checked={formData.brcaMutation === 'yes'}
                      onChange={handleFormChange}
                      label="Yes"
                    />
                    <Form.Check
                      type="radio"
                      name="brcaMutation"
                      value="no"
                      checked={formData.brcaMutation === 'no'}
                      onChange={handleFormChange}
                      label="No"
                    />
                  </div>
                </Form.Group>

                <Form.Group controlId="relativeWithMutation" style={{"margin": 10}}>
                  <Form.Label>Do you have a first-degree relative with a BRCA1 or BRCA2 gene mutation, and have not had genetic testing themselves?</Form.Label>
                  <div>
                    <Form.Check
                      type="radio"
                      name="relativeWithMutation"
                      value="yes"
                      checked={formData.relativeWithMutation === 'yes'}
                      onChange={handleFormChange}
                      label="Yes"
                    />
                    <Form.Check
                      type="radio"
                      name="relativeWithMutation"
                      value="no"
                      checked={formData.relativeWithMutation === 'no'}
                      onChange={handleFormChange}
                      label="No"
                    />
                  </div>
                </Form.Group>

                <Form.Group controlId="chestRadiation" style={{"margin": 10}}>
                  <Form.Label>Had radiation therapy to the chest when they were between the ages of 10 and 30 years?</Form.Label>
                  <div>
                    <Form.Check
                      type="radio"
                      name="chestRadiation"
                      value="yes"
                      checked={formData.chestRadiation === 'yes'}
                      onChange={handleFormChange}
                      label="Yes"
                    />
                    <Form.Check
                      type="radio"
                      name="chestRadiation"
                      value="no"
                      checked={formData.chestRadiation === 'no'}
                      onChange={handleFormChange}
                      label="No"
                    />
                  </div>
                </Form.Group>

                <Form.Group controlId="lrrSyndrome" style={{"margin": 10}}>
                  <Form.Label>Do you have Li-Fraumeni syndrome, Cowden syndrome, or Bannayan-Riley-Ruvalcaba syndrome, or have first-degree relatives with one of these syndromes?</Form.Label>
                  <div>
                    <Form.Check
                      type="radio"
                      name="lrrSyndrome"
                      value="yes"
                      checked={formData.lrrSyndrome === 'yes'}
                      onChange={handleFormChange}
                      label="Yes"
                    />
                    <Form.Check
                      type="radio"
                      name="lrrSyndrome"
                      value="no"
                      checked={formData.lrrSyndrome === 'no'}
                      onChange={handleFormChange}
                      label="No"
                    />
                  </div>
                </Form.Group>

            <div className="text-center">
              <Button variant="primary" type="submit" onClick={getResults}>
                Get Results
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
    ) :(
        <CircularProgress/>
    )
  );
}

export default FormPage;
