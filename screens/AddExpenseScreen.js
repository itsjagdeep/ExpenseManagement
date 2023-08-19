import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';

const AddExpenseScreen = ({ navigation, route }) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (route.params) {
      setName(route.params.name);
      setAmount(String(route.params.amount));
      setCategory(route.params.category);
    }
  }, [route.params]);

  const addOrEditExpense = () => {
    const action = route.params
      ? { type: 'EDIT_EXPENSE', index: route.params.index, payload: { name, amount: Number(amount), category } }
      : { type: 'ADD_EXPENSE', payload: { name, amount: Number(amount), category } };
    dispatch(action);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text>Add or Edit Expense</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Expense Name"
      />
      <TextInput
        style={styles.input}
        value={amount}
        onChangeText={setAmount}
        placeholder="Amount"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={category}
        onChangeText={setCategory}
        placeholder="Category"
      />
      <Button title={route.params ? 'Edit Expense' : 'Add Expense'} onPress={addOrEditExpense} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
});

export default AddExpenseScreen;