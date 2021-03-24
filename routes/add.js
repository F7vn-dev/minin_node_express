const {Router} = require("express");
const Course = require('../models/course')

const router = Router();

router.get('/', (req, res) => {
    res.render('addCourse', {
        title: "Add Course",
        isAddCourse: true
    });
 });

router.post('/', async (req, res) => {
    const course = new Course({
        title: req.body.title,
        cost: req.body.cost,
        img: req.body.img,
    })
    try {
        await course.save();
        res.redirect('/courses');
    } catch (err) {
        console.log(err)
    }
})

module.exports = router;
