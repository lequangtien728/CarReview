import React from "react";
import { Image, Grid, Segment } from "semantic-ui-react";

export default function UserProfile({ user }) {
  return (
    <Grid textAlign="center" columns={2}>
      <Grid.Row>
        <Grid.Column>
          <Image
            src={`${
              user.photoUrl
                ? user.photoUrl
                : "https://react.semantic-ui.com/images/wireframe/square-image.png"
            } `}
            avatar
            size="small"
          />
        </Grid.Column>
        <Grid.Column textAlign="left" style={{ maxWidth: 450 }}>
          <Segment vertical >
            <h3 style={{color: "blue"}}>{user.username}</h3>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
