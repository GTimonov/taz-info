
exports.jsonToTelega = function (json){
    const ar = [];
    for (key in json) {
        let str = formattedString(key, json[key]);
        if (str !== '')
            ar.push(formattedString(key, json[key]))
    }
    return ar.join(" \n");
}

function formattedString(key, value){
    switch (key) {
        case 'brand':
            return  "Автомобіль: <b>"+ value + '</b>';

        case 'model':
            return  "Модель: <b>"+ value + '</b>';

        case 'd_reg':
            return  "Дата: <b>"+ value + '</b>';

        case 'make_year':
            return  "Рік випуску: <b>"+ value + '</b>';

        case 'kind':
            return  "Тип: <b>"+ value + '</b>';

        case 'color':
            return  "Колір: <b>"+ value + '</b>';

        case 'dep':
            return  "ДАИ: <b>"+ value + '</b>';

        case 'person':
            return  "Person: <b>"+ value + '</b>';

        case 'reg_addr_koatuu':
            return  "№: <b>"+ value + '</b>';

        case 'body':
            return  "Кузов: <b>"+ value + '</b>';

        case 'purpose':
            return  "Призначення: <b>"+ value + '</b>';

        case 'oper_name':
            return  "Подія: <b>"+ value + '</b>';

        case 'fuel':
            return  "Паливо: <b>"+ value + '</b>';

        case 'capacity':
            return  "Двигун: <b>"+ value + '</b>';

        case 'own_weight':
            return  "Маса: <b>"+ value + '</b>';

        case 'total_weight':
            return  "Повна маса: <b>"+ value + '</b>';

        case 'n_reg_new':
            return  "Номер: <b>"+ value + '</b>';
        default:
            return '';
    }
}