# Portfolio

Projeto de portfólio pessoal composto por um backend em Node.js (Express + Sequelize) e um frontend estático em HTML/CSS. Este repositório contém a API (pasta `backend/`) e os arquivos públicos do front (pasta `frontend/`).

## Estrutura

- `backend/` — API Node.js usando Express e Sequelize (Postgres).
- `frontend/` — páginas estáticas (HTML, CSS) para o dashboard e formulários.

## Tecnologias

- Backend: Node.js, Express, Sequelize, PostgreSQL, JWT, bcrypt
- Frontend: HTML, CSS, (fetch API para comunicação com backend)

## Pré-requisitos

- Node.js (v16+ recomendado)
- npm
- PostgreSQL (ou uma instância compatível)

## Configuração do banco de dados

1. Crie um banco de dados PostgreSQL para desenvolvimento.
2. Configure as credenciais de conexão no arquivo `backend/src/config/database.cjs` ou usando variáveis de ambiente conforme sua configuração (usuário, senha, host, database, port).

Observação: este projeto usa Sequelize; as migrations e seeders estão em `backend/database/migrations` e `backend/database/seeders`.

### Executar migrations e seeders

No diretório `backend/` execute:

```powershell
npm install
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

## Rodar a aplicação

1. Abra um terminal e vá para a pasta do backend:

```powershell
cd backend
npm install
npm run dev   # ou `npm start` para execução sem nodemon
```

2. O frontend é composto por arquivos estáticos em `frontend/`. Para desenvolvimento simples, abra `frontend/index.html` no navegador ou sirva os arquivos com um servidor estático (ex.: `live-server`, `http-server` ou com a sua IDE).

## Endpoints principais

Os controllers e rotas estão em `backend/modules/`.

- `POST /login` — autenticação (retorna JWT)
- `GET /projetos` — lista projetos
- `POST /projetos` — cria novo projeto (requer token Bearer de admin)

Consulte os arquivos `backend/modules/*/routes` para detalhes completos das rotas e middlewares de autenticação/autorização (`backend/middleware`).

## Observações sobre push para o GitHub

Este repositório pode ser empurrado para o remoto fornecido. Para subir as mudanças locais:

```powershell
# (no diretório raiz do repositório)
git add .
git commit -m "Add README"
git remote add origin https://github.com/heitorpita/portfolio.git  # se o remoto ainda não existir
git push -u origin main
```

Se solicitado, autentique-se com suas credenciais GitHub (token de acesso pessoal recomendado).

## Licença

Este repositório não contém uma licença explícita. Adicione uma `LICENSE` se desejar tornar o uso/redistribuição explícito.

---

Se quiser, eu também posso:
- adicionar um `README` em inglês;
- criar um `Dockerfile` ou `docker-compose` para facilitar a execução;
- configurar um script npm para rodar migrations automaticamente.