const { handleCreateImage, getImagesOfUser, getUnSeenImages, setUnseenImageToSeen, getSingleImage, AddBtnMessageId } = require("../Controller/ImageController");

const router = require("express").Router()
router.post("/create",handleCreateImage);
router.get("/:owner",getImagesOfUser)
router.get("/single/:messageId",getSingleImage)
router.get("/countUnseenImages/:owner",getUnSeenImages)
router.put("/setUnseenToseen/:owner",setUnseenImageToSeen)
router.put("/addBtnMessageId/:messageId",AddBtnMessageId)
module.exports = router;