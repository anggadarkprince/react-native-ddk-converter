import React, { Component } from 'react';
import { WebView, View } from 'react-native';
import { Button } from './components/interaction';
import Header from './Header';

class Transaction extends Component {
    reload() {
        this.myWebView.reload();
    }
    render() {
        return (
            <View style={styles.container}>
                <Header title="Transactions" />
                <WebView
                    source={{
                        uri: 'https://ddkexplorer.ddkoin.com/account/9800187006007272034'
                    }}
                    ref={(ref) => this.myWebView = ref}
                />
                <View style={styles.buttonWrapper}>
                    <Button onPress={this.reload.bind(this)}>
                        Refresh
                    </Button>
                </View>
            </View>
        );
    }
};

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    buttonWrapper: {
        borderBottomWidth: 1,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderColor: '#ddd',
        position: 'relative'
    }
};

export default Transaction;