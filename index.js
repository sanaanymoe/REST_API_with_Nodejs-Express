const express = require("express");

const app = express();
app.use(express.json());

let transactions = [];

// ---------------- Splash page -------------

app.get("/", (req, res) => {
  res.send("FETCH REWARDS IS THE BEST");
});

//-------- Add a transaction route ---------
app.post("/api/transactions", (req, res) => {
  //deconstrcting the values of payer and point from the request's body
  let { payer, points } = req.body;

  // Check if there is any missing key on the request
  if (!(payer && points) && points > 0) {
    res
      .status(400)
      .send("Payer must be entered and amount must be greater than zero");
  }
  //Build a transaction off of the request then add it to the transactions
  let transaction = {
    payer,
    points,
    timestamp: new Date(),
  };

  transactions.push(transaction);

  //send a success message aftersuccessfully adding a transaction
  res.status(200).send("success");
});

//To display all transactions
app.get("/api/transactions", (req, res) => {
  res.send(transactions);
});

//----------- Spend points route ----------
app.post("/api/spend", (req, res) => {
  let amt = req.body.amount;
  let response = [];

  // The value of amount must be a number
  if (typeof amt !== "number") {
    res.status(400).send("Amount must be a number");
  } else {
    for (let transaction of transactions) {
      if (transaction.points === 0) continue;
      let diff = Math.abs(amt - transaction.points);

      let obj = { payer: `${transaction.payer}`, points: 0 };

      if (amt < transaction.points) {
        transaction.points -= amt;
        obj.points = -amt;
        amt = 0;
      } else {
        amt -= transaction.points;

        obj.points = -transaction.points;
        transaction.points = 0;
      }
      response.push(obj);
    }
  }

  //after successfully using the points we send a status 200 with the response showing the points that were spend

  res.status(200).send(response);
});

//make port number dynamic (if the PORT number wasn't set then port 3000 will be used by default)

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
