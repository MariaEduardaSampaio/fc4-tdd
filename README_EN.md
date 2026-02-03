# FC4 – Test-Driven Development (TDD)

🌍 English | 🇧🇷 [Versão em Português](README.md)

This project demonstrates the practical application of **Test-Driven Development (TDD)** in a backend system built with **TypeScript/Node.js**, focusing on **code quality, rich domain modeling, and high testability**.

The system simulates a **booking domain**, applying software engineering best practices from the domain layer to the infrastructure, all driven by automated tests.

---

## 🎯 Goal

To demonstrate how to build domain-oriented software using **TDD as a core practice**, ensuring well-defined business rules, reliable code, and ease of evolution.

---

## 🧠 Applied Concepts

- Test-Driven Development (TDD)
- Domain-Driven Design (DDD)
- SOLID principles
- Layered architecture (Domain, Application, Infrastructure)
- Repositories and mappers
- Value Objects
- Cancellation and refund rules

---

## 🧱 Project Structure

- **Domain** – Entities, value objects, and business rules
- **Application** – Application services and DTOs
- **Infrastructure** – Persistence, repositories, and controllers
- **Web** – HTTP API exposure
- **Tests** – Unit, integration, and end-to-end tests

---

## ⚙️ Technologies Used

- TypeScript
- Node.js
- Jest
- TypeORM
- SQLite (test environment)

---

## ▶️ How to Run

1. Clone the repository:
```bash
git clone https://github.com/MariaEduardaSampaio/fc4-tdd.git
```

2. Install dependencies:
```bash
npm install
```

3. Run tests:
```bash
npm test
```

---

## 🧪 Tests

The project includes extensive test coverage:

- Unit tests (domain and application)
- Integration tests (repositories)
- End-to-end tests (controllers)

Tests drive the development process and ensure business rule correctness.

---

## 📚 What I Learned

- Writing code driven by tests
- Domain modeling focused on business rules
- Creating highly testable code
- Clear separation of responsibilities
- Safe evolution of features

---

## 🎓 Context

This project was developed for **advanced practice in Test-Driven Development and Software Engineering**.
