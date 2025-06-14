
All routes listed below should be prefixed with this base URL.

---

## 🔐 Authentication Routes

### 👤 User
| Method | Endpoint                     | Description                 |
|--------|------------------------------|-----------------------------|
| POST   | `/user/register`             | Register new user           |
| POST   | `/user/verify`               | Verify user account         |
| POST   | `/user/login`                | Login for users             |

### 🛠️ Admin
| Method | Endpoint                     | Description                 |
|--------|------------------------------|-----------------------------|
| POST   | `/admin/register`            | Admin signup (one-time)     |
| POST   | `/admin/verify`              | Verify admin account        |
| POST   | `/admin/login`               | Admin login                 |

> **Example URL:** `http://localhost:5000/api/v1/user/login`

---

## 📦 Product Management (Admin Only)

| Method | Endpoint                    | Description            |
|--------|-----------------------------|------------------------|
| POST   | `/products/create`          | Create a new product   |
| PUT    | `/products/:id`             | Update a product       |
| GET    | `/products/`                | View all products      |

> All product routes require valid **admin JWT token**.

---

## 🧠 Tech Stack
- Node.js + Express
- MongoDB
- Kafka (Apache Kafka for microservice communication)
- JWT (for auth)
- API Gateway (Express-based)

---

## 📁 Project Structure
- `auth-service/` – Handles user/admin auth & verification
- `product-service/` – Manages product CRUD (admin only)
- `gateway/` – Central request handler for all routes

---

## 🧪 How to Use

Start each service individually:

```bash
# Example
cd auth-service
npm install
npm run dev

cd product-service
npm install
npm run dev

cd gateway
npm install
npm run dev
