import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';


class DishDetails extends Component {
    constructor(props) {
        super(props);
    }

    renderDish(dish) {
          return(
              <Card>
                  <CardImg top src={dish.image} alt={dish.name} />
                  <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                  </CardBody>
              </Card>
          );
  }

  renderComments(comments){
     return(
      <div>
        <h4>Comments</h4>
        {comments.map(comment =>
         <ul className="list-unstyled" key={comment.id}>
          <li>{comment.comment}</li>
          <li>--{comment.author},{new Intl.DateTimeFormat('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric'
            }).format(new Date(comment.date))}</li>
        </ul>
        )}
    </div>
     );
  }

    render(){
      if(this.props.selectedDish != null)
      return( 
      <div className="container">
        <div className="row">
            <div  className="col-12 col-md-5 m-1">
              {this.renderDish(this.props.selectedDish)}
            </div>
            <div  className="col-12 col-md-5 m-1">
              {this.renderComments(this.props.selectedDish.comments)}
            </div>
        </div>
       </div>
      );
      else
      return(
        <div></div>
      )
  }
  }
  export default DishDetails;