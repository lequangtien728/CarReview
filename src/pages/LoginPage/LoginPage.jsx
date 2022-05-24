import React, { useState } from "react";
import "./LoginPage.css";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import userService from "../../utils/userService";
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import {useNavigate, Link} from "react-router-dom";

export default function LoginPage(props) {
  const [state, setState]=useState({
    email:"",
    password:"",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  function handleChange(event) {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await userService.login(state);
      props.handleSignUpOrLogin();
      navigate("/");//navigate to homepage
      
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <>
      <Grid textAlign='center' style={{ height: '100vh', backgroundImage: "url(" + "https://wallpapercave.com/wp/wp3072155.jpg" + ")", backgroundSize: 'cover'}} verticalAlign='middle' >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='yellow' textAlign='center'>
            <Image src='https://i.imgur.com/uFR9MGL.jpeg' /> Log-in to your account
          </Header>
          <Form size='large' autoComplete="off" onSubmit={handleSubmit}>
            <Segment stacked>
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
              <Button color='yellow' fluid size='large' type="submit" className="btn">
                Login
              </Button>
            </Segment>
          </Form>
          <Message>
            New to us? <Link to="/signup">SIGN UP</Link>
          </Message>
          {error ? <ErrorMessage error={error} /> : null}
        </Grid.Column>
      </Grid>
    </>
  );
}



