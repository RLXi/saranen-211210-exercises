const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
  define: {
    timestamps: false,
  },
});

// Location will be the table name to be Locations,
// even person -> people will work!
const Location = sequelize.define("Location", {
  latitude: { type: DataTypes.FLOAT },
  longitude: { type: DataTypes.FLOAT },
});

const main = async () => {
  try {
    await sequelize.authenticate();
    // creates the table if it doesn't exist
    await Location.sync();
    console.log("Connection has been established successfully.");
    let result = await Location.findAll();
    console.log(result);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

main();
