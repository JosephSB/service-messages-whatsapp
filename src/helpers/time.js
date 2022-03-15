const time = () => {}

time.getTime = () =>{
    let fecha = new Date();
    let time = fecha.getHours() + ':' + fecha.getMinutes() + ':' + fecha.getSeconds();;
    return time
}

module.exports = time