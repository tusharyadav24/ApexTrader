const mongoose = require("mongoose");
const passportLocalMongooseModule = require("passport-local-mongoose");
const passportLocalMongoose = passportLocalMongooseModule.default || passportLocalMongooseModule;
const { UserSchema } = require("../schemas/UserSchema");

UserSchema.plugin(passportLocalMongoose, { usernameField: "username" });

module.exports = mongoose.model("User", UserSchema);