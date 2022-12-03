import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithrouter from '../renderWithRouter';
import App from '../App';
import pokemonList from '../data';

describe('Testes do componente PokemonDetails', () => {
  it('Verifica se as informações do Pokémon selecionado são mostradas na tela', () => {
    renderWithrouter(<App />);

    const linkDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkDetails);

    const { name, summary } = pokemonList[0];
    const heading = screen.getByRole('heading', { name: `${name} Details` });

    const headingDetails = screen.getByRole('heading', {
      name: /summary/i,
      level: 2,
    });

    const details = screen.getByText(summary);

    expect(headingDetails).toBeInTheDocument();
    expect(linkDetails).not.toBeInTheDocument();
    expect(heading).toBeInTheDocument();
    expect(details).toBeInTheDocument();
  });

  it('Verifica se existe um mapa contendo as localizações dos Pokémon', () => {
    renderWithrouter(<App />);

    const linkDetails = screen.getByRole('link', { name: /more details/i });

    userEvent.click(linkDetails);

    const { name, foundAt } = pokemonList[0];
    const locationHeading = screen.getByRole('heading', { name: `Game Locations of ${name}` });

    expect(locationHeading).toBeInTheDocument();

    const locationPokemon = screen.getAllByAltText(`${name} location`);

    expect(locationPokemon).toHaveLength(foundAt.length);

    foundAt.forEach(({ location, map }, index) => {
      expect(locationPokemon[index]).toHaveAttribute('src', map);

      const nameLocation = screen.getByText(location);
      expect(nameLocation).toBeInTheDocument();
    });
  });

  it('Verifica se usuário pode favoritar um pokemon através da página de detalhes', () => {
    renderWithrouter(<App />);

    const linkDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkDetails);

    const { name } = pokemonList[0];

    const favoriteBox = screen.getByLabelText('Pokémon favoritado?');
    expect(favoriteBox).toBeInTheDocument();

    expect(screen.queryByAltText(`${name} is marked as favorite`))
      .not.toBeInTheDocument();

    userEvent.click(favoriteBox);
    expect(screen.queryByAltText(`${name} is marked as favorite`))
      .toBeInTheDocument();

    userEvent.click(favoriteBox);
    expect(screen.queryByAltText(`${name} is marked as favorite`))
      .not.toBeInTheDocument();
  });
});
