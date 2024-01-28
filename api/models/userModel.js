import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, 'user must have a username'],
      unique: true,
    },

    email: {
      type: String,
      required: [true, 'user must have an email'],
      unique: true,
    },

    email: {
      type: String,
      required: [true, 'user must set a password'],
    },
  },
  { timestamps: true } // gives us time of creation and updation of a document
);

const User = mongoose.model('User', userSchema);

export default User;
