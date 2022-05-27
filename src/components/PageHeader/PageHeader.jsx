import React from "react";
import { Link } from "react-router-dom";
import { Header, Segment, Image, Icon } from "semantic-ui-react";

export default function PageHeader({ user, handleLogout }) {
    console.log(user, 'user in header')
  return (
    <Segment clearing style={{ height: "9vh", backgroundImage: "url(" + "https://www.teahub.io/photos/full/47-479778_black-car-background-hd.jpg" + ")",}}>
      <Header as="h2" floated="right">
        <Link to="/">
          <Icon name="car"></Icon>
        </Link>
        <Link to="" onClick={handleLogout}>
          LOGOUT
        </Link>
      </Header>
      <Header as="h2" floated="left">
        <Link to={`/${user?.username}`}>
          <Image
            src={
              user?.photoUrl
                ? user?.photoUrl
                : "https://react.semantic-ui.com/images/wireframe/square-image.png"
            }
            avatar
          ></Image>
        </Link>
      </Header>
    </Segment>
  );
}