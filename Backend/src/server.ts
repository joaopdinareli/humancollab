import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import usuarioRoutes from './routes/usuario.route';
import equipeRoutes from './routes/equipe.route';
import authRoutes from './routes/auth.route';
import tarefaRoutes from './routes/tarefa.route';
import cors from 'cors';
import { authMiddleware } from './middlewares/auth.middleware';

const app = express();
app.use(express.json());
app.use(cors());

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'HumanCollab API',
      version: '1.0.0',
      description: 'API para gerenciamento colaborativo de projetos e equipes',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/schemas/*.ts'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/usuarios', usuarioRoutes); // Cadastro de usuário não exige auth
app.use('/equipes', authMiddleware, equipeRoutes);
app.use('/auth', authRoutes);
app.use('/tarefas', authMiddleware, tarefaRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});