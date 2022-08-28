import React, { Component } from 'react';
import propTypes from 'prop-types';

class Filters extends Component {
  render() {
    const { filterName, filterRarity, filterTrunfo, filterDisabled } = this.props;

    return (
      <div className="filter-container">
        <h3>Filtros de Busca</h3>
        <label htmlFor="name-filter">
          <input
            type="text"
            id="name-filter"
            name="filterName"
            className="name-filter"
            data-testid="name-filter"
            placeholder="Nome da Carta"
            onChange={ filterName }
            disabled={ filterDisabled }
          />
        </label>
        <label
          htmlFor="rare-filter"
          className="rare-filter"
        >
          Raridade
          <select
            name="filterRarity"
            id="rare-filter"
            className="rare-filter"
            data-testid="rare-filter"
            onChange={ filterRarity }
            disabled={ filterDisabled }
            defaultValue="todas"
          >
            <option name="filterRarity" value="todas">Todas</option>
            <option name="filterRarity" value="normal">Normal</option>
            <option name="filterRarity" value="raro">Raro</option>
            <option name="filterRarity" value="muito raro">Muito-Raro</option>
          </select>
        </label>
        <label htmlFor="trunfo-filter">
          <input
            type="checkbox"
            name="trunfo"
            className="trunfo-filter"
            id="trunfo-filter"
            data-testid="trunfo-filter"
            onChange={ filterTrunfo }
          />
          Super Trunfo
        </label>
      </div>

    );
  }
}

Filters.propTypes = {
  filterName: propTypes.func.isRequired,
  filterRarity: propTypes.func.isRequired,
  filterTrunfo: propTypes.func.isRequired,
  filterDisabled: propTypes.bool.isRequired,
};

export default Filters;
