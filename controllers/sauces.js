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
    const {body, file} = req
    const sauce = JSON.parse(body.sauce)
    const {name,manufacturer, description, mainPepper, heat, userId, } = sauce

    const product = new Product ({
        userId,
        name,
        manufacturer,
        description,
        mainPepper,
        imageUrl,
        heat,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: []
    })
    product.save().then((res)=> console.log("Produit enregistré",res)).catch(console.error)

}

module.exports = { getSauces, createSauce}