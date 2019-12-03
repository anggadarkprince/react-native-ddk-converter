import currency from "./currency";

export default () => {
    const ddkToUsd = fetch('https://api.coinmarketcap.com/v1/ticker/ddkoin/').then(result => result.json());
    const usdToIdr = fetch('https://api.exchangerate-api.com/v4/latest/USD').then(result => result.json());

    let dkk = 0;
    let rate = 0;
    let date = '';
    return Promise.all([ddkToUsd, usdToIdr])
        .then(result => {
            const dkkToUsdResult = result[0];
            const usdToIdrResult = result[1];

            if (dkkToUsdResult) {
                dkk = dkkToUsdResult[0].price_usd;
            }

            if (usdToIdrResult) {
                rate = usdToIdrResult.rates.IDR;
                date = usdToIdrResult.date;
                if (usdToIdrResult.time_last_updated) {
                    var lastUpdate = new Date(usdToIdrResult.time_last_updated * 1000);
                    var year = lastUpdate.getFullYear();
                    var month = "0" + (lastUpdate.getMonth() + 1);
                    var dates = "0" + lastUpdate.getDate();
                    var hours = "0" + lastUpdate.getHours();
                    var minutes = "0" + lastUpdate.getMinutes();
                    date = year + '-' + month.substr(-2) + '-' + dates.substr(-2) + ' ' + hours.substr(-2) + ':' + minutes.substr(-2);
                }
            }
            return {
                ddkToUsd: currency.setNumeric(Number(dkk).toFixed(2), '$ '),
                usdToIdr: currency.setNumeric(Number(rate).toFixed(2), 'Rp. '),
                usdToIdrDate: date,
            };
        });
}