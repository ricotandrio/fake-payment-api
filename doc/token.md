# Token API Spec

## Get Token 

**Endpoint :** POST /api/token

**Request Body :**
```json
{
  "merchant": "mejabelajar_payment",
  "customer_id": "USER001",
  "password": "userpassword",
}
```

**Response Body (Success):**
```json
{
  "code": 201,
  "message": "Token Created",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
  "expires_in": 3600
}
```

**Response Body (Failed):**
```json
{
  "code": 401,
  "message": "Unauthorized"
}
```

