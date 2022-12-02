import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import pokemonList from '../data';
import { Pokemon } from '../components';
import renderWithRouter from '../renderWithRouter';

const checkPokemon = ({ type, name, averageWeight, image }) => {
  expect(screen.getByTestId('pokemon-name')).toHaveTextContent(name);
  expect(screen.getByTestId('pokemon-type')).toHaveTextContent(type);
  expect(screen.getByTestId('pokemon-weight')).toHaveTextContent(`${averageWeight.value} ${averageWeight.measurementUnit}`);

  const imgScreen = screen.getByAltText(`${name} sprite`);
  expect(imgScreen).toBeInTheDocument();
  expect(imgScreen.src).toBe(image);
};

describe('Testa o componente Pokemon', () => {
  it('Verifica se é renderizado um card com as informações de um Pokemon específico', () => {
    renderWithRouter(<App />);

    checkPokemon(pokemonList[0]);
  });

  it('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon. O link deve possuir a URL /pokemon/<id>, onde <id> é o id do Pokémon exibido', () => {
    renderWithRouter(<App />);

    const linkDetalhes = screen.getByRole('link', { name: 'More details' });

    expect(linkDetalhes.href).toContain(`/pokemon/${pokemonList[0].id}`);
  });

  it('Verifica se ao clicar no link de navegação do Pokemon, é redicionado parar a página de detalhes, com URL específico', () => {
    const { history } = renderWithRouter(<App />);

    const linkDetalhes = screen.getByRole('link', { name: 'More details' });

    userEvent.click(linkDetalhes);

    const { pathname } = history.location;

    expect(pathname).toBe(`/pokemon/${pokemonList[0].id}`);
  });

  it('Verifica se existe um ícone de estrela nos Pokémon favoritados', () => {
    renderWithRouter(<Pokemon pokemon={ pokemonList[0] } isFavorite />);

    const iconFavorite = screen.getByAltText(`${pokemonList[0]
      .name} is marked as favorite`);

    expect(iconFavorite).toBeInTheDocument();
    expect(iconFavorite.src).toContain('/star-icon.svg');
  });
});
