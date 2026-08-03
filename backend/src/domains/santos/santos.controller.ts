import { NextFunction, Request, Response } from 'express';
import { AppError } from '@/shared/errors/AppError';
import { SantoService } from './services/santo.service';

export const listSantos = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const santos = await SantoService.listSantos();
    return res.json(santos);
  } catch (error) {
    return next(error);
  }
};

export const getSantosByDiaFesta = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const diaFesta = req.params.diaFesta as string;
    if (!diaFesta) {
      throw new AppError('Dia de festa inválido.', 400);
    }

    const santos = await SantoService.getSantosByDiaFesta(diaFesta);
    return res.json(santos);
  } catch (error) {
    return next(error);
  }
};

export const getSantoDoDia = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const santo = await SantoService.getSantoDoDiaList();
    return res.json(santo);
  } catch (error) {
    return next(error);
  }
};

export const getSantoById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number.parseInt(req.params.id as string, 10);
    if (Number.isNaN(id)) {
      throw new AppError('ID inválido.', 400);
    }

    const santo = await SantoService.getSantoById(id);

    if (!santo) {
      throw new AppError('Santo não encontrado no banco de dados.', 404);
    }

    return res.json(santo);
  } catch (error) {
    return next(error);
  }
};

export const createSanto = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { nome, historia, diaFesta } = req.body;

    if (!nome || !historia) {
      throw new AppError('Dados inválidos.', 400);
    }

    const santo = await SantoService.createSanto({ nome, historia, diaFesta });
    return res.json(santo);
  } catch (error) {
    return next(error);
  }
};

export const updateSanto = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number.parseInt(req.params.id as string, 10);
    if (Number.isNaN(id)) {
      throw new AppError('ID inválido.', 400);
    }

    const { nome, historia, diaFesta } = req.body;
    if (!nome || !historia) {
      throw new AppError('Dados inválidos.', 400);
    }

    const santo = await SantoService.updateSanto(id, { nome, historia, diaFesta });
    return res.json(santo);
  } catch (error) {
    return next(error);
  }
};
