import { screen } from '@testing-library/react';
import { About } from '../pages';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente /About', () => {
  it('Testa se é exibido na tela um h2 com texto About Pokédex', () => {
    renderWithRouter(<About />);

    const pokedexInfos = screen.getByRole('heading', { name: 'About Pokédex', level: 2 });

    expect(pokedexInfos).toBeInTheDocument();
  });

  it('Testa se a página contém as informações sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const textOne = screen.getByText('This application simulates a Pokédex, a digital encyclopedia containing all Pokémon');
    const textTwo = screen.getByText('One can filter Pokémon by type, and see more details for each one of them');

    expect(textOne).toBeInTheDocument();
    expect(textTwo).toBeInTheDocument();
  });

  it('testa se atributo src da imagem tem o atributo correspondente', () => {
    renderWithRouter(<About />);

    const image = screen.getByAltText('Pokédex');

    expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
