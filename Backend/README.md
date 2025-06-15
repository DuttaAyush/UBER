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

---

## User Login

### `POST /users/login`

Login existing user and get JWT token.

#### Request Body
```json
{
  "email": "string",
  "password": "string"
}
```

#### Validation Rules
- `email`: Required, valid email format
- `password`: Required, min 6 characters

#### Example Request
```bash
curl -X POST http://localhost:3000/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "password123"
  }'
```

#### Response

**Success (200)**
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

**Error (400) - Validation Error**
```json
{
  "errors": [
    {
      "msg": "Invalid email",
      "path": "email"
    }
  ]
}
```

**Error (401) - Authentication Error**
```json
{
  "message": "Invalid email or password"
}
```

#### Status Codes
- `200`: Login successful
- `400`: Validation errors
- `401`: Invalid credentials
- `500`: Server error

---

## User Profile

### `GET /users/profile`

Get current user's profile information. Requires authentication.

#### Request Headers
```
Authorization: Bearer <jwt_token>
```
*OR*
```
Cookie: token=<jwt_token>
```

#### Example Request
```bash
curl -X GET http://localhost:3000/users/profile \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

#### Response

**Success (200)**
```json
{
  "_id": "64a1b2c3d4e5f6789abcdef0",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "socketId": null,
  "__v": 0
}
```

**Error (401) - Unauthorized**
```json
{
  "message": "Unauthorized"
}
```

#### Status Codes
- `200`: Profile retrieved successfully
- `401`: Invalid or missing token
- `500`: Server error

---

## User Logout

### `GET /users/logout`

Logout user and blacklist the JWT token. Requires authentication.

#### Request Headers
```
Authorization: Bearer <jwt_token>
```
*OR*
```
Cookie: token=<jwt_token>
```

#### Example Request
```bash
curl -X GET http://localhost:3000/users/logout \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

#### Response

**Success (200)**
```json
{
  "message": "Logged out successfully"
}
```

**Error (401) - Unauthorized**
```json
{
  "message": "Unauthorized"
}
```

#### Status Codes
- `200`: Logout successful
- `401`: Invalid or missing token
- `500`: Server error

---

## Captain Registration

### `POST /captain/register`

Register a new captain with vehicle information and get JWT token.

#### Request Body
```json
{
  "fullname": {
    "firstname": "string",
    "lastname": "string"
  },
  "email": "string",
  "password": "string",
  "vehicle": {
    "color": "string",
    "plate": "string",
    "capacity": number,
    "vehicleType": "string"
  }
}
```

#### Validation Rules
- `firstname`: Required, min 3 characters
- `lastname`: Optional, min 3 characters if provided
- `email`: Required, valid email format
- `password`: Required, min 6 characters
- `vehicle.color`: Required, min 3 characters
- `vehicle.plate`: Required, min 3 characters
- `vehicle.capacity`: Required, min 1
- `vehicle.vehicleType`: Required, must be one of: "car", "motorcycle", "auto"

#### Example Request
```bash
curl -X POST http://localhost:3000/captain/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "password123",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }'
```

#### Response

**Success (201)**
```json
{
  "captain": {
    "_id": "64a1b2c3d4e5f6789abcdef0",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "status": "inactive",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error (400) - Validation Error**
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

**Error (400) - Captain Already Exists**
```json
{
  "message": "Captain already exists"
}
```

#### Status Codes
- `201`: Captain created successfully
- `400`: Validation errors or captain already exists
- `500`: Server error

---

## Captain Login

### `POST /captain/login`

Login existing captain and get JWT token.

#### Request Body
```json
{
  "email": "string",
  "password": "string"
}
```

#### Validation Rules
- `email`: Required, valid email format
- `password`: Required, min 6 characters

#### Example Request
```bash
curl -X POST http://localhost:3000/captain/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "password123"
  }'
```

#### Response

**Success (200)**
```json
{
  "captain": {
    "_id": "64a1b2c3d4e5f6789abcdef0",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "status": "inactive",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error (400) - Validation Error**
```json
{
  "errors": [
    {
      "msg": "Invalid email format",
      "path": "email"
    }
  ]
}
```

**Error (401) - Authentication Error**
```json
{
  "message": "Invalid email or password"
}
```

#### Status Codes
- `200`: Login successful
- `400`: Validation errors
- `401`: Invalid credentials
- `500`: Server error

---

## Captain Profile

### `GET /captain/profile`

Get current captain's profile information. Requires authentication.

#### Request Headers
```
Authorization: Bearer <jwt_token>
```
*OR*
```
Cookie: token=<jwt_token>
```

#### Example Request
```bash
curl -X GET http://localhost:3000/captain/profile \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

#### Response

**Success (200)**
```json
{
  "captain": {
    "_id": "64a1b2c3d4e5f6789abcdef0",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "status": "inactive",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    },
    "location": {
      "lat": null,
      "lng": null
    },
    "socketId": null,
    "__v": 0
  }
}
```

**Error (401) - Unauthorized**
```json
{
  "message": "Unauthorized"
}
```

#### Status Codes
- `200`: Profile retrieved successfully
- `401`: Invalid or missing token
- `500`: Server error

---

## Captain Logout

### `GET /captain/logout`

Logout captain and blacklist the JWT token. Requires authentication.

#### Request Headers
```
Authorization: Bearer <jwt_token>
```
*OR*
```
Cookie: token=<jwt_token>
```

#### Example Request
```bash
curl -X GET http://localhost:3000/captain/logout \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

#### Response

**Success (200)**
```json
{
  "message": "Logged out successfully"
}
```

**Error (401) - Unauthorized**
```json
{
  "message": "Unauthorized"
}
```

#### Status Codes
- `200`: Logout successful
- `401`: Invalid or missing token
- `500`: Server error

---