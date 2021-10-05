const express = require("express")
const app = express();

export default function loadAssets() {
    app.use('/assets', express.static(__dirname + '/sprites'))
}