const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

//Preparation of User Model
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: [30,"Name Cannot Exceed beyond 30 Characters"],
        minLength: [3,"name should be more than 3 characters"]
    },
    email: {
        type: String,
        required: [true,"Please Enter an Email Address"],
        unique: true,
        validate: [validator.isEmail,"Please Enter an Valid Email"]
    },
    password: {
        type: String,
        required: true,
        minLength: [8,"Password Should Exceed 8 Characters"],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: user
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date,
});

//Get JWT Token 

userSchema.methods.getJWTToken = async function() {
    return jwt.sign({
        id: this._id
    },
    process.env.JWT_SECRET,
    {
        expiresIn: process.env.JWT_EXPIRE
    }
    );
}


//Compare Password 

userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password,this.password);
}

userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) {
        next();
    }

    this.password = await bcrypt.hash(this.password,10);
})

//Generating Password reset Token

userSchema.methods.getpasswordresetToken = async function() {

}


module.exports = mongoose.model("User",userSchema);