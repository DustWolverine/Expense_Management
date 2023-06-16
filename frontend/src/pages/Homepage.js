import React, { useState, useEffect } from "react";
import { Form, Modal, Select, Table, message, DatePicker } from "antd";
import Layout from "../components/Layout/Layout";
import "../styles/homepage.css";
import Input from "antd/es/input/Input";
import axios from "axios";
import Spinner from "../components/Layout/Spinner";
import moment from "moment";
import {
  UnorderedListOutlined,
  AreaChartOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Analytics from "../components/Analytics";

const { RangePicker } = DatePicker;

const Homepage = () => {
  const [showModal, setshowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alltarnsactionData, setalltransactionData] = useState([]);
  const [frequency, setFrequency] = useState("7");
  const [selectedDate, setSeletedate] = useState([]);
  const [type, setType] = useState("all");
  const [viewdata, setviewData] = useState("table");
  const [editable, setEditable] = useState(null);

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format("YYYY-MM--DD")}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Referense",
      dataIndex: "referense",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Action",
      render: (text, record) => (
        <div>
          <EditOutlined
            onClick={() => {
              setEditable(record);
              setshowModal(true);
            }}
          />
          <DeleteOutlined
            className="mx-2"
            // onClick={() => {
            //   handleDelete(record);
            // }}
          />
        </div>
      ),
    },
  ];

  //form handleing
  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);
      if (editable) {
        await axios.post("/api/v1/transaction/edittransaction", {
          payload: {
            ...values,
            userId: user._id,
          },
          transacationId: editable._id,
        });
        setLoading(false);
        message.success("Transaction Updated Successfully");
      } else {
        await axios.post("/api/v1/transaction/addtransaction", {
          ...values,
          userid: user._id,
        });
        setLoading(false);
        message.success("Transaction Added Successfully");
      }
      setshowModal(false);
      setEditable(null);
    } catch (error) {
      setLoading(false);
      message.error("Faild to add transection");
    }
  };

  //! Delete a specific transaction
  // const handleDelete = async (record) => {
  //   console.log(record);
  //   try {
  //     setLoading(true);
  //     await axios.post(
  //       "http://localhost:8080/api/v1/transaction/deletetransaction",
  //       {
  //         transacationId: record._id,
  //       }
  //     );
  //     setLoading(false);
  //     message.success("Transaction Deleted Sucessfully");
  //   } catch (error) {
  //     setLoading(false);
  //     console.log(error);
  //     message.delete("Unable to delete");
  //   }
  // };

  //? get all trancation

  useEffect(() => {
    const getAllTransaction = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        setLoading(true);
        const response = await axios.post(
          "/api/v1/transaction/alltransaction",
          {
            userid: user._id,
            frequency,
            selectedDate,
            type,
          }
        );
        setLoading(false);
        console.log(response.data);
        setalltransactionData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllTransaction();
    // handleSubmit();
  }, [frequency, selectedDate, type]);

  return (
    <Layout>
      {loading && Spinner}
      <div className="filter">
        <div>
          <h6>Select Frequency</h6>
          <Select value={frequency} onChange={(values) => setFrequency(values)}>
            <Select.Option value="7">Last 1 Week</Select.Option>
            <Select.Option value="30">Last 1 Month</Select.Option>
            <Select.Option value="365">Last 1 Year</Select.Option>
            <Select.Option value="custom">Custom</Select.Option>
          </Select>
          {frequency === "custom" && (
            <RangePicker
              value={selectedDate}
              onChange={(values) => setSeletedate(values)}
            />
          )}
        </div>
        <div>
          <h6>Select Type</h6>
          <Select value={type} onChange={(values) => setType(values)}>
            <Select.Option value="all">All</Select.Option>
            <Select.Option value="income">Income</Select.Option>
            <Select.Option value="Expense">Expense</Select.Option>
          </Select>
        </div>
        <div className="icon-change">
          <UnorderedListOutlined
            className={`mx-2 ${
              viewdata === "table" ? "active-icon" : "inactive-icon"
            }`}
            onClick={() => setviewData("table")}
          />
          <AreaChartOutlined
            className={`mx-2 ${
              viewdata === "analytics" ? "active-icon" : "inactive-icon"
            }`}
            onClick={() => setviewData("analytics")}
          />
        </div>
        <div>
          <button
            className="btn btn-primary"
            onClick={() => setshowModal(true)}
          >
            Add new
          </button>
        </div>
      </div>
      <div className="content">
        {viewdata === "table" ? (
          <Table columns={columns} dataSource={alltarnsactionData} />
        ) : (
          <Analytics alltarnsactionData={alltarnsactionData} />
        )}
      </div>
      <Modal
        title={editable ? "Edit Tranansaction" : "Add Transaction"}
        open={showModal}
        onCancel={() => setshowModal(false)}
        footer={false}
      >
        <Form
          layout="vartical"
          onFinish={handleSubmit}
          initialValues={editable}
        >
          <Form.Item label="Amount" name="amount">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Type" name="type">
            <Select>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="Expense">Expense</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Category" name="category">
            <Select>
              <Select.Option value="Salary">Salary</Select.Option>
              <Select.Option value="E-Bill">E-Bill</Select.Option>
              <Select.Option value="Mobile">Mobile</Select.Option>
              <Select.Option value="Food">Food</Select.Option>
              <Select.Option value="Grocerry">Grocerry</Select.Option>
              <Select.Option value="Education">Education</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Reference" name="referense">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Date" name="date">
            <Input type="date" />
          </Form.Item>
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary">
              SAVE
            </button>
          </div>
        </Form>
      </Modal>
    </Layout>
  );
};

export default Homepage;
