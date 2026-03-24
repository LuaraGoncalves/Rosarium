import { jsx as _jsx } from "react/jsx-runtime";
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
const HelloRosarium = () => _jsx("h1", { children: "Bem-vindo ao Rosarium!" });
describe('Ambiente de Testes Frontend', () => {
    it('renderiza o componente corretamente na tela', () => {
        render(_jsx(HelloRosarium, {}));
        const headingElement = screen.getByText(/Bem-vindo ao Rosarium!/i);
        expect(headingElement).toBeInTheDocument();
    });
});
