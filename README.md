# Trybe Futebol Clube

API de partidas de futebol com autenticação, atualização de placares e cálculo de classificação geral, de mandantes e de visitantes.

**Projeto de formação em backend — TypeScript, Node.js, Express, Sequelize e MySQL.** Desenvolvi o backend para integrar com a interface React fornecida pela Trybe.

## O que implementei

- Login com verificação de senha por bcrypt e emissão de JWT.
- Consulta de times e partidas, incluindo filtro por partidas em andamento.
- Cadastro de partidas com validação dos times e do token.
- Atualização de placar e encerramento de partidas.
- Classificação calculada a partir de partidas encerradas: pontos, vitórias, empates, derrotas, gols, saldo e aproveitamento.
- Migrations, models e associações do banco relacional.
- Testes HTTP do backend com Mocha, Chai e Sinon.
- Dockerfiles para executar frontend e backend.

## Tecnologias e estrutura

| Camada | Tecnologias |
|---|---|
| Backend | TypeScript, Node.js, Express |
| Persistência | MySQL, Sequelize, migrations e seeders |
| Autenticação | jsonwebtoken e bcryptjs |
| Testes de minha implementação | Mocha, Chai, chai-http, Sinon e NYC |
| Ambiente | Docker e Docker Compose |
| Interface fornecida | React |

```text
app/
  backend/src/
    controllers/  # adaptação de requisições e respostas
    services/     # autenticação e regras de partidas/classificação
    database/     # models, migrations e seeders
    middlewares/  # validações de entrada e autorização
    routes/       # endpoints HTTP
    tests/        # testes da implementação do backend
  frontend/       # interface-base fornecida pela Trybe
```

## Executar localmente

Na raiz deste projeto, com Docker e Docker Compose instalados:

```sh
cd app
docker compose up -d --build
```

| Serviço | Endereço |
|---|---|
| Frontend | http://localhost:3000 |
| API | http://localhost:3001 |
| MySQL para acesso pelo host | localhost:3002 |

O backend executa `db:reset` no `prestart`: use o banco exclusivo de demonstração deste Compose, pois a inicialização recria e popula esse banco. A configuração original utiliza Node 16.14 e MySQL 8.0.21.

Para encerrar, execute `docker compose down` dentro de `app/`.

## Rotas principais

| Método | Rota | Operação |
|---|---|---|
| POST | `/login` | Emite token para credenciais válidas |
| GET | `/login/validate` | Consulta o papel associado ao token |
| GET | `/teams` e `/teams/:id` | Consulta times |
| GET | `/matches?inProgress=true` | Filtra partidas em andamento |
| POST | `/matches` | Cadastra partida com token e times válidos |
| PATCH | `/matches/:id` | Atualiza placar com token |
| PATCH | `/matches/:id/finish` | Encerra partida com token |
| GET | `/leaderboard` | Classificação geral |
| GET | `/leaderboard/home` e `/leaderboard/away` | Classificações por mando |

## Testes

Com o ambiente iniciado:

```sh
docker compose exec backend npm test
docker compose exec backend npm run test:coverage
```

O arquivo da implementação é `app/backend/src/tests/change.me.test.ts`. Os testes incluem fixtures com token datado e acesso ao banco; precisam de revisão para execução atual. Não há afirmação de cobertura atual nem de execução bem-sucedida nesta documentação.

## Decisões e aprendizado

Separei controllers, services, models e validações para trabalhar as regras de negócio independentemente das rotas. O cálculo da classificação exercitou agregação de partidas e ordenação por critérios de desempate. Este foi um dos meus maiores desafios na formação, desenvolvido sob prazo curto e sem assistência de IA na implementação original.

## Escopo e evolução

Esta é uma implementação acadêmica. A chave JWT está fixa no código da versão original; externalizá-la e revisar tratamento de erros, dependências e testes temporais são próximos passos antes de disponibilizar uma demonstração pública.

## Autoria e créditos

**Thalys Rocha Rodrigues:** implementação do backend, regras de classificação, validações, testes e Dockerfiles registrados no [PR original #13](https://github.com/tryber/sd-020-a-trybe-futebol-clube/pull/13). O repositório original é privado.

**Trybe:** enunciado, estrutura inicial, interface React, testes de avaliação, recursos e demais arquivos-base. A interface fornecida não é apresentada como criação minha. A publicação deve seguir o processo oficial de remoção dos arquivos de avaliação e limpeza do histórico.

[GitHub](https://github.com/ThalysRD) · [Portfólio](https://portifolio-lyart-gamma-56.vercel.app/)
