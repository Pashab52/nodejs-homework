const app = require('./app')

const {port=3000} = process.env;


app.listen(port, () => {
  console.log(`Server is up and running on port: ${port}`);
});

