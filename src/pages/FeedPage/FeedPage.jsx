import React from "react";
import PageHeader from "../../components/PageHeader/PageHeader";
// import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import AddPostForm from "../../components/AddPostForm/AddPostForm";
import * as carsAPI from "../../utils/carApi";

import { Grid } from "semantic-ui-react";

export default function FeedPage({user,handleLogout}){
  console.log(carsAPI, " <-- carsAPI")
  
  return (
    <Grid centered>
      <Grid.Row>
        <Grid.Column>
          <PageHeader handleLogout={handleLogout} user={user}/>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column style={{ maxWidth: 450 }}>
          <AddPostForm/>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column style={{ maxWidth: 450 }}>
          
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}