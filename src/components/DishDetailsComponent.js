import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';



    function RenderDish({dish}) {
          return(
            <div  className="col-12 col-md-5 m-1">
              <Card>
                  <CardImg top src={dish.image} alt={dish.name} />
                  <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                  </CardBody>
              </Card>
              </div>
          );
  }

  function RenderComments({comments}){
     return(
      <div  className="col-12 col-md-5 m-1">
        <h4>Comments</h4>
        <ul className="list-unstyled">
        {comments.map((comment) =>{
        return(
         <li key={comment.id}>
          <p>{comment.comment}</p>
          <p>--{comment.author},{new Intl.DateTimeFormat('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric'
            }).format(new Date(comment.date))}</p>
        </li>
        );
          })}
        </ul>
    </div>
     );
  }

    const DishDetails = (props) => {
      if(props.selectedDish != null)
      return( 
      <div className="container">
        <div className="row">
              <RenderDish dish={props.selectedDish}/>
              <RenderComments comments={props.selectedDish.comments}/>
        </div>
       </div>
      );
      else
      return(
        <div></div>
      )
  }
  
  export default DishDetails;