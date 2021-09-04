# koa-ts-knex
## API
### Fetch Users
- GET
```shell
curl -X GET "localhost:3000/api/users"
curl -X GET "localhost:3000/api/users?first=2"
curl -X GET "localhost:3000/api/users?offset=1"
curl -X GET "localhost:3000/api/users?fields=id,email"
curl -X GET "localhost:3000/api/users?first=1&offset=1&fields=id,email"
```

### POST
```shell
curl -X POST -H "Content-Type: application/json" \
-d '{"name": "kou"}' \
localhost:3000
```
