// Transaction Statistics Component
import React from 'react';
import { Card } from 'react-bootstrap';

const TransactionStatistics = ({ statistics }) => {
  return (
    <Card className="my-4">
      <Card.Body>
        <Card.Title>Statistics</Card.Title>
        <Card.Text>Total Sale Amount: {statistics.totalSaleAmount}</Card.Text>
        <Card.Text>Total Sold Items: {statistics.totalSoldItems}</Card.Text>
        <Card.Text>Total Not Sold Items: {statistics.totalNotSoldItems}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default TransactionStatistics