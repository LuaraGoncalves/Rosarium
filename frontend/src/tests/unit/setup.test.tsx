import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';

const HelloRosarium = () => <h1>Bem-vindo ao Rosarium!</h1>;

describe('Ambiente de Testes Frontend', () => {
  it('renderiza o componente corretamente na tela', () => {
    render(<HelloRosarium />);
    const headingElement = screen.getByText(/Bem-vindo ao Rosarium!/i);
    expect(headingElement).toBeInTheDocument();
  });
});