function xhrRequest() {
    function reqListener() {
        console.log(JSON.parse(this.responseText));
    }

    const oReq = new XMLHttpRequest();
    oReq.addEventListener('load', reqListener);
    oReq.open("GET", "//api.domio.in");
    oReq.send();
}


export function getStatus() {
    xhrRequest();
}

export function sendApiRequest(requestName, data, callback) {

    if (requestName === 'login') {
        sendLoginRequest(data, callback)
    }
    else if (requestName === 'signup') {
        sendSignupRequest(data, callback)
    }
}

function sendLoginRequest(data, callback) {

    const oReq = new XMLHttpRequest();
    oReq.addEventListener('load', reqListener);
    oReq.open("POST", "//api.domio.in/users/login");
    oReq.send(JSON.stringify(data));

    function reqListener() {
        console.log(JSON.parse(this.responseText));
        callback()
    }

}
function sendSignupRequest(data, callback) {

    const oReq = new XMLHttpRequest();
    oReq.addEventListener('load', reqListener);
    oReq.open("POST", "//api.domio.in/users");
    oReq.send(JSON.stringify(data));

    function reqListener() {
        console.log(JSON.parse(this.responseText));
        callback()
    }

}