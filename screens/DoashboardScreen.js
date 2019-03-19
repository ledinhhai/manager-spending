import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { Container, View, Button, Fab } from 'native-base';
import { Icon } from 'expo';

export default class Doashboard extends React.Component {
    static navigationOptions = {
        header: null,
    };
    constructor(props) {
        super(props)
        this.state = {
            active: 'true'
        };
    }
    render() {
        return (
            <Container style={styles.container}>
                <View style={{ flex: 1 }}>
                    <Fab
                        active={this.state.active}
                        direction="up"
                        containerStyle={{}}
                        style={{ backgroundColor: '#5067FF' }}
                        position="bottomRight"
                        onPress={() => this.setState({ active: !this.state.active })}>
                        <Icon.Ionicons name={Platform.OS === 'ios' ? 'ios-add' : 'md-add'} />
                    </Fab>
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        //alignItems: 'center'
    },
});
