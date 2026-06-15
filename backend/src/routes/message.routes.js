import express, { Router } from "express"

const router = express.Router()

router.get("/send", (req, res) => {
    res.send("Send msg endpoint")
})
router.get("/receive", (req, res) => {
    res.send("Receive msg endpoint")
})


export default router