# 🚀 Hướng Dẫn Deploy Backend Lên Render (Tiếng Việt)

## 📋 Tổng Quan
Render là một platform cloud hosting miễn phí và trả phí, rất phù hợp để deploy ứng dụng Node.js. Hướng dẫn này sẽ giúp bạn deploy backend Barber Store lên Render một cách chi tiết.

## 🎯 Chuẩn Bị Trước Khi Deploy

### 1. Kiểm Tra Yêu Cầu Hệ Thống
- ✅ Tài khoản GitHub có repository chứa code backend
- ✅ Tài khoản MongoDB Atlas (database cloud)
- ✅ Tài khoản Cloudinary (lưu trữ hình ảnh)
- ✅ Gmail với App Password (gửi email)
- ✅ Tài khoản Render (đăng ký miễn phí tại render.com)

### 2. Kiểm Tra Code Đã Sẵn Sàng
```bash
# Kiểm tra tất cả file đã được commit
git status

# Nếu có file chưa commit, thực hiện:
git add .
git commit -m "Chuẩn bị deploy lên Render"
git push origin main
```

## 🌐 Bước 1: Tạo Tài Khoản và Dự Án Trên Render

### 1.1. Đăng Ký Tài Khoản
1. Truy cập [render.com](https://render.com)
2. Nhấn **"Get Started for Free"**
3. Đăng ký bằng GitHub (khuyến nghị) hoặc email
4. Xác nhận email nếu cần

### 1.2. Kết Nối GitHub
1. Trong dashboard Render, nhấn **"New +"**
2. Chọn **"Web Service"**
3. Chọn **"Connect account"** để kết nối GitHub
4. Cấp quyền cho Render truy cập repository của bạn

## ⚙️ Bước 2: Cấu Hình Web Service

### 2.1. Chọn Repository
1. Tìm và chọn repository **"barber-store-AI"**
2. Nhấn **"Connect"**

### 2.2. Cấu Hình Cơ Bản
```
Name: barber-store-backend
Region: Singapore (gần Việt Nam nhất)
Branch: main
Root Directory: backend (quan trọng!)
Environment: Node
Build Command: npm install
Start Command: npm start
```

### 2.3. Chọn Gói Dịch Vụ
- **Free Tier**: Miễn phí, phù hợp để test
  - 512MB RAM
  - Ngủ sau 15 phút không hoạt động
  - 750 giờ/tháng
- **Starter ($7/tháng)**: Khuyến nghị cho production
  - 512MB RAM
  - Không ngủ
  - Custom domain

## 🔐 Bước 3: Cấu Hình Biến Môi Trường (Environment Variables)

### 3.1. Truy Cập Cài Đặt Environment
1. Sau khi tạo service, vào tab **"Environment"**
2. Nhấn **"Add Environment Variable"**

### 3.2. Thêm Các Biến Sau (Copy chính xác):

#### Cấu Hình Server
```
NODE_ENV=production
PORT=10000
```

#### Cấu Hình Database
```
MONGODB_URI=mongodb+srv://myUser:123@cluster0.1rj3sbe.mongodb.net/barber-store?retryWrites=true&w=majority&appName=Cluster0
```

#### Cấu Hình JWT
```
JWT_SECRET=super_secret_jwt_key_for_barber_store_application_2025
JWT_EXPIRES_IN=30d
```

#### Cấu Hình Cloudinary
```
CLOUDINARY_CLOUD_NAME=dwa9ptkhz
CLOUDINARY_API_KEY=184927477473889
CLOUDINARY_API_SECRET=nbmNsrv8t9HU8eMswTFhk-VlOO0
```

#### Cấu Hình Email
```
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=hiep.projectmail@gmail.com
EMAIL_PASSWORD=hgnp fugv kfrz aihb
EMAIL_FROM=The Gentleman's Cut <hiep.projectmail@gmail.com>
GMAIL_USER=hiep.projectmail@gmail.com
GMAIL_APP_PASSWORD=hgnp fugv kfrz aihb
```

#### Cấu Hình Frontend URLs
```
FRONTEND_URL=https://barber-store-ai-user.vercel.app
STAFF_FRONTEND_URL=https://barber-store-ai-staff.vercel.app
```

### 3.3. Lưu Cấu Hình
Nhấn **"Save Changes"** sau khi thêm tất cả biến môi trường.

## 🚀 Bước 4: Deploy Ứng Dụng

### 4.1. Bắt Đầu Deploy
1. Nhấn **"Create Web Service"**
2. Render sẽ tự động:
   - Clone code từ GitHub
   - Chạy `npm install`
   - Chạy `npm start`
   - Deploy ứng dụng

### 4.2. Theo Dõi Quá Trình Deploy
1. Vào tab **"Logs"** để xem tiến trình
2. Deploy lần đầu thường mất 5-10 phút
3. Tìm dòng log: `Server running on port 10000`

### 4.3. Nhận URL Backend
Sau khi deploy thành công, bạn sẽ nhận được URL như:
```
https://barber-store-backend-xxxx.onrender.com
```

## ✅ Bước 5: Kiểm Tra Deploy Thành Công

### 5.1. Kiểm Tra Health Check
Truy cập: `https://your-app.onrender.com/health`

Kết quả mong đợi:
```json
{
  "status": "OK",
  "timestamp": "2025-05-25T10:00:00.000Z",
  "uptime": 123.45,
  "environment": "production"
}
```

### 5.2. Kiểm Tra API Status
Truy cập: `https://your-app.onrender.com/api`

Kết quả mong đợi:
```json
{
  "message": "API is running...",
  "status": "healthy",
  "version": "1.0.0",
  "timestamp": "2025-05-25T10:00:00.000Z"
}
```

### 5.3. Kiểm Tra Database Connection
1. Vào tab **"Logs"** trong Render dashboard
2. Tìm dòng: `MongoDB Connected: ac-0uxetfz-shard-00-00.1rj3sbe.mongodb.net`
3. Nếu thấy lỗi, kiểm tra lại MONGODB_URI

## 🔄 Bước 6: Cập Nhật Frontend

### 6.1. Cập Nhật User Frontend
Sửa file `frontend/user/.env`:
```
REACT_APP_BACKEND_API_URL=https://your-app.onrender.com
```

### 6.2. Cập Nhật Staff Frontend
Sửa file `frontend/staff/.env`:
```
REACT_APP_BACKEND_API_URL=https://your-app.onrender.com
```

### 6.3. Deploy Lại Frontend
Sau khi cập nhật, deploy lại frontend trên Vercel để sử dụng backend mới.

## 🔧 Xử Lý Sự Cố Thường Gặp

### Sự Cố 1: Deploy Thất Bại
**Triệu chứng**: Build fails, deployment error
**Giải pháp**:
1. Kiểm tra tab "Logs" để xem lỗi cụ thể
2. Đảm bảo `Root Directory` đã đặt đúng là `backend`
3. Kiểm tra file `package.json` có script `start`

### Sự Cố 2: Không Kết Nối Được Database
**Triệu chứng**: "Failed to connect to MongoDB"
**Giải pháp**:
1. Kiểm tra MONGODB_URI có đúng không
2. Vào MongoDB Atlas, đảm bảo:
   - Network Access cho phép 0.0.0.0/0 (tất cả IP)
   - Database user có quyền đọc/ghi

### Sự Cố 3: CORS Error
**Triệu chứng**: Frontend không call được API
**Giải pháp**:
1. Kiểm tra CORS origins trong `index.js`
2. Đảm bảo domain frontend đã được thêm vào danh sách CORS

### Sự Cố 4: Email Không Gửi Được
**Triệu chứng**: Lỗi SMTP authentication
**Giải pháp**:
1. Kiểm tra Gmail App Password còn hiệu lực
2. Đảm bảo 2-Factor Authentication đã bật trong Gmail
3. Tạo App Password mới nếu cần

## 📊 Giám Sát Và Bảo Trì

### Theo Dõi Performance
1. **Render Dashboard**: Xem CPU, RAM, request count
2. **Logs**: Theo dõi lỗi và cảnh báo
3. **Uptime Monitoring**: Sử dụng UptimeRobot (miễn phí)

### Cập Nhật Code
```bash
# Khi có thay đổi code
git add .
git commit -m "Cập nhật tính năng mới"
git push origin main

# Render sẽ tự động deploy lại
```

### Backup Database
1. Sử dụng MongoDB Atlas backup tự động
2. Hoặc tự export data định kỳ:
```bash
mongodump --uri "mongodb+srv://..."
```

## 💰 Chi Phí Ước Tính

### Free Tier
- **Giá**: $0/tháng
- **Giới hạn**: 750 giờ/tháng
- **Phù hợp**: Demo, development

### Starter Plan
- **Giá**: $7/tháng
- **Tính năng**: Không giới hạn giờ, custom domain
- **Phù hợp**: Production nhỏ

### Pro Plan
- **Giá**: $25/tháng
- **Tính năng**: 1GB RAM, horizontal scaling
- **Phù hợp**: Production lớn

## 🎉 Hoàn Thành

Chúc mừng! Backend của bạn đã được deploy thành công lên Render. 

### Checklist Cuối Cùng
- [ ] ✅ Backend chạy tại URL Render
- [ ] ✅ Health check endpoint hoạt động
- [ ] ✅ Database kết nối thành công
- [ ] ✅ Frontend đã cập nhật URL mới
- [ ] ✅ Email service hoạt động
- [ ] ✅ Socket.IO real-time features hoạt động

### Tài Liệu Tham Khảo
- [Render Documentation](https://render.com/docs)
- [Node.js on Render](https://render.com/docs/node-express-app)
- [Environment Variables](https://render.com/docs/environment-variables)

---

**Được tạo bởi**: AI Assistant  
**Ngày cập nhật**: 25/05/2025  
**Phiên bản**: 1.0  
**Trạng thái**: ✅ Sẵn sàng để deploy
