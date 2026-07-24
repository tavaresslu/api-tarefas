type Tarefa = {
  id: string;
  title: string;
  completed: boolean;
};

let tarefas: Tarefa[] = [];
let proximoId = 1;

function criarTarefa(title: string): Tarefa {
    const novaTarefa: Tarefa = {
        id: proximoId.toString(),
        title,
        completed: false
    };
    tarefas.push(novaTarefa);
    proximoId++;
    return novaTarefa;
}
function listarTarefas(completed?: boolean): Tarefa[] {
    if (completed === undefined) {
        return tarefas;
    }
    return tarefas.filter(tarefa => tarefa.completed === completed);
}
function buscarTarefaPorId(id: string): Tarefa | undefined {
    return tarefas.find(tarefa => tarefa.id === id);
}
function atualizarTarefa(
    id: string,
    dados: Partial<Pick<Tarefa, 'title' | 'completed'>>
): Tarefa | undefined {
    const tarefa = buscarTarefaPorId(id);
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

function deletarTarefa(id: string): boolean {
    const indice = tarefas.findIndex(tarefa => tarefa.id === id);
    if (indice === -1) {
        return false;
    }
    tarefas.splice(indice, 1);
    return true;
}