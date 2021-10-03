const fs = require("fs");
const path = require("path");
const esbuild = require("esbuild");
const express = require("express");
const ws = require("ws");
const http = require("http");
const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 8000;
let err = null;

while(true){

// build user game
function buildGame() {

	const template = fs.readFileSync("./index.html", "utf-8");
	let code = "";

	code += `<script src="/dist/helper.js"></script>\n`;
	code += `<script src="/dist/game.js"></script>\n`;

	try {

		// build user code
		esbuild.buildSync({
			bundle: true,
			sourcemap: true,
			target: "es6",
			keepNames: true,
			logLevel: "silent",
			entryPoints: ["./game.js"],
			outfile: "./build.js",
		});


	} catch (e) {
		const loc = e.errors[0].location;
		err = {
			msg: e.errors[0].text,
			stack: [
				{
					line: loc.line,
					col: loc.column,
					file: loc.file,
				},
			],
		};
		let msg = "";
		msg += "<pre>";
		msg += `ERROR: ${err.msg}\n`;
		if (err.stack) {
			err.stack.forEach((trace) => {
				msg += `    -> ${trace.file}:${trace.line}:${trace.col}\n`;
			});
		}
		msg += "</pre>";
		fs.writeFileSync("./index.html", msg);
		return;
	}

	fs.writeFileSync("./index.html", template.replace("{{kaboom}}", code));

}
buildGame()
console.log(`https://localhost:${port}`)
}


