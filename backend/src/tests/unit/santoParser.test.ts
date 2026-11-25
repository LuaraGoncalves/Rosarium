import { detectIntercessao } from '../../domains/santos/services/santo.parser';

describe('santo.parser', () => {
  describe('detectIntercessao', () => {
    it('deve identificar a intercessao especifica de Santa Rita', () => {
      const result = detectIntercessao(
        'Santa Rita de Cássia',
        'Santa Rita é lembrada por sua vida de oração, perdão e reconciliação familiar.'
      );

      expect(result).toBe('Causas impossíveis, famílias, perdão e reconciliação');
    });

    it('deve identificar a intercessao especifica de Sao Jose', () => {
      const result = detectIntercessao(
        'São José',
        'Esposo da Virgem Maria, pai adotivo de Jesus e exemplo de trabalhador fiel.'
      );

      expect(result).toBe('Famílias, pais, trabalhadores, proteção da Igreja e boa morte');
    });

    it('deve inferir intercessao por tema quando nao reconhece o santo pelo nome', () => {
      const result = detectIntercessao(
        'Santa Exemplo',
        'Dedicou sua vida ao cuidado dos enfermos e dos doentes no hospital.'
      );

      expect(result).toBe(
        'Enfermos, profissionais da saúde, cuidado com os doentes e esperança na cura'
      );
    });

    it('deve manter a intercessao padrao quando nao encontra pistas especificas', () => {
      const result = detectIntercessao('Santo Exemplo', 'Viveu a fe com humildade e amor a Deus.');

      expect(result).toBe('Intercede por nós junto a Deus');
    });

    it('deve priorizar Sao Jose Moscati antes de Sao Jose', () => {
      const result = detectIntercessao('São José Moscati', 'Médico dedicado aos enfermos.');

      expect(result).toBe('Médicos, enfermos, profissionais da saúde e estudantes de medicina');
    });

    it('nao deve usar outro santo citado na historia', () => {
      const result = detectIntercessao('Santa Luzia', 'Era devota de São José.');

      expect(result).toBe(
        'Saúde dos olhos, visão, luz espiritual e fidelidade em meio às provações'
      );
    });

    it('deve reconhecer temas sem confundir partes de palavras', () => {
      expect(detectIntercessao('Santo Exemplo', 'Procurava viver a fé.')).toBe(
        'Intercede por nós junto a Deus'
      );
      expect(detectIntercessao('Santo Exemplo', 'Pregou o evangelho em seu país.')).toBe(
        'Missionários, evangelização, anúncio do Evangelho e perseverança apostólica'
      );
    });
  });
});
