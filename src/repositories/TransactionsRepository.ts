import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionData {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    return this.transactions.reduce(
      (aggregated, current) => {
        switch (current.type) {
          case 'income':
            return {
              ...aggregated,
              income: aggregated.income + current.value,
              total: aggregated.total + current.value,
            };

          case 'outcome':
            return {
              ...aggregated,
              outcome: aggregated.outcome + current.value,
              total: aggregated.total - current.value,
            };

          default:
            return aggregated;
        }
      },
      { income: 0, outcome: 0, total: 0 },
    );
  }

  public create({ title, type, value }: CreateTransactionData): Transaction {
    const transaction = new Transaction({ title, type, value });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
