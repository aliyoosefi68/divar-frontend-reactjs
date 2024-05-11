import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { checkOtp } from "services/auth";
import { getProfile } from "src/services/user";
import { setCookies } from "utils/cookie";

//styles
import styles from "./CheckOtp.module.css";

function ChechOtp({ code, setCode, mobile, setStep }) {
  const navigate = useNavigate();
  const { refetch } = useQuery(["profile"], getProfile);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (code.length !== 5) return;
    const { response, error } = await checkOtp(mobile, code);
    if (response) {
      setCookies(response.data);
      navigate("/");
      refetch();
    }
    if (error) {
      console.log(error.response.data.message);
    }
  };
  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <p>ورود به حساب کاربری</p>
      <label htmlFor="input">کد تأیید را وارد کنید</label>
      <span>کد پیامک‌شده به شمارۀ «{mobile}» را وارد کنید.</span>
      <input
        id="input"
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="کد تایید 6 رقمی"
      />
      <button type="submit">ورود</button>
      <button onClick={() => setStep(1)}>تغییر شماره مبایل</button>
    </form>
  );
}

export default ChechOtp;
