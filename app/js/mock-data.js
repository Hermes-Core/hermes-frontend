/**
 * Hermes — Dados simulados (mock) do MVP.
 *
 * Não há back-end nesta entrega: todas as telas leem deste arquivo.
 * As datas são geradas a partir do dia atual para que a demonstração
 * esteja sempre "no presente", independentemente de quando for executada.
 */
(function (global) {
    'use strict';

    var HOJE = new Date();
    HOJE.setHours(0, 0, 0, 0);

    /** Retorna uma nova data deslocada em `dias` a partir de hoje. */
    function emDias(dias) {
        var d = new Date(HOJE);
        d.setDate(d.getDate() + dias);
        return d;
    }

    /** Formata uma data como dd/mm/aaaa. */
    function formatarData(data) {
        var dia = String(data.getDate()).padStart(2, '0');
        var mes = String(data.getMonth() + 1).padStart(2, '0');
        return dia + '/' + mes + '/' + data.getFullYear();
    }

    /** Formata uma data como aaaa-mm-dd (valor aceito por <input type="date">). */
    function chaveISO(data) {
        var mes = String(data.getMonth() + 1).padStart(2, '0');
        var dia = String(data.getDate()).padStart(2, '0');
        return data.getFullYear() + '-' + mes + '-' + dia;
    }

    var MESES = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

    var DIAS_SEMANA = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

    /* ---------------------------------------------------------------
       Eventos do calendário letivo — mapeados por data (aaaa-mm-dd)
       --------------------------------------------------------------- */
    var eventosCalendario = {};

    function registrarEvento(data, tipo, titulo, detalhe) {
        var chave = chaveISO(data);
        if (!eventosCalendario[chave]) {
            eventosCalendario[chave] = [];
        }
        eventosCalendario[chave].push({ tipo: tipo, titulo: titulo, detalhe: detalhe });
    }

    registrarEvento(emDias(2), 'evento', 'Feira de Ciências', 'Pátio central • 08h às 12h');
    registrarEvento(emDias(6), 'prova', 'Prova de Matemática (AP2)', '9º Ano A • Sala 201');
    registrarEvento(emDias(9), 'prova', 'Prova de Português (AP2)', '9º Ano A • Sala 201');
    registrarEvento(emDias(11), 'feriado', 'Feriado municipal', 'Não haverá aula');
    registrarEvento(emDias(14), 'evento', 'Reunião de pais e mestres', 'Auditório • 19h');
    registrarEvento(emDias(-4), 'evento', 'Entrega de boletins', 'Secretaria • 08h às 17h');
    registrarEvento(emDias(20), 'prova', 'Prova de Ciências (AP2)', '9º Ano A • Laboratório');

    /* ---------------------------------------------------------------
       Dados por perfil
       --------------------------------------------------------------- */
    var HermesMock = {
        hoje: HOJE,
        meses: MESES,
        diasSemana: DIAS_SEMANA,
        emDias: emDias,
        formatarData: formatarData,
        chaveISO: chaveISO,
        eventosCalendario: eventosCalendario,

        /** Credenciais aceitas na tela de login (demonstração). */
        usuarios: {
            responsavel: { usuario: 'responsavel', senha: '123456', nome: 'Ana Paula Silva' },
            professor: { usuario: 'professor', senha: '123456', nome: 'Carlos Menezes' },
            funcionario: { usuario: 'funcionario', senha: '123456', nome: 'Marcos Andrade' }
        },

        aluno: {
            nome: 'Maria Silva',
            turma: '9º Ano - Turma A',
            matricula: '2026001',
            iniciais: 'MS',
            mediaGeral: '8.5'
        },

        /* ---------------- Responsável ---------------- */
        responsavel: {
            indicadores: [
                { valor: '5', rotulo: 'Atividades Pendentes', icone: 'alert', tinta: 'tint-orange' },
                { valor: '8.5', rotulo: 'Média Geral', icone: 'trending', tinta: 'tint-green', tendencia: '0.3' },
                { valor: '3', rotulo: 'Próximas Provas', icone: 'calendar', tinta: 'tint-blue' },
                { valor: '12', rotulo: 'Notificações', icone: 'bell', tinta: 'tint-purple' }
            ],

            agendaDoDia: [
                { hora: '08', minuto: '00', titulo: 'Aula de Matemática', tipo: 'Aula', local: 'Sala 201' },
                { hora: '10', minuto: '00', titulo: 'Trabalho de História', tipo: 'Entrega', local: 'Biblioteca' },
                { hora: '14', minuto: '00', titulo: 'Educação Física', tipo: 'Aula', local: 'Quadra' },
                { hora: '16', minuto: '00', titulo: 'Aula de Inglês', tipo: 'Aula', local: 'Lab. Idiomas' }
            ],

            atividadesDoDia: [
                {
                    disciplina: 'Matemática',
                    titulo: 'Exercícios de Álgebra',
                    prazo: emDias(1),
                    status: 'pendente',
                    descricao: 'Resolver a lista de equações do 1º grau, páginas 45 a 48 do livro.'
                },
                {
                    disciplina: 'Português',
                    titulo: 'Redação sobre Meio Ambiente',
                    prazo: emDias(3),
                    status: 'pendente',
                    descricao: 'Texto dissertativo-argumentativo de 25 a 30 linhas.'
                },
                {
                    disciplina: 'Ciências',
                    titulo: 'Relatório de Laboratório',
                    prazo: emDias(4),
                    status: 'entregue',
                    descricao: 'Relatório do experimento sobre densidade dos líquidos.'
                }
            ],

            licoesDeCasa: [
                { dia: 'Segunda', disciplina: 'Matemática', descricao: 'Página 45-48 do livro', concluida: true },
                { dia: 'Terça', disciplina: 'Inglês', descricao: 'Estudar verbos irregulares', concluida: true },
                { dia: 'Quarta', disciplina: 'Geografia', descricao: 'Resumo cap. 5', concluida: false },
                { dia: 'Quinta', disciplina: 'História', descricao: 'Pesquisa sobre a Revolução Industrial', concluida: false },
                { dia: 'Sexta', disciplina: 'Ciências', descricao: 'Terminar relatório do experimento', concluida: false }
            ],

            notas: [
                { disciplina: 'Matemática', ap1: '7.5', ap2: '8.0', media: '7.8', situacao: 'Aprovado', evolucao: '+0.5' },
                { disciplina: 'Português', ap1: '9.0', ap2: '8.5', media: '8.8', situacao: 'Aprovado', evolucao: '-0.5' },
                { disciplina: 'Ciências', ap1: '8.0', ap2: '9.0', media: '8.5', situacao: 'Aprovado', evolucao: '+1.0' },
                { disciplina: 'História', ap1: '6.5', ap2: '7.0', media: '6.8', situacao: 'Aprovado', evolucao: '+0.5' },
                { disciplina: 'Geografia', ap1: '8.5', ap2: '8.5', media: '8.5', situacao: 'Aprovado', evolucao: '0.0' },
                { disciplina: 'Inglês', ap1: '9.5', ap2: '9.0', media: '9.3', situacao: 'Aprovado', evolucao: '-0.5' }
            ],

            frequencia: [
                { disciplina: 'Matemática', aulas: 40, faltas: 2 },
                { disciplina: 'Português', aulas: 40, faltas: 0 },
                { disciplina: 'Ciências', aulas: 32, faltas: 1 },
                { disciplina: 'História', aulas: 24, faltas: 3 }
            ],

            notificacoes: [
                {
                    titulo: 'Prova de Matemática remarcada',
                    origem: 'Prof. Carlos Menezes',
                    texto: 'A avaliação AP2 foi remarcada para a próxima sexta-feira, às 08h, na sala 201.',
                    quando: 'Há 20 minutos',
                    prioridade: 'urgente',
                    lida: false
                },
                {
                    titulo: 'Nova atividade publicada',
                    origem: 'Prof. Carlos Menezes',
                    texto: 'Exercícios de Álgebra foram publicados na agenda escolar.',
                    quando: 'Há 2 horas',
                    prioridade: 'normal',
                    lida: false
                },
                {
                    titulo: 'Reunião de pais e mestres',
                    origem: 'Coordenação',
                    texto: 'Reunião bimestral no auditório. A presença dos responsáveis é muito importante.',
                    quando: 'Ontem',
                    prioridade: 'importante',
                    lida: false
                },
                {
                    titulo: 'Boletim do 1º bimestre disponível',
                    origem: 'Secretaria',
                    texto: 'O boletim já pode ser consultado no módulo de desempenho.',
                    quando: 'Há 3 dias',
                    prioridade: 'normal',
                    lida: true
                },
                {
                    titulo: 'Registro de falta',
                    origem: 'Secretaria',
                    texto: 'Falta registrada na aula de História do dia anterior.',
                    quando: 'Há 4 dias',
                    prioridade: 'importante',
                    lida: true
                }
            ],

            agendamentosPendentes: [
                {
                    com: 'Prof. Carlos Menezes',
                    assunto: 'Conversar sobre desempenho em matemática',
                    data: emDias(3),
                    turno: 'Tarde (13h - 17h)'
                },
                {
                    com: 'Coordenação Pedagógica',
                    assunto: 'Acompanhamento do plano de estudos',
                    data: emDias(6),
                    turno: 'Manhã (08h - 12h)'
                }
            ],

            agendamentosConfirmados: [
                {
                    com: 'Prof.ª Beatriz Nunes',
                    assunto: 'Devolutiva da redação',
                    data: emDias(1),
                    hora: '14:00',
                    local: 'Sala 205'
                },
                {
                    com: 'Direção',
                    assunto: 'Renovação de matrícula',
                    data: emDias(5),
                    hora: '10:00',
                    local: 'Secretaria'
                }
            ],

            tiposAtendimento: ['Reunião com professor', 'Atendimento pedagógico', 'Assuntos financeiros', 'Direção'],
            responsaveisAtendimento: ['Prof. Carlos Menezes — Matemática', 'Prof.ª Beatriz Nunes — Português', 'Coordenação Pedagógica', 'Direção']
        },

        /* ---------------- Professor ---------------- */
        professor: {
            indicadores: [
                { valor: '6', rotulo: 'Turmas', icone: 'users', tinta: 'tint-blue' },
                { valor: '24', rotulo: 'Atividades Cadastradas', icone: 'clipboard', tinta: 'tint-purple' },
                { valor: '156', rotulo: 'Notas Lançadas', icone: 'graduation', tinta: 'tint-green', tendencia: '12' },
                { valor: '18', rotulo: 'Avisos Enviados', icone: 'message', tinta: 'tint-orange' }
            ],

            turmas: [
                { nome: '9º Ano A', disciplina: 'Matemática', horario: 'Seg/Qua 08:00', alunos: 32 },
                { nome: '9º Ano B', disciplina: 'Matemática', horario: 'Ter/Qui 08:00', alunos: 28 },
                { nome: '8º Ano A', disciplina: 'Matemática', horario: 'Seg/Qua 10:00', alunos: 30 },
                { nome: '8º Ano B', disciplina: 'Matemática', horario: 'Ter/Qui 10:00', alunos: 29 },
                { nome: '7º Ano A', disciplina: 'Matemática', horario: 'Qua/Sex 14:00', alunos: 24 },
                { nome: '7º Ano B', disciplina: 'Matemática', horario: 'Ter/Sex 14:00', alunos: 26 }
            ],

            proximasAtividades: [
                { titulo: 'Prova - Equações', tipo: 'Prova', turma: '9º Ano A', data: emDias(6) },
                { titulo: 'Trabalho - Geometria', tipo: 'Trabalho', turma: '8º Ano A', data: emDias(9) },
                { titulo: 'Prova - Frações', tipo: 'Prova', turma: '7º Ano A', data: emDias(12) },
                { titulo: 'Lista - Porcentagem', tipo: 'Exercício', turma: '9º Ano B', data: emDias(14) }
            ],

            disciplinas: ['Matemática', 'Português', 'Ciências', 'História', 'Geografia', 'Inglês'],
            listaTurmas: ['9º Ano - A', '9º Ano - B', '8º Ano - A', '8º Ano - B', '7º Ano - A', '7º Ano - B'],
            tiposAtividade: ['Exercício', 'Trabalho', 'Prova', 'Projeto', 'Leitura'],
            periodos: ['1º Semestre', '2º Semestre'],
            avaliacoes: ['AP1', 'AP2', 'Recuperação'],

            atividadesCadastradas: [
                { titulo: 'Exercícios de Álgebra - Capítulo 5', turma: '9º Ano - A', tipo: 'Exercício', entrega: emDias(1), valor: '2.0' },
                { titulo: 'Trabalho de Geometria Plana', turma: '8º Ano - A', tipo: 'Trabalho', entrega: emDias(9), valor: '3.0' },
                { titulo: 'Prova de Equações do 1º Grau', turma: '9º Ano - A', tipo: 'Prova', entrega: emDias(6), valor: '10.0' }
            ],

            alunos: [
                { numero: '01', matricula: '2026001', nome: 'Ana Silva Santos', nota: '8,5', faltas: '0' },
                { numero: '02', matricula: '2026002', nome: 'Bruno Costa Lima', nota: '7,0', faltas: '1' },
                { numero: '03', matricula: '2026003', nome: 'Carla Menezes Rocha', nota: '9,5', faltas: '0' },
                { numero: '04', matricula: '2026004', nome: 'Daniel Alves Pereira', nota: '6,0', faltas: '3' },
                { numero: '05', matricula: '2026005', nome: 'Eduarda Nunes Barros', nota: '8,0', faltas: '0' },
                { numero: '06', matricula: '2026006', nome: 'Felipe Andrade Souza', nota: '7,5', faltas: '2' },
                { numero: '07', matricula: '2026007', nome: 'Gabriela Martins Dias', nota: '9,0', faltas: '0' },
                { numero: '08', matricula: '2026008', nome: 'Henrique Barbosa Melo', nota: '5,5', faltas: '4' }
            ],

            indicadoresAvisos: [
                { valor: '28', rotulo: 'Avisos Enviados (Mês)', icone: 'message', tinta: 'tint-blue' },
                { valor: '94%', rotulo: 'Taxa de Leitura', icone: 'bell', tinta: 'tint-green' },
                { valor: '3', rotulo: 'Rascunhos', icone: 'message', tinta: 'tint-purple' },
                { valor: '2', rotulo: 'Agendados', icone: 'bell', tinta: 'tint-red' }
            ],

            tiposAviso: ['Informativo', 'Urgente', 'Convocação', 'Lembrete'],
            prioridades: ['Normal', 'Alta', 'Baixa'],

            avisosEnviados: [
                { titulo: 'Prova de Equações na sexta-feira', destino: '9º Ano - A', quando: 'Há 2 horas', leitura: '87%' },
                { titulo: 'Material necessário para a aula prática', destino: '8º Ano (Todas)', quando: 'Ontem', leitura: '95%' },
                { titulo: 'Reunião de pais e mestres', destino: 'Toda a escola', quando: 'Há 3 dias', leitura: '78%' }
            ],

            solicitacoesPendentes: [
                {
                    responsavel: 'Maria Santos',
                    aluno: 'Ana Clara Santos - 9º Ano A',
                    assunto: 'Conversar sobre desempenho em matemática',
                    data: emDias(3),
                    turno: 'Tarde (13h - 17h)'
                },
                {
                    responsavel: 'João Lima',
                    aluno: 'Pedro Henrique Lima - 8º Ano B',
                    assunto: 'Dúvidas sobre trabalho em grupo',
                    data: emDias(6),
                    turno: 'Manhã (08h - 12h)'
                },
                {
                    responsavel: 'Carla Costa',
                    aluno: 'Miguel Costa Ramos - 7º Ano A',
                    assunto: 'Acompanhamento de frequência',
                    data: emDias(8),
                    turno: 'Tarde (13h - 17h)'
                }
            ],

            solicitacoesConfirmadas: [
                {
                    responsavel: 'Roberto Souza',
                    aluno: 'Lucas Ferreira Souza - 9º Ano B',
                    assunto: 'Avaliação de recuperação',
                    data: emDias(1),
                    hora: '14:00',
                    local: 'Sala 205'
                },
                {
                    responsavel: 'Paula Almeida',
                    aluno: 'Beatriz Almeida - 8º Ano A',
                    assunto: 'Comportamento em sala',
                    data: emDias(2),
                    hora: '10:00',
                    local: 'Sala dos Professores'
                }
            ]
        },

        /* ---------------- Funcionário / Secretaria ---------------- */
        funcionario: {
            indicadores: [
                { valor: '412', rotulo: 'Alunos Matriculados', icone: 'users', tinta: 'tint-blue' },
                { valor: '18', rotulo: 'Turmas Ativas', icone: 'clipboard', tinta: 'tint-purple' },
                { valor: '7', rotulo: 'Solicitações Abertas', icone: 'alert', tinta: 'tint-orange' },
                { valor: '32', rotulo: 'Comunicados no Mês', icone: 'message', tinta: 'tint-green' }
            ],

            solicitacoes: [
                { protocolo: '#2026-0148', solicitante: 'Maria Santos', tipo: 'Declaração de matrícula', abertura: emDias(-1), status: 'Em análise' },
                { protocolo: '#2026-0147', solicitante: 'João Lima', tipo: 'Segunda via de boletim', abertura: emDias(-2), status: 'Em análise' },
                { protocolo: '#2026-0145', solicitante: 'Roberto Souza', tipo: 'Transferência', abertura: emDias(-4), status: 'Concluída' },
                { protocolo: '#2026-0143', solicitante: 'Paula Almeida', tipo: 'Histórico escolar', abertura: emDias(-6), status: 'Concluída' }
            ],

            turmasEscola: [
                { turma: '9º Ano A', turno: 'Manhã', alunos: 32, vagas: 3, regente: 'Carlos Menezes' },
                { turma: '9º Ano B', turno: 'Manhã', alunos: 28, vagas: 7, regente: 'Beatriz Nunes' },
                { turma: '8º Ano A', turno: 'Manhã', alunos: 30, vagas: 5, regente: 'Carlos Menezes' },
                { turma: '8º Ano B', turno: 'Tarde', alunos: 29, vagas: 6, regente: 'Rafael Torres' },
                { turma: '7º Ano A', turno: 'Tarde', alunos: 24, vagas: 11, regente: 'Beatriz Nunes' },
                { turma: '7º Ano B', turno: 'Tarde', alunos: 26, vagas: 9, regente: 'Rafael Torres' }
            ],

            comunicadosRecentes: [
                { titulo: 'Calendário de recuperação do 1º semestre', destino: 'Toda a escola', quando: 'Há 1 dia' },
                { titulo: 'Campanha de arrecadação de agasalhos', destino: 'Toda a escola', quando: 'Há 4 dias' },
                { titulo: 'Alteração no horário do 7º Ano B', destino: '7º Ano - B', quando: 'Há 6 dias' }
            ]
        }
    };

    global.HermesMock = HermesMock;
})(window);
