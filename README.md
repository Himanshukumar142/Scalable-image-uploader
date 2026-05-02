# Scalable Image Upload Server (No Database)

## 📌 Overview

This project is a scalable backend system that allows users to upload images. It uses multiple backend instances with NGINX load balancing and stores images on AWS S3.

---

## 🚀 Features

* Upload images using `POST /upload`
* Supports JPG and PNG formats only
* File size limit: 2MB
* Images stored on AWS S3
* Multiple backend servers running simultaneously
* NGINX load balancing (round-robin)
* GitHub Actions CI pipeline
* No database used

---

## 🛠️ Tech Stack

* Node.js (Express)
* AWS S3 (Storage)
* NGINX (Load Balancer)
* GitHub Actions (CI)

---

## 📂 Project Structure

```
scalable-image-upload-server/
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

## ⚙️ Setup Instructions

### 1. Clone repository

```
git clone <your-repo-url>
cd scalable-image-upload-server
```

### 2. Install dependencies

```
npm install
```

### 3. Configure environment variables

Create a `.env` file:

```
PORT=3001
AWS_REGION=us-east-2
S3_BUCKET_NAME=your_bucket_name
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
```

### 4. Run multiple backend servers

Terminal 1:

```
PORT=3001 npm start
```

Terminal 2:

```
PORT=3002 npm start
```

---

## 🔁 NGINX Load Balancer

### Configuration (nginx.conf)

```
events {}

http {
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
}
```

### Run NGINX

```
nginx.exe
```

---

## 🧪 API Testing

### Endpoint

```
POST /upload
```

### Request

* Type: `multipart/form-data`
* Key: `image`
* Value: file (jpg/png)

### Response

```
{
  "url": "https://your-bucket.s3.us-east-2.amazonaws.com/file.png",
  "handledBy": "3001"
}
```

---

## 🔍 Load Balancing Verification

* Refresh `http://localhost`
* Observe alternating responses from port 3001 and 3002
* Check terminal logs for request distribution

---

## ⚙️ GitHub Actions CI

* Runs on push and pull request
* Installs dependencies
* Starts server to verify build
* Fails if server does not start

---

## 📌 Notes

* No database used
* AWS credentials are not committed (.env ignored)
* Designed for scalability and performance

---

## 🎯 Conclusion

This project demonstrates a scalable backend architecture using load balancing and cloud storage.
