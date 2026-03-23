import { Request, Response } from 'express';
import { SantoService } from './services/santo.service';

export const listSantos = async (req: Request, res: Response) => {
  try {
    const santos = await SantoService.listSantos();
    res.json(santos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar santos.' });
  }
};

export const getSantosByDiaFesta = async (req: Request, res: Response) => {
  try {
    const diaFesta = req.params.diaFesta as string;
    const santos = await SantoService.getSantosByDiaFesta(diaFesta);
    res.json(santos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar santos.' });
  }
};

export const getSantoDoDia = async (req: Request, res: Response) => {
  try {
    const santo = await SantoService.getSantoDoDiaList();
    return res.json(santo);
  } catch (error) {
    console.error('Erro grave no controller de Santo do Dia:', error);
    res.status(500).json({ error: 'Erro ao processar o Santo do Dia.' });
  }
};

export const getSantoById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    const santo = await SantoService.getSantoById(id);
    
    if (santo) {
      res.json(santo);
    } else {
      res.status(404).json({ error: 'Santo não encontrado no banco de dados.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar santo.' });
  }
};

export const createSanto = async (req: Request, res: Response) => {
  try {
    const { nome, historia, diaFesta } = req.body;
    const santo = await SantoService.createSanto({ nome, historia, diaFesta });
    res.json(santo);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar santo.' });
  }
};

export const updateSanto = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    const { nome, historia, diaFesta } = req.body;
    const santo = await SantoService.updateSanto(id, { nome, historia, diaFesta });
    res.json(santo);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar santo.' });
  }
};