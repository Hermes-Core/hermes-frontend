/**
 * Hermes — Tela de login.
 *
 * A autenticação é simulada: as credenciais válidas estão em `mock-data.js`.
 * Ao entrar, o perfil escolhido é guardado na sessão do navegador e o usuário
 * é levado ao painel correspondente.
 */
(function () {
    'use strict';

    var formulario = document.getElementById('form-login');
    var opcoes = document.querySelectorAll('.role-option');
    var campoUsuario = document.getElementById('usuario');
    var campoSenha = document.getElementById('senha');
    var perfilSelecionado = 'responsavel';

    /* Seleção do perfil de acesso */
    opcoes.forEach(function (botao) {
        botao.addEventListener('click', function () {
            perfilSelecionado = botao.dataset.perfil;
            opcoes.forEach(function (outro) {
                outro.setAttribute('aria-pressed', String(outro === botao));
            });
        });
    });

    formulario.addEventListener('submit', function (evento) {
        evento.preventDefault();

        if (!Hermes.validarFormulario(formulario)) {
            return;
        }

        var esperado = HermesMock.usuarios[perfilSelecionado];
        var usuario = campoUsuario.value.trim().toLowerCase();
        var senha = campoSenha.value;

        if (usuario !== esperado.usuario || senha !== esperado.senha) {
            Hermes.avisar('Usuário ou senha inválidos para este perfil.', 'erro');
            campoSenha.value = '';
            campoSenha.focus();
            return;
        }

        Hermes.gravarSessao({
            perfil: perfilSelecionado,
            usuario: esperado.usuario,
            nome: esperado.nome
        });

        window.location.href = perfilSelecionado + '/' + Hermes.perfis[perfilSelecionado].inicial;
    });

    /* Links ainda não implementados nesta versão do MVP */
    document.querySelectorAll('[data-acao="indisponivel"]').forEach(function (link) {
        link.addEventListener('click', function (evento) {
            evento.preventDefault();
            Hermes.avisar('Funcionalidade prevista para a próxima entrega do projeto.');
        });
    });
}());
