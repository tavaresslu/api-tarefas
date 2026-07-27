import { Tarefa } from '../models/Tarefa';

class TarefaService {
  private tarefas: Tarefa[] = [];

  criar(title: string): Tarefa {
    const novaTarefa: Tarefa = {
      id: Math.random().toString(36).substring(2, 10),
      title,
      completed: false,
    };

    this.tarefas.push(novaTarefa);
    return novaTarefa;
  }

  listarTodas(filtroCompleted?: string): Tarefa[] {
    if (filtroCompleted === undefined) {
      return this.tarefas;
    }

    const completedBool = filtroCompleted === 'true';
    return this.tarefas.filter((tarefa) => tarefa.completed === completedBool);
  }

  buscarPorId(id: string): Tarefa | undefined {
    return this.tarefas.find((tarefa) => tarefa.id === id);
  }

  atualizar(id: string, dados: Partial<Pick<Tarefa, 'title' | 'completed'>>): Tarefa | undefined {
    const tarefa = this.buscarPorId(id);

    if (!tarefa) {
      return undefined;
    }

    if (dados.title !== undefined) {
      tarefa.title = dados.title;
    }

    if (dados.completed !== undefined) {
      tarefa.completed = dados.completed;
    }

    return tarefa;
  }

  deletar(id: string): boolean {
    const index = this.tarefas.findIndex((tarefa) => tarefa.id === id);

    if (index === -1) {
      return false;
    }

    this.tarefas.splice(index, 1);
    return true;
  }
}

// Exportamos uma única instância (singleton) para que o array
// seja compartilhado entre todas as requisições enquanto o servidor rodar.
export default new TarefaService();