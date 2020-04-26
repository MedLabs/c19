import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  Jumbotron
} from "react-bootstrap/";
import NumberFormat from "react-number-format";
import Moment from "react-moment";
import 'moment/locale/fr';
import Loading from "./Loading";
import Footer from "./Footer";

export default class countriesReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reports: [],
      isLoaded: false
    };
  }

  componentDidMount() {
    fetch("https://api.coronatracker.com/v3/stats/worldometer/country")
      .then(res => res.json())
      .then(json => {
        this.setState({
          reports: json,
          isLoaded: true
        });
      })
      .catch(error => {
        this.setState({
          error
        });
      });
  }

  render() {
    let { reports, isLoaded } = this.state;

    if (!isLoaded) {
      return (
        <div className="text-center">
          <Loading />
        </div>
      );
    } else {
      return (
        <main>
          <Jumbotron>
          <h1 className="text-center">Rapport par Pays</h1><hr />
            <Container>
              <Row>
                {reports.map(report => (
                  <Col xs={12} sm={6} md={4} lg={3}>
                    <Card className="text-center" bg="Light" variant="Light">
                      <Card.Header>
                        <h5>
                          {report.country} <img alt='' src={`https://www.countryflags.io/${report.countryCode}/flat/32.png`}/>
                        </h5>
                      </Card.Header>
                      <Card.Body>
                        <ListGroup variant="flush">
                          <ListGroup.Item>
                            Total des Cas:{" "}
                            <NumberFormat
                              value={report.totalConfirmed}
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={""}
                            />
                          </ListGroup.Item>
                          <ListGroup.Item>
                            Total Décès:{" "}
                            <NumberFormat
                              value={report.totalDeaths}
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={""}
                            />
                          </ListGroup.Item>
                          <ListGroup.Item>
                            Total Rétablis:{" "}
                            <NumberFormat
                              value={report.totalRecovered}
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={""}
                            />
                          </ListGroup.Item>
                          <ListGroup.Item>
                            Cas Aujourd'hui:{" "}
                            <NumberFormat
                              value={report.dailyConfirmed}
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={""}
                            />
                          </ListGroup.Item>
                          <ListGroup.Item>
                            Décès Aujourd'hui:{" "}
                            <NumberFormat
                              value={report.dailyDeaths}
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={""}
                            />
                          </ListGroup.Item>
                          <ListGroup.Item>
                            Cas Actifs:{" "}
                            <NumberFormat
                              value={report.activeCases}
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={""}
                            />
                          </ListGroup.Item>
                          <ListGroup.Item>
                            Cas Critiques:{" "}
                            <NumberFormat
                              value={report.totalCritical}
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={""}
                            />
                          </ListGroup.Item>
                          <ListGroup.Item>
                            Total des cas confirmés par millions:
                            <br />
                            <NumberFormat
                              value={report.totalConfirmedPerMillionPopulation}
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={""}
                            />
                          </ListGroup.Item>
                        </ListGroup>
                      </Card.Body>
                      <Card.Footer className="text-muted">
                        Dernière mise à jour:
                        <br />
                        <Moment locale="fr" format="ddd DD/MM/YYYY HH:mm">{report.lastUpdated}</Moment>
                      </Card.Footer>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Container>
            <Footer />
          </Jumbotron>
        </main>
      );
    }
  }
}
