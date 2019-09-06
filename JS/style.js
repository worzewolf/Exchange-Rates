window.addEventListener('load', Init);
function Init(){
    let url = "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5";
    Request(url, GetCurrency);
}
function Request (url, callback){
let xhr = new XMLHttpRequest();
xhr.open("GET", url, true);
    xhr.send();

    xhr.onreadystatechange = function () {
        if (xhr.readyState != 4) return;

        if (xhr.status != 200) {
            let errStatus = xhr.status;
            let errText = xhr.statusText;
            console.log(errStatus + ": " + errText);
        } else {
            let data = JSON.parse(xhr.responseText);
            callback(data);
        }
    }; 
}
function GetCurrency(currency){
    pereborelem(currency);  
    let currencyData = {
        usd_uah_buy: currency[0].buy,
        usd_uah_sell: currency[0].sale,
        eur_uah_buy: currency[1].buy,
        eur_uah_sell: currency[1].sale,
        rub_uah_buy: currency[2].buy,
        rub_uah_sell: currency[2].sale,
        btc_usd_buy: currency[3].buy,
        btc_uah_sell: currency[3].sale
    }
    printCurrency(currencyData);
}
function pereborelem(currency) {
    for (i = 0; i < currency.length; i++) {
        var afterpoint = currency[i].buy.split(".");
        for (j = 0; j < afterpoint[1].length + 1; j++) {
            if (currency[i].buy.charAt(currency[i].buy.length - 1) == 0 || currency[i].buy.charAt(currency[i].buy.length - 1) == ".") {
                currency[i].buy = currency[i].buy.substr(0, currency[i].buy.length - 1);
            }
            if (currency[i].sale.charAt(currency[i].sale.length - 1) == 0 || currency[i].sale.charAt(currency[i].sale.length - 1) == ".") {
                currency[i].sale = currency[i].sale.substr(0, currency[i].sale.length - 1);
            }
        }
    }
}
function printCurrency(currencyData){
    var elem = document.getElementById("elem");
    var h3 = document.createElement("h4");
    var table = document.createElement("table");
    var thead = document.createElement("thead");
    var tbody = document.createElement("tbody");
    var tr = document.createElement("tr");
    h3.innerHTML = "Курси валют";
    elem.append(h3);
    h3.setAttribute("class", "kursval");
        for (i = 0; i < 4; i++) {
            var td = document.createElement("td");
            tr.append(td);
        }
    thead.append(tr);
        for (var i = 0; i < 4; i++) {
            var tr = document.createElement("tr");
            tbody.append(tr);
            for (let i = 0; i < 4; i++) {
                var td = document.createElement("td");
                tr.append(td);
            }
        } 
    table.append(thead);
    table.append(tbody);
    elem.append(table);
    thead.rows[0].cells[2].innerHTML = "Купівля";
    thead.rows[0].cells[3].innerHTML = "Продаж";
    tbody.rows[0].cells[0].innerHTML = "USD";
    tbody.rows[0].cells[1].innerHTML = "UAH";
    tbody.rows[0].cells[2].innerHTML = currencyData.usd_uah_buy;
    tbody.rows[0].cells[3].innerHTML = currencyData.usd_uah_sell;
    tbody.rows[1].cells[0].innerHTML = "EUR";
    tbody.rows[1].cells[1].innerHTML = "UAH";
    tbody.rows[1].cells[2].innerHTML = currencyData.eur_uah_buy;
    tbody.rows[1].cells[3].innerHTML = currencyData.eur_uah_sell;
    tbody.rows[2].cells[0].innerHTML = "RUB";
    tbody.rows[2].cells[1].innerHTML = "UAH";
    tbody.rows[2].cells[2].innerHTML = currencyData.rub_uah_buy;
    tbody.rows[2].cells[3].innerHTML = currencyData.rub_uah_sell;
    tbody.rows[3].cells[0].innerHTML = "BTC";
    tbody.rows[3].cells[1].innerHTML = "UAH";
    tbody.rows[3].cells[2].innerHTML = currencyData.btc_usd_buy;
    tbody.rows[3].cells[3].innerHTML = currencyData.btc_uah_sell;
}

