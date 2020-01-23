import React, { SyntheticEvent, useState } from 'react';

import api from '../../services/api';

export default function Login({ history }: any) {
  const [email, setEmail] = useState('');

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();

    const response = await api.post('/sessions', { email });

    const { id } = response.data;

    localStorage.setItem('user', id);

    history.push('/dashboard');
  }

  return (
    <>
      <p>
        Ofereça <strong>Spots</strong> para programadores e encontre <strong>talentos</strong> para sua empresa
      </p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">E-mail *</label>
        <input type="email" id="email" placeholder="Seu melhor e-mail" value={email}
          onChange={event => setEmail(event.target.value)} />
        <button type="submit" className="btn">Entrar</button>
      </form>
    </>
  );
}
