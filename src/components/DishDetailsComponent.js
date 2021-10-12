import React,{ Component } from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Label, Col, Row 
} from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';


const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

function RenderDish({ dish }) {
  return (
    <div className="col-12 col-md-5 m-1">
       <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
      <Card>
        <CardImg top src={baseUrl + dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
      </FadeTransform>
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
       this.props.postComment(this.props.dishId, values.rating, values.reviewerName, values.comment);
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

function RenderComments({comments, postComment, dishId }) {
  return (
    <div className="col-12 col-md-5 m-1">
      <h4>Comments</h4>
      <ul className="list-unstyled">
      <Stagger in>
        {comments.map((comment) => {
          return (
            <Fade in>
            <li key={comment.id}>
              <p>{comment.comment}</p>
              <p>--{comment.author},{new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              }).format(new Date(comment.date))}</p>
            </li>
            </Fade>
          );
        })}
        </Stagger>
      </ul>
      <CommentForm dishId={dishId} postComment={postComment}/>
    </div>
  );
}

const DishDetails = (props) => {
  if (props.isLoading) {
    return(
        <div className="container">
            <div className="row">            
                <Loading />
            </div>
        </div>
    );
}
else if (props.errMess) {
    return(
        <div className="container">
            <div className="row">            
                <h4>{props.errMess}</h4>
            </div>
        </div>
    );
}
else if (props.dish != null) 
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
          <RenderComments comments={props.comments} postComment={props.postComment}
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