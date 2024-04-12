import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1/";

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    }
  }, []);

  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);
  

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
    return user!=null;
  };

  //calculate incomes
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
    console.log("getIncomes: ",response.data);
  };

  const deleteIncome = async (id) => {
    await axios.delete(`${BASE_URL}transactions/delete-income/${id}`);
    getIncomes();
  };

  //change this function to take only those transactions which are performed by specefic user
  const totalIncome = () => {
    let totalIncome = 0;
      incomes.forEach((income) => {
        if(income.userid===user.id) 
          totalIncome = totalIncome + income.amount;
      }); 
    return totalIncome;
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

  //change this function to take only those transactions which are performed by specefic user
  const totalExpenses = () => {
    let totalIncome = 0;
      expenses.forEach((income) => {
        if(income.userid===user.id) 
          totalIncome = totalIncome + income.amount;
    });
    return totalIncome;
  };

  const totalBalance = () => {
    return totalIncome() - totalExpenses();
  };

  //change this function to take only those transactions which are performed by specefic user
  const transactionHistory = () => {
    const history = [...incomes, ...expenses];
    history.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return history.slice(0, 3);
  };

  return (
    <GlobalContext.Provider
      value={{
        user,
        token,
        incomes,
        expenses,
        error,
        login,
        logout,
        isAuthenticated,
        addIncome,
        getIncomes,
        deleteIncome,
        totalIncome,
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
