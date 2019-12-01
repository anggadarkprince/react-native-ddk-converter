import React, { Component } from 'react';
import { View, KeyboardAvoidingView, Image } from 'react-native';
import { Button, Input, Spinner } from './components/interaction';
import Card from './components/card/Card';
import CardSection from './components/card/CardSection';
import currency from './helpers/currency';
import Header from './Header';

class Converter extends Component {
    state = {
        ddkToUsd: 'Fetching...',
        usdToIdr: 'Fetching...',
        usdToIdrDate: 'Fetching...',
        price: '',
        priceToDdk: '',
        error: '',
        loading: false
    };

    componentWillMount() {
        this.fetchingData();
    }

    fetchingData() {
        this.setState({ error: '', loading: true });

        const ddkToUsd = fetch('https://api.coinmarketcap.com/v1/ticker/ddkoin/').then(result => result.json());
        const usdToIdr = fetch('https://api.exchangeratesapi.io/latest?symbols=IDR&base=USD').then(result => result.json());

        let dkk = 0;
        let rate = 0;
        let date = '';
        Promise.all([ddkToUsd, usdToIdr])
            .then(result => {
                this.setState({ loading: false });

                const dkkToUsdResult = result[0];
                const usdToIdrResult = result[1];

                if (dkkToUsdResult) {
                    dkk = dkkToUsdResult[0].price_usd;
                }

                if (usdToIdrResult) {
                    rate = usdToIdrResult.rates.IDR;
                    date = usdToIdrResult.date;
                }

                console.log(dkk, rate);

                this.setState({
                    ddkToUsd: currency.setNumeric(Number(dkk).toFixed(2), '$ '),
                    usdToIdr: currency.setNumeric(Number(rate).toFixed(2), 'Rp. '),
                    usdToIdrDate: date,
                });
                this.onInputPrice(this.state.price);
            })
            .catch(error => {
                this.setState({ error: 'Something went wrong when fetching currency data', loading: false });
            });
    }

    onInputPrice(text) {
        const ddkToUsd = currency.getCurrencyValue(this.state.ddkToUsd);
        const usdToIdr = currency.getCurrencyValue(this.state.usdToIdr);
        const result = currency.getCurrencyValue(text) * 1.3 / (ddkToUsd * usdToIdr);

        this.setState({
            price: currency.setCurrencyValue(text),
            priceToDdk: currency.setNumeric(result.toFixed(2))
        });
    }

    onCalculate() {
        this.setState({
            ddkToUsd: 'Refreshing...',
            usdToIdr: 'Refreshing...',
            usdToIdrDate: 'Refreshing...',
        });
        this.fetchingData();
    }

    render() {
        return (
            <View style={{ backgroundColor: '#000', flex: 1 }}>
                <Header />
                <View style={{ marginRight: 10, marginLeft: 10 }}>
                    <Image source={require('../assets/banner.png')}
                        style={{ width: '100%', height: 200, resizeMode: 'contain' }} />
                </View>
                <KeyboardAvoidingView behavior="padding" enabled>
                    <Card>
                        <CardSection>
                            <Input
                                value={this.state.ddkToUsd.toString()}
                                label="DDK Rate"
                                editable={false}
                                keyboardType="number-pad"
                                placeholder="DDK to USD"
                            />
                        </CardSection>
                        <CardSection>
                            <Input
                                value={this.state.usdToIdr.toString()}
                                label="USD Rate"
                                editable={false}
                                keyboardType="number-pad"
                                placeholder="USD to IDR"
                            />
                        </CardSection>
                        <CardSection>
                            <Input
                                value={this.state.usdToIdrDate.toString()}
                                label="Rate Date"
                                editable={false}
                                keyboardType="number-pad"
                                placeholder="USD rate date"
                            />
                        </CardSection>
                        <CardSection>
                            <Input
                                value={this.state.price.toString() || ''}
                                onChangeText={text => this.onInputPrice(text)}
                                label="Price"
                                editable={!this.state.loading}
                                placeholder="Input price"
                                keyboardType="number-pad"
                            />
                        </CardSection>
                        <CardSection>
                            <Input
                                value={this.state.priceToDdk.toString() || ''}
                                label="DDK Amount"
                                editable={false}
                                placeholder="Conversion result"
                            />
                        </CardSection>
                        <CardSection>
                            <Button onPress={this.onCalculate.bind(this)}>
                                Refresh & Calculate
                            </Button>
                        </CardSection>
                    </Card>
                </KeyboardAvoidingView>
                {this.state.loading ? <Spinner /> : null}
            </View>
        );
    }
}

export default Converter;