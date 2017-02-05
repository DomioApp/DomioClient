import 'dart:html';
import 'dart:convert';
import 'dart:convert' show JSON;


void onDataLoaded(String resp) {
    Map decoded = JSON.decode(resp);
    print(decoded['app_version']);
}

class Token {
    String email;
    String token;
    String id;

    Token.fromJsonString(String jsonString) {
        var resp = JSON.decode(jsonString);

        email = resp['email'];
        token = resp['token'];
        id = resp['id'];

        if (email == null || token == null || id == null) {
            throw new StateError('one of fields is empty');
        }
    }
}

void sendRequest(String email, String password) {
    HttpRequest request = new HttpRequest();


    print('SendRequest');

    request.onReadyStateChange.listen((_) {
        if (request.readyState == HttpRequest.DONE &&
            (request.status == 200 || request.status == 0)) {
            var token = new Token.fromJsonString(request.responseText);
            print(token.id);
        }
    });

    var url = "http://127.0.0.1:8080/users/login";

    request.open("POST", url);

    request.setRequestHeader('Content-Type', 'application/json');

    var data = {'email': email, 'password': password};

    String jsonData = JSON.encode(data);

    request.send(jsonData); // perform the async POST
}