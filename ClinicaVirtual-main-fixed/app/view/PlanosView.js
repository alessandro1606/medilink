import React, { useLayoutEffect } from 'react';
import { ScrollView } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';

export default function PlanosView({ navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Planos disponíveis',
    });
  }, [navigation]);

  return (
    <ScrollView style={{ padding: 16 }}>
      {/* Plano Básico */}
      <Card style={{ marginBottom: 16 }}>
        <Card.Title title="Plano Básico" />
        <Card.Content>
          <Text>
            Ideal para quem está começando. Inclui recursos essenciais para uso
            pessoal.
          </Text>
          <Text style={{ marginTop: 8, fontWeight: 'bold' }}>R$ 99,00/mês</Text>
        </Card.Content>
        <Card.Actions>
          <Button mode="contained" buttonColor="#1F3B73">
            Assinar
          </Button>
        </Card.Actions>
      </Card>

      {/* Plano Intermediário */}
      <Card style={{ marginBottom: 16 }}>
        <Card.Title title="Plano Intermediário" />
        <Card.Content>
          <Text>
            Perfeito para profissionais que desejam mais controle e desempenho.
          </Text>
          <Text style={{ marginTop: 8, fontWeight: 'bold' }}>R$ 199,00/mês</Text>
        </Card.Content>
        <Card.Actions>
          <Button mode="contained" buttonColor="#1F3B73">
            Assinar
          </Button>
        </Card.Actions>
      </Card>

      {/* Plano Avançado */}
      <Card style={{ marginBottom: 16 }}>
        <Card.Title title="Plano Avançado" />
        <Card.Content>
          <Text>
            Voltado para empresas e equipes que precisam de todos os recursos
            disponíveis.
          </Text>
          <Text style={{ marginTop: 8, fontWeight: 'bold' }}>R$ 299,00/mês</Text>
        </Card.Content>
        <Card.Actions>
          <Button mode="contained" buttonColor="#1F3B73">
            Assinar
          </Button>
        </Card.Actions>
      </Card>
    </ScrollView>
  );
}
