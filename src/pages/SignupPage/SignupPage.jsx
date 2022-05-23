import React, { useState } from "react";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { Button, Form, Grid, Header, Image, Segment } from 'semantic-ui-react'



export default function SignUpPage(props) {

  const [error, setError] = useState('')
  //current state and setstate to change
  const[state, setstate]= useState({
    username:'',
    email:'',
    password:'',
    passwordConf:'',
  })

  const [selectedFile, setSelectedFile] = useState('');



  function handleSubmit(event){
    event.preventDefault()

    // Create form Data, because we're sending a multipart/formData request, 
    // because we are sending over multiple requests, because we're uploading a photo!
    const formData = new FormData(); // new FormData is from the browser
    formData.append('photo', selectedFile);

  }

  function handleChange(event){
    setstate({
      ...state,
      [event.target.name]: event.target.value
    })
  }

  function handleFileInput(event){
    console.log(event.target.files);
    setSelectedFile(event.target.files[0]);

  }

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="yellow" textAlign="center">
          <Image src="https://i.imgur.com/uFR9MGL.jpeg" /> Sign Up
        </Header>
        <Form autoComplete="off" onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              name="username"
              placeholder="username"
              value={state.username}
              onChange={handleChange}
              required
            />
            <Form.Input
              type="email"
              name="email"
              placeholder="email"
              value={state.email}
              onChange={handleChange}
              required
            />
            <Form.Input
              name="password"
              type="password"
              placeholder="password"
              value={state.password}
              onChange={handleChange}
              required
            />
            <Form.Input
              name="passwordConf"
              type="password"
              placeholder="Confirm Password"
              value={state.passwordConf}
              onChange={handleChange}
              required
            />
            <Form.Field>
              <Form.Input
                type="file"
                name="photo"
                placeholder="upload image"
                onChange={handleFileInput}
              />
            </Form.Field>
            <Button type="submit" className="btn" color="yellow">
              Signup
            </Button>
          </Segment>
          {error ? <ErrorMessage error={error} /> : null}
        </Form>
      </Grid.Column>
    </Grid>
  );
}
