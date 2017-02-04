import 'dart:html';
import 'dart:convert';


void onDataLoaded(String resp) {
    Map decoded = JSON.decode(resp);
    print(decoded['app_version']);
}

void sendRequest(String email, String password) {
    HttpRequest request = new HttpRequest();


    print('SendRequest');

    request.onReadyStateChange.listen((_) {
        if (request.readyState == HttpRequest.DONE &&
            (request.status == 200 || request.status == 0)) {
            // data saved OK.
            print(request.responseText); // output the response from the server
        }
    });

    var url = "http://127.0.0.1:8080/users/login";

    request.open("POST", url);

    request.setRequestHeader('Content-Type', 'application/json');

    String jsonData = '{"email":"' + email + '", "password":"' + password + '"}';

    request.send(jsonData); // perform the async POST
}