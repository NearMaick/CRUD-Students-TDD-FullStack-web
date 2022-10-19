import { GetServerSideProps } from "next";
import { useState } from "react";
import styled from "./styles/home.module.css";

interface StudentProps {
  students: {
    id: string;
    email: string;
    name: string;
    createdAt: Date;
  }[];
}

export default function Home({ students }: StudentProps) {
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
        {students.map((item) => (
          <div key={item.id}>
            <pre>{JSON.stringify(item, null, 2)}</pre>
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch(
    "http://localhost:3000/api/listStudentController"
  );
  const students = await response.json();

  return {
    props: { students },
  };
};
