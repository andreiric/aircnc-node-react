import React, { useState, useMemo, SyntheticEvent } from 'react';

import './styles.css';

import camera from '../../assets/camera.svg';
import api from '../../services/api';

export default function New({ history }: any) {
  const [company, setCompany] = useState('');
  const [techs, setTechs] = useState('');
  const [price, setPrice] = useState('');
  const [thumbnail, setThumbnail] = useState<FileList | null>(null);

  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail[0]) : null;
  }, [thumbnail]);

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    const data = new FormData();
    const user_id = localStorage.getItem('user');

    data.append('thumbnail', thumbnail ? thumbnail[0] : '');
    data.append('company', company);
    data.append('techs', techs);
    data.append('price', price ? price : '0');

    await api.post('/spots', data, {
      headers: { user_id }
    });

    history.push('/dashboard');
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label id="thumbnail" style={{ backgroundImage: `url(${preview})`}}
          className={thumbnail ? 'has-thumbnail' : ''}>
          <input type="file" onChange={event => {setThumbnail(event.target.files)} } />
          <img src={camera} alt="Select img" />

        </label>

        <label htmlFor="comprany">Empresa *</label>
        <input id="company" placeholder="Sua empresa incrível" value={company}
          onChange={(event) => setCompany(event.target.value)} />

        <label htmlFor="techs">Tecnologias * <span>(separadas por vírgula)</span></label>
        <input id="techs" placeholder="Quais tecnologias usam?" value={techs}
          onChange={(event) => setTechs(event.target.value)} />

        <label htmlFor="price">Valor da Diária * <span>(em branco para GRATUITO></span></label>
        <input id="price" placeholder="Valor cobrado por dia" value={price}
          onChange={(event) => setPrice(event.target.value)} />

        <button type="submit" className="btn">Cadastrar</button>
      </form>
    </>
  );
}
