import Account from '../models/Account.js';
import Transaction from '../models/Transaction.js'; // Assuming you have this

// Get user accounts
export const getAccounts = async (req, res) => {
  try {
    const accounts = await Account.find({ user: req.user.id });
    
    // If user has no accounts, create default accounts
    if (accounts.length === 0) {
      const defaultAccounts = await createDefaultAccounts(req.user.id);
      return res.json(defaultAccounts);
    }
    
    // Format accounts for frontend
    const formattedAccounts = accounts.map(account => ({
      id: account._id,
      type: account.type.toLowerCase(),
      name: `${account.type.charAt(0) + account.type.slice(1).toLowerCase()} Account`,
      balance: account.balance,
      number: account.accountNumber,
      color: getAccountColor(account.type),
      openingDate: account.createdAt,
      branch: getAccountBranch(account.type)
    }));
    
    res.json(formattedAccounts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create default accounts for new users
const createDefaultAccounts = async (userId) => {
  const accounts = [
    {
      user: userId,
      type: "SAVINGS",
      balance: 1000,
      accountNumber: `SAV${Date.now().toString().slice(-8)}-${Math.floor(1000 + Math.random() * 9000)}`,
    },
    {
      user: userId,
      type: "CURRENT",
      balance: 500,
      accountNumber: `CUR${Date.now().toString().slice(-8)}-${Math.floor(1000 + Math.random() * 9000)}`,
    }
  ];
  
  const createdAccounts = await Account.insertMany(accounts);
  
  // Format for response
  return createdAccounts.map(account => ({
    id: account._id,
    type: account.type.toLowerCase(),
    name: `${account.type.charAt(0) + account.type.slice(1).toLowerCase()} Account`,
    balance: account.balance,
    number: account.accountNumber,
    color: getAccountColor(account.type),
    openingDate: account.createdAt,
    branch: getAccountBranch(account.type)
  }));
};

// Helper function for account color
const getAccountColor = (type) => {
  const colors = {
    SAVINGS: '#10b981',
    CURRENT: '#3182ce',
    FIXED: '#8b5cf6'
  };
  return colors[type] || '#10b981';
};

// Helper function for account branch
const getAccountBranch = (type) => {
  const branches = {
    SAVINGS: 'Main Branch',
    CURRENT: 'Main Branch',
    FIXED: 'Investment Division'
  };
  return branches[type] || 'Main Branch';
};

// Get total balance (sum of all accounts)
export const getBalance = async (req, res) => {
  try {
    const accounts = await Account.find({ user: req.user.id });
    const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);
    
    res.json({ balance: totalBalance });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Deposit to specific account
export const deposit = async (req, res) => {
  try {
    const { amount, accountId } = req.body;
    
    // If no accountId specified, use first savings account
    let account;
    if (accountId) {
      account = await Account.findOne({ _id: accountId, user: req.user.id });
    } else {
      account = await Account.findOne({ user: req.user.id, type: "SAVINGS" });
    }
    
    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }
    
    account.balance += parseFloat(amount);
    await account.save();
    
    // Create transaction record
    await Transaction.create({
      user: req.user.id,
      account: account._id,
      type: 'DEPOSIT',
      amount: parseFloat(amount),
      description: `Deposit to ${account.type} Account`,
      balanceAfter: account.balance
    });
    
    res.json({ 
      message: 'Deposit successful', 
      balance: account.balance,
      totalBalance: await getTotalBalance(req.user.id)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Withdraw from specific account
export const withdraw = async (req, res) => {
  try {
    const { amount, accountId } = req.body;
    
    let account;
    if (accountId) {
      account = await Account.findOne({ _id: accountId, user: req.user.id });
    } else {
      account = await Account.findOne({ user: req.user.id, type: "SAVINGS" });
    }
    
    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }
    
    if (account.balance < amount) {
      return res.status(400).json({ message: 'Insufficient funds' });
    }
    
    account.balance -= parseFloat(amount);
    await account.save();
    
    // Create transaction record
    await Transaction.create({
      user: req.user.id,
      account: account._id,
      type: 'WITHDRAWAL',
      amount: parseFloat(amount),
      description: `Withdrawal from ${account.type} Account`,
      balanceAfter: account.balance
    });
    
    res.json({ 
      message: 'Withdrawal successful', 
      balance: account.balance,
      totalBalance: await getTotalBalance(req.user.id)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get transaction history
export const history = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .populate('account', 'type accountNumber')
      .limit(50);
    
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Helper to get total balance
const getTotalBalance = async (userId) => {
  const accounts = await Account.find({ user: userId });
  return accounts.reduce((sum, account) => sum + account.balance, 0);
};