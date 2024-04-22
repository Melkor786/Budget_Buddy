import React, { useEffect } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../context/globalContext";
import { InnerLayout } from "../styles/Layouts";
import BillForm from "./BillForm";
import BillItem from "./BillItem";

function Bill() {
  const {
    currencyFormat,
    bills,
    getBills,
    deleteBill,
    totalBill,
  } = useGlobalContext();

  useEffect(() => {
    getBills();
  }, []);

  return (
    <IncomeStyled>
      <InnerLayout>
        <h1>Bills</h1>
        <h2 className="total-income">
          Total Bill: <span>{currencyFormat(totalBill())}</span>
        </h2>
        <div className="income-content">
          <div className="form-container">
          <BillForm />
          </div>
          <div className="incomes">
            {bills.map((bill) => {
              const { _id, title, amount, date} = bill;
              return (
                <BillItem
                  key={_id}
                  id={_id}
                  title={title}
                  amount={currencyFormat(amount)}
                  date={date}
                  indicatorColor="var(--color-green)"
                  deleteItem={deleteBill}
                />
              );
            })}
          </div>
        </div>
      </InnerLayout>
    </IncomeStyled>
  );
}

const IncomeStyled = styled.div`
  display: flex;
  overflow: auto;
  .total-income {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fcf6f9;
    border: 2px solid #ffffff;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 1rem;
    margin: 1rem 0;
    font-size: 2rem;
    gap: 0.5rem;
    span {
      font-size: 2.5rem;
      font-weight: 800;
      color: var(--color-green);
    }
  }
  .income-content {
    display: flex;
    gap: 2rem;
    .incomes {
      flex: 1;
    }
  }
`;

export default Bill;
