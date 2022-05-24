import React, { useState } from "react";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { Button, Form, Grid, Header, Image, Segment } from 'semantic-ui-react'
import userService from "../../utils/userService";
import { useNavigate } from "react-router-dom";


export default function SignUpPage(props) {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  //current state and setstate to change
  const[state, setstate]= useState({
    username:'',
    email:'',
    password:'',
    passwordConf:'',
  })

  const [selectedFile, setSelectedFile] = useState('');

  async function handleSubmit(event){
    event.preventDefault()

    // Create form Data, because we're sending a multipart/formData request, 
    // because we are sending over multiple requests, because we're uploading a photo!
    const formData = new FormData(); // new FormData is from the browser
    formData.append('photo', selectedFile);

    // wrote way of appending each key value pair to form Data
    // formData.append('username', state.username);
    // formData.append('email', state.email);
    for (let fieldName in state){
      formData.append(fieldName, state[fieldName])
    }

    // console.log(formData, " <- formData") // <- this doesn't allow you to look at the formdData object
    // console.log(formData.forEach((item) => console.log(item))); // <- to look at the keys, you must forEach over it

    try {

      await userService.signup(formData) // <- we must pass the argument as formData when we have a
      // photo
      props.handleSignUpOrLogin(); // <- this will decode the token from local storage
      // that we just received as a respone to our userService.signup fetch call,
      // and decode and update the state in our App component
      navigate('/') // after signup, navigate to the home page

    } catch(err){
      console.log(err.message);
      setError(err.message)
    }

  }

  function handleChange(event){
    setstate({
      ...state,
      [event.target.name]: event.target.value
    })
  }

  function handleFileInput(event){
    console.log(event.target.files);
    setSelectedFile(event.target.files[0]);//this allow to upload 1 file. The first file.

  }

  return (
    <Grid textAlign="center" style={{ height: "100vh", backgroundImage: "url(" + "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d6aacd93-2c2e-4e81-9540-ea6fad242575/d80bpt1-7329bc06-52c0-4583-ae71-a0651586b54d.jpg/v1/fill/w_1192,h_670,q_70,strp/yellow_lamborghini___wallpaper_by_durly0505_d80bpt1-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTA4MCIsInBhdGgiOiJcL2ZcL2Q2YWFjZDkzLTJjMmUtNGU4MS05NTQwLWVhNmZhZDI0MjU3NVwvZDgwYnB0MS03MzI5YmMwNi01MmMwLTQ1ODMtYWU3MS1hMDY1MTU4NmI1NGQuanBnIiwid2lkdGgiOiI8PTE5MjAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.Ze-oVVofyP1L8oGycN4kzuMEXFqwYWmfN4j470uywXs" + ")", backgroundSize: 'cover'}} verticalAlign="middle">
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


