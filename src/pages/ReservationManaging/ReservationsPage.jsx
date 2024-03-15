import React, { useState, useEffect } from 'react';
import { ReservationService } from '../../Services/ReservationService/ReservationService';

const ReservationsPage = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    ReservationService.getAllReservations()
      .then(response => {
        setReservations(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch reservations. Please try again later.');
        setLoading(false);
        console.error(err);
      });
  }, []);

  if (loading) return <div>Loading reservations...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>All Reservations</h1>
      {reservations.length > 0 ? (
        <ul>
          {reservations.map((reservation) => (
            <li key={reservation.id}>
              Reservation ID: {reservation.id}, User ID: {reservation.userId}, Book ID: {reservation.bookId}, Status: {reservation.status}, Date: {reservation.reservationDate}
            </li>
          ))}
        </ul>
      ) : (
        <p>No reservations found.</p>
      )}
    </div>
  );
};

export default ReservationsPage;
