const { handleCreateImage, getImagesOfUser } = require("../Controller/ImageController");

const router = require("express").Router()
router.post("/create",handleCreateImage);
router.get("/:owner",getImagesOfUser)

module.exports = router;