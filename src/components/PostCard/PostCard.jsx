import React from "react";
import { Card, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function PostCard({ car, isProfile,  user }) {
//   console.log(car)
  return (
    <Card key={car._id} raised>
      {isProfile ? (
        ""
      ) : (
        <Card.Content textAlign="left">
          <Card.Header>
            <Link to={`/${car.user.username}`}>
              <Image
                size="large"
                avatar
                src={
                  car.user.photoUrl
                    ? car.user.photoUrl
                    : "https://react.semantic-ui.com/images/wireframe/square-image.png"
                }
              />
              {car.user.username}
            </Link>
          </Card.Header>
        </Card.Content>
      )}
      <Image src={`${car.photoUrl}`} wrapped ui={false} />
      <Card.Content>
        <Card.Description>{car.caption}</Card.Description>
      </Card.Content>
      
    </Card>
  );
}


