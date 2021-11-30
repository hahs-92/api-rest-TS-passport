"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//config
const config_1 = __importDefault(require("../config/config"));
const createToken = (user) => {
    const token = jsonwebtoken_1.default.sign({
        id: user.id,
        email: user.email
    }, config_1.default.jwtSecret, {
        expiresIn: '1d'
    });
    return token;
};
exports.createToken = createToken;
