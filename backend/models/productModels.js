const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type:String,
        required:[true,"Please Enter Product Name"],
        trim:true
    },
    description: {
        type:String,
        required:[true,"Please Enter a Product Description"]
    },
    price: {
        type:Number,
        required:[true,"Please Enter Price Details"],
        maxLength:[8,"Length cannot Exceed 8 digits"]
    },
    ratings: {
        type:Number,
        default:0
    },
    images: [
        {
            public_id: {
                type:String,
                required:true
            },
            url: {
                type:String,
                required:true
            }
        }
    ],
    category: {
        type:String,
        required:true
    },
    Stock :{
        type:Number,
        required:[true,"Please Enter Product Stock"],
        maxLength: 4,
        default: 1
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            name: {
                type: String,
                required: true
            },
            rating: {
                type:Number,
                required:true
            },
            comment: {
                type: String,
                required:true
            }
        }
    ],
    createdAt: {
        type: Date,
        deafult: Date.now
    }
})

module.exports = mongoose.model("Product",productSchema);