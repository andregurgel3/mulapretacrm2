# Mula Preta · CRM Arquitetos & Specifiers

## Estrutura do Projeto

```
mula-preta-crm/
├── package.json          # Dependências e scripts
├── .replit               # Config do Replit
├── server/
│   ├── index.js          # Backend Express + SQLite (API REST)
│   ├── mulapreta.db      # Banco SQLite (criado automaticamente)
│   └── public/           # Frontend buildado (gerado pelo build)
└── src/
    ├── vite.config.js    # Config do Vite
    ├── index.html        # HTML entry
    ├── main.jsx          # React entry
    ├── api.js            # Funções de comunicação com a API
    └── App.jsx           # CRM completo (frontend React)
```

## Setup no Replit

1. Crie um novo Repl → Template: **Node.js**
2. Faça upload de todos os arquivos deste projeto
3. No Shell, rode:
   ```
   npm install
   npm run build
   npm start
   ```
4. O CRM estará rodando na URL do seu Repl

## Setup Local

```bash
npm install
npm run build
npm start
```

Acesse: http://localhost:3000

## Desenvolvimento

Para desenvolver com hot-reload:

Terminal 1:
```bash
npm run dev:server
```

Terminal 2:
```bash
npm run dev:client
```

O frontend roda na porta 3001 com proxy para a API na porta 3000.

## API Endpoints

### Autenticação
- `POST /api/login` — { email, pw }

### Equipe (Users)
- `GET /api/users` — Lista todos
- `POST /api/users` — Criar
- `PUT /api/users/:id` — Editar
- `DELETE /api/users/:id` — Excluir

### Arquitetos
- `GET /api/architects` — Lista todos
- `POST /api/architects` — Criar
- `POST /api/architects/bulk` — Importar vários (Excel)
- `PUT /api/architects/:id` — Editar
- `DELETE /api/architects/:id` — Excluir

### Eventos (Agenda)
- `GET /api/events` — Lista todos
- `POST /api/events` — Criar
- `PUT /api/events/:id` — Editar
- `DELETE /api/events/:id` — Excluir

### Vendas
- `GET /api/sales` — Lista todos
- `POST /api/sales` — Adicionar (array ou item)
- `DELETE /api/sales/clear-imported` — Limpar importados

### Pipeline
- `GET /api/pipeline` — Lista etapas
- `PUT /api/pipeline/:id` — Editar etapa

### Specifiers (Seasons)
- `GET /api/seasons` — Lista seasons
- `POST /api/seasons` — Criar season
- `PUT /api/seasons/:id` — Editar (inclui rules e prizes)
- `DELETE /api/seasons/:id` — Excluir

### Pontuação Arquitetos
- `GET /api/archpoints` — Lista pontos
- `POST /api/archpoints` — Criar
- `PUT /api/archpoints/:id` — Editar
- `DELETE /api/archpoints/:id` — Excluir

## Credenciais Padrão

- **Admin:** admin@mulapreta.com / admin123
- **Equipe:** ana@mulapreta.com / ana123

## Banco de Dados

SQLite (arquivo `server/mulapreta.db`). Na primeira execução, o banco é criado e populado com dados de demonstração automaticamente.

Para resetar o banco, basta deletar o arquivo `mulapreta.db` e reiniciar o servidor.

## Migração para Produção

Para usar em produção, considere:
- Trocar SQLite por PostgreSQL (Supabase, Railway, Neon)
- Adicionar hash de senhas (bcrypt)
- Implementar JWT para autenticação
- Configurar HTTPS
- Adicionar backup automático do banco
