"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const database_1 = __importDefault(require("./utils/database"));
const config_1 = __importDefault(require("./config"));
const routes_1 = __importDefault(require("./routes"));
class Server {
    app;
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        this.app.use((0, body_parser_1.json)());
        this.app.use((0, body_parser_1.urlencoded)({ extended: true }));
        this.app.use((0, cors_1.default)(config_1.default.corsOptions));
        this.app.use((0, morgan_1.default)('tiny'));
        // Aquí se puede configurar cualquier otra opción de la aplicación
    }
    routes() {
        // Aquí se pueden agregar más rutas o middlewares si es necesario
        this.app.use('/api/v1/pigmeo', routes_1.default);
    }
    listen() {
        (0, database_1.default)();
        this.app.listen(config_1.default.port, () => {
            console.log(`Server started at ${config_1.default.port}`);
        });
    }
}
exports.default = Server;
