# FC4 – Test-Driven Development (TDD)

🇧🇷 Português | 🌍 [English version](README_EN.md)

Este projeto demonstra a aplicação prática de **Test-Driven Development (TDD)** em um sistema backend desenvolvido em **TypeScript/Node.js**, com foco em **qualidade de código, domínio rico e alta testabilidade**.

O sistema simula um domínio de **reservas (booking)**, aplicando boas práticas de engenharia de software desde o domínio até a infraestrutura, sempre guiado por testes automatizados.

---

## 🎯 Objetivo

Demonstrar como construir software orientado a domínio utilizando **TDD como prática central**, garantindo regras de negócio bem definidas, código confiável e fácil de evoluir.

---

## 🧠 Conceitos Aplicados

- Test-Driven Development (TDD)
- Domain-Driven Design (DDD)
- SOLID
- Camadas bem definidas (Domain, Application, Infrastructure)
- Repositórios e mapeadores
- Value Objects
- Regras de cancelamento e reembolso

---

## 🧱 Estrutura do Projeto

- **Domain** – Entidades, value objects e regras de negócio
- **Application** – Serviços de aplicação e DTOs
- **Infrastructure** – Persistência, repositórios e controllers
- **Web** – Exposição via API HTTP
- **Tests** – Testes unitários, de integração e end-to-end

---

## ⚙️ Tecnologias Utilizadas

- TypeScript
- Node.js
- Jest
- TypeORM
- SQLite (ambiente de testes)

---

## ▶️ Como Executar

1. Clone o repositório:
```bash
git clone https://github.com/MariaEduardaSampaio/fc4-tdd.git
```

2. Instale as dependências:
```bash
npm install
```

3. Execute os testes:
```bash
npm test
```

---

## 🧪 Testes

O projeto possui ampla cobertura de testes:

- Testes unitários (domínio e aplicação)
- Testes de integração (repositórios)
- Testes end-to-end (controllers)

Os testes guiam o desenvolvimento e garantem a corretude das regras de negócio.

---

## 📚 Aprendizados

- Escrita de código guiada por testes
- Modelagem de domínio orientada a regras
- Criação de código altamente testável
- Separação clara de responsabilidades
- Evolução segura de funcionalidades

---

## 🎓 Contexto

Projeto desenvolvido com foco em prática avançada de **Test-Driven Development** e **Engenharia de Software**.
