import React from 'react';
import Card from './components/Card';
import Form from './components/Form';
import './App.css';
import Filters from './components/Filters';

class App extends React.Component {
  state = {
    name: '',
    description: '',
    attr1: '',
    attr2: '',
    attr3: '',
    image: '',
    rarity: 'normal',
    trunfo: false,
    // hasTrunfo: false,
    isSaveButtonDisabled: true,
    savedCards: [],
    myDeck: [],
    filterDisabled: false,
  };

  onInputChange = ({ target }) => {
    const currentState = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [target.name]: currentState,
    },
    () => {
      this.validateForm();
    });
  };

  validateForm = () => {
    const { name, description, attr1, attr2, attr3, image, rarity } = this.state;

    const maxAttr = 90;
    const minAttr = 0;
    const sumAttr = 210;

    const valideForm = name.length > 0
    && description.length > 0
    && attr1.length > 0
    && attr2.length > 0
    && attr3.length > 0
    && image.length > 0
    && rarity.length > 0
    && minAttr <= parseInt(attr1, 10)
    && parseInt(attr1, 10) <= maxAttr
    && minAttr <= parseInt(attr2, 10)
    && parseInt(attr2, 10) <= maxAttr
    && minAttr <= parseInt(attr3, 10)
    && parseInt(attr3, 10) <= maxAttr
    && parseInt(attr1, 10) + parseInt(attr2, 10) + parseInt(attr3, 10) <= sumAttr;

    this.setState({
      isSaveButtonDisabled: !valideForm,
    });
  }

  onSaveButtonClick = (event) => {
    event.preventDefault();

    const { name, description, attr1, attr2,
      attr3, image, rarity, savedCards, trunfo, myDeck } = this.state;

    const currentSaveCard = {
      saveName: name,
      saveDescription: description,
      saveAttr1: attr1,
      saveAttr2: attr2,
      saveAttr3: attr3,
      saveImg: image,
      saveRarity: rarity,
      saveTrunfo: trunfo,
    };

    this.setState({
      savedCards: [...savedCards, currentSaveCard],
      myDeck: [...myDeck, currentSaveCard],
    },
    () => {
      this.setState({
        name: '',
        description: '',
        attr1: '0',
        attr2: '0',
        attr3: '0',
        image: '',
        rarity: 'normal',
        trunfo: false,
        isSaveButtonDisabled: true,
        filterName: '',
        filterRarity: '',
      });
    });
  };

  deleteCard = (paramIndex) => {
    const { savedCards, myDeck } = this.state;
    this.setState({
      savedCards: savedCards.filter((_card, index) => index !== paramIndex),
      myDeck: myDeck.filter((_card, index) => index !== paramIndex),
    });
  }

  filterTrunfo = ({ target }) => {
    const { myDeck } = this.state;
    if (target.checked) {
      const filterTrunfo = myDeck.filter((card) => card.saveTrunfo);
      return this.setState({
        savedCards: [...filterTrunfo],
        filterDisabled: true,
      });
    }
    return this.setState({
      filterDisabled: false,
      savedCards: [...myDeck],
    });
  }

  filterName = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    }, () => {
      const { savedCards, filterName, myDeck } = this.state;
      if (filterName.length === 0) {
        this.setState({ savedCards: [...myDeck] });
      } else {
        const filterByName = savedCards.filter((card) => (
          card.saveName.includes(filterName)));
        this.setState({ savedCards: [...filterByName] });
      }
    });
  }

  filterRarity = ({ target }) => {
    console.log(target);
    this.setState({
      [target.name]: target.value,
    }, () => {
      const { filterName, filterRarity, myDeck } = this.state;
      if (filterRarity === 'todas') {
        return this.setState({ savedCards: [...myDeck] });
      }
      if (filterRarity !== 'todas') {
        const filterByRarity = myDeck.filter((card) => (
          card.saveRarity === filterRarity && card.saveName.includes(filterName)));
        this.setState({ savedCards: [...filterByRarity] });
      }
    });
  }

  render() {
    const {
      name,
      description,
      attr1,
      attr2,
      attr3,
      image,
      rarity,
      trunfo,
      isSaveButtonDisabled,
      savedCards,
      filterDisabled,
    } = this.state;

    const allSavedCards = savedCards.map((card, index) => (
      <div key={ index } className="cards">
        <Card
          cardName={ card.saveName }
          cardDescription={ card.saveDescription }
          cardAttr1={ card.saveAttr1 }
          cardAttr2={ card.saveAttr2 }
          cardAttr3={ card.saveAttr3 }
          cardImage={ card.saveImg }
          cardRare={ card.saveRarity }
          cardTrunfo={ card.saveTrunfo }
        />

        <button
          type="button"
          onClick={ () => { this.deleteCard(index); } }
          data-testid="delete-button"
        >
          Delete
        </button>
      </div>
    ));

    return (

      <div>
        <h1 className="title">Trunfo NBA</h1>
        <div className="first-container">
          <div className="left-size">
            <div className="form-container">
              <h3>Adicionar Nova Carta</h3>
              <Form
                cardName={ name }
                cardDescription={ description }
                cardAttr1={ attr1 }
                cardAttr2={ attr2 }
                cardAttr3={ attr3 }
                cardImage={ image }
                cardRare={ rarity }
                cardTrunfo={ trunfo }
                hasTrunfo={ savedCards.some((card) => card.saveTrunfo) }
                isSaveButtonDisabled={ isSaveButtonDisabled }
                onInputChange={ this.onInputChange }
                onSaveButtonClick={ this.onSaveButtonClick }
              />
            </div>
          </div>

          <div className="right-size">
            <Card
              cardName={ name }
              cardDescription={ description }
              cardAttr1={ attr1 }
              cardAttr2={ attr2 }
              cardAttr3={ attr3 }
              cardImage={ image }
              cardRare={ rarity }
              cardTrunfo={ trunfo }
            />
          </div>
        </div>
        <div>
          <div className="tittle-save-container">
            <h2 className="title-saved-cards">Cartas Salvas</h2>
          </div>
          <div className="botton-size">
            <Filters
              filterName={ this.filterName }
              filterRarity={ this.filterRarity }
              filterTrunfo={ this.filterTrunfo }
              filterDisabled={ filterDisabled }
            />
            <div className="saved-cards-container">
              { allSavedCards }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
