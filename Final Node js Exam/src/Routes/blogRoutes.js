const express = require("express");
const router = express.Router();

const { createBlog,getBlogs,getSingleBlog,updateBlog,deleteBlog} = require("../Controllers/auth/blogController");

const { verifyToken } = require("../middleware/authMiddleware");

router.post("/blogs", verifyToken, createBlog);
router.get("/blogs", verifyToken, getBlogs);
router.get("/blogs/:id", verifyToken, getSingleBlog);
router.put("/blogs/:id", verifyToken, updateBlog);
router.delete("/blogs/:id", verifyToken, deleteBlog);

module.exports = router;