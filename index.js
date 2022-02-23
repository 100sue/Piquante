require("dotenv").config()
const express = require("express")
const app = express()
const cors = require("cors")
const port = 3000


// Connection to database :
require("./mongo")


// Controllers :
const {createUser} = require("./controllers/users")


// Middlewares :
app.use(cors())
app.use(express.json())


// Routes :
app.post("/api/auth/signup", createUser)
app.get("/", (req, res) => res.send("hello"))


// Listen :
app.listen(port, () => console.log("listenning on port" + port ))

