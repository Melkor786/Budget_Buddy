import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import  {BASE_URL} from "../api/env";

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [incomes, setIncomes] = useState([]);
  const [bills, setBills] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUser  = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    }
  }, []);

  const signinGoogle = async (accessToken) => {
    try {
      const { data } = await axios.post(`${BASE_URL}users/login`, {
        googleAccessToken: accessToken,
      });
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
    } catch (err) {
      console.log(err);
    }
  };

  const login = async (credentials) => {
    try {
      const response = await axios.post(`${BASE_URL}users/login`, credentials);
      const { user, token } = response.data;
      setUser(user);
      setToken(token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
  };

  const isAuthenticated = () => {
    return user != null;
  };




  const addIncome = async (income) => {
    await axios
      .post(`${BASE_URL}transactions/add-income`, income)
      .catch((err) => {
        setError(err.response.data.message);
      });
    getIncomes();
  };

  const getIncomes = async () => {
    const response = await axios.get(`${BASE_URL}transactions/get-incomes`);
    setIncomes(response.data);
    console.log("getIncomes: ", response.data);
  };

  const deleteIncome = async (id) => {
    await axios.delete(`${BASE_URL}transactions/delete-income/${id}`);
    getIncomes();
  };

  const totalIncome = () => {
    let totalIncome = 0;
    incomes.forEach((income) => {
      if (income.userid === user.id) totalIncome = totalIncome + income.amount;
    });
    return totalIncome;
  };




  const addBill = async (bill) => {
    await axios
      .post(`${BASE_URL}transactions/add-bill`, bill)
      .catch((err) => {
        setError(err.response.data.message);
      });
    getBills();
  };

  const getBills = async () => {
    const response = await axios.get(`${BASE_URL}transactions/get-bills`);
    setBills(response.data);
    console.log("getBills: ", response.data);
  };

  const deleteBill = async (id) => {
    await axios.delete(`${BASE_URL}transactions/delete-bill/${id}`);
    getBills();
  };

  const totalBill = () => {
    let totalBill = 0;
    bills.forEach((bill) => {
      if (bill.userid === user.id) totalBill= totalBill + bill.amount;
    });
    return totalBill;
  };




  const addExpense = async (income) => {
    await axios
      .post(`${BASE_URL}transactions/add-expense`, income)
      .catch((err) => {
        setError(err.response.data.message);
      });
    getExpenses();
  };

  const getExpenses = async () => {
    const response = await axios.get(`${BASE_URL}transactions/get-expenses`);
    setExpenses(response.data);
    console.log("getExpenses: ", response.data);
  };

  const deleteExpense = async (id) => {
    await axios.delete(`${BASE_URL}transactions/delete-expense/${id}`);
    getExpenses();
  };

  const totalExpenses = () => {
    let totalIncome = 0;
    expenses.forEach((income) => {
      if (income.userid === user.id) totalIncome = totalIncome + income.amount;
    });
    return totalIncome;
  };




  const totalBalance = () => {
    return totalIncome() - totalExpenses();
  };

  const transactionHistory = () => {
    const history = [...incomes, ...expenses];
    history.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return history.slice(0, 3);
  };

  const currencyFormat = (amount) => {
    
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      trailingZeroDisplay: "stripIfInteger",
    }).format(amount);
  };

  return (
    <GlobalContext.Provider
      value={{
        user,
        token,
        incomes,
        expenses,
        error,
        bills,

        signinGoogle,
        login,
        logout,
        isAuthenticated,
        currencyFormat,
        
        addIncome,
        getIncomes,
        deleteIncome,
        totalIncome,
        
        addBill,
        getBills,
        deleteBill,
        totalBill,
        
        addExpense,
        getExpenses,
        deleteExpense,
        totalExpenses,
        
        totalBalance,
        transactionHistory,
        setError,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
