import React, { useState } from 'react';
import {
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';
import { ListItem } from 'react-native-elements';
import { uuid } from 'uuidv4';

const Solicitacoes = ({ navigation, route }) => {
  const { cliente } = route.params;
  const [examesSolicitados, setExamesSolicitados] = useState([]);

  navigation.setOptions({
    headerLeft: () => (
      <TouchableOpacity onPress={navigation.reset}>
        <Text style={styles.btnSair}>Sair</Text>
      </TouchableOpacity>
    ),
    headerRight: () => (
      <TouchableOpacity onPress={() => navigateToExames()}>
        <Text style={styles.btnAgendar}>Agendar</Text>
      </TouchableOpacity>
    ),
  });

  const solicitarExame = ({ nome, tipo, status }) =>
    setExamesSolicitados(prevExames => [
      { id: uuid(), nome, tipo, status, cliente },
      ...prevExames,
    ]);

  const cancelarExame = id =>
    setExamesSolicitados(prevExames =>
      prevExames.filter(exame => id !== exame.id),
    );

  const navigateToExames = exame =>
    navigation.navigate('Agendar', {
      exame,
      solicitarExame,
      cancelarExame,
    });

  const renderExames = ({ item: exame }) => (
    <TouchableOpacity
      style={styles.btnEntrar}
      onPress={() => navigateToExames(exame)}>
      <ListItem
        title={exame.nome}
        subtitle={exame.tipo}
        leftAvatar={
          <Image
            source={require('../assets/exame.png')}
            style={styles.leftAvatar}
          />
        }
        bottomDivider
      />
    </TouchableOpacity>
  );

  return (
    <FlatList
      keyExtractor={item => item.id}
      data={examesSolicitados}
      renderItem={renderExames}
    />
  );
};

const styles = StyleSheet.create({
  subtitleView: {
    flexDirection: 'row',
    paddingTop: 5,
    justifyContent: 'space-between',
  },
  leftAvatar: {
    width: 30,
    height: 40,
  },
  ratingImage: {
    height: 19.21,
    width: 100,
  },
  ratingText: {
    color: '#999',
  },
  btnSair: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 20,
  },
  btnAgendar: {
    color: '#fff',
    fontSize: 18,
    marginRight: 20,
  },
});

export default Solicitacoes;
