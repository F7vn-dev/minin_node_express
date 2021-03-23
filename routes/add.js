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
    console.log(req.body)

    const course = new Course(req.body.title, req.body.cost, req.body.img);
    await course.save();
    res.redirect('/courses')
})

module.exports = router;
