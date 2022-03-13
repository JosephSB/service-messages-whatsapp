const validator = () => {}

validator.isValidURL = (URL) =>{
    if(URL.length === 0) return false

    let res = URL.match(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi);
    if(res === null) return false;
    return true;
}

validator.isValidListOfNumbers = (array) =>{
    if(!Array.isArray(array)) return false
    if(array.length === 0) return false
    return true;
}

validator.isValidMessage = (message) =>{
    if(message.length <= 0) return false
    return true;
}

module.exports = validator;