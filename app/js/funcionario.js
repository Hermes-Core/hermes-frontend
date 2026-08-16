/**
 * Hermes — Telas do perfil Funcionário (secretaria escolar).
 */
(function () {
    'use strict';

    var mock = window.HermesMock;
    var dados = mock.funcionario;

    function elemento(id) {
        return document.getElementById(id);
    }

    function itemComunicado(comunicado) {
        return '<li class="item">' +
            '<span class="list-icon tint-orange" style="width:44px;height:44px;border-radius:13px">' +
            Hermes.icone('message', 20) + '</span>' +
            '<div class="item-body">' +
            '<h3>' + comunicado.titulo + '</h3>' +
            '<p class="item-meta">' + Hermes.icone('users', 15) + comunicado.destino + ' • ' + comunicado.quando + '</p>' +
            '</div></li>';
    }

    /* =====================================================
       Dashboard
       ===================================================== */

    function renderizarDashboard() {
        Hermes.renderizarIndicadores(elemento('indicadores'), dados.indicadores);

        elemento('tabela-solicitacoes').innerHTML = dados.solicitacoes.map(function (item) {
            var concluida = item.status === 'Concluída';
            return '<tr>' +
                '<td class="strong">' + item.protocolo + '</td>' +
                '<td>' + item.solicitante + '</td>' +
                '<td>' + item.tipo + '</td>' +
                '<td class="num">' + mock.formatarData(item.abertura) + '</td>' +
                '<td class="num">' + Hermes.selo(item.status, concluida ? 'tint-green' : 'tint-orange') + '</td>' +
                '</tr>';
        }).join('');

        elemento('lista-comunicados').innerHTML = dados.comunicadosRecentes.map(itemComunicado).join('');
        Hermes.renderizarIcones(elemento('lista-comunicados'));
    }

    /* =====================================================
       Turmas e vagas
       ===================================================== */

    function renderizarTurmas() {
        var filtro = elemento('filtro-turno');
        var corpo = elemento('tabela-turmas');

        function desenhar() {
            var visiveis = dados.turmasEscola.filter(function (turma) {
                return !filtro.value || turma.turno === filtro.value;
            });

            corpo.innerHTML = visiveis.length
                ? visiveis.map(function (turma) {
                    var lotada = turma.vagas <= 3;
                    return '<tr>' +
                        '<td class="strong">' + turma.turma + '</td>' +
                        '<td>' + turma.turno + '</td>' +
                        '<td class="num">' + turma.alunos + '</td>' +
                        '<td class="num">' + turma.vagas + '</td>' +
                        '<td>' + turma.regente + '</td>' +
                        '<td class="num">' + Hermes.selo(lotada ? 'Quase lotada' : 'Com vagas', lotada ? 'tint-orange' : 'tint-green') + '</td>' +
                        '</tr>';
                }).join('')
                : '<tr><td colspan="6"><p class="empty-state">Nenhuma turma para o turno selecionado.</p></td></tr>';
        }

        filtro.addEventListener('change', desenhar);
        desenhar();
    }

    /* =====================================================
       Comunicados
       ===================================================== */

    function renderizarComunicados() {
        var publicados = dados.comunicadosRecentes.slice();
        var formulario = elemento('form-comunicado');
        var lista = elemento('lista-comunicados');

        elemento('publicacao').value = mock.chaveISO(mock.hoje);

        function desenhar() {
            lista.innerHTML = publicados.map(itemComunicado).join('');
            Hermes.renderizarIcones(lista);
        }

        formulario.addEventListener('submit', function (evento) {
            evento.preventDefault();

            if (!Hermes.validarFormulario(formulario)) {
                Hermes.avisar('Preencha todos os campos do comunicado.', 'erro');
                return;
            }

            publicados.unshift({
                titulo: elemento('titulo').value.trim(),
                destino: elemento('destino').value,
                quando: 'Agora'
            });

            desenhar();
            formulario.reset();
            elemento('publicacao').value = mock.chaveISO(mock.hoje);
            Hermes.avisar('Comunicado publicado com sucesso.');
        });

        desenhar();
    }

    /* =====================================================
       Roteamento por tela
       ===================================================== */

    var TELAS = {
        dashboard: renderizarDashboard,
        turmas: renderizarTurmas,
        comunicados: renderizarComunicados
    };

    function iniciar() {
        var sessao = Hermes.lerSessao();
        if (!sessao || sessao.perfil !== 'funcionario') {
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
