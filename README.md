# 🦉 Hermes: Vida Escolar em Tempo Real

![Badge em Desenvolvimento](http://img.shields.io/static/v1?label=STATUS&message=EM%20DESENVOLVIMENTO&color=GREEN&style=for-the-badge)
![Badge HTML](https://img.shields.io/static/v1?label=HTML&message=5&color=blue&style=for-the-badge&logo=html5)
![Badge CSS](https://img.shields.io/static/v1?label=CSS&message=3&color=blue&style=for-the-badge&logo=css3)
![Badge JavaScript](https://img.shields.io/static/v1?label=JAVASCRIPT&message=ES6&color=yellow&style=for-the-badge&logo=javascript)

> Projeto Integrado III - Equipe Hermes (UFCA/Várzea Alegre)

Visualize aqui: [Frontend Hermes](https://hermes-core.github.io/hermes-frontend/)

## 📑 Tabela de Conteúdos
* [Sobre o Projeto](#-sobre-o-projeto)
* [MVP Web — Sistema Hermes](#-mvp-web--sistema-hermes)
* [Como utilizar a aplicação](#-como-utilizar-a-aplicação)
* [Instalação e Execução](#-instalação-e-execução)
* [Arquitetura e Tecnologias](#-arquitetura-e-tecnologias)
* [Contribuições](#-contribuições)

---
## 🤝 Contribuições

Esta atualização incluiu a criação da página de funcionalidades em `pages/funcionalidades.html`, com seções para Agenda Escolar, Notificações, Frequência, Notas, Calendário, Atendimento e Gestão Escolar.

## 💻 Sobre o Projeto

O **Hermes** é uma solução multiplataforma (Web e Mobile) desenvolvida para resolver a **falha de comunicação entre escolas e pais/responsáveis**.

Atualmente, a dependência de métodos ultrapassados, como agendas físicas, gera um fluxo de informações tardio e inseguro. O Hermes atua como uma central de controle, permitindo o acompanhamento da vida escolar em tempo real, desde a frequência até o desempenho acadêmico.

---

## 🚀 MVP Web — Sistema Hermes

Além do site institucional (raiz do repositório), esta entrega inclui o **MVP funcional do sistema**, na pasta `app/`.
São **15 telas navegáveis**, organizadas em três perfis de acesso, construídas em **HTML, CSS e JavaScript puros (sem frameworks)**.

> Esta versão **não possui back-end**: os dados são simulados em `app/js/mock-data.js`, o que permite demonstrar todos os fluxos de navegação e interação da interface.

### Perfis e telas implementadas

| Perfil | Telas |
| --- | --- |
| **Responsável** | Dashboard, Agenda Escolar, Desempenho Acadêmico, Notificações, Calendário Letivo, Agendamento de Atendimentos |
| **Professor** | Dashboard, Cadastrar Atividades, Lançar Notas, Enviar Avisos, Agendamentos Solicitados |
| **Funcionário (secretaria)** | Dashboard, Turmas e Vagas, Comunicados |

Todas compartilham a **tela de login** (`app/login.html`), com seleção de perfil.

### Credenciais de demonstração

| Perfil | Usuário | Senha |
| --- | --- | --- |
| Responsável | `responsavel` | `123456` |
| Professor | `professor` | `123456` |
| Funcionário | `funcionario` | `123456` |

### Funcionalidades interativas do MVP

* **Autenticação simulada** por perfil, com sessão guardada em `sessionStorage` e proteção de rotas (uma tela de professor não abre em uma sessão de responsável);
* **Menu lateral dinâmico**, montado em JavaScript conforme o perfil autenticado;
* **Calendário letivo navegável** entre meses, com marcação de provas, eventos, feriados e do dia atual, e detalhamento do dia selecionado;
* **Filtros funcionais** na agenda escolar, nas notificações e no controle de turmas;
* **Formulários com validação** (campos obrigatórios, faixa de notas de 0 a 10) que atualizam as listas da própria tela ao serem enviados;
* **Fluxo completo de agendamento**: o responsável solicita, o professor confirma ou recusa e o atendimento migra entre as listas;
* **Feedback ao usuário** por meio de mensagens temporárias (toasts) em todas as ações;
* **Layout responsivo**, com menu lateral retrátil em telas menores.

---

## 🧭 Como utilizar a aplicação

*(Seção do Componente Extensionista)*

### Qual problema a aplicação resolve

Em boa parte das escolas brasileiras, a comunicação com as famílias ainda depende de bilhetes na agenda de papel, grupos de mensagens informais e reuniões presenciais em horário comercial. O resultado é conhecido: o recado não chega, a prova é descoberta no dia anterior, a falta só aparece no boletim e o responsável que trabalha o dia inteiro fica sem saber como está o filho. O Hermes centraliza essas informações em um único lugar, organizadas por perfil, para que cada pessoa veja exatamente o que precisa.

### Como acessar

A aplicação é totalmente web e não exige instalação: basta abrir o site do projeto e clicar em **"Acessar o sistema"**, no topo da página, ou acessar diretamente `app/login.html`. Na tela de login, escolha o perfil (Responsável, Professor ou Funcionário), informe usuário e senha e entre no sistema. Por ser uma versão de demonstração, use as credenciais listadas acima.

### Como usar as principais funcionalidades

* **Responsável:** o *Dashboard* resume o dia — atividades pendentes, média geral, próximas provas e a agenda com horários e locais. Em *Agenda Escolar* é possível filtrar as tarefas por data, disciplina e situação, e marcar as lições de casa como concluídas. *Desempenho* traz o boletim por disciplina, com médias, situação e frequência. *Calendário Letivo* mostra provas, feriados e eventos do mês. Em *Agendamentos*, o responsável solicita uma conversa com um professor ou com a coordenação escolhendo data e turno.
* **Professor:** cadastra tarefas e provas em *Cadastrar Atividades*, registra notas e faltas da turma em *Lançar Notas*, dispara comunicados para uma turma, uma série ou toda a escola em *Enviar Avisos* e confirma ou recusa as reuniões pedidas pelas famílias em *Agendamentos*.
* **Funcionário (secretaria):** acompanha solicitações abertas pelas famílias, controla a lotação e as vagas das turmas e publica comunicados oficiais da escola.

### Quem pode se beneficiar

Escolas públicas e privadas de educação básica, professores, equipes de secretaria e coordenação e, principalmente, pais e responsáveis com rotinas de trabalho que dificultam a ida à escola. A solução também é útil para famílias que moram longe da instituição ou que dividem a responsabilidade pelo acompanhamento escolar entre mais de uma pessoa.

### Exemplos de uso em cenários reais

1. Um professor remarca uma prova e envia o aviso pelo sistema; no mesmo instante, os responsáveis da turma recebem a notificação e conseguem reorganizar os estudos da semana.
2. Uma mãe percebe, pelo painel de desempenho, que a média em Matemática caiu, solicita um atendimento pelo próprio sistema e o professor confirma data, horário e sala sem uma única troca de bilhetes.
3. A secretaria publica o calendário de recuperação para toda a escola e passa a acompanhar, em um único painel, as solicitações de documentos abertas pelas famílias.

### Impacto esperado

Ao encurtar a distância entre escola e família, o Hermes transforma o acompanhamento escolar em algo contínuo, e não pontual. Informação que chega no tempo certo permite intervenção precoce em dificuldades de aprendizagem e em faltas recorrentes — dois dos principais fatores associados à evasão escolar. Além disso, reduz o uso de papel, dá transparência ao trabalho docente e amplia a participação de responsáveis que, por questões de trabalho ou distância, teriam pouca chance de acompanhar de perto a vida escolar dos filhos.

---

## ⚙️ Instalação e Execução

O projeto é estático (HTML, CSS e JavaScript), sem dependências, build ou banco de dados.

```bash
# 1. Clonar o repositório
git clone https://github.com/Hermes-Core/hermes-frontend.git
cd hermes-frontend

# 2. Subir um servidor local (qualquer um serve)
python3 -m http.server 8000
```

Depois, abra `http://localhost:8000` no navegador para o site institucional, ou `http://localhost:8000/app/login.html` para entrar direto no sistema.

> É possível abrir os arquivos com duplo clique (`file://`), mas recomenda-se o servidor local para que a navegação entre as pastas funcione exatamente como em produção.

### Estrutura do projeto

```
hermes-frontend/
├── index.html              # Site institucional (landing page)
├── pages/                  # Páginas institucionais (sobre, equipe, arquitetura, funcionalidades)
├── css/                    # Estilos do site institucional
├── js/                     # Scripts do site institucional
├── img/                    # Imagens e identidade visual
└── app/                    # MVP do sistema
    ├── login.html          # Tela de autenticação (seleção de perfil)
    ├── css/app.css         # Design system do sistema (tokens, componentes, responsividade)
    ├── js/
    │   ├── mock-data.js    # Dados simulados de todas as telas
    │   ├── app.js          # Núcleo: ícones, sessão, menu lateral, calendário, toasts, validação
    │   ├── login.js        # Regras da tela de login
    │   ├── responsavel.js  # Renderização das telas do perfil Responsável
    │   ├── professor.js    # Renderização das telas do perfil Professor
    │   └── funcionario.js  # Renderização das telas do perfil Funcionário
    ├── responsavel/        # 6 telas do responsável
    ├── professor/          # 5 telas do professor
    └── funcionario/        # 3 telas da secretaria
```

### Principais decisões técnicas

* **Sem frameworks:** a disciplina tem foco em fundamentos da web, então todo o sistema usa HTML semântico, CSS moderno (Grid, Flexbox e variáveis nativas) e JavaScript ES5+ sem bibliotecas externas.
* **Estrutura de página compartilhada:** cada tela declara apenas o seu conteúdo dentro de `<div class="page">` e informa o perfil e a tela ativa em `<body data-role="..." data-page="...">`. A barra superior e o menu lateral são montados por `app.js`, o que elimina a duplicação de código de layout entre as 14 telas internas.
* **Um arquivo JavaScript por perfil:** `responsavel.js`, `professor.js` e `funcionario.js` funcionam como pequenos roteadores, executando apenas o renderizador da tela ativa.
* **Componentes reutilizáveis:** cartões de indicadores, selos coloridos, listas, tabelas, calendário e mensagens de feedback são funções compartilhadas em `app.js`, usadas pelos três perfis.
* **Dados centralizados em um único mock:** `mock-data.js` concentra todo o conteúdo simulado e gera as datas a partir do dia atual, mantendo a demonstração sempre atualizada. Quando o back-end existir, basta trocar essa camada por chamadas HTTP.
* **Acessibilidade e validação:** uso de `aria-*`, `<caption>` em tabelas, foco visível, rótulos associados aos campos e validação de entradas antes do envio dos formulários.

---
# PAEDI - Painel de Acompanhamento Digital Escolar Integrado (Plataforma Hermes)

<p align="center">
  <img src="img/logo.png" alt="Logo Hermes" width="150">
</p>

O **PAEDI** é um sistema digital projetado para mitigar os desafios de comunicação, monitoramento e engajamento na rotina escolar de estudantes brasileiros. Através da plataforma **Hermes**, o software atua como um elo em tempo real entre instituições de ensino, professores, alunos e pais/responsáveis que possuem rotinas exigentes e precisam superar barreiras físicas e de tempo para acompanhar a vida escolar dos filhos de forma transparente e consolidada.

A aplicação web conta com recursos focados em:
* 📊 Acompanhamento de rendimento por meio de notas e gráficos de desempenho.
* 📝 Registro de frequência escolar e controle diário de presença.
* 📢 Canal de avisos urgentes, comunicados da coordenação e cronogramas gerais.
* 💬 Sistema de mensagens assíncronas (chat) direto entre professores e responsáveis.

---

## 🛠️ Tecnologias Utilizadas

O front-end institucional e os painéis de visualização foram desenvolvidos com foco em acessibilidade, semântica e responsividade, utilizando:
* **HTML5** (Estruturação semântica de layouts)
* **CSS3** (Estilização moderna via Flexbox, CSS Grid e variáveis nativas)
* **JavaScript** (Comportamento dinâmico e interações de interface)

---

## 👥 Equipe de Desenvolvimento

* **Antonio Airlon da Silva Filho** (Matrícula: 2025016882)
* **Antonio Lucas da Costa Pereira** (Matrícula: 2025019042)
* **Everton Lucas Fernandes** (Matrícula: 2025017020)
* **Felipe Alves Bezerra Neto** (Matrícula: 2025017048)
* **Joenio Borges de Araújo** (Matrícula: 2025017084)
* **Rubens Paulo Rodrigues Parente** (Matrícula: 2025017262)

---

## 🔗 Links do Projeto

* **Repositório no GitHub:** [Acesse o código-fonte aqui](https://github.com/Hermes-Core/hermes-frontend.git)
* **Protótipo no Figma:** [Acesse o design completo no Figma](https://www.figma.com/design/AunQbW8QXLnwTBiPqwHEIS/Fluxos-Usuarios?node-id=0-1&t=9J2pzqjSfVfXchpi-1)

---

## 🏫 Informações Acadêmicas

* **Instituição:** Universidade Federal do Cariri (UFCA)
* **Curso:** Tecnologia em Análise e Desenvolvimento de Sistemas (ADS)
* **Disciplina:** Desenvolvimento para Web
* **Professor Orientador:** Dr. Jayr Alencar Pereira

---

<p align="center">
  <small>Universidade Federal do Cariri • Centro de Educação a Distância • 2026</small>
</p>
