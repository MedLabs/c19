import React, { Component } from "react";
import "./App.scss";
import { Switch, Route } from "react-router-dom";
import GlobalReport from "./components/GlobalReport";
import NavComponent from "./components/NavComponent";
import CountriesReport from "./components/CountriesReport";
import TreandingNews from "./components/TreandingNews";
import Mondial from "./components/Mondial";
import ParPays from "./components/Pays";
import News from './components/News'
import 'semantic-ui-css/semantic.min.css'; 
import { capitalize } from "./components/Helper";
import { Col, Card, ListGroup } from "react-bootstrap/";
import NumberFormat from "react-number-format";
import Moment from "react-moment";
import 'moment/locale/fr';


export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      country: "country",
      isLoaded: false,
      reports: []
    };

    capitalize(this.state.country);
  }


  handleSearchData(stateData) {
    this.setState({
      ...stateData
    });
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
    const { country, reports } = this.state;
    let coutrySanitized = country.trim();

    if (coutrySanitized === "") {
      return (
        <div className="text-center">
          <NavComponent handleSearch={this.handleSearchData.bind(this)} />
          <h4 className="text-danger">Entrez un pays valide</h4>
        </div>
      );
    } else {

    return (
      <div className="App">
        <NavComponent handleSearch={this.handleSearchData.bind(this)} />
        {reports.map(report =>
          report.country === coutrySanitized.toUpperCase() ||
          report.country === coutrySanitized.toLowerCase() ||
          report.country === capitalize(coutrySanitized) ? (
            
            <Col xs={12} sm={6} md={6} lg={10}>
              <Card className="text-center" bg="Light" variant="Light">
                <Card.Header>
                  <h6>
                    {report.country} <img alt='' src={`https://www.countryflags.io/${report.countryCode}/flat/32.png`}/>
                  </h6>
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
                      Total des cas confirmés par million:
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
          ) : (
            ""
          )
        )
        }
        
        <Switch>
          <Route exact path="/" component={GlobalReport} />
          <Route path="/pays" component={ParPays} />
          <Route path="/actualites" component={TreandingNews} />
          <Route path="/mondial" component={Mondial} />
          <Route path="/news" component={News} />
        </Switch>
      </div>
    );
          }
  }
}
