import { describe, expect, it } from 'vitest';
import {
  getNovenaStorageKey,
  normalizeCompletedDays,
} from '../../features/novenas/hooks/useNovenaProgress';

describe('progresso da novena', () => {
  it('mantém o armazenamento separado por usuário', () => {
    expect(getNovenaStorageKey('progress', 'user-a', 'sagrado-coracao')).not.toBe(
      getNovenaStorageKey('progress', 'user-b', 'sagrado-coracao')
    );
  });

  it('normaliza dias repetidos e inválidos do armazenamento local', () => {
    expect(normalizeCompletedDays([3, 1, 3, 0, -1, 2.5, '4'])).toEqual([1, 3]);
  });
});
