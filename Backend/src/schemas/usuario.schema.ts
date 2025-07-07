/**
 * @openapi
 * tags:
 *   - name: Usuários
 *     description: Endpoints para gerenciamento de usuários
 * /usuarios:
 *   get:
 *     tags:
 *       - Usuários
 *     summary: Lista todos os usuários
 *     responses:
 *       200:
 *         description: Lista de usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 *   post:
 *     tags:
 *       - Usuários
 *     summary: Cria um novo usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsuarioInput'
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 * /usuarios/{id}:
 *   get:
 *     tags:
 *       - Usuários
 *     summary: Busca um usuário pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       404:
 *         description: Usuário não encontrado
 * /usuarios/{email}:
 *   get:
 *     tags:
 *       - Usuários
 *     summary: Busca um usuário pelo email
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       404:
 *         description: Usuário não encontrado
 *   put:
 *     tags:
 *       - Usuários
 *     summary: Atualiza um usuário pelo email
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsuarioInput'
 *     responses:
 *       200:
 *         description: Usuário atualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *   delete:
 *     tags:
 *       - Usuários
 *     summary: Remove um usuário pelo email
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Usuário removido com sucesso
 */

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
 *     UsuarioInput:
 *       type: object
 *       required:
 *         - nome
 *         - empresa
 *         - email
 *         - cargo
 *         - tipo
 *         - senha
 *       properties:
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
 *         senha:
 *           type: string
 *           example: senhaSegura123
 */