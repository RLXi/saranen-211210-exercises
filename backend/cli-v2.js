require("dotenv").config();
const {
  connectionFunctionsCB,
  connectionFunctions: connection,
} = require("./database/crudrepository");
const readline = require("readline-sync");

const choices = [
  "View locations",
  "View location with ID",
  "Add location",
  "Delete location",
];

// This uses callbacks
function mainCB() {
  let index = readline.keyInSelect(choices, "Your Choice?");
  switch (index) {
    case 0:
      {
        try {
          connection.findAll((err, res) => {
            if (err) throw err;
            console.log(res);
          });
        } catch (err) {
          console.log(err);
        }
      }
      break;
    case 1:
      {
        try {
          const id = readline.questionInt("Insert ID: ");
          connection.findById(id, (err, res) => {
            if (err) throw err;
            console.log(res);
          });
        } catch (err) {
          console.log(err);
        }
      }
      break;
    case 2:
      {
        try {
          const latitude = readline.questionFloat("Insert latitude: ");
          const longitude = readline.questionFloat("Insert longitude: ");

          connection.save({ latitude, longitude }, (err, res) => {
            if (err) throw err;
            console.log(res);
          });
          console.log("data inserted");
        } catch (err) {
          console.log(err);
        }
      }
      break;
    case 3:
      {
        try {
          const id = readline.questionInt("Insert ID: ");
          connection.deleteById(id, (err, res) => {
            if (err) throw err;
            console.log(res);
          });
        } catch (err) {
          console.log(err);
        }
      }
      break;
    default:
      console.log("Bye");
      connection.close((msg) => {
        console.log(msg);
      });
      return;
  }
  connection.close((msg) => {
    console.log(msg);
  });
  //   mainCB();
}

// mainCB();

// This uses async / await
async function main() {
  await connection.connect();
  let index = readline.keyInSelect(choices, "Your Choice?");
  try {
    switch (index) {
      case 0:
        {
          try {
            const res = await connection.findAll();
            console.log(res);
          } catch (err) {
            console.log(err);
          }
        }
        break;
      case 1:
        {
          try {
            const id = readline.questionInt("Insert ID: ");
            const res = await connection.findById(id);
            console.log(res);
          } catch (err) {
            console.log(err);
          }
        }
        break;
      case 2:
        {
          try {
            const latitude = readline.questionFloat("Insert latitude: ");
            const longitude = readline.questionFloat("Insert longitude: ");

            const res = await connection.save({ latitude, longitude });
            console.log(res, "data inserted");
          } catch (err) {
            console.log(err);
          }
        }
        break;
      case 3:
        {
          try {
            const id = readline.questionInt("Insert ID: ");
            const res = await connection.deleteById(id);
            console.log(res);
          } catch (err) {
            console.log(err);
          }
        }
        break;
      default:
        console.log("Bye");
        await connection.close();
        return;
    }
    await connection.close();
  } catch (err) {
    console.log("Something went seriously wrong:", err.message);
  }
}

main();
