import React,{useState} from "react";
import { Card, Image, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import AddCommentForm from '../AddCommentForm/AddCommentForm';

import * as commentsAPI from "../../utils/commentApi";

export default function PostCard({ car, isProfile, addLike, removeLike, user, }) {

  // call the addLike or the removeLike when we click on the heart!
  // We need to know if the logged in user has liked this particular car!
  // we search the array of objects that is car.likes to see if the logged in users
  // id exists in that array of objects
  const likeIndex = car.likes.findIndex(
    (like) => like.username === user.username
  );

  const clickHandler =
    likeIndex > -1
      ? () => removeLike(car.likes[likeIndex]._id)
      : () => addLike(car._id);

  // if the logged users id exists, the heart should be red, because the logged in user has liked the car
  // and the clicked handler should removeLike
  const likeColor = likeIndex > -1 ? "red" : "grey";

  // if the logged users id doesn't exist in the car.likes array, then the heart should be
  // grey, because the user hasn't liked the car, and the click handler should be addLike





  const [comments, setComments] = useState([]); 
  
  // C create in Crud
  // we invoke this function in addPost component when the submit button on our form is clicked
  // so we need to pass it as a prop
  async function handleAddComment(comment) {

      const data = await commentsAPI.create(comment); // our server is going to return
      // the created car, that will be inside of data, which is the response from
      // the server, we then want to set it in state
      console.log(data, " this is response from the server, in handleAddComment");
      setComments([data.comment, ...comments]);
  
  }

  // async function getComments() {
  
  //     const data = await commentsAPI.getAll();
  //     console.log(data, " this is data,");
  //     setComments([...data.comments]);//refer to comments Controller data
      
  // }

  // useEffect(() => {
  //   getComments();
  // }, []);
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
      <Card.Content extra textAlign={"right"}>
        <Icon
          name={"heart"}
          size="large"
          color={likeColor}
          onClick={clickHandler}
        />
        {car.likes.length} Likes
      </Card.Content>
      <Card.Content>

        <AddCommentForm handleAddComment={handleAddComment}/>

      </Card.Content>
      
    </Card>
  );
}


