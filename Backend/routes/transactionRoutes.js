const {
  addExpense,
  getExpenses,
  deleteExpense,
} = require("../controllers/expenseController");
const {
  addIncome,
  getIncomes,
  deleteIncome,
} = require("../controllers/incomeController");
const {
  addBill,
  getBills,
  deleteBill,
} = require("../controllers/billController");
const requireAuth = require("../middleware/requireAuth");

const router = require("express").Router();

// require Auth for all transaction methods
router.use(requireAuth);

router.post("/add-income", addIncome);
router.get("/get-incomes", getIncomes);
router.delete("/delete-income/:id", deleteIncome);
router.post("/add-expense", addExpense);
router.get("/get-expenses", getExpenses);
router.delete("/delete-expense/:id", deleteExpense);
router.post("/add-bill", addBill);
router.get("/get-bills", getBills);
router.delete("/delete-bill/:id", deleteBill);

module.exports = router;
