# Clube Incentivo API

Api desenvolvida em Node v10

### Dev

Para iniciar o projeto, execute o seguinte comando na raiz do projeto:

```
./build.sh
docker-compose run --rm app sequelize db:migrate
docker-compose run --rm app sequelize db:seed:all
curl http://localhost:3000/sales
```

Para acessar o container do app via bash:

```
docker exec -it clubeincentivo-api bash
```

Para acessar o console da aplicação, execute:

```
  node console
```

Para executar os testes:

```
 docker-compose run -e NODE_ENV=test --rm app npm test
```
