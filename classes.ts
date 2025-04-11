enum Status {
   ANDAMENTO,
   ATRASADO,
   CONCLUIDO_PRAZO,
   CONCLUIDO_ATRASO,
}

enum Urgencia {
   CRITICO,
   ALTO,
   MODERADO,
   BAIXO,
}

enum Visibilidade {
   PUBLICO,
   APENAS_EQUIPE,
   APENAS_GERENTE,
   PRIVADO,
}

abstract class Usuario {
   constructor(
      private _nome: string, 
      private _empresa: string, 
      private _email: string,
      private _cargo: string,
      private _equipe: Equipe | null = null,
      private _dashboard: Dashboard = new Dashboard(this),
   ) {}

   get nome(): string { return this._nome; }
   set nome(nome: string) { this._nome = nome; }

   get empresa(): string { return this._empresa; }
   set empresa(empresa: string) { this._empresa = empresa; }

   get email(): string { return this._email; }
   set email(email: string) { this._email = email; }

   get cargo(): string { return this._cargo; }
   set cargo(cargo: string) { this._cargo = cargo; }

   get equipe(): Equipe | null { return this._equipe; }
   set equipe(equipe: Equipe | null) { this._equipe = equipe; }

   get dashboard(): Dashboard { return this._dashboard; }
   set dashboard(dashboard: Dashboard) { this._dashboard = dashboard; }
}

class Gerente extends Usuario {
   constructor(
      nome: string,
      empresa: string,
      email: string,
      cargo: string,
      private _projetos: Projeto[] = []
   ) { super(nome, empresa, email, cargo); }

   get projetos(): Projeto[] { return this._projetos; }
   set projetos(projetos: Projeto[]) { this._projetos = projetos; }
}

class Colaborador extends Usuario {
   constructor(
      nome: string,
      empresa: string,
      email: string,
      cargo: string,
      private _tarefas: Tarefa[] | null = null
   ) { super(nome, empresa, email, cargo); }

   get tarefas(): Tarefa[] | null{ return this._tarefas; }
   set tarefas(tarefas: Tarefa[] | null) { this._tarefas = tarefas; }

   public concluirTarefa(): void {
      console.log(`Colaborador ${this.nome} concluiu a tarefa`);
   }
}

class Tarefa {
   constructor(
      private _titulo: string = 'Nova Tarefa',
      private _descricao: string = '',
      private _status: Status = Status.ANDAMENTO,
      private _urgencia: Urgencia = Urgencia.MODERADO,
      private _visibilidade: Visibilidade = Visibilidade.PUBLICO,
      private _dataCriacao: Date = new Date(),
      private _dataPrazo: Date = (() => {
         const date = new Date();
         date.setDate(date.getDate() + 7);
         return date;
      })(),
      private _projeto: Projeto | null = null,
      private _colaboradores: Colaborador[] | null = null,
      private _checklist: Checklist | null = null,
      private _anexos: Anexo[] | null = null,
      private _comentarios: Comentario[] | null = null,
   ) {}

   get titulo(): string {return this._titulo;}
   set titulo(titulo: string) {this._titulo = titulo;}

   get descricao(): string {return this._descricao;}
   set descricao(descricao: string) {this._descricao = descricao;}

   get status(): Status {return this._status;}
   set status(status: Status) {this._status = status;}

   get urgencia(): Urgencia {return this._urgencia;}
   set urgencia(urgencia: Urgencia) {this._urgencia = urgencia;}

   get visibilidade(): Visibilidade {return this._visibilidade;}
   set visibilidade(visibilidade: Visibilidade) {this._visibilidade = visibilidade;}

   get dataCriacao(): Date {return this._dataCriacao;}
   set dataCriacao(dataCriacao: Date) {this._dataCriacao = dataCriacao;}

   get dataPrazo(): Date {return this._dataPrazo;}
   set dataPrazo(dataPrazo: Date) {this._dataPrazo = dataPrazo;}

   get projeto(): Projeto | null {return this._projeto;}
   set projeto(projeto: Projeto | null) {this._projeto = projeto;}

   get colaboradores(): Colaborador[] | null {return this._colaboradores;}
   set colaboradores(colaboradores: Colaborador[] | null) {this._colaboradores = colaboradores;}

   get checklist(): Checklist | null {return this._checklist;}
   set checklist(checklist: Checklist | null) {this._checklist = checklist;}

   get anexos(): Anexo[] | null {return this._anexos;}
   set anexos(anexos: Anexo[] | null) {this._anexos = anexos;}

   get comentarios(): Comentario[] | null {return this._comentarios;}
   set comentarios(comentarios: Comentario[] | null) {this._comentarios = comentarios;}
}

class Projeto {
   constructor(
      private _equipe: Equipe,
      private _nome: string = 'Novo Projeto',
      private _descricao: string = '',
      private _dataCriacao: Date = new Date(),
      private _tarefas: Tarefa[] = [],
      private _anexos: Anexo[] = [],
   ) {}

   get nome(): string {return this._nome;}
   set nome(nome: string) {this._nome = nome;}

   get descricao(): string {return this._descricao;}
   set descricao(descricao: string) { this._descricao = descricao; }

   get dataCriacao(): Date { return this._dataCriacao; }
   set dataCriacao(dataCriacao: Date) { this._dataCriacao = dataCriacao; }

   get equipe(): Equipe { return this._equipe; }
   set equipe(equipe: Equipe) { this._equipe = equipe; }

   get tarefas(): Tarefa[] { return this._tarefas; }
   set tarefas(tarefas: Tarefa[]) { this._tarefas = tarefas; }

   get anexos(): Anexo[] { return this._anexos; }
   set anexos(anexos: Anexo[]) { this._anexos = anexos; }

   public listarTarefas(): void {
      console.log(`Listando tarefas do projeto ${this._nome}`);
   }

   public listarMembros(): void {
      console.log(`Listando membros do projeto ${this._nome}`);
   }
}

class Equipe {
   constructor(
      private _nome: string,
      private _gerente: Gerente,
      private _descricao: string = '',
      private _membros: Usuario[] = []
   ) {}
   
   get nome(): string { return this._nome; }
   set nome(nome: string) { this._nome = nome; }

   get gerente(): Gerente { return this._gerente; }
   set gerente(gerente: Gerente) { this._gerente = gerente; }

   get descricao(): string { return this._descricao; }
   set descricao(descricao: string) { this._descricao = descricao; }

   get membros(): Usuario[] { return this._membros; }
   set membros(membros: Usuario[]) { this._membros = membros; }

   public adicionarMembro(membro: Usuario): void {
      this._membros.push(membro);
      console.log(`Membro ${membro.nome} adicionado à equipe ${this._nome}`);
   }

   public removerMembro(membro: Usuario): void {
      this._membros = this._membros.filter(m => m !== membro);
      console.log(`Membro ${membro.nome} removido da equipe ${this._nome}`);
   }

   public listarMembros(): void {
      console.log(`Membros da equipe ${this._nome}:`);
      this._membros.forEach(membro => console.log(membro.nome));
   }
}

class ConviteEquipe {
   constructor(
      private _membro: Usuario,
      private _equipe: Equipe,
      private _dataConvite: Date = new Date(),
      private _dataVencimento: Date = (() => {
         const date = new Date();
         date.setDate(date.getDate() + 7);
         return date;
      })(),
      private _mensagem: string = `${this.membro.nome} foi convidado para ${this.equipe.nome}`,
   ) {}

   get membro(): Usuario { return this._membro; }
   set membro(membro: Usuario) { this._membro = membro; }

   get equipe(): Equipe { return this._equipe; }
   set equipe(equipe: Equipe) { this._equipe = equipe; }

   get dataConvite(): Date { return this._dataConvite; }
   set dataConvite(dataConvite: Date) { this._dataConvite = dataConvite; }

   get dataVencimento(): Date { return this._dataVencimento; }
   set dataVencimento(dataVencimento: Date) { this._dataVencimento = dataVencimento; }

   get mensagem(): string { return this._mensagem; }
   set mensagem(mensagem: string) { this._mensagem = mensagem; }

   public mostrarConvite(): void {
      console.log(`Convite: ${this.mensagem}`);
      console.log(`Data do convite: ${this.dataConvite.toISOString()}`);
      console.log(`Data de vencimento: ${this.dataVencimento.toISOString()}`);
   }
}

class Comentario {
   constructor(
      private _autor: Usuario,
      private _tarefa: Tarefa,
      private _mensagem: string = '',
      private _respostas: Comentario[] = [],
      private _dataEnvio: Date = new Date(),
   ) {}

   get autor(): Usuario { return this._autor; }
   set autor(autor: Usuario) { this._autor = autor; }

   get mensagem(): string { return this._mensagem; }
   set mensagem(mensagem: string) { this._mensagem = mensagem; }

   get respostas(): Comentario[] { return this._respostas; }
   set respostas(respostas: Comentario[]) { this._respostas = respostas; }

   get dataEnvio(): Date { return this._dataEnvio; }
   set dataEnvio(dataEnvio: Date) { this._dataEnvio = dataEnvio; }

   public exibirComentario(): void {
      console.log(`[${this.dataEnvio.toISOString()}] ${this.autor.nome}: ${this.mensagem}`);
   }
}

class Anexo {
   constructor(
      private _pathArquivo: string,
      private _tarefa: Tarefa | null = null,
      private _projeto: Projeto | null = null,
   ) {}

   get pathArquivo(): string { return this._pathArquivo; }
   set pathArquivo(pathArquivo: string) { this._pathArquivo = pathArquivo; }

   get tarefa(): Tarefa | null { return this._tarefa; }
   set tarefa(tarefa: Tarefa | null) { this._tarefa = tarefa; }

   get projeto(): Projeto | null { return this._projeto; }
   set projeto(projeto: Projeto | null) { this._projeto = projeto; }
}

class Checklist {
   constructor(
      private _tarefa: Tarefa,
      private _titulo: string = 'Novo Checklist',
      private _itensChecklist: ItensChecklist[] = [new ItensChecklist(this)],
   ) {}

   get tarefa(): Tarefa { return this._tarefa; }
   set tarefa(tarefa: Tarefa) { this._tarefa = tarefa; }

   get titulo(): string { return this._titulo; }
   set titulo(titulo: string) { this._titulo = titulo; }

   get itensChecklist(): ItensChecklist[] { return this._itensChecklist; }
   set itensChecklist(itensChecklist: ItensChecklist[]) { this._itensChecklist = itensChecklist; }
   
   novoItemChecklist(): void {
      this.itensChecklist.push(new ItensChecklist(this));
   }
   
   removerItemChecklist(item: ItensChecklist): void {
      this.itensChecklist = this.itensChecklist.filter(i => i !== item);
   }
}

class ItensChecklist {
   constructor(
      private _Checklist: Checklist,
      private _descricao: string = '',
      private _concluido: boolean = false,
   ) {}

   get checklist(): Checklist { return this._Checklist; }
   set checklist(checklist: Checklist) { this._Checklist = checklist; }

   get descricao(): string { return this._descricao; }
   set descricao(descricao: string) { this._descricao = descricao; }

   get concluido(): boolean { return this._concluido; }
   set concluido(concluido: boolean) { this._concluido = concluido; }

   marcarConcluido(): void {
      this.concluido = true;
   }

   marcarNaoConcluido(): void {
      this.concluido = false;
   }
}

class Dashboard {
   constructor(
      private _usuario: Usuario,
   ) {}

   get usuario(): Usuario { return this._usuario; }
   set usuario(usuario: Usuario) { this._usuario = usuario; }

   visualizarResumo(): void {
      console.log(`Resumo do usuário ${this.usuario.nome}:`);
      console.log(`Cargo: ${this.usuario.cargo}`);
      console.log(`Email: ${this.usuario.email}`);
      console.log(`Empresa: ${this.usuario.empresa}`);
   }
}

class Lembrete {
   constructor(
      private _usuario: Usuario,
      private _tarefa: Tarefa,
      private _dataLembrete: Date = new Date(),
      private _mensagem: string = 'Novo lembrete',
   ) {}

   get usuario(): Usuario { return this._usuario; }
   set usuario(usuario: Usuario) { this._usuario = usuario; }

   get tarefa(): Tarefa { return this._tarefa; }
   set tarefa(tarefa: Tarefa) { this._tarefa = tarefa; }

   get dataLembrete(): Date { return this._dataLembrete; }
   set dataLembrete(dataLembrete: Date) { this._dataLembrete = dataLembrete; }

   get mensagem(): string { return this._mensagem; }
   set mensagem(mensagem: string) { this._mensagem = mensagem; }
}