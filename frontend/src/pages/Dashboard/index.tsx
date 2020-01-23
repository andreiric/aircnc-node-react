import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import socketio from 'socket.io-client';

import './styles.css';

import api from '../../services/api';
import { Spot } from '../../models';

export default function Dashboard() {
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    const user_id = localStorage.getItem('user');
    const socket = socketio('http://localhost:3333', {
      query: { user_id }
    });
  }, []);

  useEffect(() => {
    async function loadSpots() {
      const user_id = localStorage.getItem('user');
      const response = await api.get('/dashboard', {
        headers: { user_id }
      });
      setSpots(response.data);
    }
    loadSpots();
  }, []);

  return (
    <>
      <ul className="spot-list">
        {spots.map((spot: Spot) => (
          <li key={spot.id}>
            <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }} />
            <strong>{ spot.company }</strong>
            <span>{ spot.price ? `R$${spot.price}/dia` : 'GRATUITO' }</span>
          </li>
        ))}
      </ul>

      <Link to="/new">
        <button className="btn">Cadastrar novo spot</button>
      </Link>
    </>
  );
}
