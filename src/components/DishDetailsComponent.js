import React,{ Component } from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Label, Col, Row 
} from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';


const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

function RenderDish({ dish }) {
  return (
    <div className="col-12 col-md-5 m-1">
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

class CommentForm extends Component {
  constructor(props) {
      super(props);

      this.state = {
          isModalOpen: false
      }
      this.handleSubmit = this.handleSubmit.bind(this);
      this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
      this.setState({
          isModalOpen: !this.state.isModalOpen
      });
  }

  handleSubmit(values) {
      this.toggleModal();
       this.props.addComment(this.props.dishId, values.rating, values.reviewerName, values.comment);
  }

  render() {
      return (
          <div className="mt-5">
              <Button outline onClick={this.toggleModal}><i className="fa fa-pencil mr-2"/>Submit Comment</Button>
              <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                  <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                  <ModalBody>
                      <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                          <Row className="form-group">
                              <Col>
                                  <Label htmlFor="rating">Rating</Label>
                                  <Control.select model=".rating" name="rating"
                                      className="form-control">
                                      <option>1</option>
                                      <option>2</option>
                                      <option>3</option>
                                  </Control.select>
                              </Col>
                          </Row>
                          <Row className="form-group">
                              <Col>
                                  <Label htmlFor="reviewerName">Your Name</Label>
                                  <Control.text model=".reviewerName" id="reviewerName" name="reviewerName"
                                      placeholder="Your name"
                                      className="form-control"
                                      validators={{
                                          minLength: minLength(3), maxLength: maxLength(15)
                                      }}
                                  />
                                  <Errors
                                      className="text-danger"
                                      model=".reviewerName"
                                      show="touched"
                                      messages={{
                                          minLength: 'Must be greater than 2 characters',
                                          maxLength: 'Must be 15 characters or less'
                                      }}
                                  />
                              </Col>
                          </Row>
                          <Row className="form-group">
                              <Col>
                                  <Label htmlFor="comment">Comment</Label>
                                  <Control.textarea model=".comment" id="comment" name="comment"
                                      rows="6"
                                      className="form-control" />
                              </Col>
                          </Row>
                          <Button type="submit" value="submit" color="primary">Submit</Button>
                      </LocalForm>
                  </ModalBody>
              </Modal>
          </div>
      )
  }
}

function RenderComments({comments, addComment, dishId }) {
  return (
    <div className="col-12 col-md-5 m-1">
      <h4>Comments</h4>
      <ul className="list-unstyled">
        {comments.map((comment) => {
          return (
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
      <CommentForm dishId={dishId} addComment={addComment}/>
    </div>
  );
}

const DishDetails = (props) => {

  if (props.dish != null)
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <RenderDish dish={props.dish} />
          <RenderComments comments={props.comments} addComment={props.addComment}
        dishId={props.dish.id} />
        </div>
      </div>
    );
  else
    return (
      <div></div>
    )
}

export default DishDetails;