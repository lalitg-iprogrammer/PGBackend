const express = require('express')
const authRouter = require("./routes/authRoutes")

const app = express()
app.use(express.json())

app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use('/auth', authRouter)

app.listen(3000, () => {
    console.log("server is connected on port 3000")
})