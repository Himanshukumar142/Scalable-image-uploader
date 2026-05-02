# 🚀 Scalable Image Upload Server (No Database)

## 📌 Overview

This project is a **scalable backend system** for uploading images using Node.js.
It demonstrates real-world backend concepts like **load balancing, cloud storage, and CI/CD**, without using any database.

---

## 🧠 Key Highlights

* Stateless backend (no database)
* Horizontally scalable architecture
* Cloud storage using AWS S3
* Load balancing using NGINX
* CI pipeline using GitHub Actions
* Deployed on AWS EC2

---

## 🛠️ Tech Stack

* **Backend:** Node.js (Express)
* **File Upload:** Multer
* **Image Processing:** Sharp
* **Cloud Storage:** AWS S3
* **Process Manager:** PM2
* **Load Balancer:** NGINX
* **CI/CD:** GitHub Actions
* **Deployment:** AWS EC2

---

## ⚙️ Features

* Upload images via `POST /upload`
* Supports only JPG and PNG formats
* Maximum file size: **2MB**
* Images are resized before upload (optimization)
* Files stored in AWS S3 with unique names
* Load balanced across multiple backend instances
* Secure environment configuration
* CI pipeline ensures project build validity

---

## 🏗️ Architecture

```text
Client
   ↓
EC2 Public IP (Port 80)
   ↓
NGINX (Load Balancer)
   ↓
Backend Instances (3001, 3002)
   ↓
AWS S3 (Image Storage)
```

---

## 📂 Project Structure

```text
Scalable-image-uploader/
│
├── src/
│   ├── app.js
│   └── s3.js
│
├── .github/workflows/ci.yml
├── .env.example
├── .gitignore
├── README.md
├── nginx.conf
├── package.json
```

---

## ⚙️ Setup Instructions (Local)

### 1. Clone repository

```bash
git clone https://github.com/Himanshukumar142/Scalable-image-uploader.git
cd Scalable-image-uploader
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Configure environment variables

Create `.env` file:

```env
PORT=3001

AWS_REGION=us-east-2
S3_BUCKET_NAME=your_bucket_name
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
```

---

### 4. Run multiple backend instances

Terminal 1:

```bash
PORT=3001 npm start
```

Terminal 2:

```bash
PORT=3002 npm start
```

---

### 5. Configure NGINX

```nginx
upstream image_servers {
    server 127.0.0.1:3001;
    server 127.0.0.1:3002;
}

server {
    listen 80;

    location / {
        proxy_pass http://image_servers;
    }
}
```

---

## ☁️ EC2 Deployment

### Steps:

* Launch Ubuntu EC2 instance
* Install Node.js, npm, Git
* Clone repository
* Configure `.env`
* Use PM2 to run multiple instances
* Install and configure NGINX

### Run backend using PM2

```bash
PORT=3001 pm2 start src/app.js --name server-1
PORT=3002 pm2 start src/app.js --name server-2
```

### Public Access

```text
http://18.216.101.9
```

---

## 🧪 API Usage

### Endpoint

```http
POST /upload
```

### Request

* Content-Type: `multipart/form-data`
* Key: `image`
* Value: Image file (JPG/PNG)

---

### Response

```json
{
  "url": "https://your-bucket.s3.us-east-2.amazonaws.com/file.png",
  "handledBy": "3001"
}
```

---

## 🔍 Load Balancing Verification

* Open: `http://18.216.101.9`
* Refresh multiple times
* Observe alternating responses from different ports
* Check logs using:

```bash
pm2 logs
```

---

## ⚙️ CI/CD (GitHub Actions)

* Runs on every push and pull request
* Installs dependencies
* Starts server to verify build
* Fails if server crashes

---

## 🔐 Security Considerations

* `.env` file is ignored using `.gitignore`
* AWS credentials are not exposed
* Backend ports (3001, 3002) are private
* Only port 80 is publicly accessible via NGINX

---

## 🎯 Design Decisions

* **No database:** Keeps system stateless and scalable
* **S3 storage:** Externalizes file storage
* **NGINX:** Enables horizontal scaling
* **PM2:** Ensures process management and uptime
* **Image resizing:** Reduces storage and bandwidth usage

---

## 🚀 Future Improvements

* Signed S3 URLs for secure access
* Authentication & authorization
* CDN integration (CloudFront)
* Monitoring & logging (CloudWatch)

---

## 🏁 Conclusion

This project demonstrates how to build a **scalable, production-ready backend system** using modern tools and cloud services.

---
