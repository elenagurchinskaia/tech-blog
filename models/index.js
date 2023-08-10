// No many-to-many relationships. All one-to-many relationships.
const User = require("./User");
const Blog = require("./Blog");
const Comment = require("./Comment");

// User
User.hasMany(Comment, {
  foreignKey: "user_id",
});
// > Users have many comments
// > Users have many Blogs
User.hasMany(Blog, {
  foreignKey: "user_id",
});
// > User will not have any foreign keys

// Blog
Blog.belongsTo(User, {
  foreignKey: "user_id",
});
// > Blogs belong to one User
Blog.hasMany(Comment, {
  foreignKey: "blog_id",
});
// > Blogs can have many Comments
// > Has foreign key that points to the User

// Comment
// > Comment belongs to one User
Comment.belongsTo(User, {
  foreignKey: "user_id",
});
// > Comment belongs to one Blog
// > Has foreign key for the User
Comment.belongsTo(Blog, {
  foreignKey: "blog_id",
});
// > Has foreign key for the Blog
