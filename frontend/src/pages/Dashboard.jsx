import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight,
  ArrowDownLeft,
  Wallet,
  CreditCard,
  History,
  Download,
  Search,
  Bell,
  CheckCircle,
  XCircle,
  Clock,
  Banknote,
  Eye,
  EyeOff,
  ChevronRight,
  Plus,
  Settings,
  Building,
  Calendar,
  MapPin,
  FileText,
  Copy,
  Share2,
  Lock
} from 'lucide-react';
import '../styles/dashboard.css';

const Dashboard = () => {
  const [showBalance, setShowBalance] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(14501.39);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [selectedAccount, setSelectedAccount] = useState('checking');
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAccountDetails, setSelectedAccountDetails] = useState(null);
  const [showAccountDetails, setShowAccountDetails] = useState(false);

  // Accounts data - Only Savings and Investment
  const accounts = [
    { id: 'savings', name: 'Savings Account', balance: 12450.89, number: 'SAV-4832-2024', type: 'Savings', color: '#10b981', openingDate: '2023-01-15', branch: 'Main Branch' },
    { id: 'investment', name: 'Investment Portfolio', balance: 2450.50, number: 'INV-6194-2024', type: 'Investment', color: '#8b5cf6', openingDate: '2023-03-20', branch: 'Investment Division' }
  ];

  // All accounts (for the accounts page)
  const allAccounts = [
    ...accounts
  ];

  // Mock transaction data
  useEffect(() => {
    const mockTransactions = [
      {
        id: 1,
        type: 'deposit',
        title: 'Salary Deposit',
        description: 'Monthly salary from TechCorp Inc.',
        amount: 4500.00,
        date: '2024-01-15 09:00',
        status: 'completed',
        account: 'savings',
        category: 'Income'
      },
      {
        id: 2,
        type: 'withdrawal',
        title: 'Amazon Purchase',
        description: 'Electronics purchase',
        amount: -899.99,
        date: '2024-01-14 14:30',
        status: 'completed',
        account: 'savings',
        category: 'Shopping'
      },
      {
        id: 3,
        type: 'deposit',
        title: 'Freelance Payment',
        description: 'Web development project',
        amount: 1200.00,
        date: '2024-01-13 11:15',
        status: 'completed',
        account: 'investment',
        category: 'Income'
      },
      {
        id: 4,
        type: 'withdrawal',
        title: 'Rent Payment',
        description: 'Monthly apartment rent',
        amount: -1500.00,
        date: '2024-01-12 08:00',
        status: 'pending',
        account: 'savings',
        category: 'Housing'
      },
      {
        id: 5,
        type: 'withdrawal',
        title: 'Grocery Shopping',
        description: 'Weekly groceries',
        amount: -245.75,
        date: '2024-01-11 16:45',
        status: 'completed',
        account: 'savings',
        category: 'Food'
      },
      {
        id: 6,
        type: 'deposit',
        title: 'Stock Dividend',
        description: 'Quarterly dividend payment',
        amount: 325.50,
        date: '2024-01-10 10:20',
        status: 'completed',
        account: 'investment',
        category: 'Investment'
      },
      {
        id: 7,
        type: 'withdrawal',
        title: 'Netflix Subscription',
        description: 'Monthly subscription',
        amount: -15.99,
        date: '2024-01-09 14:00',
        status: 'completed',
        account: 'savings',
        category: 'Entertainment'
      }
    ];
    setTransactions(mockTransactions);
  }, []);

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Format date only (without time)
  const formatDateOnly = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Get filtered transactions
  const filteredTransactions = transactions.filter(transaction => {
    if (filter === 'all') return true;
    if (filter === 'deposit') return transaction.type === 'deposit';
    if (filter === 'withdrawal') return transaction.type === 'withdrawal';
    if (filter === 'transfer') return transaction.type === 'transfer';
    return true;
  }).filter(transaction => 
    transaction.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle deposit
  const handleDeposit = (e) => {
    e.preventDefault();
    const amount = parseFloat(depositAmount);
    if (amount > 0) {
      setBalance(prev => prev + amount);
      
      // Add transaction
      const newTransaction = {
        id: transactions.length + 1,
        type: 'deposit',
        title: 'Manual Deposit',
        description: `Deposit to ${accounts.find(acc => acc.id === selectedAccount)?.name}`,
        amount: amount,
        date: new Date().toISOString(),
        status: 'completed',
        account: selectedAccount,
        category: 'Deposit'
      };
      
      setTransactions(prev => [newTransaction, ...prev]);
      setDepositAmount('');
      setShowDepositModal(false);
    }
  };

  // Handle withdrawal
  const handleWithdraw = (e) => {
    e.preventDefault();
    const amount = parseFloat(withdrawAmount);
    const account = accounts.find(acc => acc.id === selectedAccount);
    
    if (amount > 0 && amount <= account.balance) {
      setBalance(prev => prev - amount);
      
      // Add transaction
      const newTransaction = {
        id: transactions.length + 1,
        type: 'withdrawal',
        title: 'Cash Withdrawal',
        description: `Withdrawal from ${account.name}`,
        amount: -amount,
        date: new Date().toISOString(),
        status: 'pending',
        account: selectedAccount,
        category: 'Withdrawal'
      };
      
      setTransactions(prev => [newTransaction, ...prev]);
      setWithdrawAmount('');
      setShowWithdrawModal(false);
    } else if (amount > account.balance) {
      alert('Insufficient funds');
    }
  };

  // Quick actions - Only Deposit & Withdraw
  const quickActions = [
    { icon: <ArrowDownLeft size={24} />, label: 'Deposit', color: '#10B981', action: () => setShowDepositModal(true) },
    { icon: <ArrowUpRight size={24} />, label: 'Withdraw', color: '#3182ce', action: () => setShowWithdrawModal(true) }
  ];

  // Handle View Details
  const handleViewDetails = (account) => {
    setSelectedAccountDetails(account);
    setShowAccountDetails(true);
  };

  // Handle Manage (Now renamed to "Settings")
  const handleManageAccount = (account) => {
    // For now, let's show a simple alert. In a real app, this would open a settings modal
    alert(`Settings for ${account.name}\n\nAvailable options:\n• Change account nickname\n• Update statements preferences\n• Set up alerts\n• Manage beneficiaries`);
  };

  // Render Overview Content
  const renderOverview = () => (
    <main className="dashboard-main">
      {/* Left Column - Balance & Accounts */}
      <div className="left-column">
        {/* Balance Card - Clean Design */}
        <motion.div 
          className="balance-card clean"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="balance-top">
            <div className="balance-header">
              <h3 className="balance-label">Total Balance</h3>
              <button 
                className="toggle-visibility"
                onClick={() => setShowBalance(!showBalance)}
              >
                {showBalance ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            
            <div className="balance-amount-large">
              {showBalance ? formatCurrency(balance) : '••••••'}
            </div>
          </div>
          
          <div className="balance-actions-horizontal">
            <motion.button 
              className="action-btn deposit"
              onClick={() => setShowDepositModal(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowDownLeft size={20} />
              <span>Deposit</span>
            </motion.button>
            
            <motion.button 
              className="action-btn withdraw"
              onClick={() => setShowWithdrawModal(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowUpRight size={20} />
              <span>Withdraw</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Accounts Summary */}
        <motion.div 
          className="accounts-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <div className="card-header">
            <h3>Your Accounts</h3>
            <button className="view-all">
              View All <ChevronRight size={16} />
            </button>
          </div>
          
          <div className="accounts-list">
            {accounts.map((account, index) => (
              <motion.div
                key={account.id}
                className="account-item"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                whileHover={{ x: 5 }}
              >
                <div className="account-info">
                  <div className="account-icon" style={{ background: account.color }}>
                    {account.type === 'Savings' ? <Banknote size={20} /> : <Building size={20} />}
                  </div>
                  <div>
                    <div className="account-name">{account.name}</div>
                    <div className="account-number">{account.number}</div>
                  </div>
                </div>
                
                <div className="account-balance">
                  <div className="balance">{formatCurrency(account.balance)}</div>
                  <div className="account-type">{account.type}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div 
          className="quick-actions-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h3>Quick Actions</h3>
          <div className="actions-grid">
            {quickActions.map((action, index) => (
              <motion.button
                key={action.label}
                className="quick-action"
                onClick={action.action}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                <div className="action-icon" style={{ background: action.color }}>
                  {action.icon}
                </div>
                <span className="action-label">{action.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right Column - Transactions */}
      <div className="right-column">
        {/* Transactions Card */}
        <motion.div 
          className="transactions-card"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="card-header">
            <div>
              <h3>Recent Transactions</h3>
              <p className="subtitle">Your last {filteredTransactions.length} transactions</p>
            </div>
            
            <div className="header-actions">
              <div className="filter-tabs">
                {['all', 'deposit', 'withdrawal'].map((tab) => (
                  <button
                    key={tab}
                    className={`filter-tab ${filter === tab ? 'active' : ''}`}
                    onClick={() => setFilter(tab)}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
              
              <button className="export-btn">
                <Download size={16} />
                Export
              </button>
            </div>
          </div>
          
          <div className="transactions-list">
            <AnimatePresence>
              {filteredTransactions.slice(0, 8).map((transaction) => (
                <motion.div
                  key={transaction.id}
                  className="transaction-item"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ backgroundColor: '#f8fafc' }}
                >
                  <div className="transaction-icon">
                    <div className={`icon-wrapper ${transaction.type}`}>
                      {transaction.type === 'deposit' ? <ArrowDownLeft size={18} /> :
                       transaction.type === 'withdrawal' ? <ArrowUpRight size={18} /> :
                       <ArrowUpRight size={18} />}
                    </div>
                  </div>
                  
                  <div className="transaction-details">
                    <div className="transaction-title">{transaction.title}</div>
                    <div className="transaction-description">
                      {transaction.description}
                      <span className="transaction-date">{formatDate(transaction.date)}</span>
                    </div>
                  </div>
                  
                  <div className="transaction-amount">
                    <div className={`amount ${transaction.amount > 0 ? 'positive' : 'negative'}`}>
                      {transaction.amount > 0 ? '+' : ''}{formatCurrency(transaction.amount)}
                    </div>
                    <div className="transaction-status">
                      <span className={`status-badge ${transaction.status}`}>
                        {transaction.status === 'completed' ? <CheckCircle size={12} /> :
                         transaction.status === 'pending' ? <Clock size={12} /> :
                         <XCircle size={12} />}
                        {transaction.status}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {filteredTransactions.length === 0 && (
              <div className="empty-state">
                <History size={48} />
                <p>No transactions found</p>
                <button 
                  className="primary-btn"
                  onClick={() => setFilter('all')}
                >
                  View All Transactions
                </button>
              </div>
            )}
          </div>
          
          <button className="view-all-btn">
            View All Transactions <ChevronRight size={16} />
          </button>
        </motion.div>
      </div>
    </main>
  );

  // Render Transactions Content
  const renderTransactions = () => (
    <main className="transactions-page">
      <div className="page-header">
        <h2>All Transactions</h2>
        <p>View and manage all your transaction history</p>
      </div>

      <div className="transactions-container">
        {/* Filters and Search */}
        <div className="transactions-filters">
          <div className="search-box">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="filter-controls">
            <div className="filter-group">
              <label>Filter by Type:</label>
              <div className="filter-tabs">
                {['all', 'deposit', 'withdrawal'].map((tab) => (
                  <button
                    key={tab}
                    className={`filter-tab ${filter === tab ? 'active' : ''}`}
                    onClick={() => setFilter(tab)}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="transactions-table-container">
          <div className="table-header">
            <div className="table-row header">
              <div className="table-cell">Description</div>
              <div className="table-cell">Account</div>
              <div className="table-cell">Category</div>
              <div className="table-cell">Date</div>
              <div className="table-cell">Status</div>
              <div className="table-cell">Amount</div>
            </div>
          </div>
          
          <div className="table-body">
            {filteredTransactions.map((transaction) => (
              <motion.div
                key={transaction.id}
                className="table-row"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                whileHover={{ backgroundColor: '#f8fafc' }}
              >
                <div className="table-cell">
                  <div className="transaction-info">
                    <div className={`icon-wrapper ${transaction.type}`}>
                      {transaction.type === 'deposit' ? <ArrowDownLeft size={16} /> :
                       <ArrowUpRight size={16} />}
                    </div>
                    <div>
                      <div className="transaction-title">{transaction.title}</div>
                      <div className="transaction-description">{transaction.description}</div>
                    </div>
                  </div>
                </div>
                
                <div className="table-cell">
                  <div className="account-badge">
                    {transaction.account}
                  </div>
                </div>
                
                <div className="table-cell">
                  <span className="category-badge">{transaction.category}</span>
                </div>
                
                <div className="table-cell">
                  {formatDate(transaction.date)}
                </div>
                
                <div className="table-cell">
                  <span className={`status-badge ${transaction.status}`}>
                    {transaction.status === 'completed' ? <CheckCircle size={12} /> :
                     transaction.status === 'pending' ? <Clock size={12} /> :
                     <XCircle size={12} />}
                    {transaction.status}
                  </span>
                </div>
                
                <div className="table-cell">
                  <div className={`amount ${transaction.amount > 0 ? 'positive' : 'negative'}`}>
                    {transaction.amount > 0 ? '+' : ''}{formatCurrency(transaction.amount)}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="pagination">
          <button className="pagination-btn prev">Previous</button>
          <div className="page-numbers">
            <span className="page-number active">1</span>
            <span className="page-number">2</span>
            <span className="page-number">3</span>
            <span className="page-dots">...</span>
          </div>
          <button className="pagination-btn next">Next</button>
        </div>
      </div>
    </main>
  );

  // Render Accounts Content
  const renderAccounts = () => (
    <main className="accounts-page">
      <div className="page-header">
        <div>
          <h2>Your Accounts</h2>
          <p>Manage all your bank accounts in one place</p>
        </div>
      </div>

      <div className="accounts-grid">
        {allAccounts.map((account) => (
          <motion.div
            key={account.id}
            className="account-card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            whileHover={{ y: -5, boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
          >
            <div className="account-card-header">
              <div className="account-icon-large" style={{ background: account.color }}>
                {account.type === 'Savings' ? <Banknote size={24} /> : <Building size={24} />}
              </div>
              <div className="account-type-badge" style={{ background: account.color + '20', color: account.color }}>
                {account.type}
              </div>
            </div>
            
            <div className="account-card-body">
              <h3 className="account-name">{account.name}</h3>
              <p className="account-number">{account.number}</p>
              
              <div className="account-balance-info">
                <div className="balance-label">Current Balance</div>
                <div className="balance-amount">
                  {formatCurrency(account.balance)}
                </div>
              </div>
            </div>
            
            <div className="account-card-footer">
              <button 
                className="account-action-btn"
                onClick={() => handleViewDetails(account)}
              >
                <Eye size={16} />
                View Details
              </button>
              <button 
                className="account-action-btn"
                onClick={() => handleManageAccount(account)}
              >
                <Settings size={16} />
                Settings
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );

  return (
    <div className="bank-dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <div className="logo">
            <div className="logo-circle">
              <svg className="logo-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="logo-text">OpenBank</span>
          </div>
          
          <nav className="main-nav">
            <button 
              className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <Wallet size={18} />
              Overview
            </button>
            <button 
              className={`nav-item ${activeTab === 'transactions' ? 'active' : ''}`}
              onClick={() => setActiveTab('transactions')}
            >
              <History size={18} />
              Transactions
            </button>
            <button 
              className={`nav-item ${activeTab === 'accounts' ? 'active' : ''}`}
              onClick={() => setActiveTab('accounts')}
            >
              <CreditCard size={18} />
              Accounts
            </button>
          </nav>
        </div>
        
        <div className="header-right">
          <motion.button 
            className="notification-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Bell size={20} />
            <span className="notification-badge">2</span>
          </motion.button>
          
          <div className="user-profile">
            <div className="avatar">JD</div>
            <div className="user-info">
              <span className="user-name">John Doe</span>
              <span className="user-email">john@example.com</span>
            </div>
          </div>
        </div>
      </header>

      {/* Render content based on active tab */}
      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'transactions' && renderTransactions()}
      {activeTab === 'accounts' && renderAccounts()}

      {/* Account Details Modal */}
      <AnimatePresence>
        {showAccountDetails && selectedAccountDetails && (
          <motion.div 
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAccountDetails(false)}
          >
            <motion.div 
              className="modal-content account-details-modal"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h3>Account Details</h3>
                <button className="close-btn" onClick={() => setShowAccountDetails(false)}>
                  ✕
                </button>
              </div>
              
              <div className="account-details-content">
                <div className="account-details-header">
                  <div className="account-icon-large" style={{ background: selectedAccountDetails.color }}>
                    {selectedAccountDetails.type === 'Savings' ? <Banknote size={32} /> : <Building size={32} />}
                  </div>
                  <div className="account-header-info">
                    <h2>{selectedAccountDetails.name}</h2>
                    <p className="account-type">{selectedAccountDetails.type} Account</p>
                  </div>
                </div>
                
                <div className="balance-display">
                  <div className="balance-label">Current Balance</div>
                  <div className="balance-amount-large">{formatCurrency(selectedAccountDetails.balance)}</div>
                </div>
                
                <div className="account-info-grid">
                  <div className="info-item">
                    <div className="info-label">
                      <FileText size={16} />
                      Account Number
                    </div>
                    <div className="info-value">
                      {selectedAccountDetails.number}
                      <button className="copy-btn" onClick={() => navigator.clipboard.writeText(selectedAccountDetails.number)}>
                        <Copy size={14} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="info-item">
                    <div className="info-label">
                      <Calendar size={16} />
                      Opening Date
                    </div>
                    <div className="info-value">{formatDateOnly(selectedAccountDetails.openingDate)}</div>
                  </div>
                  
                  <div className="info-item">
                    <div className="info-label">
                      <MapPin size={16} />
                      Branch
                    </div>
                    <div className="info-value">{selectedAccountDetails.branch}</div>
                  </div>
                  
                  <div className="info-item">
                    <div className="info-label">
                      <Lock size={16} />
                      Account Status
                    </div>
                    <div className="info-value status-active">
                      <div className="status-dot"></div>
                      Active
                    </div>
                  </div>
                </div>
                
                <div className="account-actions">
                  <button className="action-btn primary" onClick={() => setShowDepositModal(true)}>
                    <ArrowDownLeft size={18} />
                    Make Deposit
                  </button>
                  <button className="action-btn secondary" onClick={() => setShowWithdrawModal(true)}>
                    <ArrowUpRight size={18} />
                    Make Withdrawal
                  </button>
                  <button className="action-btn outline">
                    <Share2 size={18} />
                    Share Details
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Deposit Modal */}
      <AnimatePresence>
        {showDepositModal && (
          <motion.div 
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowDepositModal(false)}
          >
            <motion.div 
              className="modal-content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h3>Make a Deposit</h3>
                <button className="close-btn" onClick={() => setShowDepositModal(false)}>
                  ✕
                </button>
              </div>
              
              <form onSubmit={handleDeposit}>
                <div className="form-group">
                  <label>Select Account</label>
                  <div className="account-options">
                    {accounts.map((account) => (
                      <label key={account.id} className="account-option">
                        <input
                          type="radio"
                          name="account"
                          value={account.id}
                          checked={selectedAccount === account.id}
                          onChange={(e) => setSelectedAccount(e.target.value)}
                        />
                        <div className="option-content">
                          <div className="option-name">{account.name}</div>
                          <div className="option-balance">{formatCurrency(account.balance)}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Amount</label>
                  <div className="amount-input">
                    <span className="currency">$</span>
                    <input
                      type="number"
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(e.target.value)}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>
                  <div className="quick-amounts">
                    {[100, 500, 1000, 5000].map((amount) => (
                      <button
                        key={amount}
                        type="button"
                        className="quick-amount"
                        onClick={() => setDepositAmount(amount.toString())}
                      >
                        ${amount}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="modal-footer">
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => setShowDepositModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="submit-btn">
                    Deposit Funds
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Withdraw Modal */}
      <AnimatePresence>
        {showWithdrawModal && (
          <motion.div 
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowWithdrawModal(false)}
          >
            <motion.div 
              className="modal-content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h3>Make a Withdrawal</h3>
                <button className="close-btn" onClick={() => setShowWithdrawModal(false)}>
                  ✕
                </button>
              </div>
              
              <form onSubmit={handleWithdraw}>
                <div className="form-group">
                  <label>Select Account</label>
                  <div className="account-options">
                    {accounts.map((account) => (
                      <label key={account.id} className="account-option">
                        <input
                          type="radio"
                          name="account"
                          value={account.id}
                          checked={selectedAccount === account.id}
                          onChange={(e) => setSelectedAccount(e.target.value)}
                        />
                        <div className="option-content">
                          <div className="option-name">{account.name}</div>
                          <div className="option-balance">{formatCurrency(account.balance)}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Amount</label>
                  <div className="amount-input">
                    <span className="currency">$</span>
                    <input
                      type="number"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>
                  <div className="quick-amounts">
                    {[100, 500, 1000, 2000].map((amount) => (
                      <button
                        key={amount}
                        type="button"
                        className="quick-amount"
                        onClick={() => setWithdrawAmount(amount.toString())}
                      >
                        ${amount}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="modal-footer">
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => setShowWithdrawModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="submit-btn">
                    Withdraw Funds
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;