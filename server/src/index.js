import app from "./app.js";
import connectDb from "./config/connect.js";
const port =process.env.PORT || 8000;

connectDb()
  .then((_) => {
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch((err) => {
    console.error("Error connecting to the database", err);
    process.exit(1); // Exit the process with an error status
  });
