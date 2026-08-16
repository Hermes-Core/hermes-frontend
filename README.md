# 🦉 Hermes — Vida Escolar em Tempo Real

![Badge em Desenvolvimento](http://img.shields.io/static/v1?label=STATUS&message=EM%20DESENVOLVIMENTO&color=GREEN&style=for-the-badge)
![Badge HTML](https://img.shields.io/static/v1?label=HTML&message=5&color=blue&style=for-the-badge&logo=html5)
![Badge CSS](https://img.shields.io/static/v1?label=CSS&message=3&color=blue&style=for-the-badge&logo=css3)
![Badge JavaScript](https://img.shields.io/static/v1?label=JAVASCRIPT&message=ES6&color=yellow&style=for-the-badge&logo=javascript)

<p align="center">
  <img src="img/logo.png" alt="Logo Hermes" width="150">
</p>

> **PAEDI — Painel de Acompanhamento Digital Escolar Integrado**
> Projeto Integrado III · Equipe Hermes · UFCA / Várzea Alegre

🔗 **Aplicação publicada:** [hermes-core.github.io/hermes-frontend](https://hermes-core.github.io/hermes-frontend/)

---

## 📑 Tabela de Conteúdos

* [1. Descrição do projeto](#1--descrição-do-projeto)
* [2. Possíveis usos da nossa solução](#2--possíveis-usos-da-nossa-solução)
* [3. Tecnologias utilizadas](#3--tecnologias-utilizadas)
* [4. Estrutura do projeto](#4--estrutura-do-projeto)
* [5. Instalação e execução](#5--instalação-e-execução)
* [6. Como utilizar a aplicação](#6--como-utilizar-a-aplicação)
* [7. Processo de desenvolvimento](#7--processo-de-desenvolvimento)
* [8. Equipe de desenvolvimento](#8--equipe-de-desenvolvimento)
* [9. Informações acadêmicas](#9--informações-acadêmicas)

---

## 1. 💻 Descrição do projeto

### Visão geral

O **Hermes** (**Painel de Acompanhamento Digital Escolar Integrado**) é uma plataforma web que centraliza a comunicação e o acompanhamento da vida escolar de estudantes da educação básica. A aplicação reúne, em um único ambiente organizado por perfil de acesso, a agenda de atividades, o desempenho acadêmico, a frequência, os comunicados da escola e o agendamento de atendimentos entre famílias e professores.

Esta entrega é composta por duas partes que vivem no mesmo repositório:

| Parte | Onde está | O que é |
| --- | --- | --- |
| **Site institucional** | raiz + `pages/` | Landing page e páginas de apresentação do projeto (Sobre, Equipe, Arquitetura, Funcionalidades) |
| **MVP do sistema** | `app/` | 15 telas navegáveis do produto, com três perfis de acesso e dados simulados |

### Objetivo do sistema

Oferecer um canal único, acessível de qualquer dispositivo com navegador, em que **responsáveis, professores e a secretaria escolar** compartilhem a mesma informação, no mesmo momento — substituindo a agenda de papel, o bilhete solto e o grupo de mensagens informal por um fluxo estruturado e rastreável.

### Problema que busca resolver

Em boa parte das escolas brasileiras, a comunicação com as famílias ainda depende de bilhetes na agenda, grupos de mensagens paralelos e reuniões presenciais em horário comercial. O resultado é conhecido:

* o recado **não chega** ou chega tarde demais;
* a prova é descoberta **na véspera**;
* a falta só aparece **no boletim**, quando já não há tempo de intervir;
* o responsável que trabalha o dia inteiro fica **sem visibilidade** da rotina do filho;
* o professor gasta tempo repetindo o mesmo aviso por vários canais diferentes.

O Hermes ataca esse ponto reunindo a informação em um lugar só e entregando a cada pessoa exatamente a fatia que lhe interessa.

### Público-alvo

* **Pais e responsáveis** — especialmente aqueles com jornada de trabalho que dificulta a ida à escola, que moram longe da instituição ou que dividem o acompanhamento entre mais de uma pessoa;
* **Professores** da educação básica, que precisam publicar atividades, lançar notas e faltas e comunicar-se com as turmas;
* **Equipes de secretaria e coordenação**, responsáveis por comunicados oficiais, controle de turmas e vagas e atendimento às famílias;
* **Instituições de ensino** públicas e privadas que queiram digitalizar a comunicação escolar sem exigir infraestrutura complexa.

### Principais funcionalidades implementadas

O MVP entrega **15 telas navegáveis**, organizadas em três perfis:

| Perfil | Telas |
| --- | --- |
| **Responsável** | Dashboard · Agenda Escolar · Desempenho Acadêmico · Notificações · Calendário Letivo · Agendamento de Atendimentos |
| **Professor** | Dashboard · Cadastrar Atividades · Lançar Notas · Enviar Avisos · Agendamentos Solicitados |
| **Funcionário (secretaria)** | Dashboard · Turmas e Vagas · Comunicados |

Todos os perfis compartilham a **tela de login** (`app/login.html`), com seleção de perfil.

Recursos interativos já funcionando:

* **Autenticação simulada** por perfil;
* **Menu lateral dinâmico**, montado em JavaScript conforme o perfil autenticado;
* **Calendário letivo navegável** entre meses, com marcação de provas, eventos, feriados e do dia atual, além do detalhamento do dia selecionado;
* **Filtros funcionais** na agenda escolar, nas notificações e no controle de turmas;
* **Formulários com validação** (campos obrigatórios, faixa de notas de 0 a 10) que atualizam as listas da própria tela ao serem enviados;
* **Fluxo completo de agendamento**: o responsável solicita, o professor confirma ou recusa e o atendimento migra entre as listas;
* **Feedback ao usuário** por meio de mensagens temporárias (*toasts*) em todas as ações;
* **Layout responsivo**, com menu lateral retrátil em telas menores e navegação em *hambúrguer* no site institucional;
* **Acessibilidade**: HTML semântico, atributos `aria-*`, `<caption>` em tabelas, foco visível e rótulos associados aos campos.

> ⚠️ **Escopo desta entrega:** o MVP **não possui back-end**. Todos os dados são simulados em [`app/js/mock-data.js`](app/js/mock-data.js), o que permite demonstrar integralmente os fluxos de navegação e interação da interface antes da construção do servidor.

---

## 2. 🌍 Possíveis usos da nossa solução

*(Componente Extensionista)*

Esta seção descreve, de forma breve e hipotética, como o Hermes poderia ajudar pessoas e negócios reais.

### Para uma família

**Cenário:** Dona Márcia trabalha em turno integral e só consegue olhar o celular no intervalo do almoço. Hoje, ela descobre as provas do filho quando ele lembra — geralmente na véspera.

Com o Hermes, ela abre o *Dashboard* no intervalo e vê as atividades pendentes da semana, a média geral e as próximas avaliações. Percebendo pelo painel de *Desempenho* que a média de Matemática caiu, ela solicita um atendimento pelo próprio sistema; o professor confirma data, horário e sala sem uma única troca de bilhetes. **Impacto:** acompanhamento contínuo em vez de pontual, e intervenção antes do boletim fechar.

### Para um professor

**Cenário:** o professor Rafael leciona para cinco turmas e precisa avisar sobre a remarcação de uma prova. Hoje ele depende de que cada aluno anote o recado e o repasse em casa.

Com o Hermes, ele publica o aviso uma única vez em *Enviar Avisos*, escolhendo se ele vale para uma turma, uma série ou toda a escola, e todos os responsáveis são notificados no mesmo instante. **Impacto:** menos retrabalho, registro rastreável do que foi comunicado e menos conflito do tipo "ninguém me avisou".

### Para uma escola de pequeno porte (negócio real)

**Cenário:** uma escola particular de bairro, com equipe administrativa enxuta, não tem orçamento para os sistemas de gestão escolar do mercado, que costumam cobrar por aluno.

Como o Hermes é uma aplicação web leve, sem instalação para o usuário final e com uma arquitetura simples de hospedar, ele se torna viável para instituições que hoje ficam de fora da digitalização. A secretaria publica o calendário de recuperação para toda a escola e acompanha, em um único painel, as solicitações abertas pelas famílias, além de controlar a lotação e as vagas das turmas. **Impacto:** redução de custo operacional e de papel, e um diferencial competitivo na captação de matrículas — transparência é argumento de venda.

### Para a rede pública e a gestão educacional

**Cenário:** uma secretaria municipal de educação precisa reduzir a evasão escolar, mas só identifica alunos em risco quando o problema já está consolidado.

Informação que chega no tempo certo permite intervenção precoce em dificuldades de aprendizagem e em faltas recorrentes — dois dos principais fatores associados à evasão. O registro de frequência e o acompanhamento de notas do Hermes tornam esses sinais visíveis para a família e para a escola enquanto ainda há tempo de agir. **Impacto:** apoio direto à permanência escolar e ampliação da participação de responsáveis que, por trabalho ou distância, teriam pouca chance de acompanhar de perto a vida escolar dos filhos.

### Outras aplicações possíveis

* **Cursos livres, escolas de idiomas e reforço escolar**, que precisam informar frequência e evolução a pais de alunos menores de idade;
* **Projetos sociais e ONGs educacionais**, para registrar presença e comunicar-se com as famílias atendidas;
* **Escolas em zona rural ou em regiões de difícil acesso**, em que a ida presencial à instituição custa caro em tempo e transporte.

---

## 3. 🛠️ Tecnologias utilizadas

### Stack desta entrega (front-end)

| Tecnologia | Uso no projeto | Por que foi escolhida |
| --- | --- | --- |
| **HTML5** | Estrutura de todas as páginas do site e das 15 telas do MVP | Marcação semântica (`<header>`, `<main>`, `<article>`, `<aside>`, `<table>` com `<caption>`) melhora acessibilidade e SEO sem custo adicional |
| **CSS3** | `css/style.css` (site) e `app/css/app.css` (sistema) | **Grid** e **Flexbox** resolvem layouts responsivos sem framework; **variáveis nativas (`--custom-properties`)** funcionam como um *design system* leve, centralizando cores, espaçamentos e tipografia |
| **JavaScript (ES5+, sem bibliotecas)** | Sessão, montagem de layout, calendário, filtros, validação e *toasts* | A disciplina tem foco em fundamentos da web; escrever sem framework obrigou a equipe a entender DOM, eventos e estado na mão. A sintaxe conservadora (`var`, IIFE) garante execução em qualquer navegador, inclusive sem *build* |

> **Decisão central:** o MVP foi construído **sem frameworks, sem *build step* e sem dependências externas**. Não há `npm install`, `package.json` ou *bundler*: basta um servidor de arquivos estáticos. Isso reduz drasticamente a barreira para qualquer integrante da equipe (ou avaliador) rodar o projeto e mantém o foco nos fundamentos exigidos pela disciplina.

### Ferramentas de desenvolvimento

| Ferramenta | Uso |
| --- | --- |
| **Git + GitHub** | Versionamento, *branches* por funcionalidade, *Pull Requests* e revisão entre pares na organização [Hermes-Core](https://github.com/Hermes-Core) |
| **GitHub Pages** | Publicação contínua do front-end a partir da branch `main` |
| **Figma** | Prototipação dos fluxos de usuário e da identidade visual antes da codificação |
| **VS Code** | Edição de código |

## 4. 📂 Estrutura do projeto

```
hermes-frontend/
├── index.html              # Site institucional (landing page)
├── README.md
├── pages/                  # Páginas institucionais
│   ├── sobre.html          #   Proposta e contexto do projeto
│   ├── equipe.html         #   Integrantes, com avatares puxados do GitHub
│   ├── arquitetura.html    #   Visão técnica: camadas, APIs e diagrama
│   └── funcionalidades.html#   Detalhamento dos módulos do produto
├── css/
│   ├── style.css           # Estilos do site institucional (~980 linhas)
│   └── icons.css           # Utilitários de ícone
├── js/
│   └── script.js           # Menu responsivo (hambúrguer) do site
├── img/                    # Identidade visual: logo, favicon, hero, diagrama
└── app/                    # ── MVP do sistema ──
    ├── login.html          # Tela de autenticação com seleção de perfil
    ├── css/
    │   └── app.css         # Design system do sistema: tokens, componentes, responsividade
    ├── js/
    │   ├── mock-data.js    # Dados simulados de todas as telas (datas relativas a hoje)
    │   ├── app.js          # Núcleo: ícones SVG, sessão, topbar, menu lateral, calendário,
    │   │                   #   toasts e validação de formulários
    │   ├── login.js        # Regras da tela de login
    │   ├── responsavel.js  # Renderização das telas do perfil Responsável
    │   ├── professor.js    # Renderização das telas do perfil Professor
    │   └── funcionario.js  # Renderização das telas do perfil Funcionário
    ├── responsavel/        # 6 telas: dashboard, agenda, desempenho,
    │                       #   notificacoes, calendario, agendamentos
    ├── professor/          # 5 telas: dashboard, atividades, notas, avisos, agendamentos
    └── funcionario/        # 3 telas: dashboard, turmas, comunicados
```

### Como as peças se conectam

* **Estrutura de página compartilhada:** cada tela do sistema declara **apenas o seu conteúdo**, dentro de `<div class="page">`, e informa o perfil e a tela ativa em `<body data-role="..." data-page="...">`. A barra superior e o menu lateral são montados em tempo de execução por `app.js`, o que elimina a duplicação de código de layout entre as 14 telas internas.
* **Um arquivo JavaScript por perfil:** `responsavel.js`, `professor.js` e `funcionario.js` funcionam como pequenos roteadores — leem `data-page` e executam somente o renderizador da tela ativa.
* **Componentes reutilizáveis:** cartões de indicadores, selos coloridos, listas, tabelas, calendário e mensagens de feedback são funções compartilhadas em `app.js`, usadas pelos três perfis.
* **Dados centralizados:** `mock-data.js` concentra todo o conteúdo simulado e **gera as datas a partir do dia atual**, mantendo a demonstração sempre "no presente", independentemente de quando for executada.
* **Isolamento entre site e sistema:** o site institucional e o `app/` têm CSS e JS próprios, sem acoplamento — o sistema pode ser extraído para outro repositório sem quebrar a landing page.

---

## 5. ⚙️ Instalação e execução

O projeto é **100% estático**: não há dependências para instalar, *build* para rodar nem banco de dados para configurar.

### Pré-requisitos

* Um navegador moderno (Chrome, Firefox, Edge ou Safari);
* **Git**, para clonar o repositório;
* Qualquer servidor de arquivos estáticos — os exemplos abaixo usam Python 3 ou Node.js, mas a extensão *Live Server* do VS Code também serve.

### Passo a passo

```bash
# 1. Clonar o repositório
git clone https://github.com/Hermes-Core/hermes-frontend.git
cd hermes-frontend

# 2. Subir um servidor local — escolha UMA das opções:
Utilize o plugin Live Server do VS Code ou abra a página index.html no navegador (protocolo file://)


### Acesso ao sistema

> 💡 É possível abrir os arquivos com duplo clique (protocolo `file://`), mas **recomenda-se o servidor local** para que a navegação entre as pastas funcione exatamente como em produção.

### Credenciais de demonstração

Na tela de login, selecione o perfil desejado e use:

| Perfil | Usuário | Senha |
| --- | --- | --- |
| Responsável | `responsavel` | `123456` |
| Professor | `professor` | `123456` |
| Funcionário | `funcionario` | `123456` |

> São credenciais fictícias, validadas no próprio navegador por `app/js/login.js`. Não há servidor de autenticação nesta versão — e, portanto, nenhum dado real trafega ou é armazenado.

---

## 6. 🧭 Como utilizar a aplicação

Depois de entrar com um dos perfis, o menu lateral já vem montado com as telas disponíveis para aquele usuário.

* **Responsável:** o *Dashboard* resume o dia — atividades pendentes, média geral, próximas provas e a agenda com horários e locais. Em *Agenda Escolar* é possível filtrar as tarefas por data, disciplina e situação, e marcar as lições de casa como concluídas. *Desempenho* traz o boletim por disciplina, com médias, situação e frequência. *Calendário Letivo* mostra provas, feriados e eventos do mês, com detalhamento ao clicar em um dia. Em *Agendamentos*, o responsável solicita uma conversa com um professor ou com a coordenação, escolhendo data e turno.
* **Professor:** cadastra tarefas e provas em *Cadastrar Atividades*; registra notas e faltas da turma em *Lançar Notas* (com validação da faixa de 0 a 10); dispara comunicados para uma turma, uma série ou toda a escola em *Enviar Avisos*; e confirma ou recusa as reuniões pedidas pelas famílias em *Agendamentos* — a solicitação migra automaticamente entre as listas.
* **Funcionário (secretaria):** acompanha as solicitações abertas pelas famílias, controla a lotação e as vagas das turmas e publica comunicados oficiais da escola.

Para trocar de perfil, use **Sair** no menu lateral e entre novamente com outro usuário.

---

## 7. 🔄 Processo de desenvolvimento

### Organização da equipe

A Sprint foi dividida em **duas frentes sequenciais**:

1. **Site institucional** — cada integrante ficou responsável por uma página completa (HTML + estilos específicos), trabalhando em paralelo;
2. **MVP do sistema** (`app/`) — construído sobre uma base comum de layout e componentes, com as telas distribuídas por perfil de usuário.

A divisão por página, e não por camada, permitiu que seis pessoas produzissem ao mesmo tempo sem depender umas das outras para começar.

| Frente | Responsável principal | Branch |
| --- | --- | --- |
| Landing page (`index.html`) e identidade visual | Airlon Filho / Felipe Neto | `feat-home` |
| Página *Sobre* | Lucas Costa | `sobre` |
| Página *Arquitetura* | Rubens Parente | `arquitetura` |
| Página *Funcionalidades* | Everton Lucas | `funcionalidades` |
| Página *Equipe e Contato* | Joenio Araújo | `Joenio/PaginaEquipeeContato` |
| Núcleo do MVP (`app/`) e design system | Airlon Filho | `main` |

### Uso do GitHub e estratégia de versionamento

* O código vive na organização **[Hermes-Core](https://github.com/Hermes-Core)**, com o repositório `hermes-frontend`;
* Adotamos um fluxo próximo ao **GitHub Flow**: `main` sempre publicável, e uma **branch por funcionalidade** (`sobre`, `arquitetura`, `funcionalidades`, `feat-home`, `Joenio/PaginaEquipeeContato`);
* Toda integração passou por **Pull Request**, com revisão de outro integrante antes do *merge* (ex.: PR #5 — *Sobre*, PR #6 — *Home*);
* As mensagens de commit seguem, na maior parte, o padrão **Conventional Commits** (`feat:`, `docs:`, `fix:`);
* A branch `main` está conectada ao **GitHub Pages**, então todo *merge* aprovado publica automaticamente a nova versão.

### Dificuldades encontradas e soluções adotadas

| Dificuldade | Solução adotada |
| --- | --- |
| **Conflitos recorrentes em `css/style.css`** — várias pessoas editando o mesmo arquivo ao mesmo tempo geraram uma sequência de commits de *"correção de conflitos"* | Padronizamos o CSS em torno de **variáveis nativas e classes utilitárias compartilhadas** (`.container`, `.section-heading`, `.hero`, `.feature-item`), de modo que cada página passasse a reutilizar blocos existentes em vez de criar estilos concorrentes |
| **Divergência visual entre as páginas**, já que cada integrante estilizou a sua | Definimos um cabeçalho, rodapé e sistema de navegação **idênticos em todas as páginas**, e uma paleta única em `:root`, unificados no commit de refatoração da navegação |
| **Duplicação de layout nas 14 telas internas** do sistema | A topbar e o menu lateral passaram a ser **montados por JavaScript** (`app.js`) a partir dos atributos `data-role` / `data-page` — cada tela declara só o seu conteúdo |
| **Ausência de back-end na Sprint**, o que impediria demonstrar os fluxos | Criamos a camada `mock-data.js`, isolada e com **datas relativas ao dia atual**, garantindo uma demo sempre atualizada e uma fronteira clara para a futura substituição por chamadas HTTP |
| **Navegação quebrada no mobile** | Implementamos o menu *hambúrguer* acessível em `js/script.js` (com `aria-expanded`, fechamento ao clicar fora e ao selecionar um link) e o menu lateral retrátil no sistema |
| **Dependências externas de ícones** deixariam o projeto refém de CDN | Montamos uma **biblioteca própria de ícones SVG** dentro de `app.js`, com renderização via `data-icon` |

### Próximos passos

1. Implementar a API REST em Spring Boot com persistência em PostgreSQL;
2. Substituir `mock-data.js` por chamadas HTTP autenticadas com JWT;
3. Migrar as telas do `app/` para componentes React, mantendo o design system já validado;
4. Evoluir o chat assíncrono entre professores e responsáveis, hoje previsto apenas no escopo do produto.

---

## 8. 👥 Equipe de desenvolvimento

| Integrante | Matrícula | GitHub |
| --- | --- | --- |
| Antonio Airlon da Silva Filho | 2025016882 | [@airlonfilho](https://github.com/airlonfilho) |
| Antonio Lucas da Costa Pereira | 2025019042 | [@lucascostavm](https://github.com/lucascostavm) |
| Everton Lucas Fernandes | 2025017020 | [@Everton-lf](https://github.com/Everton-lf) |
| Felipe Alves Bezerra Neto | 2025017048 | [@felipenneto](https://github.com/felipenneto) |
| Joenio Borges de Araújo | 2025017084 | [@Joenio97](https://github.com/Joenio97) |
| Rubens Paulo Rodrigues Parente | 2025017262 | [@rubenspaulo](https://github.com/rubenspaulo) |

---

## 9. 🏫 Informações acadêmicas

* **Instituição:** Universidade Federal do Cariri (UFCA)
* **Curso:** Tecnologia em Análise e Desenvolvimento de Sistemas (ADS)
* **Disciplina:** Desenvolvimento para Web
* **Professor Orientador:** Dr. Jayr Alencar Pereira

### 🔗 Links do projeto

* **Aplicação publicada:** [hermes-core.github.io/hermes-frontend](https://hermes-core.github.io/hermes-frontend/)
* **Repositório no GitHub:** [Hermes-Core/hermes-frontend](https://github.com/Hermes-Core/hermes-frontend)
* **Protótipo no Figma:** [Fluxos de Usuários](https://www.figma.com/design/AunQbW8QXLnwTBiPqwHEIS/Fluxos-Usuarios?node-id=0-1&t=9J2pzqjSfVfXchpi-1)

---

<p align="center">
  <small>Universidade Federal do Cariri • Centro de Educação a Distância • 2026</small>
</p>
