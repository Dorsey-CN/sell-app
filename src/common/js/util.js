/**
 *@example: ?id=123456&location=sh
 *output: {'id': '123456', 'location': 'sh'}
 */
export function urlParse(query) {
    var obj = {};
    var reg = /[?&][^?&]+=[^?&]+/g;
    var arr = query.match(reg);

    if (arr && arr.length > 0) {
        arr.forEach(function(ele) {
            var tempArr = ele.substring(1).split('=');
            var key = tempArr[0];
            var value = tempArr[1];
            obj[key] = value;
        });
    }

    return obj;
};
