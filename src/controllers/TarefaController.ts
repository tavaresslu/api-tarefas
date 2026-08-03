import { Request, Response } from 'express';
import tarefaService from '../services/TarefaService';

class TarefaController {
  async criar(req: Request, res: Response): Promise<void> {
    const { title } = req.body;

    if (!title || typeof title !== 'string') {
      res.status(400).json({ erro: 'O campo "title" é obrigatório e deve ser uma string.' });
      return;
    }

    const novaTarefa = await tarefaService.criar(title);
    res.status(201).json(novaTarefa);
  }

  async listarTodas(req: Request, res: Response): Promise<void> {
    const { completed } = req.query;
    const tarefas = await tarefaService.listarTodas(completed as string | undefined);
    res.status(200).json(tarefas);
  }

  async buscarPorId(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const tarefa = await tarefaService.buscarPorId(id as string);

    if (!tarefa) {
      res.status(404).json({ erro: 'Tarefa não encontrada.' });
      return;
    }

    res.status(200).json(tarefa);
  }

  async atualizar(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { title, completed } = req.body;

    const tarefaAtualizada = await tarefaService.atualizar(id as string, { title, completed });

    if (!tarefaAtualizada) {
      res.status(404).json({ erro: 'Tarefa não encontrada.' });
      return;
    }

    res.status(200).json(tarefaAtualizada);
  }

  async deletar(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const sucesso = await tarefaService.deletar(id as string);

    if (!sucesso) {
      res.status(404).json({ erro: 'Tarefa não encontrada.' });
      return;
    }

    res.status(204).send();
  }
}

export default new TarefaController();