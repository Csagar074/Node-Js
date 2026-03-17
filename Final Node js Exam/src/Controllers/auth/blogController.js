const Blog = require("../../models/block.model");

// Create Blog
exports.createBlog = async (req, res) => {
  try {
    const blog = await Blog.create({
      ...req.body,
      authorId: req.user.id,
    });

    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Blogs (User-wise + Filter)
exports.getBlogs = async (req, res) => {
  try {
    const { category } = req.query;

    let filter = {
      authorId: req.user.id,
      isDeleted: false,
    };

    if (category) filter.category = category;

    const blogs = await Blog.find(filter).sort({ createdAt: -1 });

    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Single Blog
exports.getSingleBlog = async (req, res) => {
  try {
    const blog = await Blog.findOne({
      _id: req.params.id,
      isDeleted: false,
    });

    if (!blog)
      return res.status(404).json({ message: "Blog not found" });

    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Blog (Only Author)
exports. updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findOne({
      _id: req.params.id,
      authorId: req.user.id,
      isDeleted: false,
    });

    if (!blog)
      return res.status(403).json({ message: "Not allowed" });

    Object.assign(blog, req.body);
    await blog.save();

    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Soft Delete Blog
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findOne({
      _id: req.params.id,
      authorId: req.user.id,
      isDeleted: false,
    });

    if (!blog)
      return res.status(403).json({ message: "Not allowed" });

    blog.isDeleted = true;
    await blog.save();

    res.json({ message: "Blog deleted (soft)" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};