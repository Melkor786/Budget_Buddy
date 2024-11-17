const Bill = require("./models/BillModel");
const User = require("./models/userModel");
const config = require("./config/config");
const nodemailer = require("nodemailer");
const cron = require("node-cron");
const dotenv = require("dotenv");

async function sendBillNotifications() {
  try {
    const allUsers = await User.find({});

    for (const user of allUsers) {
      const bills = await Bill.find({ userId: user._id });
      let message = "";

      for (const bill of bills) {
        const dueDate = new Date(bill.date);
        const today = new Date();
        const oneDayInMs = 24 * 60 * 60 * 1000;
        const timeDifference = dueDate.getTime() - today.getTime();

        if (timeDifference > 0 && timeDifference <= oneDayInMs) {
          message += generateBillHTML(user, bill, dueDate);
        }
      }

      if (message) {
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

function generateBillHTML(user, bill, dueDate) {
  const resetURL = `${process.env.CLIENT_URL}`;

  return `
    <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
      <h1 style="color: white; margin: 0;">Pay Your Bill</h1>
    </div>
    <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
      <p>Hello ${user.firstName},</p>
      <p>Your <b>${
        bill.title
      }</b> bill is due on <b>${dueDate.toDateString()}</b> for an amount of <b>${
    bill.amount
  }</b>.</p>
      <p>To check your scheduled bill, click the button below:</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${resetURL}" style="background-color: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Your Bill</a>
      </div>
      <p>This link will expire in 1 hour for security reasons.</p>
      <p>Best regards,<br>BudgetBuddy Team</p>
    </div>
    <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
      <p>This is an automated message, please do not reply to this email.</p>
    </div>
  `;
}

async function sendNotification(email, subject, htmlMessage) {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.emailUser,
        pass: config.emailPassword,
      },
    });

    await transporter.sendMail({
      from: config.emailUser,
      to: email,
      subject: subject,
      html: htmlMessage, 
    });

    console.log(`Notification sent successfully to ${email}`);
  } catch (error) {
    console.error(`Error sending notification to ${email}: ${error.message}`);
  }
}

// Schedule bill notifications to run every day at 8:00 AM
cron.schedule("0 8 * * *", sendBillNotifications);

module.exports = { sendBillNotifications };
