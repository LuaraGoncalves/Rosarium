import type { NextFunction, Request, Response } from 'express';
import { AppError } from '@/shared/errors/AppError';
import { CuriosidadeService } from './curiosidades.service';

const idOf = (value: string) => { const id = Number.parseInt(value, 10); if (Number.isNaN(id)) throw new AppError('ID inválido.', 400); return id; };

export const listCuriosidades = async (req: Request, res: Response, next: NextFunction) => { try { return res.json(await CuriosidadeService.listPublicas(typeof req.query.search === 'string' ? req.query.search : undefined)); } catch (error) { return next(error); } };
export const listCuriosidadesAdmin = async (_req: Request, res: Response, next: NextFunction) => { try { return res.json(await CuriosidadeService.listTodas()); } catch (error) { return next(error); } };
export const createCuriosidade = async (req: Request, res: Response, next: NextFunction) => { try { return res.status(201).json(await CuriosidadeService.create(req.body)); } catch (error) { return next(error); } };
export const updateCuriosidade = async (req: Request, res: Response, next: NextFunction) => { try { return res.json(await CuriosidadeService.update(idOf(req.params.id as string), req.body)); } catch (error) { return next(error); } };
export const deleteCuriosidade = async (req: Request, res: Response, next: NextFunction) => { try { await CuriosidadeService.remove(idOf(req.params.id as string)); return res.status(204).send(); } catch (error) { return next(error); } };
