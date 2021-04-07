import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Container, Button } from 'semantic-ui-react';




export default function NavBar (){
  
  return (
    <Menu fixed='top' inverted>
      <Container>
        <Menu.Item header as={NavLink} to="/" exact>
            <img src="/assets/logo.png" alt="logo" style={{marginRight: 10}}/>
            Reactivities
        </Menu.Item>
        <Menu.Item name='Activities' as={NavLink} to="/activities" />
        <Menu.Item>
            <Button positive content='Create Activity' as={NavLink} to="/createActivity" />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

