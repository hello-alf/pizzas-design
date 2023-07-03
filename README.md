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

## Menu

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
| POST   | `http://localhost:3000/pizza` | `Content-Type: application/json` |

| Parámetro   | Descripción                                   |
| ----------- | --------------------------------------------- |
| name        | Nombre de la Pizza                            |
| size        | Tamaño de la Pizza (Pequeña, Mediana, Grande) |
| unitPrice   | Precio unitario en Bs                         |
| ingredients | Array de strings de ingredientes              |

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

```http
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

## Ordenes

### Listar Ordenes

#### Request

| Método | URL                           | Headers                          |
| ------ | ----------------------------- | -------------------------------- |
| GET    | `http://localhost:3000/order` | `Content-Type: application/json` |

#### Response

```json
[
  {
    "_id": "64a1a698f168c86387ef4e0b",
    "totalPrice": 120,
    "discount": 0,
    "deliveryPrice": 15,
    "fullNameCustomer": "Juan Perez",
    "details": [
      {
        "pizza": {
          "_id": "64a1a41f18c2d48cd1154cd0",
          "name": "Pizza Hawaiana",
          "size": "Mediana",
          "ingredients": ["Piña", "Queso", "Jamon"]
        },
        "quantity": 2
      }
    ],
    "state": "Pagado",
    "createdAt": "2023-07-02T16:28:49.970Z",
    "updatedAt": "2023-07-02T16:28:49.970Z",
    "__v": 0
  },
  {
    "_id": "64a1f5e5bc42da5b4a4197be",
    "totalPrice": 120,
    "discount": 10,
    "deliveryPrice": 15,
    "fullNameCustomer": "Juan Perez",
    "details": [
      {
        "pizza": {
          "_id": "64a1a41f18c2d48cd1154cd0",
          "name": "Pizza Hawaiana",
          "size": "Mediana",
          "ingredients": ["Piña", "Queso", "Jamon"]
        },
        "quantity": 2
      }
    ],
    "state": "Pendiente",
    "createdAt": "2023-07-02T22:10:23.448Z",
    "updatedAt": "2023-07-02T22:10:23.448Z",
    "__v": 0
  }
]
```

### Crear Orden

| Método | URL                           | Headers                          |
| ------ | ----------------------------- | -------------------------------- |
| POST   | `http://localhost:3000/order` | `Content-Type: application/json` |

| Parámetro        | Descripción                                    |
| ---------------- | ---------------------------------------------- |
| fullNameCustomer | Nombre completo del cliente                    |
| details          | Array de detalles de la orden, Objetos Details |

Objeto Details

| Parámetro | Descripción                                                  |
| --------- | ------------------------------------------------------------ |
| pizza     | Identificador de la pizza, obtenido en el servicio GET /menu |
| quantity  | Cantidad de pizzas seleccionadas                             |

#### Payload

```json
{
  "fullNameCustomer": "Juan Perez",
  "details": [
    {
      "pizza": "64a1a41f18c2d48cd1154cd0",
      "quantity": 2
    }
  ]
}
```

- Como parte de los puntos a solucionar, cuando se aplique el delivery gratuito el campo deliveryPrice del Response sera igual a cero
- Además para los días 2x1, el detalle de pizzas ordenadas se duplicara, si quantity es 2 en el Response quantity será 4 manteniendo el precio del calculo para la cantidad original

#### Response

```http
HTTP/1.1 201 Created
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 372
ETag: W/"174-kP+KVwpaJa/YByG3eTxiUJhcL68"
Date: Mon, 03 Jul 2023 00:24:36 GMT
Connection: close

{
	"totalPrice": 100,
	"discount": 0,
	"deliveryPrice": 14,
	"fullNameCustomer": "Juan Perez",
	"details": [{
		"pizza": {
			"_id": "64a1a41f18c2d48cd1154cd0",
			"name": "Pizza Hawaiana",
			"size": "Mediana",
			"ingredients": ["Piña", "Queso", "Jamon"]
		},
		"quantity": 2
	}],
	"state": "Pendiente",
	"createdAt": "2023-07-03T00:24:29.549Z",
	"updatedAt": "2023-07-03T00:24:29.549Z",
	"_id": "64a21544a54e35bfb89b0628",
	"__v": 0
}
```

### Pagar Orden

| Método | URL                               | Headers                          |
| ------ | --------------------------------- | -------------------------------- |
| POST   | `http://localhost:3000/order/pay` | `Content-Type: application/json` |

| Parámetro | Descripción               |
| --------- | ------------------------- |
| order     | Identificador de la orden |

#### Payload

```json
{
  "order": "64a22047fd7d1d6e0acd099c"
}
```

#### Response

```http
HTTP/1.1 201 Created
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 279
ETag: W/"117-ABIu0Ai61RIfKaPNNMsKA5P3jq8"
Date: Mon, 03 Jul 2023 01:27:13 GMT
Connection: close

{
  "_id": "64a22047fd7d1d6e0acd099c",
  "totalPrice": 100,
  "discount": 0,
  "deliveryPrice": 0,
  "fullNameCustomer": "Juan Perez",
  "details": [
    {
      "pizza": "64a1a41f18c2d48cd1154cd0",
      "quantity": 4
    }
  ],
  "state": "Pagado",
  "createdAt": "2023-07-03T01:10:52.624Z",
  "updatedAt": "2023-07-03T01:10:52.624Z",
  "__v": 0
}
```

### Cancelar Orden

| Método | URL                                  | Headers                          |
| ------ | ------------------------------------ | -------------------------------- |
| POST   | `http://localhost:3000/order/cancel` | `Content-Type: application/json` |

| Parámetro | Descripción               |
| --------- | ------------------------- |
| order     | Identificador de la orden |

#### Payload

```json
{
  "order": "64a22047fd7d1d6e0acd099c"
}
```

#### Response

```http
HTTP/1.1 201 Created
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 279
ETag: W/"117-ABIu0Ai61RIfKaPNNMsKA5P3jq8"
Date: Mon, 03 Jul 2023 01:27:13 GMT
Connection: close

{
  "_id": "64a19ec7bdee0facfb9f357f",
  "totalPrice": 120,
  "discount": 0,
  "deliveryPrice": 15,
  "fullNameCustomer": "Juan Perez",
  "details": [
    {
      "pizza": "649cc4dbc06e002847b36296",
      "quantity": 2
    }
  ],
  "state": "Cancelado",
  "createdAt": "2023-07-02T15:58:47.119Z",
  "updatedAt": "2023-07-02T15:58:47.119Z",
  "__v": 0
}
```
