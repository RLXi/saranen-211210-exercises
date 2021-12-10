require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const {
  connectionFunctionsCB,
  connectionFunctions: connection,
} = require("./database/crudrepository");
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.static("build"));

app.get("/", async (req, res) => {
  res.status(200).send("Welcome");
});

app.get("/locations", async (req, res) => {
  try {
    await connection.connect();
    const results = await connection.findAll();
    res.status(200).send(results);
  } catch (err) {
    res.status(404).send({ msg: err.message });
  } finally {
    await connection.close();
  }
});

app.get("/locations/:id", async (req, res) => {
  try {
    await connection.connect();
    const id = req.params.id;
    const results = await connection.findById(parseInt(id));
    res.status(200).send(results);
  } catch (err) {
    res.status(404).send({ msg: err.message });
  } finally {
    await connection.close();
  }
});

app.post("/locations", async (req, res) => {
  try {
    await connection.connect();
    const { latitude, longitude } = req.body;

    const results = await connection.save({
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
    });
    res.status(200).send(results);
  } catch (err) {
    res.status(404).send({ msg: err.message });
  } finally {
    await connection.close();
  }
});

app.delete("/locations/:id", async (req, res) => {
  try {
    await connection.connect();
    const id = req.params.id;
    const results = await connection.deleteById(parseInt(id));
    res.status(200).send(results);
  } catch (err) {
    res.status(404).send({ msg: err.message });
  } finally {
    await connection.close();
  }
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
