import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonCard from './PokemonCard';

function HomeScreen() {
  const [query, setQuery] = useState('');
  const [generation, setGeneration] = useState('');
  const [type, setType] = useState('');
  const [pokemons, setPokemons] = useState([]);
  const [types, setTypes] = useState([]);

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/type`, {
      params: {
        limit: 1000 // retrieve all types
      }
    })
      .then(response => {
        setTypes(response.data.results);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon`, {
      params: {
        limit: 1000, // retrieve all Pokemon
        generation,
        type
      }
    })
      .then(response => {
        setPokemons(response.data.results);
      })
      .catch(error => {
        console.log(error);
      });
  }, [generation, type]);

  const handleSearchChange = (event) => {
    setQuery(event.target.value);
  }

  const handleGenerationChange = (event) => {
    setGeneration(event.target.value);
  }

  const handleTypeChange = (event) => {
    setType(event.target.value);
  }

  const filteredPokemons = pokemons.filter(pokemon => {
    return pokemon.name.toLowerCase().includes(query.toLowerCase());
  });

  return (
    <div>
      <input type="text" onChange={handleSearchChange} value={query} />
      <select onChange={handleGenerationChange} value={generation}>
        <option value="">All</option>
        <option value="1">Generation 1</option>
        <option value="2">Generation 2</option>
        // etc.
      </select>
