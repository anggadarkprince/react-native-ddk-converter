import React, {Component} from 'react';
import {View, KeyboardAvoidingView, Image} from 'react-native';
import {Button, Input, Spinner} from '../components/interaction';
import Card from '../components/card/Card';
import CardSection from '../components/card/CardSection';
import Header from '../components/Header';
import currency from '../helpers/currency';
import ddkAPI from "../helpers/ddkAPI";

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
        const result = currency.getCurrencyValue(text) * 1.3 / (ddkToUsd * usdToIdr);

        this.setState({
            price: currency.setCurrencyValue(text),
            priceToDdk: 'Rp. ' + currency.setNumeric(result.toFixed(4))
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
                <Header/>
                <View style={{marginRight: 10, marginLeft: 10}}>
                    <Image source={require('../../assets/banner.png')}
                           style={{width: '100%', height: 180, resizeMode: 'contain'}}/>
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
                {this.state.loading ? <Spinner/> : null}
            </View>
        );
    }
}

export default Converter;