const express = require('express');
const app = express();

app.use(express.static('build'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/build/index.html')
})

app.listen(3000, () => console.log("App is listening on port 3000"))