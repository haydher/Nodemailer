const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

app.use(cors());
// body parser
app.use(bodyParser.json());

app.post("/", (req, res) => {
 console.log("req.body", req.body);
 res.send({ status: 200, message: "Form submitted successfully" });
});

const port = 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));
