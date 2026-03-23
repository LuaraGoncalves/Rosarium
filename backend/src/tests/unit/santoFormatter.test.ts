import { SantoFormatter } from '../../domains/santos/services/santo.formatter';

describe('santo.formatter', () => {
  describe('limparTexto', () => {
    it('deve remover espaços em branco duplicados', () => {
      const input = 'Este é   um   teste  com   muitos espaços.';
      const result = SantoFormatter.limparTexto(input);
      expect(result).toBe('Este é um teste com muitos espaços.');
    });

    it('deve separar frases coladas (maiúscula logo após minúscula sem espaço)', () => {
      const inputColado = 'Nasceu em RomaSua vida foi difícil';
      const result = SantoFormatter.limparTexto(inputColado);
      expect(result).toBe('Nasceu em Rom. Sua vida foi difícil');
    });

    it('não deve separar seções se a regex foi alterada para remover palavras chave', () => {
      const input = 'texto anteriorOrigens: blablabla';
      const result = SantoFormatter.limparTexto(input);
      // Since it now removes 'Origens', the test should assert that it does not contain it.
      expect(result).not.toContain('Origens');
    });
  });

  describe('removerDuplicados', () => {
    it('deve remover parágrafos exatamente iguais', () => {
      const input = ['Um texto legal', 'Outro texto', 'Um texto legal'];
      const result = SantoFormatter.removerDuplicados(input);
      expect(result).toHaveLength(2);
      expect(result).toEqual(['Um texto legal', 'Outro texto']);
    });

    it('deve remover parágrafos ignorando maiúsculas e minúsculas', () => {
      const input = ['A VIDA DE SÃO JOSÉ', 'A vida de São José'];
      const result = SantoFormatter.removerDuplicados(input);
      expect(result).toHaveLength(1);
      expect(result).toEqual(['A VIDA DE SÃO JOSÉ']);
    });

    it('não deve remover parágrafos diferentes', () => {
      const input = ['Texto 1', 'Texto 2', 'Texto 3'];
      const result = SantoFormatter.removerDuplicados(input);
      expect(result).toHaveLength(3);
    });
  });
});
