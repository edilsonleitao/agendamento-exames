import React, { useState } from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  View,
  Text,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import { Input } from 'react-native-elements';

const Exames = ({ navigation, route }) => {
  const { exame, solicitarExame } = route.params;

  const [nomeExame, setNomeExame] = useState(exame.nome);
  const [tipoExame, setTipoExame] = useState(exame.tipo);
  const [status, setStatus] = useState(exame.status);

  const navigateToSolicitacoes = () => navigation.navigate('Solicitações');

  const handlerNomeExame = nome => setNomeExame(nome);
  const handlerTipoExame = nome => setTipoExame(nome);

  const handlerSolicitar = () => {
    if (!nomeExame || !tipoExame) {
      Alert.alert(
        'Atenção',
        'Informe o nome e o tipo do exame que deseja solicitar.',
        [{ text: 'Ok' }],
      );
      return;
    }
    solicitarExame({ nome: nomeExame, tipo: tipoExame, status });
    navigateToSolicitacoes();
  };

  const desabilitaAlteracaoPedido = () =>
    status === 'Realizado' || status === 'Offline' ? true : false;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView behavior="padding" enabled>
        <View>
          <Input
            labelStyle={styles.input}
            placeholder="Informe o exame desejado"
            label="Exame"
            autoCorrect={false}
            autoCapitalize="words"
            keyboardAppearance="dark"
            value={nomeExame}
            onChangeText={handlerNomeExame}
            disabled={desabilitaAlteracaoPedido()}
          />
          <Input
            labelStyle={styles.input}
            placeholder="Selecione o tipo do exame"
            label="Tipo do Exame"
            autoCorrect={false}
            autoCapitalize="words"
            keyboardAppearance="dark"
            value={tipoExame}
            onChangeText={handlerTipoExame}
            disabled={desabilitaAlteracaoPedido()}
          />

          <TouchableOpacity
            style={styles.btnSalvar}
            onPress={handlerSolicitar}
            disabled={desabilitaAlteracaoPedido()}>
            <Text style={styles.btnSalvarText}>Solicitar</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  input: {
    marginTop: 20,
  },
  btnSalvar: {
    backgroundColor: '#DF5C48',
    width: '90%',
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    alignSelf: 'center',
  },
  btnSalvarText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
  },
});

export default Exames;
