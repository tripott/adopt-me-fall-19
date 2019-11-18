import React, { useState, useEffect } from 'react'
import pet, { ANIMALS } from '@frontendmasters/pet'

const SearchParams = () => {
  const [location, setLocation] = useState('Seattle, WA')
  const [animal, setAnimal] = useState('dog')
  const [breed, setBreed] = useState('')
  const [breeds, setBreeds] = useState([])

  useEffect(() => {
    setBreeds([])
    setBreed('')
    pet.breeds(animal).then(
      ({ breeds }) => {
        const arrBreedNames = breeds.map(breed => breed.name)
        setBreeds(arrBreedNames)
      },
      err => console.log(err)
    )
  }, [animal, setBreeds, setBreed])

  return (
    <div className="search-params">
      <label htmlFor="location">
        location
        <input
          id="location"
          value={location}
          placeholder="Please enter location"
          onChange={e => setLocation(e.target.value)}
        />
      </label>

      <label htmlFor="animal">
        Animal
        <select
          id="animal"
          value={animal}
          onChange={e => setAnimal(e.target.value)}
          onBlur={e => setAnimal(e.target.value)}
        >
          <option />
          {ANIMALS.map(animal => (
            <option key={animal} value={animal}>
              {animal}
            </option>
          ))}
        </select>
      </label>

      <label htmlFor="breed">
        Breed
        <select
          id="breed"
          value={breed}
          onChange={e => setBreed(e.target.value)}
          onBlur={e => setBreed(e.target.value)}
          disabled={breeds.length === 0}
        >
          <option>All</option>
          {breeds.map(breedString => (
            <option key={breedString} value={breedString}>
              {breedString}
            </option>
          ))}
        </select>
      </label>

      <button>Submit</button>
    </div>
  )
}

export default SearchParams
