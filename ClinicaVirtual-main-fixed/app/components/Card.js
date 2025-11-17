import React from 'react';
import { View } from 'react-native';
import { Card, Paragraph, Button } from 'react-native-paper';

export default function SimpleCard({ descricao, dataexame, preco, paciente, onDelete, onEdit }) {
  return (
    <Card style={{ margin: 8 }}>
      <Card.Title title={descricao} subtitle={`Paciente: ${paciente?.nome || ''}`} />
      <Card.Content>
        <Paragraph>Data: {dataexame}</Paragraph>
        <Paragraph>Preço: R$ {preco}</Paragraph>
      </Card.Content>
      <Card.Actions>
        <Button onPress={onEdit}>Editar</Button>
        <Button onPress={onDelete}>Excluir</Button>
      </Card.Actions>
    </Card>
  );
}
