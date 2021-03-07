const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const aggregate = require("./aggregate.json");

app.get("/token/:tokenId", (req, res) => {
	if (aggregate[req.params.tokenId]) {
		return res.status(200).send(aggregate[req.params.tokenId]);
	}
	return res.status(400).send({ success: false });
});

const listener = app.listen(process.env.PORT || 5000, () => {
	console.log("Running on port " + listener.address().port);
});
