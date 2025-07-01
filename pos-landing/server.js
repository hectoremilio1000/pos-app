import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = process.env.PORT || 3333;

app.use(express.static(__dirname)); // sirve index.html
app.get("/health", (_, res) => res.send("OK"));

app.listen(port, () =>
  console.log(`Landing corriendo en http://0.0.0.0:${port}`)
); // ← aquí va el paréntesis de cierre
