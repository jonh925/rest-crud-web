"use client";
import { useState, useEffect } from "react";
import { api } from "../../services/api";
import { error } from "console";

interface Product {
  id: number;
  nome: string;
}

export default function Home() {
  const [items, setItens] = useState<Product[]>([]);
  const [textIpunt, setTextIpunt] = useState("");
  const [loaading, setloading] = useState(false);
  useEffect(() => {
    loadItems();
  }, []);

  async function handleAddItem() {
    console.log(textIpunt);
    const data = { nome: textIpunt };
    try {
      await api.post("/produtos", data);
      console.log("sucessss");
    } catch (error) {
      console.log("error", error);
    }
  }
  function handleDeleteItem(itemId: number) {
    console.log(itemId);
  }

  async function loadItems() {
    setloading(true);
    try {
      const response = await api.get("/produtos");
      console.log(response);
      setItens(response.data);
    } catch (error) {
      console.log("error", error);
    } finally {
      setloading(false);
    }
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
      <span> {loaading && "carregando"} </span>

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.nome}
            <button onClick={() => handleDeleteItem(item.id)}>delete </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
