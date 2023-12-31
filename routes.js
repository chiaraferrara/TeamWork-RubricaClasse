const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// app.get('/register/:id', (req, res) => {
//     res.sendFile(path.join(__dirname, '/', 'register.html'));
//   });

// app.use(express);

//ENDPOINT INDEX (ROOT)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


//ENDPOINT PAGINA REGISTER
app.get('/register.html', (req, res) => {
    const registerId = req.query.id;
    res.sendFile(path.join(__dirname, 'register.html'));
});


//FILE STATICI ASSETS (IMMAGINI)
app.use('/assets', express.static(path.join(__dirname, '/assets')));

//ENDPOINT FILE JAVASCRIPT
app.get('/main.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'main.js'), {
        headers: {
            'Content-Type': 'text/javascript'
        }
    });
});

//ENDPOINT FILE CSS
app.get('*.css', (req, res) => {
    res.sendFile(path.join(__dirname, req.url), {
        headers: {
            'Content-Type': 'text/css'
        }
    });
});



//AVVIO SERVER EXPRESS
app.listen(PORT, () => {
    console.log('Server is running on http://localhost:3000');
});