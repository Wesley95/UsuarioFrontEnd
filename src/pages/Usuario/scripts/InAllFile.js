import $ from 'jquery';

/*-------------------------------------------
 *-------------------------------------------
 * MASKS-------------------------------------
 * ------------------------------------------
 * ------------------------------------------
 * ------------------------------------------
 * */


export function cleanText(text) {
    var newtext;
    newtext = LockSpaceRepeatedly(text);
    newtext = CleanSpecialChar(text);
    newtext = FirstLetterToUpper(text);
    return newtext;
}

function applylettermask(text) {

    $(document).on('keypress', '.spcltr', function (event) {
        var regex = new RegExp("^[a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ0-9 -]+$");
        var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
        if (!regex.test(key)) {
            event.preventDefault();
            return false;
        }
    });

    $(document).on('keyup', '.spcltr', function (event) {
        var val = $(this).val();
        if (val.length > 0) {
            val = FirstLetterToUpper(val);
            $(this).val(LockSpaceRepeatedly(val));
        }
    });
}

function applySpecialCharClean() {
    $(document).on("keyup", ".cleanchar", function (event) {
        let val = $(this).val();
        if (val.length > 0) {
            $(this).val(CleanSpecialChar(val));
        }
    });
}


/* ------------------------------------------
 * ------------------------------------------
 * STRINGS-----------------------------------
 * ------------------------------------------
 * ------------------------------------------
 * ------------------------------------------
 * */
function replaceAt(string, index, replace) {
    return string.substring(0, index) + replace + string.substring(index + 1);
}

function IsWhiteSpace(char) {
    return /\s/g.test(char);
}

function IsLetter(char) {
    return char.toLowerCase() != char.toUpperCase();
}

function FirstLetterToUpper(text) {

    var auxtext = text;
    for (var l = 1; l < text.length; l++) {

        var currentValue = text[l - 1];

        if (IsWhiteSpace(currentValue)) {
            if (IsLetter(text[l])) {
                auxtext = replaceAt(auxtext, l, auxtext[l].toUpperCase());
            }
        }
    }

    if (IsLetter(auxtext[0])) auxtext = replaceAt(auxtext, 0, auxtext[0].toUpperCase());
    return auxtext;
}

function CleanSpecialChar(text) {
    text = text.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '_');
    return text;
}


/**
 *MÉTODO RESPONSÁVEL POR EVITAR REPETIÇÃO DO CARACTERE SPACE = " "
 */
function LockSpaceRepeatedly(text) {
    var auxText = text,/*Criamos uma variável responsável por armazenar o texto e outra para ser um contador*/
        count = 0;

    /*Loop pelo texto, iniciando do segundo caractere para que possamos analisar o primeiro*/
    for (var l = 1; l < text.length; l++) {
        if (IsWhiteSpace(auxText[l])) {/*Verificamos se o caractere do iterador é espaço em branco, caso seja, criamos uma 
         contante com o nome de startPosition, que serve para armazenar a posição inicial do caractere cujo valor é espaço em branco.*/
            const startPosition = l;

            count++;/*Incrementamos o contador em +1*/

            /*Enquanto houver espaço em branco após o caractere atual do iterador + o contador, incrementa um no contador*/
            while (IsWhiteSpace(auxText[l + count])) count++;

            if (count > 1) {
                for (var c = 0; c < count - 1; c++) {
                    auxText = replaceAt(auxText, startPosition, "");
                }
                l = 1;
            }

            count = 0;
        }
    }
    while (IsWhiteSpace(auxText[0])) auxText = replaceAt(auxText, 0, "");

    return auxText;
}

export function underAge(date, separator) {
    var split_age = date.split(separator);
    var year = split_age[0], month = split_age[1], day = split_age[2], age = 0;
    var d = new Date();
    age = parseInt(d.getFullYear()) - parseInt(year);

    if ((d.getMonth() + 1) < month || (d.getMonth() + 1) == month && day > d.getDate()) age--;

    var ageYear = {
        age: age,
        year: day + "/" + month + "/" + year
    }
    return ageYear;
}