import React, { Component } from "react";
import _ from "lodash";
import NumberFormat from "react-number-format";
import Moment from "react-moment";
import 'moment/locale/fr';
import Loading from "./Loading";
import Footer from "./Footer";
import { Header, Table, Container, Icon, Flag, Divider, Search, Responsive, Segment, Grid } from 'semantic-ui-react';

export default class ParPays extends Component {
  constructor(props){
    super(props);
    this.state={
        isLoaded: false,
        isLoading: false,
        reports: [],
        results: [],
        value: []
    };
}

componentDidMount(){
    fetch("https://corona.lmao.ninja/v2/countries")
    .then(res=>res.json())
    .then(json => {
        this.setState({
            isLoaded:true,
            reports: json.sort((a, b) => b.cases - a.cases),
            results: json.sort((a, b) => b.cases - a.cases)
        });
    })
    .catch(error =>{
        this.setState({
            error
        });
    });
}

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState({results: this.state.reports, isLoading:false})

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = (result) => re.test(result.country)

      this.setState({
        isLoading: false,
        results: _.filter(this.state.reports, isMatch),
      })
    }, 100)
  }
  

render(){
  

    let { reports, isLoaded, isLoading, results } = this.state;
    if(!isLoaded){
        return(
            <div className="text-center">
                <Loading />
            </div>
        );
    } else {
        return(
        <main>
          
          <br />
          <Divider hidden />
            <Container textAlign="center">
            <Header size="huge" color="teal"><Icon name="flag outline" />Chiffres par Pays</Header>
         <Divider horizontal section> Dernière mise à jour : <Moment locale="fr" format="ddd DD/MM/YYYY HH:mm">{reports.created}</Moment></Divider>
          <Search
            loading={isLoading}
            showNoResults={false}
            onSearchChange={_.debounce(this.handleSearchChange, 100, {
              leading: true,
            })}
          /> <br />
          <Responsive maxWidth="767">
          {results.map(report => (
          <Segment raised color="teal">
            <Header as="h2" textAlign="left"><Flag name={report.country.toLowerCase()} />{report.country}</Header>
            <Grid columns={3} divided compact>
            <Grid.Row>
              <Grid.Column>
              <Header as="h4">Total des Cas:</Header> {report.cases}
              </Grid.Column>
              <Grid.Column>
              <Header as="h4">Total Rétablis:</Header> {report.recovered}
              </Grid.Column>
              <Grid.Column>
              <Header as="h4">Total Décès:</Header> {report.deaths}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
              <Header as="h4">Nouveaux Cas:</Header> {report.todayCases}
              </Grid.Column>
              <Grid.Column>
              <Header as="h4">Nouveaux Décès:</Header> {report.todayDeaths}
              </Grid.Column>
              <Grid.Column>
              <Header as="h4">Tests/Million:</Header> {report.testsPerOneMillion}
              </Grid.Column>
            </Grid.Row>
            </Grid>
                </Segment>
          ))}</Responsive>

                <Responsive minWidth="768">
          <Table color="teal" striped unstackable selectable>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Pays</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">Cas</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">Décès</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">Rétablis</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">Nouveaux Cas</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">Nouveaux Décès</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">Cas Critiques</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">Total des Tests</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">Tests/Million</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
<div className='scrollable'>
              <Table.Body  className="scrollable">
              {results.map(report => (
                <Table.Row>
                  
                  <Table.Cell>
                    <img alt="" height="20x" src={report.countryInfo.flag} /> {report.country}
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                  <NumberFormat
                                value={report.cases}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={""}
                              />
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                      <NumberFormat
                                value={report.deaths}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={""}
                              />
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                      <NumberFormat
                                value={report.recovered}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={""}
                              />
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                      <NumberFormat
                                value={report.todayCases}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={""}
                              />
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                      <NumberFormat
                                value={report.todayDeaths}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={""}
                              />
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                      <NumberFormat
                                value={report.critical}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={""}
                              />
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                      <NumberFormat
                                value={report.tests}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={""}
                              />
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                      <NumberFormat
                                value={report.testsPerOneMillion}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={""}
                              />
                  </Table.Cell>
                </Table.Row>
              ))}
              </Table.Body></div>
            </Table>
            </Responsive>
          </Container>
          <Divider hidden padded />
          <Footer />
        </main>

        )
    }
}

}