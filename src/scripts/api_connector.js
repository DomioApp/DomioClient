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

export function sendApiRequest(requestName, data) {
    if (requestName === 'signup') {
        sendSignupRequest(data)
    }
}

function sendSignupRequest(data) {

    const oReq = new XMLHttpRequest();
    oReq.addEventListener('load', reqListener);
    oReq.open("POST", "//api.domio.in/users");
    oReq.send(data);

    function reqListener() {
        console.log(JSON.parse(this.responseText));
    }

}