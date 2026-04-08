import * as React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootStackParamList } from '../../navigation/types';
import { useTransactionsStore } from '../../store/transactionsStore';
import { formatDate, formatMoney, moneySignColor } from '../../utils/format';
import type { Transaction } from '../../types/transaction';

type Props = NativeStackScreenProps<RootStackParamList, 'Transactions'>;

type RowProps = {
  item: Transaction;
  onPress: () => void;
};

function EmptyState() {
  return (
    <View style={styles.center}>
      <Text style={styles.centerText}>No transactions yet.</Text>
    </View>
  );
}

function Separator() {
  return <View style={styles.separator} />;
}

function TransactionRow({ item, onPress }: RowProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
    >
      <View style={styles.rowTop}>
        <Text style={styles.transferName} numberOfLines={1}>
          {item.transferName}
        </Text>
        <Text style={[styles.amount, { color: moneySignColor(item.amount) }]}>
          {formatMoney(item.amount)}
        </Text>
      </View>

      <View style={styles.rowBottom}>
        <Text style={styles.recipient} numberOfLines={1}>
          {item.recipientName}
        </Text>
        <Text style={styles.date}>{formatDate(item.transferDate)}</Text>
      </View>
    </Pressable>
  );
}

export function TransactionsScreen({ navigation }: Props) {
  const { transactions, isLoading, errorMessage, fetchLatestTransactions } =
    useTransactionsStore();

  const renderItem = React.useCallback(
    ({ item }: { item: Transaction }) => (
      <TransactionRow
        item={item}
        onPress={() =>
          navigation.navigate('TransactionDetails', { transaction: item })
        }
      />
    ),
    [navigation],
  );

  React.useEffect(() => {
    fetchLatestTransactions();
  }, [fetchLatestTransactions]);

  if (isLoading) {
    return (
      <View style={styles.center}>
        <Text style={styles.centerText}>Loading latest transactions…</Text>
      </View>
    );
  }

  if (errorMessage) {
    return (
      <View style={styles.center}>
        <Text style={styles.centerText}>{errorMessage}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={transactions}
      contentContainerStyle={transactions.length === 0 ? styles.empty : undefined}
      keyExtractor={item => item.refId}
  renderItem={renderItem}
  ListEmptyComponent={EmptyState}
  ItemSeparatorComponent={Separator}
    />
  );
}

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: 'white',
  },
  rowPressed: {
    opacity: 0.7,
  },
  rowTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  rowBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 6,
    gap: 12,
  },
  transferName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  recipient: {
    flex: 1,
    fontSize: 13,
    color: '#4B5563',
  },
  date: {
    fontSize: 13,
    color: '#6B7280',
  },
  amount: {
    fontSize: 16,
    fontWeight: '700',
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#E5E7EB',
  },
  center: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  centerText: {
    fontSize: 15,
    color: '#111827',
  },
  empty: {
    flexGrow: 1,
    backgroundColor: 'white',
  },
});
