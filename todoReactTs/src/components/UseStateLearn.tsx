import { FormEvent, useState } from "react";

interface Person {
  name: string;
  age: number;
}

const UseStateLearn = () => {
  const [user, setUser] = useState<Person>();

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(user);
  };

  return (
    <form action="" onSubmit={submitHandler}>
      <input
        type="number"
        name="age"
        id="age"
        value={user?.age || ""}
        onChange={(e) =>
          setUser((prev) => ({ ...prev!, age: Number(e.target.value) }))
        }
      />
      <input
        type="text"
        name="name"
        id="name"
        value={user?.name || ""}
        onChange={(e) =>
          setUser((prev) => ({ ...prev!, name: e.target.value }))
        }
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default UseStateLearn;
