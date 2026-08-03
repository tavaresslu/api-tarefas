import prisma from '../config/prismaClient.js';
import { Tarefa } from '../models/Tarefa';

class TarefaService {
  async criar(title: string): Promise<Tarefa> {
    const novaTarefa = await prisma.task.create({
      data: { title },
    });

    return novaTarefa;
  }

  async listarTodas(filtroCompleted?: string): Promise<Tarefa[]> {
    if (filtroCompleted === undefined) {
      return prisma.task.findMany();
    }

    const completedBool = filtroCompleted === 'true';
    return prisma.task.findMany({
      where: { completed: completedBool },
    });
  }

  async buscarPorId(id: string): Promise<Tarefa | null> {
    return prisma.task.findUnique({
      where: { id },
    });
  }

  async atualizar(
    id: string,
    dados: Partial<Pick<Tarefa, 'title' | 'completed'>>
  ): Promise<Tarefa | null> {
    const tarefaExiste = await this.buscarPorId(id);

    if (!tarefaExiste) {
      return null;
    }

    return prisma.task.update({
      where: { id },
      data: dados,
    });
  }

  async deletar(id: string): Promise<boolean> {
    const tarefaExiste = await this.buscarPorId(id);

    if (!tarefaExiste) {
      return false;
    }

    await prisma.task.delete({
      where: { id },
    });

    return true;
  }
}

export default new TarefaService();