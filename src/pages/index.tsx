import axios from "axios";
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
  const [email, setEmail] = useState("");
  const [studentsList, setStudentsList] = useState(students);

  async function handleSendStudent() {
    const response = await axios.post(
      "http://localhost:3000/api/createStudentController",
      {
        name,
        email,
      }
    );
    const content = await response.data;
    setStudentsList((state) => [...state, content]);
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
      <input
        onChange={(event) => {
          setEmail(event.target.value);
        }}
        value={email}
        className={styled.input}
        type="text"
        placeholder="Digite o email aqui"
      />
      <button onClick={handleSendStudent} className={styled.button}>
        Enviar
      </button>
      <div className={styled.content}>
        {studentsList.map((item) => (
          <div key={item.id}>
            <p>{item.name}</p>
            <p>{item.email}</p>
            <br />
          </div>
        ))}
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await axios.get(
    "http://localhost:3000/api/listStudentController"
  );
  const students = await response.data;

  return {
    props: { students },
  };
};
