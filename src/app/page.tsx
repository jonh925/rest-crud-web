"use client";
import { useState } from "react";
import { api } from "../../services/api";

const initialItens = [
  { id: 1, nome: "Banana" },
  { id: 2, nome: "Uva" },
];

export default function Home() {
  const [itens, setItens] = useState(initialItens);
  const [textIpunt, setTextIpunt] = useState("");

  async function handleAddItem() {
    console.log(textIpunt);
    const data = { nome: textIpunt };
    try {
      const response = await fetch("http://192.168.68.154:3000/produtos", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log("Success:", result);
    } catch (error) {
      console.error("Error:", error);
      alert("ocorreu um erro");
    }
  }

  async function handleClick() {
    const response = await api.get("/produtos");
    console.log(response);
    setItens(response.data);

    //const response = await fetch("http://192.168.68.154:3000/produtos");
    // const produtos = await response.json();
    // setItens(produtos);
    // console.log(produtos);
  }

  return (
    <main>
      <div>
        <input
          onChange={(e) => setTextIpunt(e.target.value)}
          placeholder="digite seu texto aqui.."
        ></input>
        <button onClick={handleAddItem}>enviar</button>
      </div>
      <button onClick={handleClick}>Buscar informação no servidor</button>

      <ul>
        {itens.map((item) => (
          <li key={item.id}>{item.nome}</li>
        ))}
      </ul>
    </main>
  );
}
