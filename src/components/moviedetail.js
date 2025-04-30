// src/components/MovieDetail.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector }      from 'react-redux';
import { useParams }                      from 'react-router-dom';
import { fetchMovie }                     from '../actions/movieActions';
import { submitReview }                   from '../actions/reviewActions';
import { Card, ListGroup, Form, Button, Image } from 'react-bootstrap';
import { BsStarFill }                     from 'react-icons/bs';

export default function MovieDetail() {
  const dispatch = useDispatch();
  const { movieId } = useParams();

  // Global state
  const movie   = useSelector(s => s.movie.selectedMovie);
  const loading = useSelector(s => s.movie.loading);
  const error   = useSelector(s => s.movie.error);

  // Local form state
  const [rating, setRating]       = useState(5);
  const [comment, setComment]     = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Fetch movie detail (with reviews & avgRating) on mount or when movieId changes
  useEffect(() => {
    dispatch(fetchMovie(movieId));
  }, [dispatch, movieId]);

  // Show loading / error states
  if (loading) return <div>Loading…</div>;
  if (error)   return <div>Error: {error}</div>;
  if (!movie)  return <div>No movie data available.</div>;

  // Handle review form submission
  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await dispatch(submitReview({ movieId, rating, comment }));
      setComment('');
      setRating(5);
      await dispatch(fetchMovie(movieId));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="bg-dark text-light p-4 rounded">
      <Card.Header as="h2">{movie.title}</Card.Header>
      <Image src={movie.imageUrl} thumbnail className="mb-3" />

      <Card.Body>
        <p>
          <strong>Average Rating:</strong>{' '}
          <BsStarFill /> {movie.avgRating?.toFixed(1) ?? 'N/A'}
        </p>
        <p>
          <strong>Actors:</strong> {movie.actors.map(a => a.actorName).join(', ')}
        </p>
      </Card.Body>

      <ListGroup className="mb-4">
        {(movie.reviews || []).map(r => (
          <ListGroup.Item key={r._id}>
            <strong>{r.username}</strong> — <BsStarFill /> {r.rating}
            <br />
            {r.review}
          </ListGroup.Item>
        ))}
      </ListGroup>

      <Card.Body>
        <h5>Submit a Review</h5>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="rating" className="mb-3">
            <Form.Label>Rating</Form.Label>
            <Form.Select
              value={rating}
              onChange={e => setRating(Number(e.target.value))}
            >
              {[5, 4, 3, 2, 1].map(n => (
                <option key={n} value={n}>
                  {n} Star{n > 1 && 's'}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="comment" className="mb-3">
            <Form.Label>Comment</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={comment}
              onChange={e => setComment(e.target.value)}
              placeholder="Write your review here..."
              required
            />
          </Form.Group>

          <Button type="submit" disabled={submitting}>
            {submitting ? 'Submitting…' : 'Submit Review'}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}
