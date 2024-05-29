const crypto = require('crypto');

function encrypt(password) {
    const salt = crypto.randomBytes(16).toString('hex');
    const hashedPassword = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha256').toString('hex');
    return `${salt}:${hashedPassword}`;
}

function comparePassword(storedPassword, suppliedPassword) {
    const [salt, hash] = storedPassword.split(':');
    const suppliedHash = crypto.pbkdf2Sync(suppliedPassword, salt, 1000, 64, 'sha256').toString('hex');
    return hash === suppliedHash;
}

module.exports = {
    encrypt,
    comparePassword
};
