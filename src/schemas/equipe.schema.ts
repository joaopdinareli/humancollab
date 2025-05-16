/**
 * @openapi
 * tags:
 *   - name: Equipes
 *     description: Endpoints para gerenciamento de equipes
 * /equipes:
 *   get:
 *     tags:
 *       - Equipes
 *     summary: Lista todas as equipes
 *     responses:
 *       200:
 *         description: Lista de equipes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Equipe'
 *   post:
 *     tags:
 *       - Equipes
 *     summary: Cria uma nova equipe
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EquipeInput'
 *     responses:
 *       201:
 *         description: Equipe criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Equipe'
 * /equipes/{id}:
 *   get:
 *     tags:
 *       - Equipes
 *     summary: Busca uma equipe pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Equipe encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Equipe'
 *       404:
 *         description: Equipe não encontrada
 * /equipes/usuario/{email}:
 *   get:
 *     tags:
 *       - Equipes
 *     summary: Lista equipes pelas quais o usuário participa ou gerencia
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de equipes do usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Equipe'
 * /equipes/{nome}:
 *   get:
 *     tags:
 *       - Equipes
 *     summary: Busca uma equipe pelo nome
 *     parameters:
 *       - in: path
 *         name: nome
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Equipe encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Equipe'
 *       404:
 *         description: Equipe não encontrada
 *   put:
 *     tags:
 *       - Equipes
 *     summary: Atualiza uma equipe pelo nome
 *     parameters:
 *       - in: path
 *         name: nome
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EquipeInput'
 *     responses:
 *       200:
 *         description: Equipe atualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Equipe'
 *   delete:
 *     tags:
 *       - Equipes
 *     summary: Remove uma equipe pelo nome
 *     parameters:
 *       - in: path
 *         name: nome
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Equipe removida com sucesso
 * components:
 *   schemas:
 *     Equipe:
 *       type: object
 *       required:
 *         - id
 *         - nome
 *         - descricao
 *         - gerenteId
 *       properties:
 *         id:
 *           type: integer
 *           description: Identificador único da equipe
 *           example: 1
 *         nome:
 *           type: string
 *           description: Nome da equipe
 *           example: Equipe A
 *         descricao:
 *           type: string
 *           example: Equipe responsável pelo projeto X
 *         gerenteId:
 *           type: integer
 *           description: ID do gerente responsável
 *           example: 1
 *         membros:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Usuario'
 *     EquipeInput:
 *       type: object
 *       required:
 *         - nome
 *         - descricao
 *         - gerenteId
 *       properties:
 *         nome:
 *           type: string
 *           example: Equipe A
 *         descricao:
 *           type: string
 *           example: Equipe responsável pelo projeto X
 *         gerenteId:
 *           type: integer
 *           example: 1
 */