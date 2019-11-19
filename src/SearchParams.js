import React, { useState, useEffect } from 'react'
import pet, { ANIMALS } from '@frontendmasters/pet'
import useDropdown from './useDropdown'
import Results from './Results'

const SearchParams = () => {
  const [location, setLocation] = useState('Seattle, WA')
  // const [animal, setAnimal] = useState('dog')
  // const [breed, setBreed] = useState('')
  const [breeds, setBreeds] = useState([])
  const [animal, , AnimalDropdown] = useDropdown('Animal', 'dog', ANIMALS)
  const [breed, setBreed, BreedDropdown] = useDropdown('Breed', '', breeds)
  const [pets, setPets] = useState([])

  // async/await - async function returns a promise that will resolve
  //  when the function call completes
  // Inside async functions, you can use await keyword
  //  pet.animals returns a promise.
  //  await says "wait until the call to pet.animals completes and give me the data"
  //   so we await for the return of the data object..from which we
  //    destructure the animals property then setPets with the animals.

  async function requestPets() {
    const { animals } = await pet.animals({ location, breed, type: animal })
    setPets(animals || [])
  }

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
      <form
        onSubmit={e => {
          e.preventDefault()
          requestPets()
        }}
      >
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
      </form>
      <Results pets={pets} />
    </div>
  )
}

export default SearchParams
