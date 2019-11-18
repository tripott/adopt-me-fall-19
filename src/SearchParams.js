import React, { useState } from 'react'
import { ANIMALS } from '@frontendmasters/pet'

const SearchParams = () => {
  const [location, setLocation] = useState('Seattle, WA')
  const [animal, setAnimal] = useState('dog')

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

      <button>Submit</button>
    </div>
  )
}

export default SearchParams
