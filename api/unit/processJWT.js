const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET_KEY;

exports.generalJWT = (payload) => {
    return jwt.sign({payload, exp: Math.floor(Date.now() / 1000) + (60 * 15)}, secretKey);
}

exports.parseJWT = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secretKey, (error, payload) => {
            if (error) {
                reject(error);
            } else {
                resolve(payload);
            }
        })
    });
}