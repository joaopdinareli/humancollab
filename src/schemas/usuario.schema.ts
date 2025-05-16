/**
 * @swagger
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       required:
 *         - nome
 *         - empresa
 *         - email
 *         - cargo
 *         - tipo
 *       properties:
 *         id:
 *           type: integer
 *           description: Identificador único do usuário
 *           example: 1
 *         nome:
 *           type: string
 *           example: Alice
 *         empresa:
 *           type: string
 *           example: ExemploCorp
 *         email:
 *           type: string
 *           example: alice@exemplo.com
 *         cargo:
 *           type: string
 *           example: Engenheira
 *         tipo:
 *           type: string
 *           enum: [GERENTE, COLABORADOR]
 *           example: GERENTE
 */