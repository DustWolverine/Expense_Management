import React from "react";
import { Progress, Space } from "antd";

const Analytics = ({ alltarnsactionData }) => {
  //^ category
  const categories = [
    "Salary",
    "E-Bill",
    "Mobile",
    "Food",
    "Grocerry",
    "Education",
  ];

  const totaltransaction = alltarnsactionData.length;
  const totalIncometransaction = alltarnsactionData.filter(
    (transaction) => transaction.type === "income"
  );
  const totalExpensetransaction = alltarnsactionData.filter(
    (transaction) => transaction.type === "Expense"
  );
  const totalIncomepersent =
    (totalIncometransaction.length / totaltransaction) * 100;
  const totalExpensepersent =
    (totalExpensetransaction.length / totaltransaction) * 100;

  //^ total turnover
  const totalTurnover = alltarnsactionData.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );
  const totalIncomeTurnover = alltarnsactionData
    .filter((trancation) => trancation.type === "income")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalExpenseTurnover = alltarnsactionData
    .filter((transaction) => transaction.type === "Expense")
    .reduce((acc, trancation) => acc + trancation.amount, 0);

  const totalIncomeTurnoverpersent =
    (totalIncomeTurnover / totalTurnover) * 100;
  const totalExpenseTurnoverpersent =
    (totalExpenseTurnover / totalTurnover) * 100;

  return (
    <>
      <div className="row mt-3">
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              Total Transactions:{totaltransaction}
            </div>
            <div className="card-body">
              <h3 className="text-success">
                Income: {totalIncometransaction.length}
              </h3>
              <h3 className="text-danger">
                Expense: {totalExpensetransaction.length}
              </h3>
            </div>
            <div classname="row1 mt-7">
              <Space wrap>
                <Progress
                  type="circle"
                  strokeColor={"green"}
                  percent={totalIncomepersent.toFixed(0)}
                />
                <Progress
                  type="circle"
                  str
                  strokeColor={"red"}
                  percent={totalExpensepersent.toFixed(0)}
                />
              </Space>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">Total Turnover:{totalTurnover}</div>
            <div className="card-body">
              <h3 className="text-success">
                Income Trunover: {totalIncomeTurnover}
              </h3>
              <h3 className="text-danger">
                Expense Trunover: {totalExpenseTurnover}
              </h3>
            </div>
            <div classname="row mt-7">
              <Space wrap>
                <Progress
                  type="circle"
                  strokeColor={"green"}
                  percent={totalIncomeTurnoverpersent.toFixed(0)}
                />
                <Progress
                  type="circle"
                  str
                  strokeColor={"red"}
                  percent={totalExpenseTurnoverpersent.toFixed(0)}
                />
              </Space>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-5">
          <h4>Categorywise Expense </h4>
          {categories.map((cur) => {
            const amount = alltarnsactionData
              .filter(
                (trancation) =>
                  trancation.type === "Expense" && trancation.category === cur
              )
              .reduce((acc, trancation) => acc + trancation.amount, 0);
            return (
              amount > 0 && (
                <div className="card">
                  <div className="card-body">
                    <h5>{cur}</h5>
                    <Progress
                      percent={((amount / totalExpenseTurnover) * 100).toFixed(
                        0
                      )}
                    />
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Analytics;
