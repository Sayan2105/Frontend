import React from 'react';
import { View, Text, StyleSheet, StyleProp } from '@react-pdf/renderer';

// Define table styles
const styles = StyleSheet.create({
  table: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#000',
    borderStyle: 'solid',
    marginVertical: 5
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#000'
  },
  header: {
    flex: 1,
    padding: 7,
    borderRightWidth: 1,
    borderColor: '#000',
    // backgroundColor: '#f0f0f0',
    fontWeight: 'bold'
  },
  cell: {
    flex: 1,
    padding: 6,
    borderRightWidth: 1,
    borderColor: '#000'
  },
  lastCell: {
    borderRightWidth: 0
  }
});

// Prop type definitions
interface TableProps {
  children?: React.ReactNode;
  style?: StyleProp<any>;
}

interface TRProps {
  children?: React.ReactNode;
  style?: StyleProp<any>;
}

interface THProps {
  children?: React.ReactNode;
  style?: StyleProp<any>;
  last?: boolean;
}

interface TDProps {
  children?: React.ReactNode;
  style?: StyleProp<any>;
  last?: boolean;
}

// Table Component
export const Table: React.FC<TableProps> = ({ children, style }) => (
  <View style={[styles.table, style]}>{children}</View>
);

// Table Row Component
export const TR: React.FC<TRProps> = ({ children, style }) => (
  <View style={[styles.row, style]}>{children}</View>
);

// Table Header Cell Component
export const TH: React.FC<THProps> = ({ children, style, last }) => (
  <View style={[styles.header, last ? styles.lastCell : {}, style]}>
    <Text>{children}</Text>
  </View>
);

// Table Data Cell Component
export const TD: React.FC<TDProps> = ({ children, style, last }) => (
  <View style={[styles.cell, last ? styles.lastCell : {}, style]}>
    <Text>{children}</Text>
  </View>
);

export { Text };
