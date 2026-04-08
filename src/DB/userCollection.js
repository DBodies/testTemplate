import {mongoose, model, Schema} from "mongoose";
import { ROLES } from "../constants/constants.js";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
     role: {
    type: String,
    enum: [ROLES.ADMIN, ROLES.USER, ROLES.GUEST],
    default: ROLES.GUEST
    }
},
    {
        timestamps: true,
        versionKey:false
    }
) 
userSchema.methods.toJSON = function () {
    const obj = this.toObject()
    delete obj.password
    return obj
}
export const userCollection = model('userTemplate', userSchema, 'userTemplate')

const sessionSchema = new mongoose.Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'userTemplate'},
    accessToken: {type: String, required: true},
    accessTokenValidUntil: {type: Date, required: true},
    refreshToken: {type: String, required: true},
    refreshTokenValidUntil: {type: Date, required: true}
});

export const SessionCollection = model('sessions', sessionSchema);
