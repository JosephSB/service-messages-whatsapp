//----------------------------------------------------------------
//script de prueba
//----------------------------------------------------------------
const venom = require('venom-bot');

venom
  .create({
    session: 'session-name', //name of session
    multidevice: false // for version not multidevice use false.(default: true)
  })
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });

const messageOcucaje = `

Buenos días. Estas son las noticias más importantes de la semana en Ocucaje. 

✅Actualidad: ENGIE iluminará la plaza principal de la ciudad. El proyecto, con el que se busca impulsar el turismo, consiste en instalar 60 postes y 120 focos solares. La obra estará lista en junio. 💡💡
✅ Sabías que… El colegio Medardo Aparcana no pedirá lista de útiles ni uniformes escolares. Según su director Jaime Lavarello, las clases comenzarán el lunes 28 de marzo. 🏫
✅ Ocucajino Coraje : Mario Urbina, el cazador del desierto, vive en #Ocucaje hace más de 30 años. Él no solo ha descubierto los fósiles más importantes del Perú, sino que nos colocó en los ojos del mundo. 👏🏻👏🏻
✅ ChambaSíHay : Abengoa se encuentra en la búsqueda de un chofer de bus. Para más información llamar al celular 997812161. 📲

Entérate más ingresando a https://bit.ly/3hBXOx5.
Si te gustó el contenido, ¡compártelo con tu familia y amigos!
`

async function start(client) {
  /*
    client.onMessage((message) => {
        client
          .sendText(message.from, 'Hola!')
          .then((result) => {
            console.log('Result: ', result); //return object success
          })
          .catch((erro) => {
            console.error('Error when sending: ', erro); //return object error
          });
    });
*/
    await client
    .sendImage(
      '51963032870@c.us',
      'https://static1.abc.es/media/cultura/2019/04/05/nirvana-nastylittlemancom-kkzF--1200x630@abc.jpg',
      'ocucaje',
      'Bienvenido a ocucaje'
    )
    .then((result) => {
        console.log('Result: ', result); //return object success
    })
    .catch((erro) => {
        console.error('Error when sending: ', erro); //return object error
    });
/*
    await client
    .sendText('51986154754@c.us', messageOcucaje)
    .then((result) => {
        console.log('Result: ', result); //return object success
    })
    .catch((erro) => {
        console.error('Error when sending: ', erro); //return object error
    });
    */
    
  }

