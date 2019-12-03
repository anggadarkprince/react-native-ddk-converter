import React, {Component} from 'react';
import {View, KeyboardAvoidingView, Image} from 'react-native';
import {Button, Input, Spinner} from '../components/interaction';
import Card from '../components/card/Card';
import CardSection from '../components/card/CardSection';
import currency from '../helpers/currency';
import ddkAPI from '../helpers/ddkAPI';
import Header from '../components/Header';

class Exchange extends Component {
    state = {
        ddkToUsd: 'Fetching...',
        usdToIdr: 'Fetching...',
        usdToIdrDate: 'Fetching...',
        amount: '',
        sellingPrice: '',
        buyingPrice: '',
        error: '',
        loading: false
    };

    componentWillMount() {
        this.fetchingData();
    }

    fetchingData() {
        this.setState({error: '', loading: true});

        ddkAPI()
            .then(result => {
                console.log({loading: false, ...result});

                this.setState({loading: false, ...result});
                this.onInputPrice(this.state.price);
            })
            .catch(error => {
                this.setState({error: 'Something went wrong when fetching currency data', loading: false});
            });
    }

    onInputPrice(text) {
        const ddkToUsd = currency.getCurrencyValue(this.state.ddkToUsd);
        const usdToIdr = currency.getCurrencyValue(this.state.usdToIdr);

        const sell = currency.getCurrencyValue(text) * (ddkToUsd * 1.3) * usdToIdr;
        const buy = currency.getCurrencyValue(text) * (ddkToUsd * 0.9) * usdToIdr;

        this.setState({
            amount: currency.setCurrencyValue(text),
            sellingPrice: 'Rp. ' + currency.setNumeric(sell.toFixed(4)),
            buyingPrice: 'Rp. ' + currency.setNumeric(buy.toFixed(4))
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
            <View style={{backgroundColor: '#000', flex: 1}}>
                <Header title="Exchange DDK"/>
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
                                value={this.state.amount.toString() || ''}
                                onChangeText={text => this.onInputPrice(text)}
                                label="DDK Amount"
                                editable={!this.state.loading}
                                placeholder="Input amount"
                                keyboardType="number-pad"
                            />
                        </CardSection>
                        <CardSection>
                            <Input
                                value={this.state.sellingPrice.toString() || ''}
                                label="Selling Price"
                                editable={false}
                                placeholder="Amount of DDK"
                            />
                        </CardSection>
                        <CardSection>
                            <Input
                                value={this.state.buyingPrice.toString() || ''}
                                label="Buying Price"
                                editable={false}
                                placeholder="Amount of DDK"
                            />
                        </CardSection>
                        <CardSection>
                            <Button onPress={this.onCalculate.bind(this)}>
                                Refresh & Exchange
                            </Button>
                        </CardSection>
                    </Card>
                </KeyboardAvoidingView>
                {this.state.loading ? <Spinner/> : null}
            </View>
        );
    }
}

export default Exchange;