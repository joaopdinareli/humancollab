import { PrismaClient } from '@prisma/client'
import argon2 from 'argon2'

const prisma = new PrismaClient()

async function main() {
   console.log('Iniciando o seed...')
   const senhaHashAlice = await argon2.hash('senhaAlice');
   const senhaHashBob = await argon2.hash('senhaBob');

   const usuario = await prisma.usuario.create({
      data: {
         nome: 'Alice',
         empresa: 'ExemploCorp',
         email: 'alice@exemplo.com',
         cargo: 'Engenheira',
         tipo: 'GERENTE',
         senha: senhaHashAlice
      },
   })

   const colaboradorUsuario = await prisma.usuario.create({
      data: {
         nome: 'Bob',
         empresa: 'ExemploCorp',
         email: 'bob@exemplo.com',
         cargo: 'Desenvolvedor',
         tipo: 'COLABORADOR',
         senha: senhaHashBob
      },
   })

   await prisma.gerente.create({
      data: {
         id: usuario.id,
      },
   })

   await prisma.dashboard.create({
      data: {
         usuarioId: usuario.id,
      },
   })

   const equipe = await prisma.equipe.create({
      data: {
         nome: 'Equipe A',
         descricao: 'Equipe responsável pelo projeto X',
         gerenteId: usuario.id,
         membros: { connect: { id: usuario.id } },
      },
   })

   const projeto = await prisma.projeto.create({
      data: {
         nome: 'Projeto X',
         descricao: 'Descrição do projeto',
         dataCriacao: new Date(),
         equipes: { connect: { id: equipe.id } },
      },
   })

   const tarefa = await prisma.tarefa.create({
      data: {
         titulo: 'Implementar funcionalidade',
         descricao: 'Detalhes da tarefa',
         status: 'ANDAMENTO',
         urgencia: 'ALTO',
         visibilidade: 'PUBLICO',
         dataCriacao: new Date(),
         dataPrazo: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
         projetoId: projeto.id,
         colaboradores: {
            connect: { id: usuario.id },
         },
      },
   })

   const checklist = await prisma.checklist.create({
      data: {
         titulo: 'Checklist 1',
         tarefaId: tarefa.id,
         itens: {
            create: [
               { descricao: 'Item 1', concluido: false },
               { descricao: 'Item 2', concluido: true },
            ],
         },
      },
   })

   await prisma.anexo.create({
      data: {
         pathArquivo: '/anexos/exemplo.pdf',
         tarefaId: tarefa.id,
      },
   })

   await prisma.comentario.create({
      data: {
         mensagem: 'Comentário de teste',
         dataEnvio: new Date(),
         tarefaId: tarefa.id,
         usuarioId: usuario.id,
      },
   })

   await prisma.conviteEquipe.create({
      data: {
         dataConvite: new Date(),
         dataVencimento: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
         mensagem: 'Junte-se à equipe!',
         usuarioId: usuario.id,
         equipeId: equipe.id,
      },
   })

   await prisma.lembrete.create({
      data: {
         mensagem: 'Não esquecer essa tarefa!',
         data: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
         tarefaId: tarefa.id,
         usuarioId: usuario.id,
      },
   })

   await prisma.colaborador.create({
      data: {
         id: colaboradorUsuario.id,
      },
   })
}

main()
   .then(() => prisma.$disconnect())
   .catch(async (e) => {
      console.error(e)
      await prisma.$disconnect()
      process.exit(1)
   })
