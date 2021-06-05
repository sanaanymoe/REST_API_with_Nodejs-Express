const express = require('express');

const app = express()

// app.get()
// app.post()
// app.put()
// app.delete()

app.get('/', (req, res) => {
    res.send('hello world'.toUpperCase())
});

app.get('/api/courses', (req, res) => {
    res.send([1, 2])
});

//make port number dynamic

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
})