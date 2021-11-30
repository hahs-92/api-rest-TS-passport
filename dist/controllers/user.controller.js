"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signIn = exports.signUp = void 0;
//models
const user_model_1 = __importDefault(require("../models/user.model"));
//helpers
const createToken_1 = require("../helpers/createToken");
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({
            msg: 'Please send your mail and password'
        });
    }
    //verificar que no exista ya el email
    const user = yield user_model_1.default.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).json({ msg: 'The user already exist' });
    }
    try {
        const newUser = new user_model_1.default(req.body);
        yield newUser.save();
        return res.status(201).json(newUser);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Something went wrong' });
    }
});
exports.signUp = signUp;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({
            msg: 'Please send your mail and password'
        });
    }
    try {
        const user = yield user_model_1.default.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ msg: 'The user does not exist' });
        }
        const isMatch = yield user.comparePassword(req.body.password);
        if (isMatch) {
            return res.status(201).json({
                token: (0, createToken_1.createToken)(user)
            });
        }
        return res.status(400).json({
            msg: "email or password are incorrect"
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Something went wrong' });
    }
});
exports.signIn = signIn;
