import {mongoose, model, Schema} from "mongoose";

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
    }},
    {
        timestamps: true,
        versionKey:false
    }
) 
userSchema.method.toJSON = function () {
    const obj = this.toObject()
    delete obj.password
    return obj
}
export const userCollection = model('userTemplate', userSchema, 'userTemplate')

const sessionSchema = new mongoose.Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'userCollection'},
    accessToken: {type: String, required: true},
    accessTokenValidUntil: {type: Date, required: true},
    refreshToken: {type: String, required: true},
    refreshTokenValidUntil: {type: Date, required: true}
});

export const SessionCollection = model('sessions', sessionSchema);
