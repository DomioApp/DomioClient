//import 'dart:developer';

import 'dart:html';

void printHello() {
    print('hey there');
    print(getPageName());
}

String getPageName() {
    var tagElement = querySelector('meta[name="page-name"]') as MetaElement;
    return tagElement.content;
}
