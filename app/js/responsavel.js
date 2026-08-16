/**
 * Hermes — Telas do perfil Responsável.
 *
 * Um único arquivo atende às seis telas do perfil: a função `iniciar()`
 * identifica a tela ativa por `document.body.dataset.page` e chama
 * apenas o renderizador correspondente.
 */
(function () {
    'use strict';

    var mock = window.HermesMock;
    var dados = mock.responsavel;

    /* ---------- Apoio ---------- */

    var TINTA_DISCIPLINA = {
        'Matemática': 'tint-orange',
        'Português': 'tint-blue',
        'Ciências': 'tint-green',
        'História': 'tint-purple',
        'Geografia': 'tint-red',
        'Inglês': 'tint-blue'
    };

    var TINTA_TIPO = {
        Aula: 'tint-blue',
        Entrega: 'tint-orange',
        Prova: 'tint-purple',
        Reunião: 'tint-green'
    };

    var TINTA_PRIORIDADE = {
        urgente: 'tint-red',
        importante: 'tint-orange',
        normal: 'tint-blue'
    };

    var ROTULO_PRIORIDADE = {
        urgente: 'Urgente',
        importante: 'Importante',
        normal: 'Normal'
    };

    var TINTA_EVENTO = {
        prova: 'tint-purple',
        evento: 'tint-blue',
        feriado: 'tint-green'
    };

    var ROTULO_EVENTO = {
        prova: 'Prova',
        evento: 'Evento',
        feriado: 'Feriado'
    };

    function elemento(id) {
        return document.getElementById(id);
    }

    /* =====================================================
       Dashboard
       ===================================================== */

    function renderizarDashboard() {
        Hermes.renderizarIndicadores(elemento('indicadores'), dados.indicadores);

        elemento('agenda-do-dia').innerHTML = dados.agendaDoDia.map(function (item) {
            return '<li class="item">' +
                '<span class="item-time">' + item.hora + '<span>' + item.minuto + '</span></span>' +
                '<div class="item-body">' +
                '<h3>' + item.titulo + ' ' + Hermes.selo(item.tipo, TINTA_TIPO[item.tipo]) + '</h3>' +
                '<p class="item-meta">' + Hermes.icone('pin', 16) + item.local + '</p>' +
                '</div></li>';
        }).join('');

        elemento('resumo-notas').innerHTML = dados.notas.slice(0, 3).map(function (nota) {
            return '<article class="grade-card">' +
                '<h3><span class="list-icon ' + (TINTA_DISCIPLINA[nota.disciplina] || 'tint-blue') + '" ' +
                'style="width:34px;height:34px;border-radius:10px">' + Hermes.icone('book', 18) + '</span>' + nota.disciplina + '</h3>' +
                '<p class="grade-row">AP1 <strong>' + nota.ap1 + '</strong></p>' +
                '<p class="grade-row">AP2 <strong>' + nota.ap2 + '</strong></p>' +
                '<p class="grade-row total">Média <strong>' + nota.media + '</strong></p>' +
                '</article>';
        }).join('');

        Hermes.criarCalendario({
            grade: elemento('grade-calendario'),
            titulo: elemento('mes-atual')
        });
    }

    /* =====================================================
       Agenda escolar
       ===================================================== */

    function cartaoAtividade(atividade) {
        var entregue = atividade.status === 'entregue';
        return '<article class="mini-card">' +
            Hermes.selo(atividade.disciplina, TINTA_DISCIPLINA[atividade.disciplina] || 'tint-blue') +
            (entregue ? ' ' + Hermes.selo('Entregue', 'tint-green') : '') +
            '<h3>' + atividade.titulo + '</h3>' +
            '<p>' + atividade.descricao + '</p>' +
            '<div class="mini-card-footer">' +
            '<span class="detail-line">' + Hermes.icone('clock', 16) + 'Prazo: ' + mock.formatarData(atividade.prazo) + '</span>' +
            '<button type="button" class="btn btn-outline btn-sm" data-detalhe="' + atividade.titulo + '">Ver detalhes</button>' +
            '</div></article>';
    }

    function renderizarAgenda() {
        var campoData = elemento('filtro-data');
        var campoDisciplina = elemento('filtro-disciplina');
        var campoStatus = elemento('filtro-status');
        var lista = elemento('lista-atividades');

        campoData.value = mock.chaveISO(mock.hoje);

        function aplicarFiltros() {
            var partes = campoData.value.split('-');
            elemento('data-selecionada').textContent = partes.length === 3
                ? partes[2] + '/' + partes[1] + '/' + partes[0]
                : mock.formatarData(mock.hoje);

            var filtradas = dados.atividadesDoDia.filter(function (atividade) {
                var okDisciplina = !campoDisciplina.value || atividade.disciplina === campoDisciplina.value;
                var okStatus = !campoStatus.value || atividade.status === campoStatus.value;
                return okDisciplina && okStatus;
            });

            lista.innerHTML = filtradas.length
                ? filtradas.map(cartaoAtividade).join('')
                : '<p class="empty-state">Nenhuma atividade encontrada para os filtros selecionados.</p>';

            Hermes.renderizarIcones(lista);
        }

        elemento('form-filtros').addEventListener('submit', function (evento) {
            evento.preventDefault();
            aplicarFiltros();
            Hermes.avisar('Filtros aplicados à agenda.');
        });

        lista.addEventListener('click', function (evento) {
            var botao = evento.target.closest('[data-detalhe]');
            if (botao) {
                Hermes.avisar('Detalhes de "' + botao.dataset.detalhe + '" — versão completa prevista para a próxima sprint.');
            }
        });

        elemento('lista-licoes').innerHTML = dados.licoesDeCasa.map(function (licao, indice) {
            return '<li class="item ' + (licao.concluida ? 'done' : 'pending') + '">' +
                '<span class="check-mark">' + Hermes.icone('check', 20) + '</span>' +
                '<div class="item-body">' +
                '<h4>' + licao.dia + ' - ' + licao.disciplina + '</h4>' +
                '<p>' + licao.descricao + '</p>' +
                '</div>' +
                '<div class="item-actions">' +
                '<button type="button" class="btn btn-outline btn-sm" data-licao="' + indice + '">' +
                (licao.concluida ? 'Reabrir' : 'Concluir') + '</button>' +
                '</div></li>';
        }).join('');

        elemento('lista-licoes').addEventListener('click', function (evento) {
            var botao = evento.target.closest('[data-licao]');
            if (!botao) {
                return;
            }
            var item = botao.closest('.item');
            var concluida = item.classList.toggle('done');
            item.classList.toggle('pending', !concluida);
            botao.textContent = concluida ? 'Reabrir' : 'Concluir';
            Hermes.avisar(concluida ? 'Lição marcada como concluída.' : 'Lição reaberta.');
        });

        aplicarFiltros();
    }

    /* =====================================================
       Desempenho
       ===================================================== */

    function renderizarDesempenho() {
        var aluno = mock.aluno;

        elemento('aluno-iniciais').textContent = aluno.iniciais;
        elemento('aluno-nome').textContent = aluno.nome;
        elemento('aluno-dados').textContent = aluno.turma + ' | Matrícula: ' + aluno.matricula;
        elemento('aluno-media').textContent = aluno.mediaGeral;

        elemento('tabela-notas').innerHTML = dados.notas.map(function (nota) {
            var evolucao = parseFloat(nota.evolucao);
            var classe = evolucao > 0 ? 'trend-up' : (evolucao < 0 ? 'trend-down' : 'muted');
            return '<tr>' +
                '<td class="strong">' + nota.disciplina + '</td>' +
                '<td class="num">' + nota.ap1 + '</td>' +
                '<td class="num">' + nota.ap2 + '</td>' +
                '<td class="num strong">' + nota.media + '</td>' +
                '<td class="num">' + Hermes.selo(nota.situacao, 'tint-green') + '</td>' +
                '<td class="num ' + classe + '">' + nota.evolucao + '</td>' +
                '</tr>';
        }).join('');

        elemento('lista-frequencia').innerHTML = dados.frequencia.map(function (item) {
            var presenca = Math.round(((item.aulas - item.faltas) / item.aulas) * 100);
            return '<article class="grade-card">' +
                '<h3>' + item.disciplina + '</h3>' +
                '<p class="grade-row">Aulas dadas <strong>' + item.aulas + '</strong></p>' +
                '<p class="grade-row">Faltas <strong>' + item.faltas + '</strong></p>' +
                '<p class="grade-row total">Presença <strong>' + presenca + '%</strong></p>' +
                '<span class="progress"><i class="' + (presenca < 75 ? 'baixa' : '') + '" style="width:' + presenca + '%"></i></span>' +
                '</article>';
        }).join('');
    }

    /* =====================================================
       Notificações
       ===================================================== */

    function renderizarNotificacoes() {
        var lista = elemento('lista-notificacoes');
        var filtro = elemento('filtro-prioridade');
        var itens = dados.notificacoes.map(function (item) {
            return Object.assign({}, item);
        });

        function desenhar() {
            var visiveis = itens.filter(function (item) {
                return !filtro.value || item.prioridade === filtro.value;
            });

            lista.innerHTML = visiveis.length
                ? '<ul class="item-list">' + visiveis.map(function (item) {
                    return '<li class="item ' + (item.lida ? '' : 'nao-lida') + '">' +
                        '<span class="list-icon ' + TINTA_PRIORIDADE[item.prioridade] + '" style="width:44px;height:44px;border-radius:13px">' +
                        Hermes.icone('bell', 20) + '</span>' +
                        '<div class="item-body">' +
                        '<h3>' + item.titulo + ' ' + Hermes.selo(ROTULO_PRIORIDADE[item.prioridade], TINTA_PRIORIDADE[item.prioridade]) + '</h3>' +
                        '<p>' + item.texto + '</p>' +
                        '<p class="item-meta">' + Hermes.icone('user', 15) + item.origem + ' • ' + item.quando + '</p>' +
                        '</div></li>';
                }).join('') + '</ul>'
                : '<p class="empty-state">Nenhuma notificação com essa prioridade.</p>';

            Hermes.renderizarIcones(lista);
        }

        filtro.addEventListener('change', desenhar);

        elemento('marcar-lidas').addEventListener('click', function () {
            itens.forEach(function (item) {
                item.lida = true;
            });
            desenhar();
            Hermes.avisar('Todas as notificações foram marcadas como lidas.');
        });

        desenhar();
    }

    /* =====================================================
       Calendário letivo
       ===================================================== */

    function renderizarCalendario() {
        var detalhes = elemento('detalhes-do-dia');

        Hermes.criarCalendario({
            grade: elemento('grade-calendario'),
            titulo: elemento('mes-atual'),
            anterior: elemento('mes-anterior'),
            proximo: elemento('mes-proximo'),
            aoSelecionar: function (chave, eventos) {
                var partes = chave.split('-');
                var rotulo = partes[2] + '/' + partes[1] + '/' + partes[0];

                if (!eventos.length) {
                    detalhes.innerHTML = '<p class="empty-state">Nenhum compromisso registrado para ' + rotulo + '.</p>';
                    return;
                }

                detalhes.innerHTML = '<h3 class="card-title" style="font-size:18px;margin-bottom:12px">' +
                    'Compromissos de ' + rotulo + '</h3>' +
                    eventos.map(function (evento) {
                        return '<article class="mini-card">' +
                            Hermes.selo(ROTULO_EVENTO[evento.tipo], TINTA_EVENTO[evento.tipo]) +
                            '<h3>' + evento.titulo + '</h3>' +
                            '<p>' + evento.detalhe + '</p></article>';
                    }).join('');
            }
        });

        var proximos = Object.keys(mock.eventosCalendario)
            .filter(function (chave) {
                return chave >= mock.chaveISO(mock.hoje);
            })
            .sort()
            .slice(0, 4);

        elemento('proximos-compromissos').innerHTML = proximos.map(function (chave) {
            var evento = mock.eventosCalendario[chave][0];
            var partes = chave.split('-');
            return '<li class="item">' +
                '<span class="item-time">' + partes[2] + '<span>' + mock.meses[Number(partes[1]) - 1].slice(0, 3) + '</span></span>' +
                '<div class="item-body">' +
                '<h3>' + evento.titulo + ' ' + Hermes.selo(ROTULO_EVENTO[evento.tipo], TINTA_EVENTO[evento.tipo]) + '</h3>' +
                '<p class="item-meta">' + evento.detalhe + '</p>' +
                '</div></li>';
        }).join('');

        Hermes.renderizarIcones(elemento('proximos-compromissos'));
    }

    /* =====================================================
       Agendamentos
       ===================================================== */

    function cartaoPendente(item) {
        return '<article class="mini-card">' +
            '<h3 class="mt-0">' + item.com + '</h3>' +
            '<p>' + item.assunto + '</p>' +
            '<div class="mini-card-footer">' +
            '<span class="detail-line">' + Hermes.icone('calendar', 16) + mock.formatarData(item.data) +
            ' &nbsp; ' + Hermes.icone('clock', 16) + item.turno + '</span>' +
            Hermes.selo('Aguardando', 'tint-orange') +
            '</div></article>';
    }

    function cartaoConfirmado(item) {
        return '<article class="mini-card confirmed">' +
            '<h3 class="mt-0">' + item.com + '</h3>' +
            '<p>' + item.assunto + '</p>' +
            '<p class="detail-line" style="margin-top:12px">' + Hermes.icone('calendar', 16) + mock.formatarData(item.data) + '</p>' +
            '<p class="detail-line">' + Hermes.icone('clock', 16) + item.hora + '</p>' +
            '<p class="detail-line">' + Hermes.icone('pin', 16) + item.local + '</p>' +
            '</article>';
    }

    function renderizarAgendamentos() {
        var seletorTipo = elemento('tipo');
        var seletorResponsavel = elemento('responsavel');
        var pendentes = dados.agendamentosPendentes.slice();

        dados.tiposAtendimento.forEach(function (tipo) {
            seletorTipo.insertAdjacentHTML('beforeend', '<option>' + tipo + '</option>');
        });
        dados.responsaveisAtendimento.forEach(function (pessoa) {
            seletorResponsavel.insertAdjacentHTML('beforeend', '<option>' + pessoa + '</option>');
        });

        function desenharListas() {
            elemento('lista-pendentes').innerHTML = pendentes.length
                ? pendentes.map(cartaoPendente).join('')
                : '<p class="empty-state">Nenhuma solicitação pendente.</p>';

            elemento('lista-confirmados').innerHTML = dados.agendamentosConfirmados.map(cartaoConfirmado).join('');
        }

        var formulario = elemento('form-agendamento');

        formulario.addEventListener('submit', function (evento) {
            evento.preventDefault();

            if (!Hermes.validarFormulario(formulario)) {
                Hermes.avisar('Preencha todos os campos obrigatórios.', 'erro');
                return;
            }

            pendentes.unshift({
                com: seletorResponsavel.value,
                assunto: elemento('motivo').value.trim(),
                data: new Date(elemento('data').value + 'T00:00:00'),
                turno: elemento('turno').value
            });

            desenharListas();
            formulario.reset();
            Hermes.avisar('Solicitação enviada! A escola responderá em até 2 dias úteis.');
        });

        desenharListas();
    }

    /* =====================================================
       Roteamento por tela
       ===================================================== */

    var TELAS = {
        dashboard: renderizarDashboard,
        agenda: renderizarAgenda,
        desempenho: renderizarDesempenho,
        notificacoes: renderizarNotificacoes,
        calendario: renderizarCalendario,
        agendamentos: renderizarAgendamentos
    };

    function iniciar() {
        var sessao = Hermes.lerSessao();
        if (!sessao || sessao.perfil !== 'responsavel') {
            return; /* o guarda de rota em app.js já redirecionou */
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
