import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Header, Icon, Segment } from 'semantic-ui-react';

export default function NotFound() {
    return (
        <Segment placeholder>
            <Header icon>
                <Icon name="search" />
              OOPs... we have looked everywhere and could not find this.
            </Header>
            <Segment.Inline>
                <Button as={Link} to="/activities" primary>Back To Activities</Button>

            </Segment.Inline>
        </Segment>
    )
}