import React, { useState } from 'react';

import { Button, Form, Grid, Segment } from 'semantic-ui-react'

export default function AddCommentForm(props){

  const [state, setState] = useState({
    comment: ''
  })

  function handleChange(e){
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  function handleSubmit(e){
    e.preventDefault()
     console.log(state.comment)        
    const formData = new FormData()
    formData.append('comment', state.comment)
    const commentObj = {"comment":state.comment}
    props.handleAddComment(commentObj,props.car._id); 
    
    // Have to submit the form now! We need a function!
  }

  return (
    
    <Grid textAlign='center' style={{ height: '25vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Segment>
        
            <Form  autoComplete="off" onSubmit={handleSubmit}>
            
              <Form.Input
                  className="form-control"
                  name="comment"
                  value={state.comment}
                  placeholder="Please put a comment?"
                  onChange={handleChange}
                  required
              />     
              <Button
                type="submit"
                className="ui inverted yellow button"
                style={{color:"black"}}
              >
                ADD COMMENT
              </Button>
            </Form>
          </Segment>
      </Grid.Column>
    </Grid>
   
  ); 
}