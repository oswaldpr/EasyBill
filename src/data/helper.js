export function roundTwo(price) {
    return (Math.round(price * 100) / 100).toFixed(2);
}

export function formatMoney(number, decPlaces = 2, decSep = ".", thouSep = ",") {
    // https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
    let sign = number < 0 ? "-" : "";
    let i = String(parseInt(number = Math.abs(Number(number) || 0).toFixed(decPlaces)));
    let j = (j = i.length) > 3 ? j % 3 : 0;

    return sign +
        (j ? i.substr(0, j) + thouSep : "") +
        i.substr(j).replace(/(\decSep{3})(?=\decSep)/g, "$1" + thouSep) +
        (decPlaces ? decSep + Math.abs(number - i).toFixed(decPlaces).slice(2) : "");
}