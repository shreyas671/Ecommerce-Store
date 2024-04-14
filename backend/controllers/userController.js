const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const sendToken = require("../utils/jwtToken")
const User = require("../models/userModal")

//Register a User

exports.registerUser = catchAsyncError(async (req,res,next) => {

    const {name,email,password} = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {

        },
    });
    sendToken(user,201,res);
});

//Login User 

exports.loginUser = catchAsyncError( async (req,res,next) => {

    const {email,password} = req.body;

    //Check if the entered user has both email  and password

    if(!email || !password) {
        return next(new ErrorHandler("Please Enter Email and Password", 400))
    }

    const user = User.findOne({email}).select("+password");

    if(!user) {
        return next(new ErrorHandler('Invalid Email or Password',400));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched) {
        return next(new ErrorHandler("Invalid user or Password",401))
    }

    sendToken(user,200,res);

})

exports.logoutUser = catchAsyncError(async (req,res,next) => {
    
})