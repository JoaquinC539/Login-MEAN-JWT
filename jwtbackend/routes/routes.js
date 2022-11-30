const router = require('express').Router();
const { Router } = require('express');
const controller=require("../controllers/controllers");
const verifyToken=require("../controllers/tokenv");

router.post('/register', controller.NewUser);
router.get('/work', controller.working);
router.post('/login',controller.login);
router.get("/dash",verifyToken,controller.dash);
router.get("/tickets",verifyToken,controller.getTickets);
router.post("/pticket",verifyToken,controller.newTicket);
router.put("/updateticket",verifyToken,controller.updateTicket);
router.post("/deleteticket",verifyToken,controller.deleteTicket);
module.exports = router;
