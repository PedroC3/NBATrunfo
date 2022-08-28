import React, { Component } from 'react';
import propTypes from 'prop-types';

class Card extends Component {
  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
    } = this.props;

    return (
      <div className="border-card">
        <div className="front-card">
          <div className="rare-container">
            <div className="rare-flag">
              <p
                data-testid="rare-card"
                className="rare-card"
              >
                {cardRare}
              </p>
            </div>
          </div>
          <div className="name-container">
            <h2
              data-testid="name-card"
              className="name-card"
            >
              {cardName}
            </h2>
          </div>
          <div className="img-container">
            <img
              src={ cardImage }
              alt={ cardName }
              data-testid="image-card"
              className="image-card"
            />
            { cardTrunfo
            && (
              <div className="trunfo-container">
                <div className="trunfo-second-container">
                  <p data-testid="trunfo-card">Super Trunfo</p>
                </div>
              </div>) }
          </div>
          <div className="description-container">
            <p
              data-testid="description-card"
              className="description-card"
            >
              {cardDescription}
            </p>
          </div>
          <div className="attr-container">
            <div className="describe-attr-container">
              <p className="describe-attr">ATAQUE</p>
            </div>
            <div className="attr-value-container">
              <p
                data-testid="attr1-card"
                className="attr1-card"
              >
                {cardAttr1}
              </p>
            </div>
            <div className="describe-attr-container">
              <p className="describe-attr">DEFESA</p>
            </div>
            <div className="attr-value-container">
              <p
                data-testid="attr2-card"
                className="attr2-card"
              >
                {cardAttr2}
              </p>
            </div>
            <div className="describe-attr-container">
              <p className="describe-attr">FÍSICO</p>
            </div>
            <div className="attr-value-container">
              <p
                data-testid="attr3-card"
                className="attr3-card"
              >
                {cardAttr3}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Card.propTypes = {
  cardName: propTypes.string.isRequired,
  cardDescription: propTypes.string.isRequired,
  cardAttr1: propTypes.string.isRequired,
  cardAttr2: propTypes.string.isRequired,
  cardAttr3: propTypes.string.isRequired,
  cardImage: propTypes.string.isRequired,
  cardRare: propTypes.string.isRequired,
  cardTrunfo: propTypes.bool.isRequired,
};

export default Card;
