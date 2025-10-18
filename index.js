const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Servir archivos estáticos
app.use('/pages', express.static(path.join(__dirname, 'pages')));

// Ruta principal que genera links automáticamente
app.get('/', (req, res) => {
    const folderPath = path.join(__dirname, 'pages');
    const files = fs.readdirSync(folderPath)
                    .filter(file => file.endsWith('.html'));

    let html = `<h1>Página Principal</h1><ul>`;
    files.forEach(file => {
        html += `<li><a href="/pages/${file}">${file.replace('.html','')}</a></li>`;
    });
    html += `</ul>`;
    res.send(html);
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});

