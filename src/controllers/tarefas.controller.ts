import { Request, Response } from "express";
import {
  criarTarefa,
  listarTarefas,
  buscarTarefaPorId,
  atualizarTarefa,
  deletarTarefa
} from "../services/tarefas.service";

function criar(req: Request, res: Response) {
  const { title } = req.body;

  if (!title || typeof title !== "string") {
    return res.status(400).json({ erro: "O campo 'title' é obrigatório e deve ser texto." });
  }

  const novaTarefa = criarTarefa(title);
  res.status(201).json(novaTarefa);
}

function listar(req: Request, res: Response) {
  const { completed } = req.query;

  if (completed === undefined) {
    return res.json(listarTarefas());
  }

  const filtro = completed === "true";
  res.json(listarTarefas(filtro));
}

function buscarPorId(req: Request, res: Response) {
  const { id } = req.params;
  const tarefa = buscarTarefaPorId(id);
  if (!tarefa) {
    return res.status(404).json({ erro: "Tarefa não encontrada." });
  }
  res.json(tarefa);
}

function atualizar(req: Request, res: Response) {
  const { id } = req.params;
  const { title, completed } = req.body;

  const tarefa = atualizarTarefa(id, { title, completed });
  if (!tarefa) {
    return res.status(404).json({ erro: "Tarefa não encontrada." });
  }
  res.json(tarefa);
}

function deletar(req: Request, res: Response) {
  const { id } = req.params;
  const sucesso = deletarTarefa(id);

  if (!sucesso) {
    return res.status(404).json({ erro: "Tarefa não encontrada." });
  }

  res.status(204).send();
}

export { criar, listar, buscarPorId, atualizar, deletar };