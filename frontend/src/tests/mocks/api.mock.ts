import { vi } from 'vitest';

export const mockApiGet = vi.fn();
export const mockApiPost = vi.fn();

export const mockSantoResponse = {
  data: {
    id: 1,
    nome: 'Santa Teresinha do Menino Jesus',
    historia: 'Nasceu em Alençon...',
    diaFesta: '1 de Outubro'
  }
};