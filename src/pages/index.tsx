import { useState } from "react";
import styled from "./styles/home.module.css";

export default function Home() {
  const [name, setName] = useState("");
  const [list, setList] = useState([]);

  function handleSendName() {
    setList((state) => [...state, name]);
  }

  return (
    <div className={styled.container}>
      <h1 className={styled.title}>Cadastrar um estudante</h1>
      <input
        onChange={(event) => {
          setName(event.target.value);
        }}
        value={name}
        className={styled.input}
        type="text"
        placeholder="Digite o nome aqui"
      />
      <button onClick={handleSendName} className={styled.button}>
        Enviar
      </button>
      <div className={styled.content}>
        {list.map((item) => (
          <p key={item}>{item}</p>
        ))}
      </div>
    </div>
  );
}
