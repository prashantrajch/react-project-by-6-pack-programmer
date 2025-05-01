// For using type 3
// import { ReactNode } from "react";

import { Dispatch, SetStateAction } from "react";

// Type One

// const Box = ({heading}:{heading:string}) => {
//   return (
//     <div>
//       <h1>{heading}</h1>
//     </div>
//   );
// };

// Type Two

// type PropsType = {
//   heading: string;
// };

// const Box = (props: PropsType) => {
//   return (
//     <div>
//       <h1>{props.heading}</h1>
//     </div>
//   );
// };

//Type 3

// interface PropsType {
//   heading: string;
//   count?: number;
//   children: ReactNode;
// }

// const Box = ({ heading, count = 5, children }: PropsType) => {
//     return (
//         <div>
//       <h1>{heading}</h1>
//       {count && <p>{count}</p>}
//       {children}
//     </div>
//   );
// };

// Type 4

type InputValType = string | number;

const Box = <T extends InputValType>({
  label,
  value,
  setter,
}: {
  label: string;
  value: T;
  setter: Dispatch<SetStateAction<T>>;
}) => {
  return (
    <form>
      <label htmlFor="">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => setter(e.target.value as T)}
      />
      <button>Submit</button>
    </form>
  );
};

export default Box;
