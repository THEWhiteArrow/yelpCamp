const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
   email: {
      type: String,
      required: true,
      unique: true
   },
   phone: {
      min:[100000000, 'Invalid Phone Number'],
      max:[999999999,'Invalid Phone Number'],
      type: Number,
      required: true,
      unique:true
   },
   
});

UserSchema.virtual('spacedPhoneNumber').get(function() {
   const stringNumber = this.phone.toString();
   return stringNumber.slice(0, 3) + ' ' + stringNumber.slice(3, 6) + ' ' + stringNumber.slice(6, 9);
})

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);