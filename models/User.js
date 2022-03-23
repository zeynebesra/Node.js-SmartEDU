const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['student', 'teacher', 'admin'],
    default: 'student',
  },
  courses: [
    //courses alanı bir array ve öğrenci her yeni kursa kaydolduğunda bu arrayimize yeni bir kurs bilgisi eklenecek.
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
    },
  ],
});

// bcrypt
// modelimizde password alanını şifreleyip "hash" e çeviriyoruz
//ve veritabanımına şifrelenmiş şekilde kaydediyoruz.

// UserSchema.pre('save', function (next) {
//   const user = this;
//   bcrypt.hash(user.password, 10, (error, hash) => {
//     user.password = hash;
//     next();
//   });
// });

//stackoverflow
//How to prevent Mongoose from rehashing the user passwords after modifying a user?

UserSchema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) return next();

  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
