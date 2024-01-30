import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, 'user must have a username'],
    },

    email: {
      type: String,
      required: [true, 'user must have an email'],
      unique: true,
    },

    password: {
      type: String,
      required: [true, 'user must set a password'],
    },
    avatar: {
      type: String,
      default: 'https://cdn-icons-png.flaticon.com/512/1053/1053244.png',
    },
  },
  { timestamps: true } // gives us time of creation and updation of a document
);

const User = mongoose.model('User', userSchema);

export default User;
