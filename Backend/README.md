# UBER Backend API

## User Registration

### `POST /users/register`

Register a new user and get JWT token.

#### Request Body
```json
{
  "fullname": {
    "firstname": "string",
    "lastname": "string"
  },
  "email": "string",
  "password": "string"
}
```

#### Validation Rules
- `firstname`: Required, min 3 characters
- `lastname`: Optional, min 3 characters if provided
- `email`: Required, valid email format
- `password`: Required, min 6 characters

#### Example Request
```bash
curl -X POST http://localhost:3000/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "password123"
  }'
```

#### Response

**Success (201)**
```json
{
  "user": {
    "_id": "64a1b2c3d4e5f6789abcdef0",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error (400)**
```json
{
  "errors": [
    {
      "msg": "First name must be at least 3 characters long",
      "path": "fullname.firstname"
    }
  ]
}
```

#### Status Codes
- `201`: User created successfully
- `400`: Validation errors
- `500`: Server error