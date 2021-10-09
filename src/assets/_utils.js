const path = require("path");
const resources = [
  "_global.scss"
];

module.exports = resources.map((file) => path.resolve(__dirname, file));
