# koa-ts-knex
## API
### Fetch Users
```shell
curl -X GET "localhost:3000/api/users"
curl -X GET "localhost:3000/api/users?limit=2"
curl -X GET "localhost:3000/api/users?offset=1"
curl -X GET "localhost:3000/api/users?sort=id"
curl -X GET "localhost:3000/api/users?sort=-id"
curl -X GET "localhost:3000/api/users?fields=id,email"
curl -X GET "localhost:3000/api/users?limit=1&offset=1&fields=id,email"
```

### Fetch User
```shell
curl -X GET "localhost:3000/api/users/1"
curl -X GET "localhost:3000/api/users/1?fields=id,email"
```

### Create User
```shell
curl -X POST -H "Content-Type: application/json" \
-w '%{http_code}\n' \
-d '{"email": "kou10@email.com", "password": "password"}' \
"localhost:3000/api/users"
```

### Update User
```shell
curl -X PATCH -H "Content-Type: application/json" \
"localhost:3000/api/users?id=1&email=updatedKou@email.com"
```
