import { NextFunction, Request, Response } from 'express';
import { AppError } from '@/shared/errors/AppError';
import { getTodaysMystery, misteriosDoRosario, oracoesDoRosario } from './rosario.data';

export const getRosario = (_req: Request, res: Response) => {
  return res.json({
    oracoes: oracoesDoRosario,
    misterios: misteriosDoRosario,
    misterioHoje: getTodaysMystery(),
  });
};

export const getRosarioPrayers = (_req: Request, res: Response) => {
  return res.json(oracoesDoRosario);
};

export const getRosarioMysteries = (_req: Request, res: Response) => {
  return res.json(misteriosDoRosario);
};

export const getRosarioMysteryToday = (_req: Request, res: Response) => {
  return res.json(getTodaysMystery());
};

export const getRosarioMysteryBySlug = (req: Request, res: Response, next: NextFunction) => {
  try {
    const mystery = misteriosDoRosario.find((item) => item.slug === req.params.slug);

    if (!mystery) {
      throw new AppError('Mistério do Rosário não encontrado.', 404);
    }

    return res.json(mystery);
  } catch (error) {
    return next(error);
  }
};
