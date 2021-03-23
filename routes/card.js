const {Router} = require("express");
const router = Router();
const Card = require("../models/card");
const Course = require("../models/course");

router.get("/add/:id", async (req , res) => {
    const course = await Course.getById(req.params.id);
    await Card.add(course);
    res.redirect(`/card`)
})

router.get("/", async (req, res) => {
    const card = await Card.fetch();
    res.render('card', {
        title: "Basket",
        courses: card.courses,
        cost: card.cost,
        isCard: true,
    })
});

module.exports = router;
