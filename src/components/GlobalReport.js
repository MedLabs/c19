import React, { Component } from "react";
import { Segment, Grid, Container, Table, Statistic, Divider, Header, Icon } from 'semantic-ui-react';
import NumberFormat from "react-number-format";
import Moment from "react-moment";
import 'moment/locale/fr';
import Loading from "./Loading";
import Footer from "./Footer";

export default class GlobalReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      report: [],
      isLoaded: false
    };
  }

  componentDidMount() {
    fetch("https://api.coronatracker.com/v3/stats/worldometer/global")
      .then(res => res.json())
      .then(json => {
        this.setState({
          report: json,
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
    let { report, isLoaded } = this.state;

    if (!isLoaded) {
      return (
        <div className="text-center">
          <Loading />
        </div>
      );
    } else {
      return (
        <main>

          <Divider hidden padded />
          <Container textAlign="center">
          <Header size="huge" color="teal"><Icon name="globe" />Chiffres au niveau Mondiale</Header>
         <Divider horizontal section> Dernière mise à jour : <Moment locale="fr" format="ddd DD/MM/YYYY HH:mm">{report.created}</Moment></Divider>
        <Divider hidden />
        <Grid columns={3} padded="vertically" textAlign="center" divided stackable>
          <Grid.Row>
            <Grid.Column>
            <Statistic size='large' color='blue'>
              <Statistic.Label>Confirmés</Statistic.Label>
              <Statistic.Value>

                  <NumberFormat
                                  value={report.totalConfirmed}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  prefix={""}
                                />
                                
              </Statistic.Value>
            </Statistic></Grid.Column>
            <Grid.Column>
            <Statistic size='large' color='green'>
              <Statistic.Label>Rétablis</Statistic.Label>
              <Statistic.Value>
                  <NumberFormat
                                  value={report.totalRecovered}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  prefix={""}
                                />
              </Statistic.Value>
            </Statistic></Grid.Column>
            <Grid.Column>
            <Statistic size='large' color='red'>
              <Statistic.Label>Décès</Statistic.Label>
              <Statistic.Value>
                  <NumberFormat
                                  value={report.totalDeaths}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  prefix={""}
                                />
              </Statistic.Value>
            </Statistic></Grid.Column>
            </Grid.Row>
          </Grid>

          <Segment basic vertical padded="very">
            <Container>

            <Table color="teal" striped unstackable selectable>
            <Table.Header>
                <Table.Row>

                  <Table.HeaderCell>Catégorie</Table.HeaderCell>
                  <Table.HeaderCell>Chiffres</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body  className="scrollable">
                <Table.Row>
                  <Table.Cell>Total des cas Confirmés</Table.Cell>
                  <Table.Cell>
                    <NumberFormat
                      value={report.totalConfirmed}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={""}
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Total des Décès</Table.Cell>
                  <Table.Cell>
                    <NumberFormat
                      value={report.totalDeaths}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={""}
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Total des Rétablis</Table.Cell>
                  <Table.Cell>
                    <NumberFormat
                      value={report.totalRecovered}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={""}
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Total des cas aujourd'hui</Table.Cell>
                  <Table.Cell>
                    <NumberFormat
                      value={report.totalNewCases}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={""}
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Total des décès aujourd'hui</Table.Cell>
                  <Table.Cell>
                    <NumberFormat
                      value={report.totalNewDeaths}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={""}
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Total des cas actifs</Table.Cell>
                  <Table.Cell>
                    <NumberFormat
                      value={report.totalActiveCases}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={""}
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Total des cas par million</Table.Cell>
                  <Table.Cell>
                    <NumberFormat
                      value={report.totalCasesPerMillionPop}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={""}
                    />
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
              <Table.Footer>
                <Table.Row>
                  <Table.HeaderCell colSpan='2'><span>Dernière mise à jour: </span>
                    <Moment locale="fr" format="dddd DD/MM/YYYY HH:mm">{report.created}</Moment>
                  </Table.HeaderCell>
                </Table.Row>
                </Table.Footer>
            </Table>
            </Container>
            
          </Segment>
          </Container>
        <Footer />
        </main>
      );
    }
  }
}
