# G-Scores - Tra cứu điểm thi THPT

## Link Demo
```
https://youtu.be/9WlxBOgvZsM
```

## Link web
```
https://gscores-frontend-zzwq.onrender.com/
```

## Giới thiệu

Project được xây dựng với mục tiêu:
- Tra cứu điểm thi theo số báo danh
- Thống kê điểm theo từng môn thi (theo 4 mức điểm: ≥8, 6-8, 4-6, <4)
- Xếp hạng top 10 thí sinh có tổng điểm khối A cao nhất

Ngoài ra, các chức năng khác được thêm để hoàn thiện dashboard:
- Thống kê số lượng học sinh 
- Thống kê điểm theo thang [0, 10]

Frontend sử dụng template từ [TailAdmin](https://tailadmin.com/) 

Backend lấy template từ [dpvasani](https://github.com/dpvasani/Backend-Template-TypeScript) thiết kế theo mô hình OOP với các patterns như Factory, Strategy để quản lý việc tính điểm các tổ hợp môn.

Cảm ơn team Golden Owl đã tạo ra một assignment thú vị và đầy thực tế :D

## 🛠 Tech Stack

### Frontend
- **Framework:** Next.js 16 (React 19)
- **Styling:** TailwindCSS 4
- **Charts:** ApexCharts, React-ApexCharts
- **UI Components:** Flatpickr, React Icons, Swiper
- **Language:** TypeScript

### Backend
- **Runtime:** Node.js 18+
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** PostgreSQL 15
- **ORM:** Prisma
- **Cache:** Redis 7
- **Validation:** Zod

### Infrastructure
- **Containerization:** Docker & Docker Compose
- **Database:** PostgreSQL 15 Alpine
- **Cache Server:** Redis 7 Alpine

## Hướng dẫn chạy project

### Yêu cầu
- Node.js 18+
- Docker & Docker Compose (nếu chạy bằng Docker)
- PostgreSQL 15+ (nếu chạy local không dùng Docker)
- Redis 7+ (nếu chạy local không dùng Docker)

---

##  Chạy nhanh với Docker (Production Mode - Recommended)

Cách đơn giản nhất 

```bash
# Tại thư mục root của project
docker-compose up --build
```

Chờ khoảng 1-2 phút để Docker build và khởi động tất cả services (riêng backend chờ khoảng 2-3 phút để init summary statistic). Sau đó:
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:4000
- **PostgreSQL:** localhost:5432
- **Redis:** localhost:6379

Database sẽ tự động được migrate và seed dữ liệu từ file CSV.

Để dừng:
```bash
docker-compose down
```

Để dừng và xóa volumes (xóa sạch database):
```bash
docker-compose down -v
```

---

## Chạy Development Mode (Local)

### 1. Backend

```bash
cd backend

# Cài đặt dependencies
npm install

# Tạo file .env (hoặc copy từ .env.example)
# Cập nhật DATABASE_URL và REDIS_URL theo môi trường của bạn
cp .env.example .env

# Generate Prisma Client
npm run prisma:generate

# Chạy migration
npm run prisma:migrate

# Build seed file
npm run build:seed

# Seed dữ liệu từ CSV vào database
npm run prisma:seed

# Chạy development server
npm run dev
```

Backend sẽ chạy tại: http://localhost:4000

**File .env mẫu cho backend:**
```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/gscores
REDIS_URL=redis://localhost:6379
PORT=4000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

### 2. Frontend

```bash
cd frontend

# Cài đặt dependencies
npm install

# Tạo file .env.local (nếu cần)
echo "NEXT_PUBLIC_API_URL=http://localhost:4000" > .env.local

# Chạy development server
npm run dev
```

Frontend sẽ chạy tại: http://localhost:3000

---

## Build Production (Local)

### Backend
```bash
cd backend
npm run build
npm start
```

### Frontend
```bash
cd frontend
npm run build
npm start
```

---

## Dataset

File dữ liệu điểm thi THPT nằm tại:
- `backend/dataset/diem_thi_thpt_2024.csv`
- `dataset/diem_thi_thpt_2024.csv` (root)

Dữ liệu sẽ tự động được import vào database khi chạy lệnh seed.

---

## API Endpoints chính

- `GET /api/scores/:sbd` - Tra cứu điểm theo số báo danh
- `GET /api/statistics/subject-distribution` - Thống kê phân bố điểm theo môn
- `GET /api/statistics/top-students` - Top 10 thí sinh khối A

---


# Architecture

## Client-Server Flow
![Client-Server Architecture](./client-server.png)

## Database Migration Flow
![Prisma Migration Process](./prisma-migrate.png)

## Seed & Initialization Flow
![Seed Initialization](./seed-init.png)
