# 🦉 Hermes: Vida Escolar em Tempo Real

![Badge em Desenvolvimento](http://img.shields.io/static/v1?label=STATUS&message=EM%20DESENVOLVIMENTO&color=GREEN&style=for-the-badge)
![Badge HTML](https://img.shields.io/static/v1?label=HTML&message=5&color=blue&style=for-the-badge&logo=html5)
![Badge CSS](https://img.shields.io/static/v1?label=CSS&message=3&color=blue&style=for-the-badge&logo=css3)
![Badge JavaScript](https://img.shields.io/static/v1?label=JAVASCRIPT&message=ES6&color=yellow&style=for-the-badge&logo=javascript)

> Projeto Integrado III - Equipe Hermes (UFCA/Várzea Alegre)

## 📑 Tabela de Conteúdos
* [Sobre o Projeto](#-sobre-o-projeto)
* [Arquitetura e Tecnologias](#%EF%B8%8F-arquitetura-e-tecnologias)

---

## 💻 Sobre o Projeto

O **Hermes** é uma solução multiplataforma (Web e Mobile) desenvolvida para resolver a **falha de comunicação entre escolas e pais/responsáveis**.

Atualmente, a dependência de métodos ultrapassados, como agendas físicas, gera um fluxo de informações tardio e inseguro. O Hermes atua como uma central de controle, permitindo o acompanhamento da vida escolar em tempo real, desde a frequência até o desempenho acadêmico.

---

## 🏗️ Arquitetura e Tecnologias

O sistema foi concebido sob a ótica da escalabilidade, segurança e alta disponibilidade, utilizando um modelo totalmente desacoplado entre o cliente e o servidor. A infraestrutura base é dividida nas seguintes camadas:

### 📱 Frontend
Desenvolvido como uma **Single Page Application (SPA)** utilizando **React** e **Vite**. É responsável pela interface, gerenciamento do estado local e renderização dinâmica para smartphones e computadores.
* **Hospedagem:** Vercel

### ⚙️ Backend
Construído em **Java** com o framework **Spring Boot**. Segue o padrão de controladores, serviços e repositórios, centralizando as regras de negócio, segurança (RBAC) e validação de dados. 
* **Hospedagem:** Railway

### 🗄️ Banco de Dados
Persistência relacional utilizando o **PostgreSQL Serverless**. Garante a integridade referencial e segurança total dos dados acadêmicos e registros dos estudantes.
* **Infraestrutura:** Neon

### 🔄 Integração e Comunicação
* **REST & JSON:** O Frontend e o Backend se comunicam exclusivamente via requisições HTTP RESTful, trafegando dados em JSON.
* **ORM:** A ponte entre a aplicação e a base de dados é feita de forma segura via **Spring Data JPA**.
* **JWT:** O tráfego de dados sensíveis exige autenticação com tokens para proteger a privacidade dos alunos e responsáveis.