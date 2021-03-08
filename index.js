const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const aggregate = require("./aggregate.json");

app.get("/token/:tokenId", (req, res) => {
	if (aggregate[req.params.tokenId]) {
		return res.status(200).send(aggregate[req.params.tokenId]);
	}
	return res.status(400).send({ success: false });
});

app.get("/contract", (req, res) => {
	return res.status(200).send({
		description:
			"gweiFace is a collection of 9,999 unique pieces of NFT art. gweiFaces are created through a random, unique combination of five characteristics: face, hair, shirt, accessory, and background. The rarities of these five characteristics vary, so look out for the rare gweiFaces! You can learn more about the project on our website (gweiface.com) and you can stay up to date on our project by following our twitter or joining our discord.",
		external_link: "https://www.gweiface.com/",
		image: "https://storage.googleapis.com/gwei-faces/logo.png",
		name: "gweiFaces",
	});
});

const listener = app.listen(process.env.PORT || 5000, () => {
	console.log("Running on port " + listener.address().port);
});
