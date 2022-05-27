import { useState, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import PageHeader from "../../components/PageHeader/PageHeader";
import Loading from "../../components/Loader/Loader";
import UserProfile from "../../components/UserProfile/UserProfile";
import PostGallery from "../../components/PostGallery/PostGallery";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import userService from "../../utils/userService";
import { useParams } from "react-router-dom";
import * as likesAPI from '../../utils/likeApi';

export default function UserProfilePage(props) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState({});
  const [cars, setCars] = useState([]);
  // We need to grab the username out of the url,
  const { username } = useParams();

  async function addLike(carId){
    try {
      const data = await likesAPI.create(carId)
      console.log(data, ' <- the response from the server when we make a like');
      getProfile(); // <- to go get the updated cars with the like
    } catch(err){
      console.log(err)
      setError(err.message)
    }
  }

  async function removeLike(likeId){
    try {
      const data = await likesAPI.removeLike(likeId);
      console.log(data, '<-  this is the response from the server when we remove a like')
      getProfile()
      
    } catch(err){
      console.log(err);
      setError(err.message);
    }
  }

  async function getProfile() {
    try {
      const data = await userService.getProfile(username);
      console.log(data, " < -- data");
      setLoading(() => false);
      setUser(() => data.user);
      setCars(() => data.cars);
    } catch (err) {
      console.log(err);
      setError("Profile Doesn't exists, CHECK YOUR TERMINAL FOR EXPRESS!");
    }
  }

  useEffect(()=>{
    getProfile();
  },[]);
  // then when the component loads we can use that username to fetch all the users data
  // then we can store that in state
  

  if (error) {
    return (
      <>
        <PageHeader handleLogout={props.handleLogout} user={props.user}/>
        <ErrorMessage error={error} />;
      </>
    );
  }

  if (loading) {
    return (
      <>
        <PageHeader handleLogout={props.handleLogout} user={props.user}/>
        <Loading />
      </>
    );
  }

  return (
    <Grid style={{ backgroundImage: "url(" + "https://wallpapercave.com/wp/wp3072155.jpg" + ")", backgroundSize: 'cover'}}>
      <Grid.Row>
        <Grid.Column>
          <PageHeader handleLogout={props.handleLogout} user={props.user}/>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <UserProfile user={user} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row centered>
        <Grid.Column style={{ maxWidth: 1000 }}>
        <PostGallery
            isProfile={true}
            cars={cars}
            numPhotosCol={3}
            user={props.user}
            addLike={addLike}
            removeLike={removeLike}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
