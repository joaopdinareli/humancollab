import { Router } from 'express';
import { getAllEquipesController, getEquipeByIdController, 
         createEquipeController, updateEquipeController, 
         deleteEquipeController } from '../controllers/equipe.controller';

const router = Router();

router.get('/', getAllEquipesController);
router.get('/:id', getEquipeByIdController);
router.post('/', createEquipeController);
router.put('/:id', updateEquipeController);
router.delete('/:id', deleteEquipeController);

export default router;