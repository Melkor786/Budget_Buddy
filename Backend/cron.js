const Bill = require("./models/BillModel");
const User = require("./models/userModel");
const config = require("./config/config");
const nodemailer = require("nodemailer");
const cron = require("node-cron");

async function sendBillNotifications() {
  try {
    const allUsers = await User.find({});

    for (const user of allUsers) {
      const bills = await Bill.find({ userId: user._id });
      let message = "";
      for (const bill of bills) {
        const dueDate = new Date(bill.date);
        const today = new Date();
        const oneDayInMs = 24*60*60*1000;

        const timeDifference = dueDate.getTime() - today.getTime();

        if (timeDifference > 0 && timeDifference <= oneDayInMs) {
          message += `Your "${bill.title}" bill is due on "${dueDate.toDateString()} of amount: ${bill.amount}".\n`;
        }
      }
      if (message !== "") {
        await sendNotification(
          user.email,
          `Upcoming Bills for ${user.firstName} ${user.lastName}`,
          message
        );
      }
    }
  } catch (error) {
    console.error("Error sending bill notifications:", error.message);
  }
}


//TODO: complete this function
async function sendNotification(email, subject, message) {
  try {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: config.emailUser,
        pass: config.emailPassword
      }
    });

    await transporter.sendMail({
      from: config.emailUser,
      to: email,
      subject: subject,
      text: message,
    });
    console.log(`Notification sent successfully to ${email}`);
  } catch (error) {
    console.error(`Error sending notification to ${email}: ${error.message}`);
  }
}

// Schedule bill notifications to run every day at 8:00 AM
cron.schedule("0 8 * * *", sendBillNotifications);

module.exports = { sendBillNotifications };