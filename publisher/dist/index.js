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
const express_1 = __importDefault(require("express"));
const redis_1 = require("redis");
const client = (0, redis_1.createClient)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post('/put', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body)
        return res.status(404).json({
            message: 'No messages Sent'
        });
    const { message, username } = req.body;
    try {
        yield client.publish(username, message);
        console.log('Message Sent');
    }
    catch (e) {
        console.error(e);
        return res.json(503).json({
            message: "Something went wrong"
        });
    }
    return res.status(200).json({
        message: "OK"
    });
}));
const startClient = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield client.connect();
        console.log("Redis Connected Sucessfully");
        app.listen(3000, () => {
            console.log("App is Listening on Port 3000");
        });
    }
    catch (e) {
        console.error(e);
    }
});
startClient();
