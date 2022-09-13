const fs = require('fs')

const lista = [
  { id: 1, nombre: "SuperMan", img: "superman.png" },
  { id: 2, nombre: "Shazam", img: "shazam.jpg" },
];
let nextId = 3;

const listAll = () => {
  return lista;
}

const listOneHero = (id) => {
  const hero = lista.find(elem => elem.id === +id)
  if (!hero) {
    return;
  }
  return hero;
}

const createHero = ({ nombre, img, base64 }) => {
  const buffer = Buffer.from(base64, "base64");
  fs.writeFileSync('./src/public/img/' + img, buffer)
  const heroe = { id: nextId, nombre, img }
  lista.push(heroe);
  nextId++
  return heroe
}

const editHero = (id, changes) => {
  const indexHero = lista.findIndex(hero => hero.id === +id);
  if (indexHero === -1) {
    return
  }
  const updateHero = {
    ...lista[indexHero],
    ...changes,
  }

  lista[indexHero] = updateHero;

  return updateHero;
}

const deleteHero = (id) => {
  const indexHero = lista.findIndex(hero => hero.id === +id);

  if (indexHero === -1) {
    return
  }

  lista.splice(indexHero, 1)
  return ({ mensaje: 'Libro eliminado' })
}

module.exports = {
  listAll, listOneHero, createHero, editHero, deleteHero
}

