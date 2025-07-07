import { Router } from 'express';
import { getAllUsuariosController, getUsuarioByEmailController, 
         getUsuarioByIdController, createUsuarioController,
         updateUsuarioController, deleteUsuarioController 
       } from '../controllers/usuario.controller';

const router = Router();

router.get('/', getAllUsuariosController);
router.post('/', createUsuarioController);
router.get('/:id', getUsuarioByIdController);
router.get('/:email', getUsuarioByEmailController);
router.put('/:email', updateUsuarioController);
router.delete('/:email', deleteUsuarioController);

export default router;