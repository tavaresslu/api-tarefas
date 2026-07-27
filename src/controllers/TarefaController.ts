import { Request, Response } from 'express';
import tarefaService from '../services/TarefaService';

class TarefaController {
  criar(req: Request, res: Response): void {
    const { title } = req.body;

    if (!title || typeof title !== 'string') {
      res.status(400).json({ erro: 'O campo "title" é obrigatório e deve ser uma string.' });
      return;
    }

    const novaTarefa = tarefaService.criar(title);
    res.status(201).json(novaTarefa);
  }

  listarTodas(req: Request, res: Response): void {
    const { completed } = req.query;
    const tarefas = tarefaService.listarTodas(completed as string | undefined);
    res.status(200).json(tarefas);
  }

  buscarPorId(req: Request, res: Response): void {
    const { id } = req.params;
    const tarefa = tarefaService.buscarPorId(id as string);

    if (!tarefa) {
      res.status(404).json({ erro: 'Tarefa não encontrada.' });
      return;
    }

    res.status(200).json(tarefa);
  }

  atualizar(req: Request, res: Response): void {
    const { id } = req.params;
    const { title, completed } = req.body;

    const tarefaAtualizada = tarefaService.atualizar(id as string, { title, completed });

    if (!tarefaAtualizada) {
      res.status(404).json({ erro: 'Tarefa não encontrada.' });
      return;
    }

    res.status(200).json(tarefaAtualizada);
  }

  deletar(req: Request, res: Response): void {
    const { id } = req.params;
    const sucesso = tarefaService.deletar(id as string);

    if (!sucesso) {
      res.status(404).json({ erro: 'Tarefa não encontrada.' });
      return;
    }

    res.status(204).send();
  }
}

export default new TarefaController();