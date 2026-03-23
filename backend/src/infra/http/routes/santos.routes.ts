import { Router } from 'express';
import { listSantos, getSantosByDiaFesta, getSantoById, createSanto, updateSanto, getSantoDoDia } from '@/domains/santos/santos.controller';
import { validate } from '@/shared/middlewares/validate'
import { createSantoSchema } from '@/domains/santos/validators/santos.schema'

const router = Router();

router.post('/', validate(createSantoSchema), createSanto);
router.get('/', listSantos);
router.get('/hoje', getSantoDoDia);
router.get('/dia/:diaFesta', getSantosByDiaFesta);
router.get('/:id', getSantoById);
router.put('/:id', updateSanto);

export default router;
