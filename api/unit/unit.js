exports.passwordToMD5Hash = (text) => {
    const crypto = require("crypto");
    const salt = process.env.PASSWORD_SALT;
    return crypto.createHash("MD5").update(text + salt).digest("hex").toUpperCase();
}

exports.isEmpty = (data) => {
    return typeof data !== "number" &&
        typeof data !== "boolean" &&
        (!data || data === "undefined" || Object.keys(data).length === 0);
}