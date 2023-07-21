const router = require('express').Router()
let pool = require('./../config/db')


router.post('/login', (req, res) => {
    pool.query(`select * from user where email="${req.body.email}"`, function (error, results, fields) {
        if (error) throw error;
        if (results.length && req.body.email === results[0].email) {
            if (req.body.password !== results[0].password) {
                res.status(400).json({
                    sucuess: false,
                    message: "Password is incorrect",
                })
            }
            else {
                res.status(200).json({
                    sucuess: true,
                    message: "login successful",
                })
            }

        }
        else {
            res.status(400).json({
                sucuess: false,
                message: "user not found",
            })
        }
    });
})

router.post('/register', (req, res) => {
    const { email, password } = req.body;
    console.log("###### email", email)
    pool.query('insert into user value (?,?)', [email, password], function (error, results, fields) {
        if (error) throw error;
        if (results.affectedRows > 0) {
            res.status(200).json({
                sucuess: true,
                message: "data inserted sucessfully",
            })
        }
        else {
            res.status(400).json({
                sucuess: false,
                message: "insertion failed",
            })
        }
    });

})

module.exports = router;