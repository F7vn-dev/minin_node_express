const {Router} = require("express");
const router = Router();
const Course = require('../models/course')

router.get('/', async (req, res) => {

    const courses = await Course.getAll();
    console.log(courses);
    res.render('courses', {
        title: "Courses",
        isCourses: true,
        courses: courses,
    });
})

module.exports = router;
