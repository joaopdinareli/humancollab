import { Router } from 'express';
import { getAllUsuariosController, getUsuarioByEmailController, 
         getUsuarioByIdController, createUsuarioController,
         updateUsuarioController, deleteUsuarioController 
      } from '../controllers/usuario.controller';

const router = Router();

router.get('/', getAllUsuariosController);
router.get('/:id', getUsuarioByIdController);
router.get('/email/:email', getUsuarioByEmailController);
router.post('/', createUsuarioController);
router.put('/:id', updateUsuarioController);
router.delete('/:id', deleteUsuarioController);

export default router;