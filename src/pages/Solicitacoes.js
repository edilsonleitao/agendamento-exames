import React, { useState } from 'react';
import { StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements';
import { uuid } from 'uuidv4';

const Solicitacoes = ({ navigation, route }) => {
  const { beneficiario } = route.params;
  const [examesSolicitados, setExamesSolicitados] = useState([
    {
      id: uuid(),
      nome: 'Radiografia',
      tipo: 'Imagem',
      status: 'Sincronizado',
      beneficiario,
    },
    {
      id: uuid(),
      nome: 'Hemograma',
      tipo: 'Sanguíneo',
      status: 'Realizado',
      beneficiario,
    },
  ]);

  const solicitarExame = ({ nome, tipo, status }) =>
    setExamesSolicitados(prevExames => [
      { id: uuid(), nome, tipo, status, beneficiario },
      ...prevExames,
    ]);

  const navigateToExames = exame =>
    navigation.navigate('Exames', { exame, solicitarExame });

  const renderExames = ({ item: exame }) => (
    <TouchableOpacity
      style={styles.btnEntrar}
      onPress={() => {
        return navigateToExames(exame);
      }}>
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
});

export default Solicitacoes;
