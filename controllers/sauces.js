const mongoose = require("mongoose")


const productSchema = new mongoose.Schema({
    userId: String,
    name: String,
    manufacturer: String,
    description: String,
    mainPepper: String,
    imageUrl: String,
    heat: Number,
    likes: Number,
    dislikes: Number,
    usersLiked: [String],
    usersDisliked: [String]
})
const Product = mongoose.model("Product", productSchema)


function getSauces(req,res) {
        console.log("le token a été validé, bienvenue sur getSauces")
        Product.find({}).then(products => res.send(products))

    }


function createSauce(req,res) {
    const name = req.body.name
    const manufacturer = req.body.manufacturer
    console.log({body: req.body})
    
    const product = new Product ({
        userId: String,
        name: String,
        manufacturer: String,
        description: String,
        mainPepper: String,
        imageUrl: String,
        heat: Number,
        likes: Number,
        dislikes: Number,
        usersLiked: [String],
        usersDisliked: [String]
    })
    product.save().then((res)=> console.log("Produit enregistré",res)).catch(console.error)

}

module.exports = { getSauces, createSauce}