import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PokemonPage(props) {
  const [pokemon, setPokemon] = useState({});

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${props.match.params.id}`)
      .then(response => {
        setPokemon(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [props.match.params.id]);

  return (
    <div>
      <h1>{pokemon.name}</h1>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p>Type: {pokemon.types.map(type => type.type.name).join(', ')}</p>
      <h2>Stats</h2>
      <ul>
        {pokemon.stats.map(stat => (
          <li key={stat.stat.name}>{stat.stat.name}: {stat.base_stat}</li>
        ))}
      </ul>
      <h2>Abilities</h2>
      <ul>
        {pokemon.abilities.map(ability => (
          <li key={ability.ability.name}>{ability.ability.name}</li>
        ))}
      </ul>
      <h2>Moves</h2>
      <ul>
        {pokemon.moves.map(move => (
          <li key={move.move.name}>{move.move.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default PokemonPage;
