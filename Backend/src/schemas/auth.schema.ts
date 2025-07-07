/**
 * @openapi
 * tags:
 *   - name: Autenticação
 *     description: Endpoints relacionados ao login e emissão de token
 * /auth/login:
 *   post:
 *     tags:
 *       - Autenticação
 *     summary: Realiza login e gera um token JWT
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginInput'
 *     responses:
 *       200:
 *         description: Login bem-sucedido, retorna o token JWT
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       400:
 *         description: Dados inválidos (email ou senha ausentes)
 *       401:
 *         description: Usuário não encontrado ou senha inválida
 * components:
 *   schemas:
 *     LoginInput:
 *       type: object
 *       required:
 *         - email
 *         - senha
 *       properties:
 *         email:
 *           type: string
 *           example: alice@exemplo.com
 *         senha:
 *           type: string
 *           example: senhaAlice
 *     LoginResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Login realizado com sucesso!
 *         token:
 *           type: string
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 */