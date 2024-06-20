"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt = exports.hashingWork = exports.generateCVV = exports.generateCardNumber = void 0;
const crypto_1 = __importDefault(require("crypto"));
const randomatic_1 = __importDefault(require("randomatic"));
// Function to generate a 16-digit card number
function generateCardNumber() {
    let cardNumber = (0, randomatic_1.default)("0", 15); // Generate first 15 digits
    let checksum = luhnChecksum(cardNumber);
    return cardNumber + checksum;
}
exports.generateCardNumber = generateCardNumber;
// Function to generate a 3-digit CVV
function generateCVV() {
    return (0, randomatic_1.default)("0", 3);
}
exports.generateCVV = generateCVV;
// Luhn Algorithm to calculate the checksum digit
function luhnChecksum(number) {
    let sum = 0;
    for (let i = 0; i < number.length; i++) {
        let digit = parseInt(number[i]);
        if (i % 2 === number.length % 2) {
            digit *= 2;
            if (digit > 9)
                digit -= 9;
        }
        sum += digit;
    }
    return ((10 - (sum % 10)) % 10) + "";
}
// Function to hash data with a salt
function hashData(data) {
    const salt = crypto_1.default.randomBytes(16).toString("hex");
    const hash = crypto_1.default
        .createHash("sha256")
        .update(data + salt)
        .digest("hex");
    return { hash, salt };
}
// Function to encrypt data
function encryptData(data, key) {
    const bufferedKey = Buffer.from(key);
    const iv = crypto_1.default.randomBytes(16);
    const cipher = crypto_1.default.createCipheriv("aes-256-cbc", bufferedKey, iv);
    let encrypted = cipher.update(data, "utf8", "hex");
    encrypted += cipher.final("hex");
    return { iv: iv.toString("hex"), encryptedData: encrypted };
}
// Function to decrypt data
function decryptData(encryptedData, key, iv) {
    const bufferedKey = Buffer.from(key);
    const decipher = crypto_1.default.createDecipheriv("aes-256-cbc", bufferedKey, Buffer.from(iv, "hex"));
    let decrypted = decipher.update(encryptedData, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
}
// Example usage
const hashingWork = () => {
    const cardNumber = generateCardNumber();
    const cvv = generateCVV();
    const encryptionKey = crypto_1.default.randomBytes(32).toString("hex"); // Key should be securely stored
    const encryptedCard = encryptData(cardNumber, encryptionKey);
    const encryptedCVV = encryptData(cvv, encryptionKey);
    console.log("Card Number:", cardNumber);
    console.log("CVV:", cvv);
    console.log("Encrypted Card:", encryptedCard.encryptedData);
    console.log("Encrypted CVV:", encryptedCVV.encryptedData);
    return {
        card: {
            hashed: `${encryptedCard.encryptedData}.${encryptionKey}.${encryptedCard.iv}`,
            unhashed: cardNumber,
        },
        cvv: {
            hashed: `${encryptedCVV.encryptedData}.${encryptionKey}.${encryptedCVV.iv}`,
            unhashed: cvv,
        },
    };
};
exports.hashingWork = hashingWork;
// To decrypt
const decrypt = (encryptedData) => {
    const [encrypted, key, iv] = encryptedData.split(".");
    const decryptedCard = decryptData(encrypted, key, iv);
    console.log("Decrypted Card:", decryptedCard);
    return decryptedCard;
};
exports.decrypt = decrypt;
