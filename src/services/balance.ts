import { db } from "@/firebase";
import {
  child,
  get,
  getDatabase,
  onValue,
  ref,
  update,
} from "firebase/database";

export const updateBalance = (
  value: any,
  key: string,
  type: string,
  isIncrese: boolean
) => {
  const balanceRef = ref(db, "/5116df08-ae2c-11ed-afa1-0242ac120002 ");

  const dbRef = ref(getDatabase());

  get(child(dbRef, "/5116df08-ae2c-11ed-afa1-0242ac120002 "))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const { balance } = structuredClone(snapshot.val());

        if (isIncrese) {
          increseBalanceByMount(balance, key, value, type);
        } else {
          decreseBalanceByMount(balance, key, value, type);
        }

        updateBalanceWithNewData({ balance }, balanceRef);
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      return error;
    });
};

const updateBalanceWithNewData = (newBalance: any, balanceRef: any) => {
  if (newBalance) {
    update(balanceRef, newBalance);
  }
};

const increseBalanceByMount = (
  balance: any,
  key: any,
  value: any,
  type: any
) => {
  balance.budget[key] = parseFloat(balance.budget[key]) + parseFloat(value);

  balance[type] = parseFloat(balance[type]) + parseFloat(value);

  balance.total = parseFloat(balance.money) + parseFloat(balance.card);
};

const decreseBalanceByMount = (
  balance: any,
  key: any,
  value: any,
  type: any
) => {
  balance.budget[key] = parseFloat(balance.budget[key]) - parseFloat(value);
  balance[type] = parseFloat(balance[type]) - parseFloat(value);

  balance.total = parseFloat(balance.money) + parseFloat(balance.card);
};
