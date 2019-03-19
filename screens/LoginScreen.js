import React from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { Icon } from 'expo';
import Hr from 'react-native-hr-component'
import {
  Container,
  Button,
  Text,
  Grid,
  Col,
  Row,
  Content,
  Form,
  Item,
  Label,
  Input,
  Thumbnail,
  View
} from 'native-base';
import * as firebase from 'firebase';

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  async loginWithFacebook() {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
      '839596163050057',
      { permissions: ['public_profile'] }
    );

    if (type === 'success') {
      // Build Firebase credential with the Facebook access token.
      const credential = firebase.auth.FacebookAuthProvider.credential(token);

      // Sign in with credential from the Facebook user.
      firebase.auth().signInAndRetrieveDataWithCredential(credential).then((user) => {
        if (user != null) {
          console.log(user);
          this.props.navigation.navigate('Dashboard')
        }
      }).catch((error) => {
        // Handle Errors here.
      });
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        this.props.navigation.navigate('Dashboard')
      }
    })
  }
  render() {
    return (
      <Container style={styles.container}>
        <Content style={styles.content}>
          <Thumbnail square style={styles.logo} source={require('../assets/images/splash.png')} />
          <Form style={styles.form}>
            <Item stackedLabel style={styles.formItem}>
              <Label>Username</Label>
              <Input style={{ borderColor: '#ff00ff' }} />
            </Item>
            <Item stackedLabel style={styles.formItem}>
              <Label>Password</Label>
              <Input style={{ borderColor: '#ff00ff' }} />
            </Item>
          </Form>
          <View style={styles.content}>
            <Text style={styles.txtForgot}>Forgot Password?</Text>
          </View>
          <Button full rounded primary style={styles.btn} onPress={() => this.props.navigation.navigate('Dashboard')}>
            <Text> Login </Text>
          </Button>
          <View style={styles.content}>
            <Hr lineColor='#95a5a6' text='OR LOGIN WITH' color='#95a5a6'
              lineStyles={{
                backgroundColor: "#95a5a6",
                height: 4,
              }}
            />
          </View>
          <Grid>
            <Row style={styles.row}>
              <Col>
                <Button full style={[styles.btn, styles.btnFaceBook]} onPress={this.loginWithFacebook}>
                  <Icon.Ionicons name='logo-facebook' style={styles.icons} />
                  <Text> Facebook </Text>
                </Button>
              </Col>
              <Col>
                <Button full style={[styles.btn, styles.btnGoogle]}>
                  <Icon.Ionicons name='logo-google' style={styles.icons} />
                  <Text> Google </Text>
                </Button>
              </Col>
            </Row>
          </Grid>
        </Content>
        <View style={styles.bottom}>
          <Text>Don't have an account? Sign up</Text>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 0,
    paddingTop: StatusBar.currentHeight,
  },
  content: {
    marginLeft: 0,
    marginRight: 0,
    flex: 1,
    padding: 5,
    position: 'relative'
  },
  row: {

  },
  form: {
    marginBottom: 15,
  },
  formItem: {
    marginLeft: 5,
    marginRight: 5
  },
  txtForgot: {
    color: '#7f8c8d',
    textAlign: 'right',
    marginBottom: 5,
    marginTop: 5,
    textDecorationLine: 'underline'
  },
  icons: {
    fontSize: 26,
    color: '#ecf0f1'
  },
  logo: {
    height: 200,
    width: 200,
    marginLeft: "auto",
    marginRight: "auto"
  },

  btn: {
    marginVertical: 5,
    marginHorizontal: 5,
    height: 50,
    fontSize: 16,
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0,
    elevation: 0,
    borderRadius: 10
  },
  btnGoogle: {
    backgroundColor: "#e74c3c"
  },
  btnFaceBook: {
    backgroundColor: "#3498db"
  },
  hairline: {
    backgroundColor: '#A2A2A2',
    height: 2,
    width: 165,
    marginVertical: 10,
    marginHorizontal: 10,
  },

  loginButtonBelowText1: {
    fontSize: 14,
    paddingHorizontal: 5,
    alignSelf: 'center',
    color: '#A2A2A2'
  },
  bottom: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    color: "#ecf0f1"
  }
});
