import mongoose from "mongoose";
import validator from "validator";

export interface IUser {
  user_name: string;
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema<IUser>({
  user_name: {
    type: String,
    required: [true, "Please provide a username"],
    minLength: [3, "username must be at least 4 characters"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide a email address"],
    validate: {
      validator: function (value: string) {
        return validator.isEmail(value);
      },
      message: (props: any) => `${props.value} is not a valid email address`,
    },
    trim: true,
    lowercase: true,
    unique: true,
    index: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    validate: {
      validator: function (value: string) {
        return !validator.contains(value, "password");
      },
      message: (props: any) => `${props.value} is not a valid password`,
    },
    trim: true,
  },
});

const UserModel = mongoose.model<IUser>("user", userSchema);

export default UserModel;
