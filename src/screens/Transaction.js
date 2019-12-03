import React, {Component} from 'react';
import { View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Card from '../components/card/Card';
import CardSection from '../components/card/CardSection';
import { Button } from '../components/interaction';
import Transaction1 from './Transaction1';
import Transaction2 from './Transaction2';
import Transaction3 from './Transaction3';
import Transaction4 from './Transaction4';

class Transaction extends Component {
    static navigationOptions = {
        title: 'Transactions List',
        headerStyle: {
            backgroundColor: '#fb6503'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };

    render() {
        return (
            <View style={styles.container}>
                <Card>
                    <CardSection>
                        <Button onPress={() => this.props.navigation.navigate('Transaction1')}>
                            Katara 1
                        </Button>
                    </CardSection>
                    <CardSection>
                        <Button onPress={() => this.props.navigation.navigate('Transaction2')}>
                            Katara 2
                        </Button>
                    </CardSection>
                    <CardSection>
                        <Button onPress={() => this.props.navigation.navigate('Transaction3')}>
                            Katara 3
                        </Button>
                    </CardSection>
                    <CardSection>
                        <Button onPress={() => this.props.navigation.navigate('Transaction4')}>
                            Katara 4
                        </Button>
                    </CardSection>
                </Card>
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
};

const RootStack = createStackNavigator(
    {
        Transaction: Transaction,
        Transaction1: Transaction1,
        Transaction2: Transaction2,
        Transaction3: Transaction3,
        Transaction4: Transaction4,
    },
    {
        initialRouteName: 'Transaction',
    }
);
const AppContainer = createAppContainer(RootStack);

export default AppContainer;