import React, { useState } from "react";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { Button, Form, Grid, Header, Image, Segment } from 'semantic-ui-react'
import userService from "../../utils/userService";
import { useNavigate } from "react-router-dom";

export default function SignUpPage(props) {

  const [error, setError] = useState('')
  //current state and setstate to change
  const[state, setstate]= useState({
    username:'',
    email:'',
    password:'',
    passwordConf:'',
  })

  async function handleSubmit(event){
    event.preventDefault()

    //Create form Data, because we are sending a multipart/formData
  }
  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="yellow" textAlign="center">
          <Image src="https://i.imgur.com/uFR9MGL.jpeg" /> Sign Up
        </Header>
        <Form autoComplete="off">
          <Segment stacked>
            <Form.Input
              name="username"
              placeholder="username"
              required
            />
            <Form.Input
              type="email"
              name="email"
              placeholder="email"
              required
            />
            <Form.Input
              name="password"
              type="password"
              placeholder="password"
              required
            />
            <Form.Input
              name="passwordConf"
              type="password"
              placeholder="Confirm Password"
              required
            />
            <Form.Field>
              <Form.Input
                type="file"
                name="photo"
                placeholder="upload image"
              />
            </Form.Field>
            <Button type="submit" className="btn" color="yellow">
              Signup
            </Button>
          </Segment>
          
        </Form>
      </Grid.Column>
    </Grid>
  );
}
