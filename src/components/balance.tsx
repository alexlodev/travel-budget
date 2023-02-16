import { db } from "@/firebase";
import { Typography, Card, Divider } from "@mui/joy";
import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";

export default function Balance({ balance }: { balance: any }) {
  return (
    <>
      <Card
        style={{
          position: "fixed",
          width: "90%",
          padding: 20,
          zIndex: 999,
          top: 0,
          margin: 20,
          borderRadius: 20,
          background: "#fff",
        }}
      >
        <Typography level="h2" fontSize="xxl">
          💰 ${balance.total}
        </Typography>
        <div style={{ display: "flex" }}>
          <Typography level="h3" marginTop={1} marginRight={3} fontSize="md">
            Tarjeta 💳: <b>${balance.card}</b>
          </Typography>
          <Typography level="h3" marginTop={1} fontSize="md">
            Efectivo 💵: <b>${balance.money}</b>
          </Typography>
        </div>
        <br />
        <Divider />

        <Typography level="h3" fontWeight={900} marginTop={1} fontSize="xl">
          Presupuestos:
        </Typography>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <Typography level="h3" marginTop={1} fontSize="md">
              Comida 🌮: <b>${balance.budget.food}</b>
            </Typography>
            <Typography level="h3" marginTop={1} fontSize="md">
              Transporte 🚗: <b>${balance.budget.transportation}</b>
            </Typography>
            <Typography level="h3" marginTop={1} fontSize="md">
              Entradas 🎫: <b>${balance.budget.checkins}</b>
            </Typography>
          </div>
          <div>
            <Typography level="h3" marginTop={1} fontSize="md">
              Souvenirs 👕: <b>${balance.budget.souvenirs}</b>
            </Typography>
            <Typography level="h3" marginTop={1} fontSize="md">
              Tours 🦙: <b>${balance.budget.tours}</b>
            </Typography>
            <Typography level="h3" marginTop={1} fontSize="md">
              Otros 🤷🏼‍♂️: <b>${balance.budget.others}</b>
            </Typography>
          </div>
        </div>
      </Card>
    </>
  );
}
