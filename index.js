const express = require('express');

const app = express();
app.use(express.json());


// app.get()
// app.post()
// app.put()
// app.delete()

let transactions = [];
let payerPoints = {};

app.post('/api/transactions' , (req, res) => {

    let { payer, points } = req.body;
    if (!(payer && points) && points > 0){
        res.status(400).send('Payer must be entered and amount must be greater than zero')
    }

    let transaction = {
        payer,
        points,
        'timestamp': new Date()
    }
    // console.log("result ", transaction );

    transactions.push(transaction);
    console.log('trans', transactions)
    res.status(200).send('success')

})
app.get('/', (req, res) => {
    res.send('hello world'.toUpperCase())
});

app.get('/api/spend/:amount', (req, res) => {
    console.log('amt', req.params.amount);
    let amt = req.params.amount;

    if (typeof(amt) !== 'number'){
        res.status(400).send('Amount must be a number')
    }

    for (let transaction of transactions){
        
    }
});
app.get('/api/customers', (req, res) => {
    res.send([1, 2, 3])
});

app.get('/api/customers/:id', (req, res) => {
    res.send(req.params.id);
});

//make port number dynamic

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
})