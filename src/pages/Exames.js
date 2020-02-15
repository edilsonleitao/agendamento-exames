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
  const { exame = {}, solicitarExame, cancelarExame } = route.params;

  const [nomeExame, setNomeExame] = useState(exame.nome || null);
  const [tipoExame, setTipoExame] = useState(exame.tipo || null);
  const [status] = useState(exame.status || null);

  const navigateToSolicitacoes = () => navigation.navigate('Solicitações');

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

  const handlerCancelar = () => {
    cancelarExame(exame.id);
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
            onChangeText={text => setNomeExame(text)}
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
            onChangeText={text => setTipoExame(text)}
            disabled={desabilitaAlteracaoPedido()}
          />

          <View style={styles.containerBtn}>
            <TouchableOpacity
              style={
                desabilitaAlteracaoPedido()
                  ? { ...styles.btn, backgroundColor: '#999' }
                  : styles.btn
              }
              onPress={handlerSolicitar}
              disabled={desabilitaAlteracaoPedido()}>
              <Text style={styles.btnText}>
                {exame.id ? 'Editar' : 'Solicitar'}
              </Text>
            </TouchableOpacity>

            {exame.id && (
              <TouchableOpacity
                style={
                  desabilitaAlteracaoPedido()
                    ? { ...styles.btn, backgroundColor: '#999' }
                    : styles.btn
                }
                onPress={handlerCancelar}
                disabled={desabilitaAlteracaoPedido()}>
                <Text style={styles.btnText}>Cancelar</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  input: {
    marginTop: 20,
  },
  containerBtn: {
    marginTop: 40,
  },
  btn: {
    backgroundColor: '#DF5C48',
    width: '90%',
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    alignSelf: 'center',
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
  },
});

export default Exames;
