import React, { Component } from 'react';
import { Accordion, Icon, Card, Image, Container, Divider, Header, Label } from 'semantic-ui-react';
import Loading from "./Loading";
import Moment from "react-moment";


export default class News extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
        activeIndex:0,
        isLoaded: false,
        reports: []
    };
  }

  componentDidMount() {
    fetch("https://api.coronatracker.com/news/trending")
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

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  render() {
    let { reports, isLoaded, activeIndex } = this.state;
    let newsReports = Object.values(reports);
    if (!isLoaded) {
        return (
          <div className="text-center">
            <Loading />
          </div>
        );
      } else {
    return (
      <main>
        
      <Divider hidden />
      <Header size="huge" color="teal" textAlign="center"><Icon name="newspaper outline" />Actualités</Header>
         <Divider horizontal section> Dernière mise à jour : <Moment locale="fr" format="ddd DD/MM/YYYY HH:mm">{reports.created}</Moment></Divider>
      <Divider hidden />
      
      <Container>
      <Accordion fluid> 
      
          {newsReports[1].map(report => (
          <Card fluid raised color="tail">
            <Label  attached='top right'>{report.siteName}</Label>
        <Accordion.Title
          active={activeIndex === 0}
          index={0}
          onClick={this.handleClick}
        >
          <Header as="h3"><Icon name='dropdown' />{report.title}</Header>
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>
         
    <Image src={report.urlToImage} spaced wrapped /><br />
    <Card.Content>
      <Card.Description>
      <Container>{report.content}</Container>
      </Card.Description>
    </Card.Content>
    </Accordion.Content>
  </Card>
  ))}    
      </Accordion>
      </Container>
      </main>
    )
  }
}
}
