
const axios = require('axios');
const ccxt = require('ccxt');
const fs = require("fs");
const binanceClient = new ccxt.binance();


const tick = async () => {
    try {
        const results = await Promise.all([
            axios.get('https://terra-lcd.easy2stake.com/cosmos/staking/v1beta1/pool'),
            axios.get('https://api-dev.terrarity.io/wallets/lunaburn'),
            axios.get('https://api-dev.terrarity.io/analytics/price/latest?coin=lunc'),
            axios.get('https://columbus-lcd.terra.dev/terra/treasury/v1beta1/tax_proceeds'),
            axios.get('https://api-dev.terrarity.io/wallets/lunc_burner_graph?range=7d&denom=uluna'),
            axios.get('https://api-dev.terrarity.io/wallets/tax_burner_graph?range=all&denom=uluna'),
            axios.get('https://api-dev.terrarity.io/wallets/lunc_burner_graph?range=7d&denom=uusd'),
            axios.get('https://api-dev.terrarity.io/wallets/tax_burner_graph?range=7d&denom=uusd')
        ]);

        var value_stake = parseInt(results[0].data.pool.bonded_tokens) / 1000000;
        var parts_stake = value_stake.toString().split(".");
        parts_stake[0] = parts_stake[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        const fVal_stake = parts_stake.join(".");

        const value_burned = parseInt(results[1].data.luna[0].burned) / 1000000;
        var parts_burned = value_burned.toString().split(".");
        parts_burned[0] = parts_burned[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        const fVal_burned = parts_burned[0]

        const value_burned_ust = parseInt(results[1].data.ust[0].burned) / 1000000;
        var parts_burned_ust = value_burned_ust.toString().split(".");
        parts_burned_ust[0] = parts_burned_ust[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        const fVal_burned_ust = parts_burned_ust[0]

        // var val_tax = parseInt(results[3].data.tax_proceeds[13].amount) / 1000000;
        // var parts_tax = val_tax.toString().split(".");
        // parts_tax[0] = parts_tax[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        // const fVal_tax = parts_tax[0]

        const array_tax = results[5].data
        let last_tax = array_tax.slice(-1)[0];
        const val_Burnt_Tax = last_tax.total_burned / 1000000;
        var parts_tax = val_Burnt_Tax.toString().split(".");
        var parts_tax = parts_tax[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        const fVal_tax = parts_tax

        const value_supply = results[2].data.supply;
        var parts_supply = value_supply.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        const fVal_supply = parts_supply;

        const array_td_cm = results[4].data.graph;
        let last_val = array_td_cm.slice(-1)[0].amount / 1000000;
        var val_td_cm = last_val.toString().split(".");
        var val_td_cm = val_td_cm[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        const fVal_td_cm = val_td_cm

        const array_td_tax = results[5].data
        let last = array_td_tax.slice(-1)[0];
        const val_lastbBurnt_Tax = last.burned / 1000000;
        var parts_td_tax = val_lastbBurnt_Tax.toString().split(".");
        var parts_td_tax = parts_td_tax[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        const fVal_td_tax = parts_td_tax

        const lunc_td_tx = last_val;
        const lunc_td_tax = val_lastbBurnt_Tax;
        const lunc_td = lunc_td_tx + lunc_td_tax;
        const val_lunc_td = lunc_td.toString().split(".");
        const fVal_lunc_td = val_lunc_td[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        const array_td_cm_ust = results[6].data.graph
        let last_val_td_ust = array_td_cm_ust.slice(-1)[0];
        const val_lastbBurnt_cm_ust = last_val_td_ust.amount / 1000000;
        var parts_td_cm_ust = val_lastbBurnt_cm_ust.toString().split(".");
        var parts_td_cm_ust = parts_td_cm_ust[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        const fVal_td_cm_ust = parts_td_cm_ust

        const array_td_tax_ust = results[7].data
        let val_last_ust = array_td_tax_ust.slice(-1)[0];
        const val_lastbBurnt_Tax_ust = val_last_ust.burned / 1000000;
        var parts_td_tax_ust = val_lastbBurnt_Tax_ust.toString().split(".");
        var parts_td_tax_ust = parts_td_tax_ust[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        const fVal_td_tax_ust = parts_td_tax_ust

        const ust_td_tx = val_lastbBurnt_cm_ust;
        const ust_td_tax = val_lastbBurnt_Tax_ust;
        const ust_td = ust_td_tx + ust_td_tax;
        const val_ust_td = ust_td.toString().split(".");
        const fVal_ust_td = val_ust_td[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        const totalBurn = value_burned + val_Burnt_Tax;
        var parts_total = totalBurn.toString().split('.');
        parts_total[0] = parts_total[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        const fVal_tot_burnt = parts_total[0]

        const config = {
            asset_: 'USTC',
            base_: 'BUSD'
        };

        const { asset_, base_, tickInterval_ } = config;
        const ustc_market = `${asset_}/${base_}`;
        const ustc_data = await binanceClient.fetchTicker(ustc_market)
        const price_usct = ustc_data.info.lastPrice;
        const persentage_ustc = ustc_data.info.priceChangePercent;

        const ustc_p = parseFloat(persentage_ustc).toFixed(1)
        if (ustc_p >= 0) {
            pNow_ustc = '↗️ ' + ustc_p.toString() + '%';
        } else {
            pNow_ustc = '↘️ ' + ustc_p.toString() + '%';
        }

        const ustc = '$' + price_usct

        const config1 = {
            asset: 'LUNC',
            base: 'BUSD'
        };

        const { asset, base, tickInterval } = config1;
        const market = `${asset}/${base}`;
        const data = await binanceClient.fetchTicker(market);
        price = data.info.lastPrice;
        const lunc = '$' + price
        persentage = data.info.priceChangePercent;
        var finalP = parseFloat(persentage).toFixed(1);

        if (finalP >= 0) {
            pNow = '↗️ ' + finalP.toString() + '%';
        } else {
            pNow = '↘️ ' + Math.abs(finalP).toString() + '%';
        }

        const liveData = {
            "price": lunc,
            "persentage": pNow,
            "ustc": ustc,
            "ustc_percentage": pNow_ustc,
            "stake": fVal_stake,
            "lunc_burned": fVal_burned,
            "ust_burned": fVal_burned_ust,
            "tax": fVal_tax,
            "lunc_burn_td_cm": fVal_td_cm,
            "lunc_burn_td_tax": fVal_td_tax,
            "lunc_burn_td_total": fVal_lunc_td,
            "ust_burn_td_cm": fVal_td_cm_ust,
            "ust_burn_td_tax": fVal_td_tax_ust,
            "ust_burn_td_total": fVal_ust_td,
            "tBurn": fVal_tot_burnt,
            "supply": fVal_supply
        }

        const jsonData = JSON.stringify(liveData, null, 2);

        fs.writeFile('../lunc-ticker-main/db.json', jsonData, (err) => {
            if (err) throw err;
        });

    } catch (error) {
        console.error(error)
    }

}

setInterval(tick, 60000)
