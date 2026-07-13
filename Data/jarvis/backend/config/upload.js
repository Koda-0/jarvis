const multer = require('multer');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

const uploadDir = path.join(__dirname, '..', 'uploads');

// create folder if not exists
fs.mkdirSync(uploadDir, { recursive: true });

function generateFilename(originalName) {
    const ext = path.extname(originalName).toLowerCase();
    const unique = Date.now() + '-' + crypto.randomBytes(6).toString('hex');
    return unique + ext;
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => cb(null, generateFilename(file.originalname))
});

const imageMimeRegex = /^(image\/jpeg|image\/png|image\/gif|image\/webp)$/i;
const allowedExt = /\.(jpg|jpeg|png|gif|webp)$/i;

const fileFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname || '').toLowerCase();
    if (allowedExt.test(ext) && imageMimeRegex.test(file.mimetype)) {
        return cb(null, true);
    }

    return cb(new Error('Only image files are allowed (jpg, jpeg, png, gif, webp)'));
};

module.exports = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
    fileFilter
});