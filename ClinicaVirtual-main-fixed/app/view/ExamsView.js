import { useEffect, useLayoutEffect, useState } from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import { Button, Dialog, Provider as PaperProvider, Portal, TextInput } from 'react-native-paper';

import { deleteById, findAll, insert, update } from '../components/Api.js';
import Card from '../components/Card.js';

export default function ExamsView({ navigation }) {
  const [listExams, setListExams] = useState([]);

  const [id, setId] = useState(null);
  const [descricao, setDescricao] = useState('');
  const [dataexame, setDataexame] = useState('');
  const [preco, setPreco] = useState('');

  const [paciente, setPaciente] = useState({
    nome: '',
    rg: '',
    email: '',
  });

  const [showModal, setShowModal] = useState(false);

  // Função para formatar a data para ISO yyyy-MM-dd
  const formatarDataISO = (dataStr) => {
    if (!dataStr) return '';

    if (/^\d{4}-\d{2}-\d{2}$/.test(dataStr)) {
      return dataStr;
    }

    const partes = dataStr.split('/');
    if (partes.length === 3) {
      const [dia, mes, ano] = partes;
      return `${ano.padStart(4, '0')}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
    }

    return '';
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Exames',
      headerRight: () => (
        <Button onPress={consultar} textColor="black">
          Atualizar
        </Button>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    consultar();
  }, []);

  const consultar = async () => {
    try {
      let exames = await findAll();
      exames = exames.sort((a, b) => a.descricao.localeCompare(b.descricao));
      setListExams(exames);
    } catch (err) {
      alert(err.message);
    }
  };

  const excluir = async (id) => {
    try {
      await deleteById(id);
      alert('Exame removido com sucesso!');
      await consultar();
    } catch (error) {
      alert('Erro ao remover exame: ' + error.message);
    }
  };

  const validarEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const salvar = async () => {
    try {
      if (!descricao.trim()) {
        alert('Descrição é obrigatória');
        return;
      }

      const dataFormatada = formatarDataISO(dataexame);
      if (!dataFormatada) {
        alert('Data do exame inválida. Use o formato DD/MM/YYYY ou YYYY-MM-DD');
        return;
      }

      if (!preco.trim() || isNaN(preco)) {
        alert('Preço deve ser um número válido');
        return;
      }

      if (!paciente.nome.trim()) {
        alert('Nome do paciente é obrigatório');
        return;
      }

      if (
        !paciente.rg.trim() ||
        isNaN(paciente.rg) ||
        !Number.isInteger(Number(paciente.rg))
      ) {
        alert('RG do paciente deve ser um número inteiro válido');
        return;
      }

      if (!validarEmail(paciente.email.trim())) {
        alert('Email do paciente deve ser válido');
        return;
      }

      const precoNumber = Number(parseFloat(preco).toFixed(2));

      const pacienteObj = {
        nome: paciente.nome.trim(),
        rg: parseInt(paciente.rg, 10),
        email: paciente.email.trim(),
      };

      if (id) {
        await update(id, descricao, dataFormatada, precoNumber, pacienteObj);
        alert('Exame atualizado com sucesso!');
      } else {
        await insert(descricao, dataFormatada, precoNumber, pacienteObj);
        alert('Exame cadastrado com sucesso!');
      }

      await consultar();
      closeModal();
    } catch (error) {
      alert('Erro ao salvar exame: ' + (error.message || error));
    }
  };

  const openModal = () => setShowModal(true);

  const closeModal = () => {
    setShowModal(false);
    setId(null);
    setDescricao('');
    setDataexame('');
    setPreco('');
    setPaciente({ nome: '', rg: '', email: '' });
  };

  const editar = (exame) => {
    setId(exame.id);
    setDescricao(exame.descricao);
    setDataexame(exame.dataexame);
    setPreco(String(exame.preco));
    setPaciente({
      nome: exame.paciente?.nome || '',
      rg: exame.paciente?.rg ? String(exame.paciente.rg) : '',
      email: exame.paciente?.email || '',
    });
    openModal();
  };

  return (
    <PaperProvider>
      <FlatList
        data={listExams}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card
            {...item}
            onDelete={() => excluir(item.id)}
            onEdit={() => editar(item)}
          />
        )}
      />
      <View style={{ height: 190, justifyContent: 'space-evenly', padding: 16 }}>
        <Button
          onPress={consultar}
          mode="contained"
          buttonColor="#1F3B73"
          textColor="white"
        >
          ATUALIZAR
        </Button>
        <Button
          onPress={openModal}
          mode="contained"
          buttonColor="#1F3B73"
          textColor="white"
        >
          ADICIONAR EXAME
        </Button>
      </View>
      <Portal>
        <Dialog visible={showModal} onDismiss={closeModal} style={{ backgroundColor: 'black' }}>
          <Dialog.Title>{id ? 'Editar Exame' : 'Novo Exame'}</Dialog.Title>
          <Dialog.Content>
            <ScrollView>
              <TextInput
                mode="outlined"
                label="Descrição"
                value={descricao}
                onChangeText={setDescricao}
              />
              <TextInput
                mode="outlined"
                label="Data Exame (YYYY-MM-DD ou DD/MM/YYYY)"
                keyboardType="numeric"
                value={dataexame}
                onChangeText={setDataexame}
                placeholder="2025-06-04 ou 04/06/2025"
              />
              <TextInput
                mode="outlined"
                label="Preço"
                keyboardType="decimal-pad"
                value={preco}
                onChangeText={setPreco}
              />
              <TextInput
                mode="outlined"
                label="Nome do Paciente"
                value={paciente.nome}
                onChangeText={(text) =>
                  setPaciente((prev) => ({ ...prev, nome: text }))
                }
              />
              <TextInput
                mode="outlined"
                label="RG do Paciente"
                keyboardType="numeric"
                value={paciente.rg}
                onChangeText={(text) =>
                  setPaciente((prev) => ({ ...prev, rg: text }))
                }
              />
              <TextInput
                mode="outlined"
                label="Email do Paciente"
                keyboardType="email-address"
                value={paciente.email}
                onChangeText={(text) =>
                  setPaciente((prev) => ({ ...prev, email: text }))
                }
              />
            </ScrollView>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={closeModal} textColor="#1F3B73">
              CANCELAR
            </Button>
            <Button onPress={salvar} textColor="#1F3B73">
              SALVAR
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </PaperProvider>
  );
}
