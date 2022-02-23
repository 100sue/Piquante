
const mongoose = require ("mongoose")
const password = process.env.DB_PASSWORD
const userName = process.env.DB_USER
const db = process.env.DB_NAME
const uri = `mongodb+srv://${userName}:${password}@cluster0.0u2ox.mongodb.net/${db}?retryWrites=true&w=majority`

mongoose.connect(uri)

.then((()=> console.log("Connected to mongo")))
.catch((err)=> console.error("Error connecting to mongo !!", err))

const userSchema = new mongoose.Schema({
    email: String,
    password: String
})

const User = mongoose.model("User", userSchema)

module.exports ={mongoose, User}
