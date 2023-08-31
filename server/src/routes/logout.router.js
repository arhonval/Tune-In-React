const router = require("express").Router();

router.get("/", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("ExamCookie");
    res.json({});
  });
});
module.exports = router;
