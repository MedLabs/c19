import React, { Component } from "react";
import { Link } from "react-router-dom";
import Logo from "../images/coronavirus.png";
import { Menu, Image} from 'semantic-ui-react';


export default class NavComponent extends Component {

  render() {
    
    return (
      <header>
        <Menu stackable inverted>
        <Menu.Item><Image
              src={Logo}
              size="mini"
              alt="C19 Info logo"
            /> C19 Info
        </Menu.Item>
        <Menu.Item
          name='monde'
          as={Link} to='/' />
          <Menu.Item
          name='pays'
          as={Link} to='/pays' />
        <Menu.Item
          name='actualités'
          as={Link} to='/news' />
      </Menu>
      </header>
    );
  }
}
