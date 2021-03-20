const {Router} = require("express");
const router = Router();

router.get('/', (req, res) => {
    res.render('addCourse', {
        title: "Add Course",
        isAddCourse: true
    });
 });

module.exports = router;
