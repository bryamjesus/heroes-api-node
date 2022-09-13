const express = require('express');
const ruteHero = require('./routes/heroRoutes')

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/hero', ruteHero)

app.listen(PORT, () => console.log(`Servidor iniciado en el puerto ${PORT}`))