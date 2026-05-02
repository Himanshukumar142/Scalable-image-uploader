require("dotenv").config();

const express = require("express");
const multer = require("multer");
const crypto = require("crypto");
const sharp = require("sharp");
const { uploadToS3, getSignedImageUrl } = require("./s3");
const app = express();
const PORT = process.env.PORT || 3001;

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 2 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
            cb(null, true);
        } else {
            cb(new Error("Only JPG and PNG images are allowed"));
        }
    },
});

app.get("/", (req, res) => {
    res.send(`Server is running on port ${PORT}`);
});

app.post("/upload", upload.single("image"), async (req, res) => {
    try {
        console.log(`Request handled by server ${PORT}`);

        if (!req.file) {
            return res.status(400).json({ error: "Image file is required" });
        }

        const ext = req.file.originalname.split(".").pop();
        const fileName = `${Date.now()}-${crypto.randomUUID()}.${ext}`;

        const resizedBuffer = await sharp(req.file.buffer)
            .resize(800, 800, { fit: "inside" })
            .toBuffer();

        const fileToUpload = {
            buffer: resizedBuffer,
            mimetype: req.file.mimetype,
        };
        await uploadToS3(fileToUpload, fileName);
        const url = await getSignedImageUrl(fileName);

        res.status(201).json({
            url,
            handledBy: PORT,
        });
    } catch (error) {
        console.log("Upload error:", error.message);
        res.status(500).json({ error: "Failed to upload image" });
    }
});

app.use((err, req, res, next) => {
    if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({ error: "File size should be less than 2MB" });
    }

    res.status(400).json({ error: err.message });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});