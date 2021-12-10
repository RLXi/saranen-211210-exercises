const mysql = require("mysql");
const mariadb = require("mariadb");
const Validator = require("jsonschema").Validator;
const { promisify } = require("util");

const v = new Validator();
const schemaId = { type: "number", minimum: 1 };
const schemaLocation = {
  type: "object",
  properties: {
    latitude: { type: "number", minimum: -90, maximum: 90 },
    longitude: { type: "number", minimum: -180, maximum: 180 },
  },
};

// Callback based CRUD operations
// Uses mysql
const connectionFunctionsCB = {
  connect: () => {
    this.connection = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_DATABASE,
      port: process.env.DB_PORT,
      multipleStatements: true,
    });
  },
  close: (callback) => {
    this.connection.end();
    callback("Connection closed");
  },
  save: (location, callback) => {
    const queryString =
      "INSERT INTO locations (latitude, longitude) VALUE (?, ?)";
    const { latitude, longitude } = location;
    this.connection.query(queryString, [latitude, longitude], (err, res) => {
      if (err) callback(err, null);
      else callback(null, res);
    });
  },
  findAll: (callback) => {
    const queryString = "SELECT * FROM locations";
    this.connection.query(queryString, (err, res) => {
      if (err) callback(err, null);
      else callback(null, res);
    });
  },
  deleteById: (id, callback) => {
    const queryString = "DELETE FROM locations WHERE id = ?";
    this.connection.query(queryString, [id], (err, res) => {
      if (err) callback(err, null);
      else callback(null, res);
    });
  },
  findById: (id, callback) => {
    const queryString = "SELECT * FROM locations WHERE id = ?";
    this.connection.query(queryString, [id], (err, res) => {
      if (err) callback(err, null);
      else callback(null, res);
    });
  },
};

// Promise based CRUD operations
// Also uses mariadb. Can be switched to mysql
// but you must first do some comment switcharoo
const connectionFunctions = {
  connect: async () => {
    // this.connection = await mysql.createConnection({
    this.connection = await mariadb.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_DATABASE,
      port: process.env.DB_PORT,
    });
    // this.query = promisify(this.connection.query).bind(this.connection);
  },
  close: async () => {
    try {
      await this.connection.end();
      return "Connection closed";
    } catch (err) {
      return err.message;
    }
  },
  save: async (location) => {
    if (!v.validate(location, schemaLocation).valid) {
      throw "Invalid values";
    }
    const queryString =
      "INSERT INTO locations (latitude, longitude) VALUE (?, ?)";
    const { latitude, longitude } = location;
    try {
      // const res = await this.query(queryString, [
      const res = await this.connection.query(queryString, [
        latitude,
        longitude,
      ]);
      if (res.affectedRows > 0) {
        return { msg: "Location added" };
      }
      return { msg: "No rows affected. Nothing saved." };
    } catch (err) {
      return err.message;
    }
  },
  findAll: async () => {
    const queryString = "SELECT * FROM locations";
    try {
      // const res = await this.query(queryString);
      const res = await this.connection.query(queryString);
      return res.map((r) => r);
    } catch (err) {
      return err.message;
    }
  },
  deleteById: async (id) => {
    if (!v.validate(id, schemaId).valid) {
      throw "Invalid ID";
    }
    const queryString = "DELETE FROM locations WHERE id = ?";
    try {
      // const res = await this.query(queryString, [id]);
      const res = await this.connection.query(queryString, [id]);
      if (res.affectedRows > 0) {
        return { msg: "Location deleted" };
      }
      return { msg: "No rows affected. Nothing deleted." };
    } catch (err) {
      return err.message;
    }
  },
  findById: async (id) => {
    if (!v.validate(id, schemaId).valid) {
      throw "Invalid ID";
    }
    const queryString = "SELECT * FROM locations WHERE id = ?";
    try {
      // const res = await this.query(queryString, [id]);
      const res = await this.connection.query(queryString, [id]);
      return res[0];
    } catch (err) {
      return err.message;
    }
  },
};

module.exports = { connectionFunctionsCB, connectionFunctions };
