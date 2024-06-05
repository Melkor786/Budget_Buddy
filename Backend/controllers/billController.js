const BillSchema = require("../models/BillModel");

exports.addBill = async (req, res) => {
  const { title, amount, date, category } = req.body;

  const bill = BillSchema({
    userId:req.user._id,
    title,
    amount,
    date,
    category,
  });

  try {
    //validations
    if (!title || !category || !date) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    if (amount <= 0 || !amount === "number") {
      return res
        .status(400)
        .json({ message: "Amount must be a positive number!" });
    }
    await bill.save();
    res.status(200).json({ message: "Bill Added" });
  } catch (error) {
    res.status(500).json({ message: error });
  }

  console.log(bill);
};

exports.getBills = async (req, res) => {
  const userId = req.user._id;
  try {
    const bills = await BillSchema.find({userId}).sort({ createdAt: -1 });
    res.status(200).json(bills);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteBill = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  try {
    const Bill = await BillSchema.findById(id);

    if (!Bill) {
      return res.status(404).json({ message: "Bill not found" });
    }

    if (Bill.userId.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    await Bill.remove();
    res.status(200).json({ message: "Bill Deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
