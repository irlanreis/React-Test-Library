import React from 'react';
import { screen } from '@testing-library/react';
import { NotFound } from '../pages';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente /NotFound', () => {
  it('Testa se a página contém um heading h2 com o texto "Page requested not found"', () => {
    renderWithRouter(<NotFound />);

    const textNotFound = 'Page requested not found';
    const image = screen.getByAltText('Pikachu crying because the page requested was not found');

    expect(screen.getByText(textNotFound)).toBeInTheDocument();
    expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
