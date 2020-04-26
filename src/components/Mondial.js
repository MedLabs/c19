import React, { Component } from "react";
import NumberFormat from "react-number-format";
import Moment from "react-moment";
import 'moment/locale/fr';
import Loading from "./Loading";
import Footer from "./Footer";
import { Label, Table, Container, Segment, Header, Grid, Divider, Flag } from 'semantic-ui-react';


export default class Mondial extends Component {

    constructor(props){
        super(props);
        this.state={
            isLoaded: false,
            reports: [],
            countries:[]
        };
    }

    componentDidMount(){
        fetch("https://corona.lmao.ninja/v2/all")
        .then(res=>res.json())
        .then(json => {
            this.setState({
                isLoaded:true,
                reports: json.sort((a, b) => b.cases - a.cases)
            });
        })
        .catch(error =>{
            this.setState({
                error
            });
        });
    }

    componentDidMount(){
      fetch("https://corona.lmao.ninja/v2/countries")
      .then(res=>res.json())
      .then(json => {
          this.setState({
              isLoaded:true,
              countries: json.sort((a, b) => b.cases - a.cases)
          });
      })
      .catch(error =>{
          this.setState({
              error
          });
      });
  }

    render(){

        let { countries, reports, isLoaded } = this.state;
        if(!isLoaded){
            return(
                <div className="text-center">
                    <Loading />
                </div>
            );
        } else {
            return(
            <main>
                <Container textAlign="center">

              {countries.map(c => (
                <Segment raised>
            <Header as="h2" textAlign="left"><Flag name={c.country.toLowerCase()} />{c.country}</Header>
            <Grid columns={3} divided compact>
            <Grid.Row>
              <Grid.Column>
              <Header as="h4">Total des Cas:</Header> {c.cases}
              </Grid.Column>
              <Grid.Column>
              <Header as="h4">Total Rétablis:</Header> {c.recovered}
              </Grid.Column>
              <Grid.Column>
              <Header as="h4">Total Décès:</Header> {c.deaths}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
              <Header as="h4">Nouveaux Cas:</Header> {c.todayCases}
              </Grid.Column>
              <Grid.Column>
              <Header as="h4">Nouveaux Décès:</Header> {c.todayDeaths}
              </Grid.Column>
              <Grid.Column>
              <Header as="h4">Tests/million:</Header> {c.testsPerOneMillion}
              </Grid.Column>
            </Grid.Row>
            </Grid>
                </Segment>
                ))}

                <Divider hidden />
                {reports.map(report => (
              <Table celled striped>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Catégorie</Table.HeaderCell>
                      <Table.HeaderCell>Chiffres</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    
                    <Table.Row>
                      <Table.Cell>
                        <Label ribbon>Total des cas Confirmés</Label>
                      </Table.Cell>
                      <Table.Cell>
                          <NumberFormat
                                    value={report.cases}
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
                                    value={report.deaths}
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
                                    value={report.recovered}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={""}
                                  />
                      </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                      <Table.Cell>Nouveaux Cas Aujourd'hui</Table.Cell>
                      <Table.Cell>
                          <NumberFormat
                                    value={report.todayCases}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={""}
                                  />
                      </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                      <Table.Cell>Décès Aujourd'hui</Table.Cell>
                      <Table.Cell>
                          <NumberFormat
                                    value={report.todayDeaths}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={""}
                                  />
                      </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                      <Table.Cell>Total des Cas actifs</Table.Cell>
                      <Table.Cell>
                          <NumberFormat
                                    value={report.active}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={""}
                                  />
                      </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                      <Table.Cell>Total des Cas sur 1 Million</Table.Cell>
                      <Table.Cell>
                          <NumberFormat
                                    value={report.casesPerOneMillion}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={""}
                                  />
                      </Table.Cell>
                    </Table.Row>
                   
                  </Table.Body>

                  <Table.Footer>
                    <Table.Row>
                      <Table.HeaderCell colSpan='3'>
                        Dernière mise à jour : <Moment locale="fr" format="ddd DD/MM/YYYY HH:mm">{report.created}</Moment>
                      </Table.HeaderCell>
                    </Table.Row>
                    
                  </Table.Footer>
                </Table> ))}
              </Container>
              <Footer />
            </main>

            )
        }
    }

}