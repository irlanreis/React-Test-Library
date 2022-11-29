import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
  it('Redireciona para a página inicial, na URL "/" ao clicar no link "Home" da barra de navegação', () => {
    renderWithRouter(<App />);

    const home = screen.getByRole('link', { name: /home/i });
    const about = screen.getByRole('link', { name: /about/i });
    const favoritePokémon = screen.getByRole('link', { name: /favorite Pokémon/i });

    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favoritePokémon).toBeInTheDocument();
  });
});
