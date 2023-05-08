const app = require(`${__dirname}/app`);
const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}...`);
});
