const {Router} = require("express");
const router = Router();
const Course = require('../models/course')

router.get('/', async (req, res) => {
    const courses = await Course.find().populate('userId', 'email name').select('cost title img');
    console.log(courses);
    res.render('courses', {
        title: "Courses",
        isCourses: true,
        courses: courses,
    });
})

router.get('/:id', async (req, res) => {
    const course = await Course.findById(req.params.id);
    console.log(req.params.id)
    res.render('course', {
        layout: "empty",
        title: `Курс ${course.title}`,
        course 
    });
})

router.post('/edit', async (req, res) => {
    const { id } = req.body;
    delete req.body.id;
    await Course.findByIdAndUpdate(id, req.body)
    res.redirect('/courses');
})

router.get('/:id/edit', async (req, res) => {
    if (!req.query.allow) {
        return res.redirect('/')
    }

    const course = await Course.findById(req.params.id);

    res.render('course-edit', {
        title: `Редактировать ${course.title}`,
    course,        
    })
})

router.post('/remove/', async (req, res) => {
    try {
        await Course.deleteOne({_id: req.body.id})
        res.redirect('/courses')
    } catch (err) {
        console.log(err)
    }
})

module.exports = router;
