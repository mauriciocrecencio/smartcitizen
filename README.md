# Smartcitizen

Esse projeto é um simples CRUD feito em **Node.JS**, **Express**, **TypeORM**, **Authentication JWT** e **MySQL**


## Instalação

Certifique-se de ter instalado em sua máquina **node**. 


1) Instale as dependências do projeto com o comando

```bash
npm install || yarn install
```
2) Inicie o servidor com o comando
```bash
npm start || yarn start
```


## API Routes


### GET ```/usuario/:id```
- É necessário passar um **id** e uma **token**.

#### Response

```json
{
  "user": {
    "id": "uuid",
    "name": "string",
    "email": "string"
  }
}
```

### POST ```/usuario```
- API não aceita e-mail repetido.

#### Response

```json
{
  "user": {
    "name": "string",
    "email": "string",
    "id": "uuid"
  }
}
```

### POST ```/usuario/login```

- Rota para obter o **token**.

#### Response

```json
{   
  "user": {
      "id": "uuid",
      "name": "string",
      "email": "string"   
  },
 "token": "string"
}
```

### PUT ```/usuario```

- Necessário enviar um **token** do usuário que deseja alterar.

#### Response

```json
{
  "id": "uuid",
  "name": "string",
  "email": "string"
}
```

### DELETE ```/usuario/:id```

- Não é possível deletar outros usuários sem ser o seu.
- Necessário enviar um **token** e o **id** do usuário que deseja deletar.

#### Response

```json
{
  "message": "User successfully deleted"
}
```




