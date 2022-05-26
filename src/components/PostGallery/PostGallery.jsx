import React from 'react';
import { Card, Dimmer, Segment, Image  } from 'semantic-ui-react'
import PostCard from '../PostCard/PostCard';
import Loader from '../Loader/Loader';

export default function PostFeed({cars, numPhotosCol, isProfile, loading, user,addLike, removeLike,comment }){

    return (
        <Card.Group itemsPerRow={numPhotosCol} stackable>
        {loading ? (
          <Segment>
            <Dimmer active inverted>
              <Loader size="small">Loading</Loader>
            </Dimmer>
            <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
          </Segment>
        ) : null}
        {cars.map((car) => {
          return (
            <PostCard
              car={car}
              key={car._id}
              isProfile={isProfile}
              user={user}
              addLike={addLike}
              removeLike={removeLike}
              comment={comment}
            />
          );
        })}
      </Card.Group>
  
    )
}