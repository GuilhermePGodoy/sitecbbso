# Site CBBSO - Time B de Vôlei

## Objetivo

Página web para apresentação e informações do time B de vôlei da universidade, além da captação de alunos para os times B e C, especialmente dos bixos.

## Clientes

- Time B de Vôlei da Universidade
- Direção de Esportes
- Comunidade universitária (Focado para novos ingressantes - bixos)

## O Problema

Atualmente, a comunicação sobre seletivas, gerenciamento da lista de espera e a apresentação do elenco e dos jogos muitas vezes ocorrem de forma descentralizada. Isso dificulta o acesso à informação rápida para alunos que desejam ingressar ou assistir ao esporte, gerando muito trabalho manual para a gestão administrativa do time. O site visa ser o canal oficial e automatizado para conduzir essas operações.

## Requisitos
- Ter um portal público atrativo para engajar novos jogadores.
- Automatizar o processo de captação de inscrições de novos atletas.
- Dar transparência e organizar a lista de espera.
- Possuir uma área de gestão para manter o elenco atualizado.

### Portal público
- Informações sobre o time
- Formulário de inscrição (envia para a API)
- Lista de espera (carregada da API, sem dados sensíveis)
- Elenco (Time B e C, carregado da API com as fotos dos atletas)
- Contato e redes sociais

### Área administrativa
- Autenticação de administrador com login (senha em hash bcrypt + JWT em cookie httpOnly).
- CRUD de atletas: o administrador pode Criar, Ler, Atualizar e Deletar os perfis do elenco direto pelo painel.
- Upload de imagens atrelado ao CRUD para enviar as fotos de perfil dos atletas, que são atualizadas nas páginas.
- Gestão da lista de espera: aprovar, recusar ou remover as inscrições recebidas.

### Técnicos
- Design responsivo
- Compatibilidade com navegadores modernos
- Navegação intuitiva
- Boas práticas de acessibilidade

## Tecnologias

**Front-end**
- React (Vite) + React Router
- Bootstrap 5 (pontual) com CSS próprio mantendo a identidade visual

**Back-end**
- Node.js + Express (organização MVC: rotas → controllers → models)
- PostgreSQL com Sequelize
- Autenticação com bcryptjs + JWT (jsonwebtoken)
- Upload de imagens com multer

## Como rodar

Pré-requisitos: Node.js e PostgreSQL instalados e rodando.

**Banco de dados**

Crie o banco e o usuário no PostgreSQL (ajuste os nomes/senha conforme o seu `.env`):
```
CREATE DATABASE cbbso;
CREATE USER cbbso_user WITH PASSWORD 'sua_senha_aqui';
GRANT ALL PRIVILEGES ON DATABASE cbbso TO cbbso_user;
```
As tabelas são criadas automaticamente pelo Sequelize quando a API sobe.

**Back-end**
```
cd backend
npm install
cp .env.example .env   # preencha o banco, o AUTH_SECRET e a ADMIN_SENHA
npm run seed           # cria o admin inicial e carrega o elenco do Time B
npm run dev            # sobe a API em http://localhost:3000
```

O `npm run seed` cria o administrador definido no `.env` (`ADMIN_EMAIL` /
`ADMIN_SENHA`). Use essas credenciais para entrar na área administrativa em
`/admin`. Rodar o seed de novo não duplica nem troca a senha do admin.

**Front-end**
```
cd frontend
npm install
npm run dev            # sobe o site em http://localhost:5173
```

Em desenvolvimento o Vite faz proxy de `/api` e `/uploads` para a porta 3000.
