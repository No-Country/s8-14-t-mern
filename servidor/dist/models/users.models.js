"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const mongoose_1 = require("mongoose");
const user_interface_1 = require("../interfaces/user.interface");
//TODO: modificar el campo requerido para que solo sea nombre, apellido, email y contraseña
//TODO: agregar datos para modificar perfil acorde al figma
const userSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    typeIdentification: {
        type: String,
        enum: Object.values(user_interface_1.IdentificationType)
    },
    numberIdentification: {
        type: Number,
        unique: false
    },
    alias: {
        type: String,
        unique: true,
        default: function () {
            return `${this.firstName}.${this.lastname}.${this.email.slice(0, 5)}`;
        }
    },
    phoneNumber: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    address: {
        type: String
    },
    avatar: {
        type: String,
        required: false
        // default:
        //   'https://res.cloudinary.com/dnautzk6f/image/upload/v1684479601/User-Pigmeo_ucusuy.jpg'
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        trim: true
    },
    balance: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    },
    rol: {
        type: String,
        enum: Object.values(user_interface_1.rolType),
        required: true,
        default: user_interface_1.rolType.user
    },
    token: {
        type: String,
        default: (0, uuid_1.v4)()
    }
}, { timestamps: true });
userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});
const User = (0, mongoose_1.model)('User', userSchema);
exports.default = User;
