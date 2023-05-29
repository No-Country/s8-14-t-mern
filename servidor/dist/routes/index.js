"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fs_1 = require("fs");
const mainRouter = (0, express_1.Router)();
const PATH_ROUTES = `${__dirname}`;
// Remover extension del nombre del archivo
const removeExtension = (filename) => {
    return filename.split('.').shift();
};
// Import de todos los routers del directorio /routes
(0, fs_1.readdirSync)(PATH_ROUTES)
    .filter(file => {
    const cleanName = removeExtension(file);
    return cleanName !== 'index';
})
    .forEach(file => {
    const cleanName = removeExtension(file);
    Promise.resolve(`${`./${cleanName}.routes`}`).then(s => __importStar(require(s))).then((moduleRouter) => {
        console.log(`Cargando ruta: ${cleanName} ...`);
        mainRouter.use(`/${cleanName}`, moduleRouter.router);
    })
        .catch(err => {
        console.log(`No se pudo cargar ruta ${cleanName}`, err);
    });
});
//default index
mainRouter.get('/', (_req, res) => {
    res.send('Ok');
});
exports.default = mainRouter;
