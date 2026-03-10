const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

const armazen = multer.diskStorage({
    destination: path.resolve(__dirname, '..', 'src', 'uploads'),
    filename: (req, file, cb) => {
        crypto.randomBytes(16, (err, hash) => {
            if (err) cb(err);
            
            cb(null, hash.toString('hex') + path.extname(file.originalname));
        });
    }
});

const uploadImagens = multer({ storage: armazen });

module.exports = uploadImagens;