/**
 * Hermes — Núcleo do sistema (MVP sem back-end).
 *
 * Responsabilidades deste arquivo:
 *  1. Biblioteca de ícones SVG reutilizáveis;
 *  2. Sessão simulada (login/logout) via sessionStorage;
 *  3. Montagem da estrutura comum das telas (topbar + menu lateral);
 *  4. Componentes compartilhados: calendário, avisos (toast) e validação de formulários.
 *
 * Cada página do sistema declara apenas o seu conteúdo dentro de `.page`
 * e informa o perfil/tela ativa em `<body data-role="..." data-page="...">`.
 */
(function (global) {
    'use strict';

    /* =====================================================
       1. Ícones
       ===================================================== */

    var ICONES = {
        grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
        calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18"/>',
        calendarDays: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18M8 15h.01M12 15h.01M16 15h.01M8 18h.01M12 18h.01"/>',
        trending: '<path d="m4 16 5-5 4 3 7-8"/><path d="M15 6h5v5"/><path d="M4 20h16"/>',
        bell: '<path d="M18 8a6 6 0 1 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/>',
        users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
        userCheck: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="m16 11 2 2 4-4"/>',
        clipboard: '<rect x="8" y="3" width="8" height="4" rx="1"/><path d="M16 5h2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2"/><path d="M9 12h6M9 16h4"/>',
        graduation: '<path d="M12 4 2 9l10 5 10-5-10-5Z"/><path d="M6 11.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-4.5"/>',
        message: '<path d="M21 11.5a8.4 8.4 0 0 1-9 8.5 9 9 0 0 1-4-.9L3 21l1.4-3.9A8.4 8.4 0 0 1 3 11.5 8.4 8.4 0 0 1 12 3a8.4 8.4 0 0 1 9 8.5Z"/>',
        alert: '<circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16h.01"/>',
        book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/>',
        clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
        checkCircle: '<circle cx="12" cy="12" r="9"/><path d="m8.5 12.5 2.5 2.5 4.5-5"/>',
        check: '<path d="m5 12.5 4.5 4.5L19 7"/>',
        pin: '<path d="M20 10c0 5-8 12-8 12s-8-7-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
        filter: '<path d="M3 5h18l-7 8v6l-4 2v-8L3 5Z"/>',
        plus: '<path d="M12 5v14M5 12h14"/>',
        send: '<path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4 20-7Z"/>',
        logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/>',
        login: '<path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><path d="m10 17 5-5-5-5"/><path d="M15 12H3"/>',
        close: '<path d="M18 6 6 18M6 6l12 12"/>',
        menu: '<path d="M3 6h18M3 12h18M3 18h18"/>',
        user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
        lock: '<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
        save: '<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2Z"/><path d="M17 21v-8H7v8M7 3v5h8"/>',
        upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 9 5-5 5 5"/><path d="M12 4v12"/>',
        party: '<path d="m4 21 5-13 8 8-13 5Z"/><path d="M15 5V3M19 9h2M17.5 4.5 19 3"/>',
        arrowLeft: '<path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>',
        arrowRight: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
        chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
        file: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z"/><path d="M14 3v5h5"/>'
    };

    /** Devolve a marcação SVG de um ícone da biblioteca. */
    function icone(nome, tamanho) {
        var conteudo = ICONES[nome];
        if (!conteudo) {
            return '';
        }
        var s = tamanho || 20;
        return '<svg class="icon" width="' + s + '" height="' + s + '" viewBox="0 0 24 24" aria-hidden="true">' + conteudo + '</svg>';
    }

    /** Preenche todos os elementos marcados com data-icon="nome". */
    function renderizarIcones(raiz) {
        var escopo = raiz || document;
        var alvos = escopo.querySelectorAll('[data-icon]');
        Array.prototype.forEach.call(alvos, function (el) {
            if (el.dataset.iconDone === '1') {
                return;
            }
            el.innerHTML = icone(el.dataset.icon, Number(el.dataset.iconSize) || 20);
            el.classList.add('icon');
            el.dataset.iconDone = '1';
        });
    }

    /* =====================================================
       2. Sessão simulada
       ===================================================== */

    var CHAVE_SESSAO = 'hermes.sessao';

    var PERFIS = {
        responsavel: { rotulo: 'Responsável', inicial: 'dashboard.html' },
        professor: { rotulo: 'Professor', inicial: 'dashboard.html' },
        funcionario: { rotulo: 'Funcionário', inicial: 'dashboard.html' }
    };

    function lerSessao() {
        try {
            return JSON.parse(sessionStorage.getItem(CHAVE_SESSAO));
        } catch (erro) {
            return null;
        }
    }

    function gravarSessao(sessao) {
        sessionStorage.setItem(CHAVE_SESSAO, JSON.stringify(sessao));
    }

    function encerrarSessao() {
        sessionStorage.removeItem(CHAVE_SESSAO);
    }

    /* =====================================================
       3. Menu de cada perfil
       ===================================================== */

    var MENUS = {
        responsavel: [
            { id: 'dashboard', rotulo: 'Dashboard', href: 'dashboard.html', icone: 'grid' },
            { id: 'agenda', rotulo: 'Agenda Escolar', href: 'agenda.html', icone: 'calendar' },
            { id: 'desempenho', rotulo: 'Desempenho', href: 'desempenho.html', icone: 'trending' },
            { id: 'notificacoes', rotulo: 'Notificações', href: 'notificacoes.html', icone: 'bell' },
            { id: 'calendario', rotulo: 'Calendário Letivo', href: 'calendario.html', icone: 'calendarDays' },
            { id: 'agendamentos', rotulo: 'Agendamentos', href: 'agendamentos.html', icone: 'userCheck' }
        ],
        professor: [
            { id: 'dashboard', rotulo: 'Dashboard', href: 'dashboard.html', icone: 'grid' },
            { id: 'atividades', rotulo: 'Cadastrar Atividades', href: 'atividades.html', icone: 'clipboard' },
            { id: 'notas', rotulo: 'Lançar Notas', href: 'notas.html', icone: 'graduation' },
            { id: 'avisos', rotulo: 'Enviar Avisos', href: 'avisos.html', icone: 'message' },
            { id: 'agendamentos', rotulo: 'Agendamentos', href: 'agendamentos.html', icone: 'userCheck' }
        ],
        funcionario: [
            { id: 'dashboard', rotulo: 'Dashboard', href: 'dashboard.html', icone: 'grid' },
            { id: 'turmas', rotulo: 'Turmas e Vagas', href: 'turmas.html', icone: 'users' },
            { id: 'comunicados', rotulo: 'Comunicados', href: 'comunicados.html', icone: 'message' }
        ]
    };

    /* =====================================================
       4. Montagem da estrutura comum
       ===================================================== */

    function iniciais(nome) {
        var partes = String(nome || 'Usuário').trim().split(/\s+/);
        var texto = partes[0].charAt(0) + (partes.length > 1 ? partes[partes.length - 1].charAt(0) : '');
        return texto.toUpperCase();
    }

    function montarTopbar(sessao, perfil) {
        var alvoSino = perfil === 'responsavel'
            ? '<a class="icon-btn bell" href="notificacoes.html" aria-label="Notificações">' + icone('bell', 21) + '<span class="dot"></span></a>'
            : '<button type="button" class="icon-btn bell" data-acao="avisar-notificacoes" aria-label="Notificações">' + icone('bell', 21) + '<span class="dot"></span></button>';

        return '' +
            '<div class="topbar-left">' +
            '  <button type="button" class="icon-btn" id="alternar-menu" aria-controls="menu-lateral" aria-expanded="true" aria-label="Mostrar ou ocultar o menu">' + icone('close', 22) + '</button>' +
            '  <a class="brand" href="dashboard.html" aria-label="Ir para o início"><img src="../../img/logo.png" alt="Hermes"></a>' +
            '</div>' +
            '<div class="topbar-right">' +
            alvoSino +
            '  <div class="topbar-user">' +
            '    <span class="user-meta"><strong>' + sessao.nome + '</strong><span>' + PERFIS[perfil].rotulo + '</span></span>' +
            '    <span class="avatar" aria-hidden="true">' + iniciais(sessao.nome) + '</span>' +
            '  </div>' +
            '  <button type="button" class="icon-btn" id="botao-sair" aria-label="Sair do sistema">' + icone('logout', 21) + '</button>' +
            '</div>';
    }

    function montarMenu(perfil, paginaAtiva) {
        var itens = MENUS[perfil].map(function (item) {
            var ativo = item.id === paginaAtiva ? ' class="active" aria-current="page"' : '';
            return '<a href="' + item.href + '"' + ativo + '>' + icone(item.icone, 20) + '<span>' + item.rotulo + '</span></a>';
        }).join('');

        return '<p class="sidebar-title">Menu principal</p><nav aria-label="Menu do sistema">' + itens + '</nav>';
    }

    function montarEstrutura(sessao) {
        var perfil = document.body.dataset.role;
        var pagina = document.body.dataset.page;
        var conteudoPagina = document.querySelector('.page');

        var topbar = document.createElement('header');
        topbar.className = 'topbar';
        topbar.innerHTML = montarTopbar(sessao, perfil);

        var shell = document.createElement('div');
        shell.className = 'shell';

        var sidebar = document.createElement('aside');
        sidebar.className = 'sidebar';
        sidebar.id = 'menu-lateral';
        sidebar.innerHTML = montarMenu(perfil, pagina);

        var principal = document.createElement('main');
        principal.className = 'content';

        var fundo = document.createElement('div');
        fundo.className = 'sidebar-backdrop';

        shell.appendChild(sidebar);
        shell.appendChild(principal);
        document.body.insertBefore(shell, document.body.firstChild);
        document.body.insertBefore(topbar, shell);
        document.body.appendChild(fundo);

        if (conteudoPagina) {
            principal.appendChild(conteudoPagina);
        }

        ligarAcoesDaEstrutura(sidebar, fundo);
    }

    function ligarAcoesDaEstrutura(sidebar, fundo) {
        var alternar = document.getElementById('alternar-menu');
        var sair = document.getElementById('botao-sair');

        function menuEstreito() {
            return global.matchMedia('(max-width: 900px)').matches;
        }

        function alternarMenu() {
            if (menuEstreito()) {
                var aberto = sidebar.classList.toggle('open');
                fundo.classList.toggle('visible', aberto);
                alternar.setAttribute('aria-expanded', String(aberto));
            } else {
                var oculto = document.body.classList.toggle('sidebar-collapsed');
                alternar.setAttribute('aria-expanded', String(!oculto));
            }
        }

        if (alternar) {
            alternar.addEventListener('click', alternarMenu);
        }

        fundo.addEventListener('click', function () {
            sidebar.classList.remove('open');
            fundo.classList.remove('visible');
            if (alternar) {
                alternar.setAttribute('aria-expanded', 'false');
            }
        });

        if (sair) {
            sair.addEventListener('click', function () {
                encerrarSessao();
                global.location.href = '../login.html';
            });
        }

        var sino = document.querySelector('[data-acao="avisar-notificacoes"]');
        if (sino) {
            sino.addEventListener('click', function () {
                avisar('Você não possui novas notificações no momento.');
            });
        }
    }

    /* =====================================================
       5. Avisos (toast)
       ===================================================== */

    function areaDeAvisos() {
        var area = document.querySelector('.toast-area');
        if (!area) {
            area = document.createElement('div');
            area.className = 'toast-area';
            area.setAttribute('role', 'status');
            area.setAttribute('aria-live', 'polite');
            document.body.appendChild(area);
        }
        return area;
    }

    /** Exibe uma mensagem temporária no canto da tela. */
    function avisar(mensagem, tipo) {
        var area = areaDeAvisos();
        var toast = document.createElement('div');
        toast.className = 'toast' + (tipo === 'erro' ? ' error' : '');
        toast.innerHTML = icone(tipo === 'erro' ? 'alert' : 'checkCircle', 20) + '<span>' + mensagem + '</span>';
        area.appendChild(toast);

        global.setTimeout(function () {
            toast.remove();
        }, 4200);
    }

    /* =====================================================
       5.1 Componentes de conteúdo reutilizáveis
       ===================================================== */

    /** Monta a faixa de cartões de indicadores usada nos dashboards. */
    function renderizarIndicadores(elemento, lista) {
        if (!elemento) {
            return;
        }
        elemento.innerHTML = lista.map(function (item) {
            var tendencia = item.tendencia
                ? '<span class="stat-trend">↑ ' + item.tendencia + '</span>'
                : '';
            return '<article class="stat-card">' + tendencia +
                '<span class="stat-icon ' + item.tinta + '">' + icone(item.icone, 22) + '</span>' +
                '<p class="stat-value">' + item.valor + '</p>' +
                '<p class="stat-label">' + item.rotulo + '</p>' +
                '</article>';
        }).join('');
    }

    /** Selo colorido (tipo de atividade, situação, prioridade...). */
    function selo(texto, tinta) {
        return '<span class="badge ' + (tinta || 'tint-blue') + '">' + texto + '</span>';
    }

    /* =====================================================
       6. Validação simples de formulários
       ===================================================== */

    function mostrarErro(campo, mensagem) {
        campo.classList.add('invalid');
        var alvo = campo.parentElement.querySelector('.field-error')
            || (campo.closest('.field') && campo.closest('.field').querySelector('.field-error'));
        if (alvo) {
            alvo.textContent = mensagem;
            alvo.classList.add('visible');
        }
    }

    function limparErro(campo) {
        campo.classList.remove('invalid');
        var alvo = campo.parentElement.querySelector('.field-error')
            || (campo.closest('.field') && campo.closest('.field').querySelector('.field-error'));
        if (alvo) {
            alvo.classList.remove('visible');
        }
    }

    /**
     * Valida os campos com atributo `required` de um formulário.
     * Retorna true quando todos estão preenchidos.
     */
    function validarFormulario(formulario) {
        var campos = formulario.querySelectorAll('[required]');
        var valido = true;

        Array.prototype.forEach.call(campos, function (campo) {
            var valor = String(campo.value || '').trim();
            if (!valor) {
                mostrarErro(campo, 'Preencha este campo para continuar.');
                valido = false;
                return;
            }
            if (campo.type === 'number') {
                var numero = Number(valor.replace(',', '.'));
                var min = campo.min === '' ? -Infinity : Number(campo.min);
                var max = campo.max === '' ? Infinity : Number(campo.max);
                if (isNaN(numero) || numero < min || numero > max) {
                    mostrarErro(campo, 'Informe um valor entre ' + campo.min + ' e ' + campo.max + '.');
                    valido = false;
                    return;
                }
            }
            limparErro(campo);
        });

        if (!valido) {
            var primeiro = formulario.querySelector('.invalid');
            if (primeiro) {
                primeiro.focus();
            }
        }
        return valido;
    }

    /** Limpa a marcação de erro assim que o usuário corrige o campo. */
    function observarCorrecoes(formulario) {
        formulario.addEventListener('input', function (evento) {
            if (evento.target.classList.contains('invalid')) {
                limparErro(evento.target);
            }
        });
    }

    /* =====================================================
       7. Calendário reutilizável
       ===================================================== */

    /**
     * Cria um calendário mensal navegável.
     * config: { grade, titulo, anterior, proximo, aoSelecionar }
     */
    function criarCalendario(config) {
        var mock = global.HermesMock;
        var referencia = new Date(mock.hoje.getFullYear(), mock.hoje.getMonth(), 1);
        var selecionado = mock.chaveISO(mock.hoje);

        function eventosDe(chave) {
            return mock.eventosCalendario[chave] || [];
        }

        function desenhar() {
            var ano = referencia.getFullYear();
            var mes = referencia.getMonth();
            var primeiroDia = new Date(ano, mes, 1).getDay();
            var totalDias = new Date(ano, mes + 1, 0).getDate();
            var chaveHoje = mock.chaveISO(mock.hoje);
            var html = '';

            mock.diasSemana.forEach(function (dia, indice) {
                html += '<div class="weekday" aria-hidden="true" data-indice="' + indice + '">' + dia + '</div>';
            });

            for (var vazio = 0; vazio < primeiroDia; vazio++) {
                html += '<span class="day empty"></span>';
            }

            for (var dia = 1; dia <= totalDias; dia++) {
                var chave = mock.chaveISO(new Date(ano, mes, dia));
                var lista = eventosDe(chave);
                var classes = ['day'];

                if (lista.length) {
                    classes.push(lista[0].tipo);
                }
                if (chave === chaveHoje) {
                    classes.push('today');
                }
                if (chave === selecionado) {
                    classes.push('selected');
                }

                var descricao = lista.length ? lista[0].titulo : 'sem eventos';
                html += '<button type="button" class="' + classes.join(' ') + '" data-data="' + chave + '"' +
                    ' aria-label="Dia ' + dia + ' — ' + descricao + '">' + dia + '</button>';
            }

            config.grade.innerHTML = html;

            if (config.titulo) {
                config.titulo.textContent = mock.meses[mes] + ' ' + ano;
            }
            if (config.aoSelecionar) {
                config.aoSelecionar(selecionado, eventosDe(selecionado));
            }
        }

        config.grade.addEventListener('click', function (evento) {
            var botao = evento.target.closest('.day[data-data]');
            if (!botao) {
                return;
            }
            selecionado = botao.dataset.data;
            desenhar();
        });

        function mover(passo) {
            referencia = new Date(referencia.getFullYear(), referencia.getMonth() + passo, 1);
            desenhar();
        }

        if (config.anterior) {
            config.anterior.addEventListener('click', function () { mover(-1); });
        }
        if (config.proximo) {
            config.proximo.addEventListener('click', function () { mover(1); });
        }

        desenhar();
        return { mover: mover };
    }

    /* =====================================================
       8. Inicialização
       ===================================================== */

    function iniciar() {
        var perfil = document.body.dataset.role;

        if (perfil) {
            var sessao = lerSessao();

            if (!sessao || !PERFIS[sessao.perfil]) {
                global.location.replace('../login.html');
                return;
            }
            if (sessao.perfil !== perfil) {
                global.location.replace('../' + sessao.perfil + '/' + PERFIS[sessao.perfil].inicial);
                return;
            }
            montarEstrutura(sessao);
        }

        renderizarIcones();

        document.querySelectorAll('form[data-validar]').forEach(function (formulario) {
            observarCorrecoes(formulario);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', iniciar);
    } else {
        iniciar();
    }

    /* Interface pública usada pelas páginas */
    global.Hermes = {
        icone: icone,
        renderizarIcones: renderizarIcones,
        perfis: PERFIS,
        lerSessao: lerSessao,
        gravarSessao: gravarSessao,
        encerrarSessao: encerrarSessao,
        avisar: avisar,
        renderizarIndicadores: renderizarIndicadores,
        selo: selo,
        validarFormulario: validarFormulario,
        observarCorrecoes: observarCorrecoes,
        criarCalendario: criarCalendario
    };
})(window);
