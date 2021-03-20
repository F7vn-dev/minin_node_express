const {Router} = require("express");
const router = Router();

router.get('/', (req, res) => {
    res.render('addCourse', {
        title: "Add Course",
        isAddCourse: true
    });
 });

router.post('/', (req, res) => {
    console.log(req.body)

    res.redirect('/courses')
})

module.exports = router;
