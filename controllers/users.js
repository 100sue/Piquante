const { User } = require("../mongo")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

async function createUser(req,res) {
    const { email, password } = req.body
    const hashedPassword = await hashPassword(password)
    const user = new User({ email, password: hashedPassword})
    user
    .save()
    .then(() => res.status(201).send({ message: "Utilisateur enregistré !" }))
    .catch((err) => res.status(409).send({message: "User pas enregistré :"+ err }) )
}


function hashPassword (password) {
    const saltRounds = 10
    return bcrypt.hash(password, saltRounds)
}


async function logUser(req,res) {
    try {
        const email = req.body.email
        const password = req.body.password
        const user = await User.findOne({email: email})
        const ispasswordok = await bcrypt.compare(password, user.password)
    
        if (!ispasswordok) {
            res.status(403).send({message: "Mot de passe incorrect"})
        }
        const token = createToken(email)
        res.status(200).send({ userId: user?._id, token: token})

    } catch(err) {
        console.error(err)
        res.status(500).send({message: "Erreur interne"})
    }
   
}


function createToken(email) {
    const jwtpassword = process.env.JWT_PASSWORD
    return jwt.sign({email: email}, jwtpassword, {expiresIn: "24h"})
    
}


module.exports = {createUser, logUser}