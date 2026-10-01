import { novenaProgressBodySchema } from '../../domains/novenas/novenas.controller';

describe('novena progress validation', () => {
  it('accepts only integer days between 1 and 9', () => {
    expect(novenaProgressBodySchema.safeParse({ completedDays: [1, 5, 9] }).success).toBe(true);
    expect(novenaProgressBodySchema.safeParse({ completedDays: [0] }).success).toBe(false);
    expect(novenaProgressBodySchema.safeParse({ completedDays: [1.5] }).success).toBe(false);
    expect(novenaProgressBodySchema.safeParse({ completedDays: [10] }).success).toBe(false);
  });
});
