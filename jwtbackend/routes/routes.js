const router = require('express').Router();
const controller=require("../controllers/controllers");
const verifyToken=require("../controllers/tokenv");

router.post('/register', controller.NewUser);
router.get('/work', controller.working);
router.post('/login',controller.login);
router.get("/dash",verifyToken,controller.dash);
module.exports = router;
