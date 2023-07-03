# Introducción

- Se utilizo NestJS como framework para completar los puntos asignados en la tarea
- Se utilizo MongoDB como base de datos donde se almacenan las Pizzas y las Ordenes generados mediante los endpoints

## Patrones de Diseño aplicados

- State.- Para manejo de estados, Pendiente, Pagado, Cancelado
- Strategy.- Para manejo de promociones 2x1 y Delivery

## Instalación

```bash
# Instalar nestjs globalmente
$ npm install -g @nestjs/cli

# Instalar las dependencias del proyecto
$ npm install
```

Una vez levantado el proyecto se pueden utilizar las pizzas creadas por default

## Correr aplicación

```bash
$ npm run start:dev
```

# Endpoints

### Listar Pizzas

#### Request

| Método | URL                          | Headers                          |
| ------ | ---------------------------- | -------------------------------- |
| GET    | `http://localhost:3000/menu` | `Content-Type: application/json` |

#### Response

```json
[
  {
    "_id": "64a1a41f18c2d48cd1154cce",
    "name": "Pizza Hawaiana",
    "size": "Pequeña",
    "ingredients": ["Piña", "Queso", "Jamon"],
    "unitPrice": 25,
    "createdAt": "2023-07-02T16:21:50.945Z",
    "updatedAt": "2023-07-02T16:21:50.945Z",
    "__v": 0
  },
  {
    "_id": "64a1a41f18c2d48cd1154cd2",
    "name": "Pizza Hawaiana",
    "size": "Grande",
    "ingredients": ["Piña", "Queso", "Jamon"],
    "unitPrice": 85,
    "createdAt": "2023-07-02T16:21:50.945Z",
    "updatedAt": "2023-07-02T16:21:50.945Z",
    "__v": 0
  },
  {
    "_id": "64a1a41f18c2d48cd1154cd4",
    "name": "Pizza Carnivora",
    "size": "Pequeña",
    "ingredients": ["Carne molida", "Tocino", "Jamon", "Queso"],
    "unitPrice": 30,
    "createdAt": "2023-07-02T16:21:50.945Z",
    "updatedAt": "2023-07-02T16:21:50.945Z",
    "__v": 0
  }
]
```

### Crear Pizza

#### Request

| Método | URL                           | Headers                          |
| ------ | ----------------------------- | -------------------------------- |
| GET    | `http://localhost:3000/pizza` | `Content-Type: application/json` |

#### Payload

```json
{
  "name": "Pizza Hawaiana",
  "size": "Grande",
  "unitPrice": 90,
  "ingredients": ["Piña", "Queso", "Jamon"]
}
```

#### Response

```json
HTTP/1.1 201 Created
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 215
ETag: W/"d7-rHMnPE7LAsxiOtq3BI0/RdJCWsM"
Date: Mon, 03 Jul 2023 00:43:12 GMT
Connection: close

{
  "name": "Pizza Hawaiana",
  "size": "Grande",
  "ingredients": ["Piña", "Queso", "Jamon"],
  "unitPrice": 90,
  "createdAt": "2023-07-03T00:37:16.614Z",
  "updatedAt": "2023-07-03T00:37:16.614Z",
  "_id": "64a219a0825a90106ff70a8b",
  "__v": 0
}
```
