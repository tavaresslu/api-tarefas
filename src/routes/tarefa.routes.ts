import { Router } from 'express';
import tarefaController from '../controllers/TarefaController';

const router = Router();

router.post('/tasks', tarefaController.criar);
router.get('/tasks', tarefaController.listarTodas);
router.get('/tasks/:id', tarefaController.buscarPorId);
router.put('/tasks/:id', tarefaController.atualizar);
router.delete('/tasks/:id', tarefaController.deletar);

export default router;