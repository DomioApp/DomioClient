import "utils.dart";
import 'dart:html';


main() {
    const page = getPageName();
    printHello();
    var label = querySelector('.main-container');
    label.text = 'Wake up, sleepy head!';
    label.onClick.listen(handleClick);
}

handleClick(Event event) {
    print(event.target);
    var label = event.target as DivElement;
    label.remove();
    label.text = 'clicked';
}
