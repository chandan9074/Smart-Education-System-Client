import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Select } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { loadUserClassData, loadUserData } from "../../services/auth";
import CheckoutForm from "./CheckoutForm";

const Payment = () => {
  const { username } = useParams();
  const [userData, setUserData] = useState([]);
  const [userClassData, setUserClassData] = useState([]);
  const [mnHistory, setMnHistory] = useState([]);
  const [bill, setBill] = useState(550);
  const [noMonths, setNoMonths] = useState(0);
  const [selectMn, setSelectMn] = useState();
  const [totalBill, setTotalBill] = useState(0);
  const [monthly, setMonthly] = useState(true);
  const [others, setOthers] = useState(false);
  const { Option } = Select;
  const stripePromise = loadStripe(
    "pk_test_51KOK6DDwHICDWFJIgFNP5rlR59k5W0DyjfGtaA7V6GTsaaAQCu17l4nkokTFHej5a9U3QCq3PLc62jXO8lW1gHDZ00sVd6tSCV"
  );
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = today.getFullYear();

  today = mm + "/" + dd + "/" + yyyy;

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const otherFee = ["Registration", "Half Yearly", "Year Final", "Extra Fees"];

  const childrenMonths = [];
  const childrenOthers = [];

  for (let i = 0; i < months.length; i++) {
    if (!mnHistory.includes(months[i])) {
      childrenMonths.push(<Option key={months[i]}>{months[i]}</Option>);
    }
  }

  for (let i = 0; i < otherFee.length; i++) {
    if (!mnHistory.includes(otherFee[i])) {
      childrenOthers.push(<Option key={otherFee[i]}>{otherFee[i]}</Option>);
    }
  }

  const handleMonth = () => {
    setMonthly(true);
    setOthers(false);
  };
  const handleOthers = () => {
    setOthers(true);
    setMonthly(false);
  };

  function handleChange(value) {
    // console.log(`selected ${value}`);
    // console.log(`selected ${value`);
    setSelectMn(value);
    setNoMonths(value.length);
    setTotalBill(bill * value.length);
  }
  const handleOtherFee = (e) => {
    setTotalBill(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await loadUserData(username);
      setUserData(response.data);
      // console.log(response.data);
      const responseClass = await loadUserClassData(username);
      setUserClassData(responseClass.data[0].class_sec);
      // console.log(responseClass.data[0].class_sec);
      if (responseClass.data[0].class_sec !== null) {
        const historyData = {
          class: responseClass.data[0].class_sec.class_name,
          email: response.data.email,
        };
        // console.log("helllo", responseClass.data[0].class_sec);
        fetch("https://gentle-sea-41274.herokuapp.com/user-payment-history", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(historyData),
        })
          .then((res) => res.json())
          .then((res) => {
            const a = [];
            res.forEach((item) => {
              const arrayItem = item.months.split(",");
              for (let i = 0; i < arrayItem.length; i++) {
                console.log("chandan1", arrayItem[i]);
                // setMnHistory([...mnHistory, arrayItem[i]]);
                a.push(arrayItem[i]);
              }
              // arrayItem.forEach((singleItem) => {
              //   console.log("chandan", singleItem);
              //   setMnHistory([...mnHistory, singleItem]);
              // });
            });
            setMnHistory(a);
            // console.log("result", res);
          });
      }
    };
    fetchData();
  }, [username]);
  return (
    <div className='pt-28 container mx-auto'>
      <div>
        <h1 className='text-xl font-semibold'>Students Information</h1>
        <div className='mt-3 w-full rounded-xl border border-gray-700 grid grid-cols-12 shadow-sm bg-white bg-opacity-80'>
          <div className='flex flex-col p-4 border-r col-span-3'>
            <label>Name</label>
            <input
              type='text'
              value={`${userData.first_name} ${userData.last_name}`}
              className='p-2 bg-transparent border border-gray-500 rounded-md outline-none mt-2'
              readOnly
            />
            <label className='mt-3'>Institutio ID</label>
            <input
              type='text'
              value={userData.username}
              className='p-2 bg-transparent border border-gray-500 rounded-md outline-none mt-2'
              readOnly
            />
            <label className='mt-3'>Class</label>
            <input
              type='text'
              value={userClassData.class_name}
              className='p-2 bg-transparent border border-gray-500 rounded-md outline-none mt-2'
              readOnly
            />
            <label className='mt-3'>Section</label>
            <input
              type='text'
              value={userClassData.section}
              className='p-2 bg-transparent border border-gray-500 rounded-md outline-none mt-2'
              readOnly
            />
          </div>
          <div className='p-4 border-r col-span-5'>
            <div>
              <input
                type='radio'
                id='html'
                name='fav_language'
                value='monthly'
                defaultChecked={monthly}
                onChange={handleMonth}
              />
               <label for='monthly'>Monthly Payment</label>
              <input
                type='radio'
                id='css'
                name='fav_language'
                value='others'
                defaultChecked={others}
                onChange={handleOthers}
                className='ml-5'
              />
               <label for='other'>Others</label>
            </div>
            {monthly ? (
              <>
                <label className='mb-2 mt-3'>History</label>
                <div className='grid grid-cols-4 gap-3 mb-3'>
                  {months.map((items) => (
                    <div
                      className={`${
                        mnHistory.includes(items)
                          ? "text-base font-semibold p-2 rounded-md bg-green-300 text-center border-2 border-green-500"
                          : "text-base font-semibold p-2 rounded-md bg-red-300 text-center border-2 border-red-500"
                      }`}
                    >
                      {items}
                    </div>
                  ))}
                </div>
                <label className='mb-2'>Pending Months</label>
                <Select
                  mode='tags'
                  style={{
                    width: "100%",
                    backgroundColor: "transparent",
                    padding: "8px",
                  }}
                  placeholder='Selects the months'
                  onChange={handleChange}
                >
                  {childrenMonths}
                </Select>
                <label className='mt-3'>Amount</label>
                <div className='flex items-center justify-between mt-2'>
                  <input
                    type='text'
                    value={bill}
                    readOnly
                    className='p-2 bg-transparent border border-gray-500 rounded-md outline-none w-28'
                  />
                  <div className='text-sm font-bold mx-3'>X</div>
                  <input
                    type='text'
                    value={noMonths}
                    readOnly
                    className='p-2 bg-transparent border border-gray-500 rounded-md outline-none w-10'
                  />
                  <div className='text-base font-bold mx-3'>=</div>
                  <input
                    type='text'
                    value={totalBill}
                    readOnly
                    className='p-2 bg-transparent border border-gray-500 rounded-md outline-none w-28'
                  />
                </div>
              </>
            ) : (
              <>
                <label className='mb-2 mt-3'>History</label>
                <div className='grid grid-cols-4 gap-3 mb-3'>
                  {otherFee.map((items) => (
                    <div
                      className={`${
                        mnHistory.includes(items)
                          ? "text-base font-semibold p-2 rounded-md bg-green-300 text-center border-2 border-green-500"
                          : "text-base font-semibold p-2 rounded-md bg-red-300 text-center border-2 border-red-500"
                      }`}
                    >
                      {items}
                    </div>
                  ))}
                </div>
                <label className='mb-2'>Pending Months</label>
                <Select
                  mode='tags'
                  style={{
                    width: "100%",
                    backgroundColor: "transparent",
                    padding: "8px",
                  }}
                  placeholder='Selects the months'
                  onChange={handleChange}
                >
                  {childrenOthers}
                </Select>
                <label className='mt-3'>Amount</label>
                <div className='flex items-center justify-between mt-2'>
                  <input
                    type='number'
                    value={totalBill}
                    onChange={(e) => handleOtherFee(e)}
                    className='p-2 bg-transparent border border-gray-500 rounded-md outline-none w-28'
                  />
                </div>
              </>
            )}
          </div>
          <div className='p-4 flex flex-col col-span-4'>
            <label>Date</label>
            <input
              type='text'
              value={today}
              readOnly
              className='p-2 bg-transparent border border-gray-500 rounded-md outline-none mt-2 mb-3'
            />
            <label className='mb-2'>Card Information</label>
            <Elements stripe={stripePromise}>
              <CheckoutForm
                selectMn={selectMn}
                userClassData={userClassData}
                today={today}
                userData={userData}
                totalBill={totalBill}
              />
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
