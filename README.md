# Clube Incentivo API

Api desenvolvida em Node v10

### Dev

Antes de executar o projeto, defina as variáveis de ambiente conforme exemplo abaixo:

```
  export CLUBE_INVENTIVO_FIREBASE_API_KEY="apikey"
  export CLUBE_INVENTIVO_FIREBASE_AUTH_DOMAIN="example.firebaseapp.com"
  export CLUBE_INVENTIVO_FIREBASE_DATABASE_URL="https://example.firebaseapp.com"
```

Para inicializar o projeto:

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
  docker-compose run --rm app node console
```

Para executar os testes:

```
 docker-compose run -e NODE_ENV=test --rm app npm test
```

Para acessar o Redis

```
docker-compose run --rm redis redis-cli -h redis
```