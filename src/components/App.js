import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = ({ target: { value } }) => {
    this.setState({ filters: { ...this.state.filters, type: value } });
  };

  onFindPetsClick = () => {
    let URL = '/api/pets'

    if (this.state.filters.type !== 'all') {
      URL += `?type=${this.state.filters.type}`
    }
    fetch(URL)
      .then(res => res.json())
      .then(pets => {
        this.setState({
          pets: pets
        });
      });
  }

  onAdoptPet = petId => {
    const newPets = this.state.pets.map(pet => {
      return pet.id === petId ? {...pet, isAdopted: true } : pet
    })
    this.setState({
      pets: newPets
      })
  }

  render() {
    console.log(this.state)
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters 
                onChangeType={this.onChangeType}
                onFindPetsClick={this.onFindPetsClick}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser 
                pets={this.state.pets}
                isAdopted={this.state.isAdopted}
                onAdoptPet={this.onAdoptPet}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
