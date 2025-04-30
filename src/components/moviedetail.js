import React, { useEffect, useState } from 'react';
import { fetchMovie } from '../actions/movieActions';
import { useDispatch, useSelector } from 'react-redux';
import { submitReview } from '../actions/reviewActions';  
import { Card, ListGroup, ListGroupItem, Image } from 'react-bootstrap';
import { Form, Button } from 'react-bootstrap';
import { BsStarFill } from 'react-icons/bs';
import { useParams } from 'react-router-dom'; // Import useParams
import { submitReview } from '../actions/reviewActions';

const MovieDetail = () => {
  const dispatch = useDispatch();
  const { movieId } = useParams(); // Get movieId from URL parameters
  const selectedMovie = useSelector(state => state.movie.selectedMovie);
  const loading = useSelector(state => state.movie.loading); // Assuming you have a loading state in your reducer
  const error = useSelector(state => state.movie.error); // Assuming you have an error state in your reducer

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');


  useEffect(() => {
    dispatch(fetchMovie(movieId));
  }, [dispatch, movieId]);

  const DetailInfo = () => {
    if (loading) {
      return <div>Loading....</div>;
    }

    if (error) {
      return <div>Error: {error}</div>;
    }

    if (!selectedMovie) {
      return <div>No movie data available.</div>;
    }

    return (
      <Card className="bg-dark text-dark p-4 rounded">
        <Card.Header>Movie Detail</Card.Header>
        <Card.Body>
          <Image className="image" src={selectedMovie.imageUrl} thumbnail />
        </Card.Body>
        <ListGroup>
          <ListGroupItem>{selectedMovie.title}</ListGroupItem>
          <ListGroupItem>
            {selectedMovie.actors.map((actor, i) => (
              <p key={i}>
                <b>{actor.actorName}</b> {actor.characterName}
              </p>
            ))}
          </ListGroupItem>
          <ListGroupItem>
            <h4>
              <BsStarFill /> {selectedMovie.avgRating}
            </h4>
          </ListGroupItem>
        </ListGroup>
        <Card.Body>
          {(selectedMovie.movieReviews || []).map((review, i) => (
            <p key={i}>
              <b>{review.username}</b>&nbsp; {review.review} &nbsp; <BsStarFill />{' '}
              {review.rating}
            </p>
          ))}
        </Card.Body>

        <Card.Body>
          <Form onSubmit={e => {
            e.preventDefault();
            dispatch(submitReview({ movieId, rating, comment }))
              .then(() => {
                setComment('');                  // clear textarea
                setRating(5);                    // reset rating
                dispatch(fetchMovie(movieId));   // reload reviews + avgRating
            });
        }}>
          <Form.Group className="mb-3">
            <Form.Label>Rating</Form.Label>
            <Form.Select
              value={rating}
              onChange={e => setRating(Number(e.target.value))}
            >
              {[5,4,3,2,1].map(n => (
                <option key={n} value={n}>{n} Star{n>1 && 's'}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Comment</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={comment}
              onChange={e => setComment(e.target.value)}
              required
            />
          </Form.Group>

          <Button type="submit">Submit Review</Button>
        </Form>
      </Card.Body>

      </Card>
    );
  };

  return <DetailInfo />;
};


export default MovieDetail;