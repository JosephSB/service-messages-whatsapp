
(function (io){
    var socket = io();
    const btnConect = document.getElementById('BtnConnect')
    const image =  document.getElementById('image')
    const contentQR =  document.getElementById('contentQR')

    let pathname = window.location.pathname;
    pathname = pathname.split("/")[2];

    function toBase64(arr) {
        arr = new Uint8Array(arr) //if it's an ArrayBuffer
        return btoa(
           arr.reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
     }
    socket.emit('newClient', pathname)
    socket.on('connection_qr', (data)=>{
        btnConect.setAttribute("disabled",true)
        contentQR.innerHTML = "<p>NEW QR</p>"
        let dataIMG = `data:image/png;base64,${toBase64(data.qr)}`
        image.setAttribute("src", dataIMG)
        
    })
    btnConect.addEventListener('click',()=>{
        fetch(`http://localhost:4000/api/connect/${pathname}`)
        .then(response =>{
            response.json();
            contentQR.innerHTML = "<p>YA ESTA CONECTADO!!!, REGRESE A LA INTERFAZ Y MANDE SU MENSAJE</p>"
        })
        .then(data => {
            console.log(data)
            contentQR.innerHTML = "<p>NO NOS PUDIMOS CONECTAR, INTENTELO DENUEVO (RECARGUE LA PAG)</p>"
        });
    })
})(io)