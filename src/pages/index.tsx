import { useState } from "react";
import styled from "./styles/home.module.css";

export default function Home() {
  const [name, setName] = useState("");

  function handleSendName() {
    console.log(name);
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
        <p>Maick Souza</p>
        <p>Enilda Maria</p>
      </div>
    </div>
  );
}
