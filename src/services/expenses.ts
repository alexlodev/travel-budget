import { v4 as uuidv4 } from "uuid";
import { db } from "@/firebase/index";
import { set, ref, remove } from "firebase/database";
import { DateTime } from "luxon";


export interface Expense {
  name: string;
  cost: string;
  owner: string;
  type: string;
  paymentMethod: string;
  createAt?: string;
  uuid?: string
}

export const saveExpense = (expense: Expense) => {
  const uuid = uuidv4();

  set(ref(db, `/expenses/${uuid}`), {
    ...expense,
    uuid,
    createAt: DateTime.now().toLocaleString(DateTime.DATE_MED),
    date: Date.now()
  });
};

export const deleteExpense = (id: string) => {
  remove(ref(db, `/expenses/${id}`));
};
