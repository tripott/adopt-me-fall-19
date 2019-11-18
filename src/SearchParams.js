import React, { useState, useEffect } from 'react'
import pet, { ANIMALS } from '@frontendmasters/pet'
import useDropdown from './useDropdown'

const SearchParams = () => {
  const [location, setLocation] = useState('Seattle, WA')
  // const [animal, setAnimal] = useState('dog')
  // const [breed, setBreed] = useState('')
  const [breeds, setBreeds] = useState([])
  const [animal, , AnimalDropdown] = useDropdown('Animal', 'dog', ANIMALS)
  const [, setBreed, BreedDropdown] = useDropdown('Breed', '', breeds)

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

      <AnimalDropdown />
      <BreedDropdown />

      <button>Submit</button>
    </div>
  )
}

export default SearchParams
