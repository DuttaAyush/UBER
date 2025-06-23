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

#### Status Codes
- `200`: Logout successful
- `401`: Invalid or missing token
- `500`: Server error

---

## Get Address Coordinates

### `GET /maps/get-coordinates`

Get latitude and longitude coordinates for a given address using Google Maps API. Requires authentication.

#### Request Headers
```
Authorization: Bearer <jwt_token>
```
*OR*
```
Cookie: token=<jwt_token>
```

#### Query Parameters
- `address`: Required, string, min 3 characters - The address to get coordinates for

#### Validation Rules
- `address`: Required, min 3 characters

#### Example Request
```bash
curl -X GET "http://localhost:3000/maps/get-coordinates?address=New%20York%20City" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

#### Response

**Success (200)**
```json
{
  "ltg": 40.7127753,
  "lng": -74.0059728
}
```

#### Status Codes
- `200`: Coordinates retrieved successfully
- `400`: Validation errors
- `401`: Invalid or missing token
- `404`: Coordinate not found
- `500`: Server error

---

## Get Distance and Time

### `GET /maps/get-distance-time`

Get distance and estimated travel time between two locations using Google Maps API. Requires authentication.

#### Request Headers
```
Authorization: Bearer <jwt_token>
```
*OR*
```
Cookie: token=<jwt_token>
```

#### Query Parameters
- `origin`: Required, string, min 3 characters - Starting location
- `destination`: Required, string, min 3 characters - Destination location

#### Validation Rules
- `origin`: Required, min 3 characters
- `destination`: Required, min 3 characters

#### Example Request
```bash
curl -X GET "http://localhost:3000/maps/get-distance-time?origin=New%20York&destination=Los%20Angeles" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

#### Response

**Success (200)**
```json
{
  "distance": {
    "text": "2,789 mi",
    "value": 4487135
  },
  "duration": {
    "text": "1 day 16 hours",
    "value": 145234
  },
  "status": "OK"
}
```

#### Status Codes
- `200`: Distance and time retrieved successfully
- `400`: Validation errors
- `401`: Invalid or missing token
- `404`: Internal Server Error
- `500`: Server error

---

## Get Autocomplete Suggestions

### `GET /maps/get-suggestions`

Get autocomplete suggestions for location input using Google Maps Places API. Requires authentication.

#### Request Headers
```
Authorization: Bearer <jwt_token>
```
*OR*
```
Cookie: token=<jwt_token>
```

#### Query Parameters
- `input`: Required, string, min 3 characters - Search input text

#### Validation Rules
- `input`: Required, min 3 characters

#### Example Request
```bash
curl -X GET "http://localhost:3000/maps/get-suggestions?input=New%20York" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

#### Response

**Success (200)**
```json
[
  {
    "description": "New York, NY, USA",
    "matched_substrings": [
      {
        "length": 8,
        "offset": 0
      }
    ],
    "place_id": "ChIJOwg_06VPwokRYv534QaPC8g",
    "reference": "ChIJOwg_06VPwokRYv534QaPC8g",
    "structured_formatting": {
      "main_text": "New York",
      "main_text_matched_substrings": [
        {
          "length": 8,
          "offset": 0
        }
      ],
      "secondary_text": "NY, USA"
    },
    "terms": [
      {
        "offset": 0,
        "value": "New York"
      },
      {
        "offset": 10,
        "value": "NY"
      },
      {
        "offset": 14,
        "value": "USA"
      }
    ],
    "types": [
      "locality",
      "political",
      "geocode"
    ]
  }
]
```

#### Status Codes
- `200`: Suggestions retrieved successfully
- `400`: Validation errors
- `401`: Invalid or missing token
- `404`: Coordinate not found
- `500`: Server error

---

## Create Ride

### `POST /rides/create`

Create a new ride request with pickup and destination locations. Calculates fare automatically based on distance and vehicle type. Requires authentication.

#### Request Headers
```
Authorization: Bearer <jwt_token>
```
*OR*
```
Cookie: token=<jwt_token>
```

#### Request Body
```json
{
  "pickup": "string",
  "destination": "string",
  "vehicleType": "string"
}
```

#### Validation Rules
- `pickup`: Required, string, min 3 characters - Pickup location address
- `destination`: Required, string, min 3 characters - Destination address
- `vehicleType`: Required, must be one of: "auto", "car", "moto"

#### Example Request
```bash
curl -X POST http://localhost:3000/rides/create \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "pickup": "Times Square, New York",
    "destination": "Central Park, New York",
    "vehicleType": "car"
  }'
```

#### Response

**Success (201)**
```json
{
  "_id": "64a1b2c3d4e5f6789abcdef0",
  "user": "64a1b2c3d4e5f6789abcdef1",
  "pickup": "Times Square, New York",
  "destination": "Central Park, New York",
  "fare": 65.75,
  "status": "pending",
  "__v": 0
}
```

#### Status Codes
- `201`: Ride created successfully
- `400`: Validation errors
- `401`: Invalid or missing token
- `500`: Server error

#### Fare Calculation
The fare is automatically calculated based on:
- **Base Fare**: auto (₹30), car (₹50), moto (₹20)
- **Per KM Rate**: auto (₹10), car (₹15), moto (₹8)
- **Per Minute Rate**: auto (₹2), car (₹3), moto (₹1.5)

Formula: `Base Fare + (Distance in KM × Per KM Rate) + (Duration in Minutes × Per Minute Rate)`

---

## Get Fare Estimate

### `GET /rides/get-fare`

Get a fare estimate for a ride between two locations. No authentication required.

#### Query Parameters
- `pickup`: Required, string, min 3 characters - Pickup location address
- `destination`: Required, string, min 3 characters - Destination address

#### Example Request
```bash
curl -X GET "http://localhost:3000/rides/get-fare?pickup=Times%20Square,%20New%20York&destination=Central%20Park,%20New%20York"
```

#### Response

**Success (200)**
```json
{
  "fare": 65.75
}
```

#### Status Codes
- `200`: Fare calculated successfully
- `400`: Validation errors (missing or invalid parameters)
- `500`: Server error

---
