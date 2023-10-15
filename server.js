const app = require("./app");
const mongoose = require("mongoose");

const { PORT = 3000, MONGO_URL } = process.env;

mongoose
  .connect(MONGO_URL)
  .then(
    console.log(`=============================================================
Database connection successful:          ${new Date().toLocaleString()}  
=============================================================`)
  )
  .then(() => {
    app.listen(PORT, () => {
      console.log(`=============================================================
Server is up and running on port: ${PORT}:  ${new Date().toLocaleString()}
=============================================================`);
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
