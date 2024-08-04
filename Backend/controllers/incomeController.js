const IncomeSchema = require("../models/IncomeModel");

exports.addIncome = async (req, res) => {
  try {
    const { title, amount, category, description, date } = req.body;
    const income = new IncomeSchema({
      userId:req.user._id,
      title,
      amount,
      category,
      description,
      date,
    });

    //validation
    if (!title || !category || !description || !date) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    if (amount <= 0 || isNaN(amount)) {
      return res
        .status(400)
        .json({ message: "Amount must be a Positive Non Zero number!" });
    }
    await income.save();
    res.status(200).json({ message: "Income Added", income });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.getIncomes = async (req, res) => {
  const userId = req.user._id;
  try {
    const incomes = await IncomeSchema.find({userId}).sort({ createdAt: -1 });
    res.status(200).json(incomes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.deleteIncome = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  try {
    const income = await IncomeSchema.findById(id);

    if (!income) {
      return res.status(404).json({ message: "Income not found" });
    }

    if (income.userId.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    await income.remove();
    res.status(200).json({ message: "Income Deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};