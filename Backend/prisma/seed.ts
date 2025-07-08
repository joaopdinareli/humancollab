import { PrismaClient } from '@prisma/client'
import argon2 from 'argon2'

const prisma = new PrismaClient()

async function main() {
   console.log('Iniciando o seed...')
   const senhaHashAlice = await argon2.hash('senhaAlice');
   const senhaHashBob = await argon2.hash('senhaBob');
   const senhaHashCarlos = await argon2.hash('senhaCarlos');
   const senhaHashDiana = await argon2.hash('senhaDiana');
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

   const usuarioCarlos = await prisma.usuario.create({
      data: {
         nome: 'Carlos',
         empresa: 'ExemploCorp',
         email: 'carlos@exemplo.com',
         cargo: 'Analista',
         tipo: 'COLABORADOR',
         senha: senhaHashCarlos
      },
   });
   const usuarioDiana = await prisma.usuario.create({
      data: {
         nome: 'Diana',
         empresa: 'ExemploCorp',
         email: 'diana@exemplo.com',
         cargo: 'Designer',
         tipo: 'COLABORADOR',
         senha: senhaHashDiana
      },
   });

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

   const equipeB = await prisma.equipe.create({
      data: {
         nome: 'Equipe B',
         descricao: 'Equipe de suporte',
         gerenteId: usuario.id,
         membros: { connect: [{ id: usuario.id }, { id: colaboradorUsuario.id }, { id: usuarioCarlos.id }] },
      },
   });
   const equipeC = await prisma.equipe.create({
      data: {
         nome: 'Equipe C',
         descricao: 'Equipe de design',
         gerenteId: usuario.id,
         membros: { connect: [{ id: usuario.id }, { id: usuarioDiana.id }] },
      },
   });

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

   await prisma.tarefa.create({
      data: {
         titulo: 'Revisar documentação',
         descricao: 'Revisar docs do projeto',
         status: 'ANDAMENTO',
         urgencia: 'MODERADO',
         visibilidade: 'PUBLICO',
         dataCriacao: new Date(),
         dataPrazo: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
         projetoId: projeto.id,
         colaboradores: { connect: [{ id: colaboradorUsuario.id }, { id: usuarioCarlos.id }] },
      },
   });
   await prisma.tarefa.create({
      data: {
         titulo: 'Criar protótipo',
         descricao: 'Protótipo inicial do sistema',
         status: 'ANDAMENTO',
         urgencia: 'ALTO',
         visibilidade: 'PUBLICO',
         dataCriacao: new Date(),
         dataPrazo: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
         projetoId: projeto.id,
         colaboradores: { connect: [{ id: usuarioDiana.id }] },
      },
   });

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
