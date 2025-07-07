import { Router } from 'express';
import { getAllEquipesController, getEquipeByIdController, 
         getEquipesByUsuariosEmailController, getEquipeByNome,
         createEquipeController, updateEquipeController, 
         deleteEquipeController 
       } from '../controllers/equipe.controller';

const router = Router();

router.get('/', getAllEquipesController);
router.post('/', createEquipeController);
router.get('/:id', getEquipeByIdController);
router.get('/usuario/:email', getEquipesByUsuariosEmailController);
router.get('/:nome', getEquipeByNome);
router.put('/:nome', updateEquipeController);
router.delete('/:nome', deleteEquipeController);

export default router;