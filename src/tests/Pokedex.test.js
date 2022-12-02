import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';
import App from '../App';

const checkPokemon = ({ type, name, averageWeight }) => {
  expect(screen.getByTestId('pokemon-name')).toHaveTextContent(name);
  expect(screen.getByTestId('pokemon-type')).toHaveTextContent(type);
  expect(screen.getByTestId('pokemon-weight')).toHaveTextContent(`${averageWeight.value} ${averageWeight.measurementUnit}`);
};

describe('Testes do componente Pokedex', () => {
  it('Verifica se a página possui um heading h2 com o texto "Encountered Pokemon"', () => {
    renderWithRouter(<App />);

    const contentTag = screen.getByRole('heading', { name: 'Encountered Pokémon', level: 2 });
    expect(contentTag).toBeInTheDocument();
  });

  it('Verifica se é exibido o pokemon quando o botão "Próximo Pokémon" é clicado', () => {
    renderWithRouter(<App />);

    const buttonNext = screen.getByRole('button', { name: 'Próximo Pokémon' });

    pokemonList.forEach((pokemon) => {
      checkPokemon(pokemon);

      userEvent.click(buttonNext);
    });

    checkPokemon(pokemonList[0]);
  });

  it('Verifica se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);

    const buttonNext = screen.getByRole('button', { name: 'Próximo Pokémon' });

    pokemonList.forEach((pokemon) => {
      checkPokemon(pokemon);
      userEvent.click(buttonNext);
    });

    const filteredAllButton = screen.getAllByTestId('pokemon-type-button');

    const typesPokemon = [...new Set(pokemonList
      .reduce((acc, { type }) => [...acc, type], []))];

    const allbuttons = screen.getByRole('button', { name: 'All' });

    typesPokemon.forEach((type, i) => {
      expect(allbuttons).toBeInTheDocument();
      expect(filteredAllButton[i]).toHaveTextContent(type);
    });

    expect(allbuttons).toBeInTheDocument();
    userEvent.click(allbuttons);
  });
});
