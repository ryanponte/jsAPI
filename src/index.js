import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';

const Users = () => {
  useEffect(() => {
    getUsers();
  }, []);

  const [users, setUsers] = useState([]);

  const getUsers = () => {
    axios
      .get(`https://jsonplaceholder.typicode.com/users`)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      {users.map((user) => (
        <div key={user.username} className='cards__item'>
          <div className='card'>
            <div className='card__content'>
              <div className='name card__title'>
                {user.name}
              </div>
              <div className='email'>
                Email: {user.email}
              </div>
              <div className='phone'>
                Phone: {user.phone}
              </div>
              <div className='company'>
                {user.company.name}
              </div>
              <div className='address'>
                {user.address.street}, {user.address.suite}
              </div>
              <div className='address'>
                {user.address.city}, {user.address.zipcode}
              </div>
              <a href='{user.website}' className='website'>
                {user.website}
              </a>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

const Pokemon = () => {
  useEffect(() => {
    getPokemon();
  }, []);

  const [pokemon, setPokemon] = useState([]);

  const getPokemon = () => {
    // GET request using fetch inside useEffect React hook
    const pokedexIds = ['1', '2', '3', '4', '5'];
    const pokemonPromises = pokedexIds.map((id) =>
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(
        (res) => res.json()
      )
    );
    Promise.all(pokemonPromises).then((data) =>
      setPokemon(data)
    );
  };

  return (
    <>
      {pokemon.map((p) => (
        <div key={p.order} class='cards__item'>
          <div class='card'>
            <div class='card__content'>
              <img
                src={
                  p.sprites.other['official-artwork'][
                    'front_default'
                  ]
                }
                alt={p.name}
              />
              <div class='name card__title'>
                Species: {p.name}
              </div>
              <div class='type card__item'>
                Type: {p.types[0].type.name}
              </div>
              <div class='height card__item'>
                Height: {p.height}
              </div>
              <div class='weight card__item'>
                Weight: {p.weight}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

const App = () => {
  return (
    <div className='row'>
      <div className='column'>
        Users
        <Users />
      </div>
      <div className='column'>
        Pokemon
        <Pokemon />
      </div>
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
