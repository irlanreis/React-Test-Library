import React from 'react';
import { screen } from '@testing-library/react';
import { FavoritePokemon } from '../pages';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente /FavoritePokemon', () => {
  it('Testa se exibe a mensagem, "No favorite pokémon found" caso o componente esteje vazio', () => {
    renderWithRouter(<FavoritePokemon />);

    const emptyText = 'No favorite Pokémon found';

    expect(screen.getByText(emptyText)).toBeInTheDocument();
  });
});
