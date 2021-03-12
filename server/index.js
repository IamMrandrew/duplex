"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
require('dotenv').config();
const app = express_1.default();
app.use(express_1.default.json());
app.use(cors_1.default());
if (process.env.NODE_ENV === 'production') {
    app.use(express_1.default.static(path_1.default.join(__dirname, '../client/build')));
    app.get('*', (req, res) => {
        res.sendFile(path_1.default.join(__dirname, '../client', 'build', 'index.html'));
    });
}
else {
    app.get('/', (req, res) => {
        res.send('Server is running!!');
    });
}
app.listen(process.env.PORT, () => {
    console.log('Server is running on port ' + process.env.PORT);
});
