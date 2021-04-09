const express = require("express");
const router = express.Router();
const handleError = require("../controllers/handleError");

router.post("/error",(req,res)=>{
    handleError(req.body,res);
});

module.exports = router;
