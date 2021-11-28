import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Header, Image, Segment } from "semantic-ui-react";

export default function HomePage(){

    return(
        <Segment inverted textAlign='center' vertical className='masthead'>
            <Container text>
                <Header as='h1' inverted>
                    <Image  size='massive' src='/assets/logo.png' alt='logo' style={{marginBotton:12}}/>
                    Reactivities
                </Header>
                <Header as='h2' inverted content='welcome to Reactivities' />
                <Button as={Link} to="/activities" size="huge" inverted>
                    Take me to the Activities!
                </Button>
            </Container>
        </Segment>
    )


}