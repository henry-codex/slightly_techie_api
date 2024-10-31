 const express = require('express');
    const router = express.Router();


    //routes
    router.get('', (req, res) => {
        const locals = {
            title: "Blog_API",
            description: "A simple blog API",
        }


        res.render('index', { locals });
        }); 

        router.get('/about', (req, res) => {
            res.render('about');
            });

    module.exports = router;