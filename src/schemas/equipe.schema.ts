/**
 * @swagger
 * components:
 *   schemas:
 *     Equipe:
 *       type: object
 *       required:
 *         - descricao
 *         - gerenteId
 *       properties:
 *         id:
 *           type: integer
 *           description: Identificador único da equipe
 *           example: 1
 *         descricao:
 *           type: string
 *           example: Equipe A
 *         gerenteId:
 *           type: integer
 *           description: ID do gerente responsável
 *           example: 1
 *         membros:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Usuario'
 */