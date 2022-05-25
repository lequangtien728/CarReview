import React, { useState, useEffect } from "react";
import PageHeader from "../../components/PageHeader/PageHeader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import AddPostForm from "../../components/AddPostForm/AddPostForm";
import PostGallery from "../../components/PostGallery/PostGallery";
import Loading from "../../components/Loader/Loader";

import * as carsAPI from "../../utils/carApi";


import { Grid } from "semantic-ui-react";

export default function FeedPage({user,handleLogout}){
  console.log(carsAPI, " <-- carsAPI")
  const [cars, setCars] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // C create in Crud
  // we invoke this function in addPost component when the submit button on our form is clicked
  // so we need to pass it as a prop
  async function handleAddPost(car) {
    try {
      setLoading(true);
      const data = await carsAPI.create(car); // our server is going to return
      // the created car, that will be inside of data, which is the response from
      // the server, we then want to set it in state
      console.log(data, " this is response from the server, in handleAddPost");
      setCars([data.car, ...cars]);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  }

  // R read in crud
  async function getPosts() {
    try {
      const data = await carsAPI.getAll();
      console.log(data, " this is data,");
      setCars([...data.cars]);//refer to cars Controller data
      setLoading(false);
    } catch (err) {
      console.log(err.message, " this is the error");
      setError(err.message);
    }
  }

  // useEffect runs once
  // the component is first rendered (whenever you first view the component)
  // Component Lifecycle in react
  useEffect(() => {
    getPosts();
  }, []);



  if (error) {
    return (
      <>
        <PageHeader handleLogout={handleLogout} user={user}/>
        <ErrorMessage error={error} />;
      </>
    );
  }

  if (loading) {
    return (
      <>
        <PageHeader handleLogout={handleLogout} user={user}/>
        <Loading />
      </>
    );
  } 
  console.log(cars)
  return (
    <Grid centered>
      <Grid.Row>
        <Grid.Column>
          <PageHeader handleLogout={handleLogout} user={user}/>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column style={{ maxWidth: 450 }}>
          <AddPostForm handleAddPost={handleAddPost} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column style={{ maxWidth: 450 }}>
          <PostGallery
            cars={cars}
            numPhotosCol={1}
            isProfile={false}
            loading={loading}
            user={user}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}