import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Button from "@mui/joy/Button";
import { CssVarsProvider } from "@mui/joy/styles";
import { MuiOtpInput } from "mui-one-time-password-input";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Budget from "@/components/budget";

const inter = Inter({ subsets: ["latin"] });

const MuiOtpInputStyled = styled(MuiOtpInput)`
  display: flex;
  gap: 10px;
  max-width: 750px;
  width: 100%;
  padding: 16px;
  background-color: white;
  border-radius: 10px;
  margin-inline: auto;
`;

function OTPComponent(props: any) {
  return <MuiOtpInputStyled {...props} />;
}

export default function Home() {
  const [otp, setOtp] = useState<any>("");
  const [isUserValid, setIsUserValid] = useState(false);

  useEffect(() => {
    checkIfCodeExist();
  }, []);

  const handleChange = (newValue: any) => {
    setOtp(newValue);
  };

  const handleFinish = (otp: string) => {
    setIsUserValid(isValidCode(otp));
  };

  const checkIfCodeExist = () => {
    const code = localStorage.getItem("code");

    if (code) {
      setIsUserValid(isValidCode(code));
    }
  };

  const isValidCode = (code: string): boolean => {
    if (process.env.NEXT_PUBLIC_VALID_CODES_REGEX) {
      const regexCode = new RegExp(process.env.NEXT_PUBLIC_VALID_CODES_REGEX);

      if (regexCode.test(code)) {
        localStorage.setItem("code", code);

        return true;
      }

      return false;
    }

    return false;
  };

  return (
    // <CssVarsProvider>
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Travel budget" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/192.png"/>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Public+Sans&display=swap"
        />
      </Head>
      <main className={styles.main}>
        {!isUserValid ? (
          <div className={styles.code}>
            <OTPComponent
              TextFieldsProps={{ type: "tel" }}
              length={6}
              value={otp}
              onChange={handleChange}
              onComplete={handleFinish}
            />
          </div>
        ) : (
          <CssVarsProvider>
            {" "}
            <Budget />
          </CssVarsProvider>
        )}
      </main>
    </>
  );
}
