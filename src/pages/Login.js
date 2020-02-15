import React, { useState } from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
  Alert,
} from 'react-native';

const Login = ({ navigation }) => {
  const [beneficiario, setBeneficiario] = useState(null);
  const navigateToSolicitacoes = () =>
    navigation.navigate('Solicitações', { beneficiario });

  const handlerBeneficiario = nome => setBeneficiario(nome);
  const handlerEntrar = () => {
    if (!beneficiario) {
      Alert.alert(
        'Atenção',
        'Informe o nome do beneficiário para entrar no sistema.',
        [{ text: 'Ok' }],
      );
      return;
    }
    navigateToSolicitacoes();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={styles.main} behavior="padding" enabled>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require('../assets/logo.png')} />
        </View>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Nome"
            autoCapitalize="words"
            autoCorrect={false}
            onChangeText={handlerBeneficiario}
            keyboardAppearance="dark"
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            keyboardAppearance="dark"
          />

          <TouchableOpacity style={styles.btnEntrar} onPress={handlerEntrar}>
            <Text style={styles.btnEntrarText}>Entrar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnRegistrar}>
            <Text style={styles.btnRegistrarText}>Cadastre-se</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  logo: {
    width: 150,
    height: 150,
  },
  form: {
    flex: 1,
    alignItems: 'center',
    width: '90%',
  },
  input: {
    backgroundColor: '#fff',
    marginBottom: 5,
    width: '90%',
    borderRadius: 20,
    height: 40,
    fontSize: 17,
    paddingLeft: 20,
  },
  btnEntrar: {
    backgroundColor: '#DF5C48',
    width: '90%',
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  btnEntrarText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
  },
  btnRegistrar: {
    marginTop: 7,
  },
  btnRegistrarText: {
    color: '#DF5C48',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default Login;
