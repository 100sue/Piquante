require("dotenv").config()

const express = require("express")
const app = express()
const cors = require("cors")
const port = 3000
const multer = require("multer")

const storage = multer.diskStorage ({
    destination: "images/",
    filename: function(req, file, cb) {
        cb(null, makeFilname(req,file))
    }

})

function makeFilname(file){
    const fileName = `${Date.now()}-${file.originalname}`.replace(/\s/g,"-")
    file.fileName = fileName
    return fileName
}

const upload = multer({storage: storage})


// Connection to database :
require("./mongo")


// Controllers :
const {createUser,logUser} = require("./controllers/users")
const {getSauces, createSauce} = require("./controllers/sauces")

// Middlewares :
app.use(cors())
app.use(express.json())

const { authenticateUser } = require("./middleware/auth")


// Routes :
app.post("/api/auth/signup", createUser)
app.post("/api/auth/login", logUser)
app.get("/api/sauces", authenticateUser, getSauces)
app.post("/api/sauces", authenticateUser, upload.single("image"), createSauce)
app.get("/", (req, res) => res.send("hello"))


// Listen :
app.listen(port, () => console.log("listenning on port" + port ))

