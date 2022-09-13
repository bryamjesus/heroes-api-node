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
  const ruta = `./src/public/img/${img}`
  if (fs.existsSync(ruta)) {
    return { mensaje: `Imagen existente` }
  }

  try {
    fs.writeFileSync(ruta, buffer)
    const heroe = { id: nextId, nombre, img }
    lista.push(heroe);
    nextId++
    return heroe
  } catch (e) {
    return { mensaje: e }
  }
}

const editHero = (id, changes) => {
  const indexHero = lista.findIndex(hero => hero.id === +id);
  if (indexHero === -1) {
    return
  }

  if (changes.base64) {
    let ruta = `./src/public/img/${lista[indexHero].img}`
    if(fs.existsSync(ruta)){
      fs.unlinkSync(ruta);
  }
    ruta = `./src/public/img/${changes.img}`
    const buffer = Buffer.from(changes.base64, "base64");
    fs.writeFileSync(ruta, buffer)
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
    return { mensaje: 'Heroe no encontrado' }
  }

  const img = lista[indexHero].img;
  const ruta = `./src/public/img/${img}`

  if (!fs.existsSync(ruta)) {
    return { mensaje: 'Imagen no encontrada' }
  }

  fs.unlinkSync(ruta)

  lista.splice(indexHero, 1)
  return ({ mensaje: 'Heroe eliminado' })
}

module.exports = {
  listAll, listOneHero, createHero, editHero, deleteHero
}

