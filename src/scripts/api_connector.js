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
    oReq.open("POST", `${getAppInfo().api_url}/users/login`);
    oReq.send(JSON.stringify(data));

    function reqListener() {
        callback(this)
    }
}
