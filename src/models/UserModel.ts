import mongoose from "mongoose";
import { User } from "./UserTypes";

// Custom email validation function
const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// 1. create schema.
const userSchema = new mongoose.Schema<User>({
    name: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 50,
        trim: true,
        match: /^[a-zA-Z\s]+$/,
        validate: {
            validator: function(v: string) {
                return /^[a-zA-Z\s]+$/.test(v);
            },
            message: props => `${props.value} is not a valid name! Only letters and spaces are allowed.`
        },
        set: function(v: string) {
            return v.split(' ').map((word) => word.replace(/^./, word[0].toUpperCase())).join(' ');
        }
    },

    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(value: string) {
                return isValidEmail(value);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },

    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 100
    }

}, { timestamps: true });

const userModel = mongoose.model<User>('User', userSchema);

export default userModel;
