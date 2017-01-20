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
    xhrRequest()
    return "123";
}