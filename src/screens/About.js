import React from 'react';
import { View, Text, Image } from 'react-native';

const About = (props) => {
    return (
        <View style={styles.container}>
            <Image source={require('../../assets/logo.png')}
                style={{ marginLeft: 'auto', marginRight: 'auto', width: 150, resizeMode: 'contain' }} />
            <Text style={{color: '#fff'}}>Created by <Text style={{ fontWeight: 'bold' }}>Katara Swalayan</Text></Text>
            <Text style={{ color: '#fff' }}>&copy; 2019 All rights reserved</Text>
        </View>
    );
};

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: '#000',
        color: '#fff',
        textAlign: 'center'
    }
};

export default About;