//The model file has the structure of all the collections(analogous to tables in rdbms).With most NOSQL databases,theyre very flexible meaning that you do not have to go on the database level and declare all the types for fields etc.However we want some structure at the application level,which is what mongoose does
//Here we create our schema and export it as a model
//anytime we create anything in the database it has an _id field and that's the object ID and it has its own type
//Each product model will have properties and behaviours as declared in our Schema
//Each schema maps to a MongoDB collection and defines the shape of the documents within that collection
//To use our schema definition we need to convert the schema into a model
//For each table i want i create a new schema with whatever parameters i want in that
//the user parameter is required to establish a relationship to the userModel schema since we need to know who gave the review,who added the product etc.
import mongoose from "mongoose";
const reviewSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
    },
    name:{
        type:String,
        required:true,
    },
    rating:{
        type:Number,
        required:true,
    },
    comment:{
        type:String,
        required:true,
    },

},
{
    timestamps:true,
}
);
 const productSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
    },
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    brand:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    reviews:[reviewSchema],
    rating:{
        type:Number,
        required:true,
        default:0,
    },
    numReviews:{
        type:Number,
        required:true,
        default:0,
    },
    price:{
        type:Number,
        required:true,
        default:0,
    },
    countInStock:{
        type:Number,
        required:true,
        default:0,
    },

},{timestamps:true,});
//timestamps used to add the CreatedAt field i.e time of creation
const Product=mongoose.model("Product",productSchema);//Product is the model we are creating and productSchema is the schema we want to use
//In mongoose, a schema represents the structure of a particular document, either completely or just a portion of the document. It's a way to express expected properties and values as well as constraints and indexes. A model defines a programming interface for interacting with the database (read, insert, update, etc). So a schema answers "what will the data in this collection look like?" and a model provides functionality like "Are there any records matching this query?" or "Add a new document to the collection".
export default Product;