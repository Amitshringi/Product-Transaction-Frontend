// Transactions Table Component
import React from 'react';
import { Table } from 'react-bootstrap';

export const TransactionsTable = ({ transactions }) => {
  // Render message if no transactions found
  if (!transactions.length) {
    return <div>No transactions found.</div>;
  }

  // Render table with transactions data
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Price</th>
          <th>Date of Sale</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction) => (
          <tr key={transaction._id}>
            <td>{transaction.title}</td>
            <td>{transaction.description}</td>
            <td>{transaction.price}</td>
            <td>{new Date(transaction.dateOfSale).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};