const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

// Create model class based on schema
const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  // Create object that will be maped to a document in DB
  const course = new Course({
    name: "Node.js course 2",
    author: "Mosh",
    tags: ["node", "backend"],
    isPublished: true,
  });

  const result = await course.save();
  console.log(result);
}

async function getCourses() {
  /*
    Pagination:
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
  */
  const courses = await Course
    //find courses only where author is Mosh and published
    .find({ author: "Mosh", isPublished: true })
    //return author Mosh or Published
    .or([{ author: "Mosh" }, { isPublished: true }])
    //limit results to 10 items
    .limit(10)
    //.count() //count number of results
    //sort by name ascending
    .sort({ name: 1 })
    //return only selected fields: name and tags
    .select({ name: 1, tags: 1 });
  console.log(courses);
}

//getCourses();
//createCourse();
