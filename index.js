const app = require("./src/app");
const config = require("./src/config");

app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`)
})