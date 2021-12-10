require("dotenv").config();
const readline = require("readline-sync");
const mysql = require("mysql");
const { promisify } = require("util");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  multipleStatements: true,
});

const query = promisify(connection.query).bind(connection);

async function getAll() {
  try {
    const res = await query("SELECT * FROM locations");
    return res;
  } catch (err) {
    return err.message;
  }
}

async function getLocationById(id) {
  try {
    const res = await query("SELECT * FROM locations WHERE id = ?", [id]);
    return res;
  } catch (err) {
    return err.message;
  }
}

async function getLocationByIdUnsafe(id) {
  try {
    const res = await query(`SELECT * FROM locations WHERE id = ${id}`);
    return res;
  } catch (err) {
    return err.message;
  }
}

async function insertLocation(latitude, longitude) {
  if (latitude < -90 && latitude > 90) latitude = Math.random() * 180 - 90;
  if (longitude < -180 && longitude > 180)
    longitude = Math.random() * 360 - 180;

  const newLocation = {
    latitude,
    longitude,
  };

  try {
    // remember to prepare the statement
    let queryString =
      "INSERT INTO locations (latitude, longitude) VALUES (?, ?)";

    const res = await query(queryString, [
      newLocation.latitude,
      newLocation.longitude,
    ]);
    return res;
  } catch (err) {
    return err.message;
  }
}

const choices = [
  "View locations",
  "View location with ID",
  "View location with ID (UNSAFE)",
  "Add location",
];

connection.connect();

async function main() {
  let index = readline.keyInSelect(choices, "Your Choice?");
  switch (index) {
    case 0:
      {
        try {
          const res = await getAll();
          console.log(res);
        } catch (err) {
          console.log(err);
        }
      }
      break;
    case 1:
      {
        try {
          // const id = readline.questionInt("Insert ID: ");
          const id = readline.question("Insert ID: ");
          const res = await getLocationById(id);
          console.log(res);
        } catch (err) {
          console.log(err);
        }
      }
      break;
    case 2:
      {
        try {
          const id = readline.question("Insert ID: ");
          const res = await getLocationByIdUnsafe(id);
          console.log(res);
        } catch (err) {
          console.log(err);
        }
      }
      break;
    case 3:
      {
        try {
          const lat = readline.questionFloat("Insert latitude: ");
          const long = readline.questionFloat("Insert longitude: ");

          await insertLocation(lat, long);
          console.log("data inserted");
        } catch (err) {
          console.log(err);
        }
      }
      break;
    default:
      console.log("Bye");
      connection.end();
      return;
  }
  main();
}

main();
