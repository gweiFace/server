const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const aggregate = require("./aggregate.json");
const listAggreg = Object.entries(aggregate);

app.get("/token/:tokenId", (req, res) => {
	if (aggregate[req.params.tokenId]) {
		return res.status(200).send(aggregate[req.params.tokenId]);
	}
	return res.status(400).send({ success: false });
});

app.get("/factory/:factoryId", (req, res) => {
	if (req.params.factoryId === "0") {
		return res.status(200).send({
			name: "Mystery gweiFace",
			description: "Grants 1 unique Mystery gweiFace on purchase.",
			image: "https://storage.googleapis.com/gwei-faces/mystery.png",
		});
	} else if (req.params.factoryId === "1") {
		return res.status(200).send({
			name: "Bundled Mystery gweiFaces",
			description: "Grants 3 Mystery gweiFaces on purchase.",
			image: "https://storage.googleapis.com/gwei-faces/multi-mystery.png",
		});
	} else if (req.params.factoryId === "2") {
		return res.status(200).send({
			name: "Mystery gweiFace Lootbox",
			description:
				"Grants 1 unique gweiFace Lootbox at random on purchase",
			image: "https://storage.googleapis.com/gwei-faces/mystery.png",
		});
	}
	return res.status(400).send({ success: false });
});

app.get("/contract", (req, res) => {
	return res.status(200).send({
		description:
			"gweiFace is a collection of 9,999 unique pieces of NFT art. gweiFaces are created through a random, unique combination of five characteristics: face, hair, shirt, accessory, and background. The rarities of these five characteristics vary, so look out for the rare gweiFaces! You can learn more about the project on our website (gweiface.com) and you can stay up to date on our project by following our Twitter (@gweiFaceNFT) or joining our discord (discord.com/invite/T5yTHunCfW).",
		external_link: "https://www.gweiface.com/",
		discord: "httpsL//www.google.com",
		discord_link: "https://www.google.com",
		twitter_username: "gweiFaceNFT",
		twitter: "gweiFaceNFT",
		banner_image: "https://storage.googleapis.com/gwei-faces/banner.png",
		banner: "https://storage.googleapis.com/gwei-faces/banner.png",
		banner_link: "https://storage.googleapis.com/gwei-faces/banner.png",
		image: "https://storage.googleapis.com/gwei-faces/logo.png",
		name: "gweiFace",
		seller_fee_basis_points: 500, // 5%
		fee_recipient: "0xbA842b7DA417Ba762D75e8F99e11c2980a8F8051",
	});
});

app.get("/query", async (req, res) => {
	const pos = ["face", "hair", "shirt", "accessory", "background"];
	var filtered = listAggreg;
	for (const attrib in req.query) {
		if (req.query[attrib] && req.query[attrib] != "") {
			filtered = filtered.filter(
				(el) =>
					el[1].attributes[pos.indexOf(attrib)].value ===
					req.query[attrib]
			);
		}
	}

	return res.status(200).send(filtered);
});

const listener = app.listen(process.env.PORT || 5000, () => {
	console.log("Running on port " + listener.address().port);
});
