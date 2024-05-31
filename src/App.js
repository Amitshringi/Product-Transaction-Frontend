// Importing necessary CSS and libraries
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TransactionsTable } from './Components/TransactionTable';
import TransactionStatistics from './Components/TransactionStatistics';
import TransactionsBarChart from './Components/TransactionsBarChart';
import TransactionsPieChart from './Components/TransactionsPieChart';
import { Container, Row, Col, Form, Button, Pagination } from 'react-bootstrap';

function App() {
  // State variables initialization
  const [month, setMonth] = useState('03'); // Selected month for data fetching
  const [transactions, setTransactions] = useState([]); // Array to store fetched transactions
  const [statistics, setStatistics] = useState({}); // Object to store fetched statistics
  const [barChart, setBarChart] = useState([]); // Array to store bar chart data
  const [pieChart, setPieChart] = useState([]); // Array to store pie chart data
  const [search, setSearch] = useState(''); // Search input value
  const [page, setPage] = useState(1); // Current page number
  const [total, setTotal] = useState(0); // Total number of transactions
  const perpage = 10; // Number of transactions per page

  // Fetch data on initial load and when month, search, or page changes
  useEffect(() => {
    fetchTransactions();
    fetchStatistics();
    fetchBarChart();
    fetchPieChart();
  }, [month, search, page]);

  // Fetch transactions data from the server
  const fetchTransactions = async () => {
    try {
      const response = await axios.get('http://localhost:5000/transactions', {
        params: { search, page, perpage, month },
      });
      setTransactions(response.data.transactions);
      setTotal(response.data.total);
    } catch (error) {
      console.error('Error fetching transactions', error);
    }
  };

  // Fetch statistics data from the server
  const fetchStatistics = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/statistics/${month}`);
      setStatistics(response.data);
    } catch (error) {
      console.error('Error fetching statistics', error);
    }
  };

  // Fetch bar chart data from the server
  const fetchBarChart = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/bar-chart/${month}`);
      setBarChart(response.data);
    } catch (error) {
      console.error('Error fetching bar chart data', error);
    }
  };

  // Fetch pie chart data from the server
  const fetchPieChart = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/pie-chart/${month}`);
      setPieChart(response.data);
    } catch (error) {
      console.error('Error fetching pie chart data', error);
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1); // Reset to the first page on search change
  };

  // Handle clear search
  const handleClearSearch = () => {
    setSearch('');
    setPage(1); // Reset to the first page on clear search
  };

  return (
    <Container>
      {/* Header */}
      <h1 className="my-4 text-center">Transactions Dashboard</h1>

      {/* Month select and search input */}
      <Row className="mb-4">
        <Col md={4}>
          {/* Month select dropdown */}
          <Form.Group controlId="monthSelect">
            <Form.Label>Select Month</Form.Label>
            <Form.Control as="select" value={month} onChange={(e) => setMonth(e.target.value)}>
              {/* Generate options for each month */}
              {Array.from({ length: 12 }, (_, index) => (
                <option key={index + 1} value={(index + 1).toString().padStart(2, '0')}>
                  {new Date(0, index).toLocaleString('default', { month: 'long' })}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
        <Col md={8}>
          {/* Search input */}
          <Form.Group controlId="searchBox">
            <Form.Label>Search Transactions</Form.Label>
            <Form.Control
              type="text"
              placeholder="Search by title, description, or price"
              value={search}
              onChange={handleSearchChange}
            />
          </Form.Group>
        </Col>
      </Row>

      {/* Transactions table */}
      <TransactionsTable transactions={transactions} />

      {/* Pagination */}
      <div className="d-flex justify-content-center my-4">
        <Pagination>
          <Pagination.Prev onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1} />
          <Pagination.Item>{page}</Pagination.Item>
          <Pagination.Next onClick={() => setPage((prev) => (prev * perpage < total ? prev + 1 : prev))} disabled={transactions.length < perpage} />
        </Pagination>
      </div>

      {/* Statistics */}
      <TransactionStatistics statistics={statistics} />

      {/* Bar and Pie Charts */}
      <Row className="my-4">
        <Col md={6}>
          <TransactionsBarChart data={barChart} />
        </Col>
        <Col md={6}>
          <TransactionsPieChart data={pieChart} />
        </Col>
      </Row>
    </Container>
  );
}

export default App;