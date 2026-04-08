import * as React from 'react';
import { Share, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootStackParamList } from '../../navigation/types';
import { formatDate, formatMoney, moneySignColor } from '../../utils/format';

type Props = NativeStackScreenProps<RootStackParamList, 'TransactionDetails'>;

type DetailRowProps = {
  label: string;
  value: string;
  valueColor?: string;
};

function DetailRow({ label, value, valueColor }: DetailRowProps) {
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={[styles.detailValue, valueColor ? { color: valueColor } : null]}>
        {value}
      </Text>
    </View>
  );
}

type HeaderShareButtonProps = {
  message: string;
};

function HeaderShareButton({ message }: HeaderShareButtonProps) {
  return (
    <Text
      accessibilityRole="button"
      onPress={() => Share.share({ message })}
      style={styles.shareButton}
    >
      Share
    </Text>
  );
}

function makeHeaderRight(message: string) {
  return () => <HeaderShareButton message={message} />;
}

export function TransactionDetailsScreen({ navigation, route }: Props) {
  const { transaction } = route.params;

  const shareMessage = React.useMemo(() => {
    return (
      `Transaction details\n` +
      `Ref ID: ${transaction.refId}\n` +
      `Date: ${formatDate(transaction.transferDate)}\n` +
      `Recipient: ${transaction.recipientName}\n` +
      `Transfer: ${transaction.transferName}\n` +
      `Amount: ${formatMoney(transaction.amount)}`
    );
  }, [transaction]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
  headerRight: makeHeaderRight(shareMessage),
    });
  }, [navigation, shareMessage]);

  return (
    <View style={styles.container}>
      <DetailRow label="Reference ID" value={transaction.refId} />
      <DetailRow label="Date" value={formatDate(transaction.transferDate)} />
      <DetailRow label="Recipient" value={transaction.recipientName} />
      <DetailRow label="Transfer name" value={transaction.transferName} />
      <DetailRow
        label="Amount"
        value={formatMoney(transaction.amount)}
        valueColor={moneySignColor(transaction.amount)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  shareButton: {
    color: '#2563EB',
    fontSize: 16,
    fontWeight: '600',
  },
  detailRow: {
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E7EB',
  },
  detailLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 6,
  },
  detailValue: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '600',
  },
});
