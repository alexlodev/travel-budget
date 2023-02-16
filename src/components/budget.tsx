import Balance from "@/components/balance";
import Expenses from "@/components/expenses";
import { db } from "@/firebase";
import { updateBalance } from "@/services/balance";
import { deleteExpense, Expense, saveExpense } from "@/services/expenses";
import {
  Box,
  Card,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalClose,
  Radio,
  RadioGroup,
  Select,
  Sheet,
  Typography,
  Option,
  Button,
} from "@mui/joy";
import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";

export default function Budget() {
  const [open, setOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [expenseName, setExpenseName] = useState("");
  const [cost, setCost] = useState("");
  const [type, setType] = useState<any>("");
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [balance, setBalance] = useState<any>();

  useEffect(() => {
    onValue(ref(db, "/expenses"), (snapshopt) => {
      if (snapshopt.exists()) {
        setExpenses(
          Object.values(snapshopt.val()).sort((a, b) => {
            // @ts-ignore
            return a.date + b.date;
          }) as Expense[]
        );
      }
    });
  }, []);

  useEffect(() => {
    onValue(ref(db, "/5116df08-ae2c-11ed-afa1-0242ac120002 "), (snapshopt) => {
      if (snapshopt.exists()) {
        const { balance } = snapshopt.val();
        setBalance(balance);
      }
    });
  }, []);

  useEffect(() => {
    if (!open) {
      setPaymentMethod("");
      setExpenseName("");
      setCost("");
      setType("");
    }
  }, [open]);

  const handlePaymentMethod = (event: any) => {
    setPaymentMethod(event.target.value);
  };

  const createNewExpense = () => {
    const code = localStorage.getItem("code");

    const expense = {
      name: expenseName,
      cost: cost,
      paymentMethod,
      type,
      owner: code === "119711" ? "Alexis" : "Jacky",
    };

    saveExpense(expense);
    updateBalance(cost, type, paymentMethod, false);
  };

  const handleDelete = (
    id: string,
    cost: string | number,
    type: string,
    paymentMethod: string
  ) => {
    deleteExpense(id);
    updateBalance(cost, type, paymentMethod, true);
  };

  return (
    <>
      <div style={{ marginTop: 180 }}></div>

      {balance && <Balance balance={balance} />}

      <Card
        onClick={() => setOpen(true)}
        style={{
          borderRadius: "100%",
          padding: "10px",
          background: "blue",
          position: "fixed",
          bottom: 16,
          right: 16,
          width: 70,
          height: 70,
          zIndex: 999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p style={{ fontSize: 42 }}>🥑</p>
      </Card>

      {expenses &&
        expenses.map((expense) => {
          return (
            <Expenses
              key={expense.uuid}
              id={expense.uuid || ""}
              payMethod={expense.paymentMethod}
              name={expense.name}
              type={expense.type}
              owner={expense.owner}
              createAt={expense.createAt || ""}
              cost={expense.cost}
              deleteCallback={handleDelete}
            />
          );
        })}

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          display: "grid",
          placeItems: "center",
          width: "90%",
          margin: "0px 16px",
        }}
      >
        <Sheet
          variant="outlined"
          sx={{
            borderRadius: "md",
            p: 3,
            boxShadow: "lg",
          }}
        >
          <ModalClose
            variant="outlined"
            sx={{
              top: "calc(-1/4 * var(--IconButton-size))",
              right: "calc(-1/4 * var(--IconButton-size))",
              boxShadow: "0 2px 12px 0 rgba(0 0 0 / 0.2)",
              borderRadius: "50%",
              bgcolor: "background.body",
            }}
          />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              createNewExpense();

              setOpen(false);
            }}
          >
            <FormLabel>Descripción</FormLabel>
            <Input
              required
              onChange={(e) => setExpenseName(e.target.value)}
              placeholder="Chocolate.."
            />
            <br />
            <FormLabel>Monto</FormLabel>
            <Input
              required
              placeholder="00"
              type="tel"
              startDecorator={"$"}
              onChange={(e) => setCost(e.target.value)}
            />
            <br />
            <FormLabel>Tipo</FormLabel>
            <Select
              placeholder="Selecciona el tipo"
              startDecorator={"🌚"}
              onChange={(e, newValue) => setType(newValue)}
              sx={{ width: 240 }}
            >
              <Option value="food">Comida 🌮</Option>
              <Option value="transportation">Transporte 🚗</Option>
              <Option value="checkins">Entradas 🎫</Option>
              <Option value="souvenirs">Souvenirs 👕</Option>
              <Option value="tours">Tours 🦙</Option>
              <Option value="otros">Otros 🤷🏼‍♂️</Option>
            </Select>
            <br />
            <FormLabel>Se pago con</FormLabel>
            <RadioGroup
              value={paymentMethod}
              onChange={handlePaymentMethod}
              sx={{ my: 1 }}
            >
              <Radio value="card" label="Tarjeta 💳" />
              <Radio value="money" label="Efectivo 💵" />
            </RadioGroup>
            <br />
            <Button
              disabled={!paymentMethod || !type || !expenseName || !cost}
              type="submit"
            >
              Agregar
            </Button>
          </form>
        </Sheet>
      </Modal>
    </>
  );
}
