// No many-to-many rlationships. All one-to-many relationships.

// User
// > Users have many comments
// > Users have many Blogs
// > User will not have any foreign keys

// Blog
// > Blogs belong to one User
// > Blogs can have many Comments
// > Has foreign key that points to the User

// Comment
// > Comment belongs to one User
// > Comment belongs to one Blog
// > Has foreign key for the User
// > Has foreign key for the Blog
