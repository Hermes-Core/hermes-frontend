/**
 * Hermes — Telas do perfil Professor.
 *
 * Mesma estratégia usada no perfil Responsável: um roteador simples
 * escolhe o renderizador da tela ativa a partir de `body[data-page]`.
 */
(function () {
    'use strict';

    var mock = window.HermesMock;
    var dados = mock.professor;

    var TINTA_TIPO = {
        Prova: 'tint-red',
        Trabalho: 'tint-orange',
        Exercício: 'tint-blue',
        Projeto: 'tint-purple',
        Leitura: 'tint-green'
    };

    function elemento(id) {
        return document.getElementById(id);
    }

    /** Preenche um <select> com uma lista de textos. */
    function preencherSelect(seletor, opcoes, selecionada) {
        var alvo = typeof seletor === 'string' ? elemento(seletor) : seletor;
        if (!alvo) {
            return;
        }
        alvo.insertAdjacentHTML('beforeend', opcoes.map(function (texto) {
            var marcada = texto === selecionada ? ' selected' : '';
            return '<option' + marcada + '>' + texto + '</option>';
        }).join(''));
    }

    /* =====================================================
       Dashboard
       ===================================================== */

    function renderizarDashboard() {
        Hermes.renderizarIndicadores(elemento('indicadores'), dados.indicadores);

        elemento('lista-turmas').innerHTML = dados.turmas.map(function (turma) {
            return '<article class="mini-card">' +
                '<div class="mini-card-footer" style="margin:0">' +
                '<h3 class="mt-0" style="margin:0">' + turma.nome + '</h3>' +
                Hermes.selo(turma.alunos + ' alunos', 'tint-blue') +
                '</div>' +
                '<p class="detail-line" style="margin-top:10px">' + Hermes.icone('book', 16) + turma.disciplina + '</p>' +
                '<p class="detail-line">' + Hermes.icone('clock', 16) + turma.horario + '</p>' +
                '</article>';
        }).join('');

        elemento('lista-proximas').innerHTML = dados.proximasAtividades.map(function (atividade) {
            return '<article class="mini-card">' +
                '<div class="mini-card-footer" style="margin:0">' +
                '<h3 class="mt-0" style="margin:0">' + atividade.titulo + '</h3>' +
                Hermes.selo(atividade.tipo, TINTA_TIPO[atividade.tipo]) +
                '</div>' +
                '<p class="detail-line" style="margin-top:10px">' + Hermes.icone('users', 16) + atividade.turma + '</p>' +
                '<p class="detail-line">' + Hermes.icone('calendar', 16) + mock.formatarData(atividade.data) + '</p>' +
                '</article>';
        }).join('');
    }

    /* =====================================================
       Cadastro de atividades
       ===================================================== */

    function renderizarAtividades() {
        var publicadas = dados.atividadesCadastradas.slice();
        var formulario = elemento('form-atividade');

        preencherSelect('disciplina', dados.disciplinas, 'Matemática');
        preencherSelect('turma', dados.listaTurmas);
        preencherSelect('tipo', dados.tiposAtividade);

        function desenharTabela() {
            elemento('tabela-atividades').innerHTML = publicadas.map(function (item) {
                return '<tr>' +
                    '<td class="strong">' + item.titulo + '</td>' +
                    '<td>' + item.turma + '</td>' +
                    '<td>' + Hermes.selo(item.tipo, TINTA_TIPO[item.tipo]) + '</td>' +
                    '<td class="num">' + mock.formatarData(item.entrega) + '</td>' +
                    '<td class="num">' + item.valor + '</td>' +
                    '</tr>';
            }).join('');
        }

        elemento('botao-upload').addEventListener('click', function () {
            Hermes.avisar('O envio de arquivos será integrado ao back-end na próxima sprint.');
        });

        formulario.addEventListener('submit', function (evento) {
            evento.preventDefault();

            if (!Hermes.validarFormulario(formulario)) {
                Hermes.avisar('Revise os campos destacados antes de publicar.', 'erro');
                return;
            }

            publicadas.unshift({
                titulo: elemento('titulo').value.trim(),
                turma: elemento('turma').value,
                tipo: elemento('tipo').value,
                entrega: new Date(elemento('entrega').value + 'T00:00:00'),
                valor: Number(elemento('valor').value).toFixed(1)
            });

            desenharTabela();
            formulario.reset();
            Hermes.avisar('Atividade publicada e enviada aos responsáveis da turma.');
        });

        desenharTabela();
    }

    /* =====================================================
       Lançamento de notas
       ===================================================== */

    function renderizarNotas() {
        var corpo = elemento('tabela-alunos');
        var rotulo = elemento('rotulo-lancamento');

        preencherSelect('disciplina', dados.disciplinas, 'Matemática');
        preencherSelect('turma', dados.listaTurmas);
        preencherSelect('periodo', dados.periodos);
        preencherSelect('avaliacao', dados.avaliacoes);

        function atualizarRotulo() {
            rotulo.textContent = 'Lançamento de Notas - ' + elemento('turma').value +
                ' - ' + elemento('disciplina').value + ' - ' + elemento('avaliacao').value;
        }

        function desenharAlunos() {
            corpo.innerHTML = dados.alunos.map(function (aluno) {
                return '<tr>' +
                    '<td class="num strong">' + aluno.numero + '</td>' +
                    '<td>' + aluno.matricula + '</td>' +
                    '<td class="strong">' + aluno.nome + '</td>' +
                    '<td class="num"><input type="text" inputmode="decimal" value="' + aluno.nota + '" aria-label="Nota de ' + aluno.nome + '"></td>' +
                    '<td class="num"><input type="text" inputmode="numeric" value="' + aluno.faltas + '" aria-label="Faltas de ' + aluno.nome + '"></td>' +
                    '<td><input type="text" class="obs" placeholder="Opcional" aria-label="Observações sobre ' + aluno.nome + '"></td>' +
                    '<td class="num situacao">' + Hermes.selo('Salvo', 'tint-green') + '</td>' +
                    '</tr>';
            }).join('');
        }

        /* Qualquer alteração marca a linha como pendente de salvamento */
        corpo.addEventListener('input', function (evento) {
            var linha = evento.target.closest('tr');
            if (linha) {
                linha.querySelector('.situacao').innerHTML = Hermes.selo('Não salvo', 'tint-orange');
            }
        });

        elemento('form-selecao').addEventListener('submit', function (evento) {
            evento.preventDefault();
            atualizarRotulo();
            desenharAlunos();
            Hermes.avisar('Lista de alunos carregada.');
        });

        elemento('botao-salvar').addEventListener('click', function () {
            var notas = corpo.querySelectorAll('tr td:nth-child(4) input');
            var invalida = false;

            Array.prototype.forEach.call(notas, function (campo) {
                var valor = Number(String(campo.value).replace(',', '.'));
                if (campo.value === '' || isNaN(valor) || valor < 0 || valor > 10) {
                    campo.classList.add('invalid');
                    invalida = true;
                } else {
                    campo.classList.remove('invalid');
                }
            });

            if (invalida) {
                Hermes.avisar('Existem notas fora do intervalo de 0 a 10.', 'erro');
                return;
            }

            corpo.querySelectorAll('.situacao').forEach(function (celula) {
                celula.innerHTML = Hermes.selo('Salvo', 'tint-green');
            });
            Hermes.avisar('Notas salvas e publicadas para os responsáveis.');
        });

        elemento('botao-importar').addEventListener('click', function () {
            Hermes.avisar('Importação por planilha prevista para a próxima sprint.');
        });

        atualizarRotulo();
        desenharAlunos();
    }

    /* =====================================================
       Envio de avisos
       ===================================================== */

    function renderizarAvisos() {
        var enviados = dados.avisosEnviados.slice();
        var formulario = elemento('form-aviso');

        Hermes.renderizarIndicadores(elemento('indicadores'), dados.indicadoresAvisos);
        preencherSelect('tipo', dados.tiposAviso);
        preencherSelect('prioridade', dados.prioridades);
        preencherSelect('destino-turma', dados.listaTurmas);

        function descreverDestino() {
            var escolhido = formulario.querySelector('input[name="destino"]:checked').value;
            if (escolhido === 'turma') {
                return elemento('destino-turma').value;
            }
            if (escolhido === 'serie') {
                return elemento('destino-serie').value;
            }
            return 'Toda a escola';
        }

        function desenharEnviados() {
            elemento('lista-avisos').innerHTML = enviados.map(function (aviso) {
                return '<li class="item">' +
                    '<span class="list-icon tint-blue" style="width:44px;height:44px;border-radius:13px">' +
                    Hermes.icone('message', 20) + '</span>' +
                    '<div class="item-body">' +
                    '<h3>' + aviso.titulo + '</h3>' +
                    '<p class="item-meta">' + Hermes.icone('users', 15) + aviso.destino + ' • ' + aviso.quando + '</p>' +
                    '</div>' +
                    '<span class="badge tint-green">' + aviso.leitura + ' lido</span>' +
                    '</li>';
            }).join('');

            Hermes.renderizarIcones(elemento('lista-avisos'));
        }

        formulario.addEventListener('submit', function (evento) {
            evento.preventDefault();

            if (!Hermes.validarFormulario(formulario)) {
                Hermes.avisar('Informe o título e a mensagem do aviso.', 'erro');
                return;
            }

            enviados.unshift({
                titulo: elemento('titulo').value.trim(),
                destino: descreverDestino(),
                quando: 'Agora',
                leitura: '0%'
            });

            desenharEnviados();
            formulario.reset();
            Hermes.avisar('Aviso enviado para ' + enviados[0].destino + '.');
        });

        elemento('salvar-rascunho').addEventListener('click', function () {
            Hermes.avisar('Rascunho salvo. Você pode retomá-lo depois.');
        });

        desenharEnviados();
    }

    /* =====================================================
       Agendamentos
       ===================================================== */

    function renderizarAgendamentos() {
        var pendentes = dados.solicitacoesPendentes.slice();
        var confirmados = dados.solicitacoesConfirmadas.slice();

        function desenhar() {
            elemento('lista-pendentes').innerHTML = pendentes.length
                ? pendentes.map(function (item, indice) {
                    return '<article class="mini-card">' +
                        '<h3 class="mt-0">' + item.responsavel + '</h3>' +
                        '<p class="muted text-sm">' + item.aluno + '</p>' +
                        '<p style="margin-top:10px"><strong>Assunto:</strong> ' + item.assunto + '</p>' +
                        '<p class="detail-line" style="margin-top:10px">' +
                        Hermes.icone('calendar', 16) + mock.formatarData(item.data) +
                        ' &nbsp; ' + Hermes.icone('clock', 16) + item.turno + '</p>' +
                        '<div class="btn-row" style="margin-top:14px">' +
                        '<button type="button" class="btn btn-green btn-sm" data-acao="confirmar" data-indice="' + indice + '">' +
                        Hermes.icone('check', 18) + ' Confirmar</button>' +
                        '<button type="button" class="btn btn-outline btn-sm" data-acao="recusar" data-indice="' + indice + '">' +
                        Hermes.icone('close', 18) + ' Recusar</button>' +
                        '</div></article>';
                }).join('')
                : '<p class="empty-state">Nenhuma solicitação aguardando confirmação.</p>';

            elemento('lista-confirmados').innerHTML = confirmados.length
                ? confirmados.map(function (item) {
                    return '<article class="mini-card confirmed">' +
                        '<h3 class="mt-0">' + item.responsavel + '</h3>' +
                        '<p class="muted text-sm">' + item.aluno + '</p>' +
                        '<p style="margin-top:8px">' + item.assunto + '</p>' +
                        '<p class="detail-line" style="margin-top:12px">' + Hermes.icone('calendar', 16) + mock.formatarData(item.data) + '</p>' +
                        '<p class="detail-line">' + Hermes.icone('clock', 16) + item.hora + '</p>' +
                        '<p class="detail-line">' + Hermes.icone('pin', 16) + item.local + '</p>' +
                        '<button type="button" class="btn btn-outline btn-sm" style="margin-top:14px" data-acao="reagendar">Reagendar</button>' +
                        '</article>';
                }).join('')
                : '<p class="empty-state">Nenhum atendimento confirmado.</p>';
        }

        elemento('lista-pendentes').addEventListener('click', function (evento) {
            var botao = evento.target.closest('[data-acao]');
            if (!botao) {
                return;
            }

            var indice = Number(botao.dataset.indice);
            var solicitacao = pendentes[indice];

            if (botao.dataset.acao === 'confirmar') {
                confirmados.unshift({
                    responsavel: solicitacao.responsavel,
                    aluno: solicitacao.aluno,
                    assunto: solicitacao.assunto,
                    data: solicitacao.data,
                    hora: solicitacao.turno.indexOf('Manhã') === 0 ? '09:00' : '14:00',
                    local: 'Sala dos Professores'
                });
                Hermes.avisar('Atendimento confirmado com ' + solicitacao.responsavel + '.');
            } else {
                Hermes.avisar('Solicitação de ' + solicitacao.responsavel + ' recusada.', 'erro');
            }

            pendentes.splice(indice, 1);
            desenhar();
        });

        elemento('lista-confirmados').addEventListener('click', function (evento) {
            if (evento.target.closest('[data-acao="reagendar"]')) {
                Hermes.avisar('Uma nova sugestão de horário será enviada ao responsável.');
            }
        });

        desenhar();
    }

    /* =====================================================
       Roteamento por tela
       ===================================================== */

    var TELAS = {
        dashboard: renderizarDashboard,
        atividades: renderizarAtividades,
        notas: renderizarNotas,
        avisos: renderizarAvisos,
        agendamentos: renderizarAgendamentos
    };

    function iniciar() {
        var sessao = Hermes.lerSessao();
        if (!sessao || sessao.perfil !== 'professor') {
            return;
        }

        var tela = TELAS[document.body.dataset.page];
        if (tela) {
            tela();
            Hermes.renderizarIcones();
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', iniciar);
    } else {
        iniciar();
    }
}());
