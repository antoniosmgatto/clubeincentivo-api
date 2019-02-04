# Clube Incentivo API

Api desenvolvida em Node v10

### Dev

Para iniciar o projeto, execute o seguinte comando na raiz do projeto:

```
./build.sh
docker-compose run --rm app node_modules/.bin/sequelize db:migrate
docker-compose run --rm app node_modules/.bin/sequelize db:seed:all
curl http://localhost:3000/projects
```

Para acessar o container do app via bash:

```
docker exec -it clubeincentivo-api bash
```

Para acessar o console da aplicação, execute:

```
  node console
```