"use client";
import { useState, useEffect } from "react";
import { api } from "../../services/api";
import { error } from "console";

// Definindo a estrutura de um produto
interface Product {
  id: number;
  nome: string;
}

export default function Home() {
  // Variáveis de estado para gerenciar itens, entrada de texto, estado de carregamento e erros
  const [items, setItens] = useState<Product[]>([]);
  const [textIpunt, setTextIpunt] = useState("");
  const [loaading, setloading] = useState(false);
  // hook useEffect para carregar itens quando o componente é montado
  useEffect(() => {
    loadItems();
  }, []);
// Função para lidar com a adição de um novo item
  async function handleAddItem() {
    console.log(textIpunt);
    const data = { nome: textIpunt };
    try {
      // Fazendo uma requisição POST para adicionar um novo item
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
