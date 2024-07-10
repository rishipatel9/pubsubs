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
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const redis = (0, redis_1.createClient)();
const createConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield redis.connect();
        console.log("subscriber redis connected");
    }
    catch (e) {
        console.log(e);
    }
});
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    createConnection();
    try {
        yield redis.subscribe("user1", (message) => {
            console.log("Message : ", message);
        });
    }
    catch (e) {
        console.log(e);
    }
});
main();
