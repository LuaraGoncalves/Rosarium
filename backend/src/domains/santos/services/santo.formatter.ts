import { SantoScrapedData } from './santo.parser';

export class SantoFormatter {
  static formatar(data: SantoScrapedData): SantoScrapedData {
    return {
      ...data,
      historiaCompleta: this.limparTexto(data.historiaCompleta),
      historiaResumo: this.limparTexto(data.historiaResumo),
      padroeiroDe: data.padroeiroDe ? this.limparTexto(data.padroeiroDe) : undefined,
      intercessao: data.intercessao ? this.limparTexto(data.intercessao) : undefined,
      fraseMarcante: data.fraseMarcante ? this.limparTexto(data.fraseMarcante) : undefined,
    };
  }

  static limparTexto(texto: string): string {
    return texto
      .replace(/\s+/g, ' ')
      .replace(/\n+/g, '\n')
      .replace(/([a-z])([A-Z])/g, '$1. $2')
      .replace(/(Origens|História|Compaixão|Amor e desapego|Oração|Martírio)/gi, '')
      .trim();
  }

  static removerDuplicados(paragrafos: string[]): string[] {
    const vistos = new Set();

    return paragrafos.filter((p) => {
      const normalizado = p.toLowerCase();
      if (vistos.has(normalizado)) return false;
      vistos.add(normalizado);
      return true;
    });
  }
}
