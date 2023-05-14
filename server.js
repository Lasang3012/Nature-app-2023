require("dotenv").config();
const app = require(`${__dirname}/src/app`);

const PORT = process.env.PORT || 3333;
console.log(PORT);
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}...`);
});
