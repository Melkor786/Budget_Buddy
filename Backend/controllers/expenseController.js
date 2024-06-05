const ExpenseSchema = require("../models/ExpenseModel");

exports.addExpense = async (req, res) => {
  const { title, amount, category, description, date } = req.body;

  const income = ExpenseSchema({
    userId:req.user._id,
    title,
    amount,
    category,
    description,
    date,
  });

  try {
    //validations
    if (!title || !category || !description || !date) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    if (amount <= 0 || !amount === "number") {
      return res
        .status(400)
        .json({ message: "Amount must be a positive number!" });
    }
    await income.save();
    res.status(200).json({ message: "Expense Added" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }

  console.log(income);
};

exports.getExpenses = async (req, res) => {
  const userId = req.user._id;
  try {
    const incomes = await ExpenseSchema.find({userId}).sort({ createdAt: -1 });
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteExpense = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  try {
    const expense = await ExpenseSchema.findById(id);

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    if (expense.userId.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    await expense.remove();
    res.status(200).json({ message: "Expense Deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }

  // ExpenseSchema.findByIdAndDelete(id)
  //   .then((income) => {
  //     res.status(200).json({ message: "Expense Deleted" });
  //   })
  //   .catch((err) => {
  //     res.status(500).json({ message: "Server Error" });
  //   });
};
