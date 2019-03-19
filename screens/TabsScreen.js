import React from 'react';
import { Platform, StatusBar, StyleSheet, View, BackHandler } from 'react-native';
import AppNavigator from '../navigation/AppNavigator';

export default class TabsScreen extends React.Component {
    static navigationOptions = {
        header: null,
      };
    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', function () {
            return true
        })
    }
    render() {
        return (
            <View style={styles.container}>
                {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
                <AppNavigator />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
