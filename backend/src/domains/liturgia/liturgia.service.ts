import { LiturgiaRepository } from './repositories/liturgia.repository';

const liturgiaRepository = new LiturgiaRepository();

export class LiturgiaService {
  async getAllLiturgias() {
    return liturgiaRepository.findAll();
  }

  async getLiturgiaByData(data: string) {
    return liturgiaRepository.findByData(data);
  }

  async createOrUpdateLiturgia(data: string, conteudo: string) {
    return liturgiaRepository.upsert(data, conteudo);
  }
}
