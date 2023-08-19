import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

const HomeScreen = ({ navigation }) => {
  const expenses = useSelector((state) => state.expenses);
  const dispatch = useDispatch();
  const totalExpenses = expenses.reduce((total, item) => total + item.amount, 0);
  const expensesByCategory = expenses.reduce((totals, item) => {
    totals[item.category] = [...(totals[item.category] || []), item];
    return totals;
  }, {});

  const deleteExpense = (index) => {
    dispatch({ type: 'DELETE_EXPENSE', index });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>List of Expenses</Text>
      <Button
        title="Add Expense"
        onPress={() => navigation.navigate('AddExpense')}
        style={styles.button}
      />
      <Text style={styles.total}>Total Expenses: ${totalExpenses.toFixed(2)}</Text>
      {Object.entries(expensesByCategory).map(([category, expenses]) => (
        <View key={category} style={styles.categoryContainer}>
          <Text style={styles.category}>{category}</Text>
          {expenses.map((expense, index) => (
            <View key={index} style={styles.expenseContainer}>
              <Text style={styles.expense}>
                {expense.name}: ${expense.amount.toFixed(2)}
              </Text>
              <Button
                title="Edit"
                onPress={() =>
                  navigation.navigate('AddExpense', { index, ...expense })
                }
              />
              <Button title="Delete" onPress={() => deleteExpense(index)} />
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  total: {
    fontSize: 20,
    marginVertical: 20,
  },
  categoryContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  category: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  expenseContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default HomeScreen;