import * as React from 'react';
import { useState } from 'react';
import { ScrollView, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { DataTable } from 'react-native-paper';

const CalculationMethodsTable = () => {
  const [showTable, setShowTable] = useState(false);

  return (
    <>
    <Text style={styles.cellText}>
    There are different conventions for calculating prayer times depending on your region. If you are unsure you can{' '}
    <Text onPress={() => setShowTable(!showTable)} style={styles.link}>
      click here
    </Text>{' '}
    to consult the table below.

    </Text>

      {showTable && (
        <View style={styles.container}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title style={styles.methodColumn}><Text style={styles.cellText}>Method</Text></DataTable.Title>
            <DataTable.Title style={styles.regionColumn}><Text style={styles.cellText}>Region Used</Text></DataTable.Title>
          </DataTable.Header>

          <DataTable.Row>
            <DataTable.Cell style={styles.methodColumn}><Text style={styles.cellText}>MWL</Text></DataTable.Cell>
            <DataTable.Cell style={styles.regionColumn}><Text style={styles.cellText}>Europe, Far East, parts of US</Text></DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell style={styles.methodColumn}><Text style={styles.cellText}>ISNA</Text></DataTable.Cell>
            <DataTable.Cell style={styles.regionColumn}><Text style={styles.cellText}>North America (US and Canada)</Text></DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell style={styles.methodColumn}><Text style={styles.cellText}>Egypt</Text></DataTable.Cell>
            <DataTable.Cell style={styles.regionColumn}><Text style={styles.cellText}>Africa, Syria, Lebanon, Malaysia</Text></DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell style={styles.methodColumn}><Text style={styles.cellText}>Makkah</Text></DataTable.Cell>
            <DataTable.Cell style={styles.regionColumn}><Text style={styles.cellText}>Arabian Peninsula</Text></DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell style={styles.methodColumn}><Text style={styles.cellText}>Karachi</Text></DataTable.Cell>
            <DataTable.Cell style={styles.regionColumn}><Text style={styles.cellText}>Pakistan, Afghanistan, Bangladesh, India</Text></DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell style={styles.methodColumn}><Text style={styles.cellText}>Tehran</Text></DataTable.Cell>
            <DataTable.Cell style={styles.regionColumn}><Text style={styles.cellText}>Iran, Some Shia communities</Text></DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell style={styles.methodColumn}><Text style={styles.cellText}>Jafari</Text></DataTable.Cell>
            <DataTable.Cell style={styles.regionColumn}><Text style={styles.cellText}>Some Shia communities worldwide</Text></DataTable.Cell>
          </DataTable.Row>
        </DataTable>
    </View>
          )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 16,
    marginBottom: 16
  },
  methodColumn: {
    flex: 1,
  },
  regionColumn: {
    flex: 2,
  },
  cellText: {
    flex: 1,
    flexWrap: 'wrap',
    color: '#333',
    fontFamily: 'Poppins',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '500',
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default CalculationMethodsTable;
