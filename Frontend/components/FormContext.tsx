import { ReactNode, createContext, useContext, useState } from "react";

// Declare Shared Global Variable Types
interface IFormContext {
  toNextPage: () => void;
  toLastPage: () => void;
  changeUsername: (text: string) => void;
  changePassword: (text: string) => void;
  page: number;
  username: string;
  password: string;
}
const FormContext = createContext<IFormContext>({
  toNextPage: () => {},
  toLastPage: () => {},
  changeUsername: () => {},
  changePassword: () => {},
  page: 1,
  username: "",
  password: "",
});

// Iprops => enables me to pass in children parameters in FormProvider
interface IProps {
  children: ReactNode;
}
export function FormProvider({ children }: IProps) {
  // Attributes | Hook(s)
  const [page, setPage] = useState(1);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Functions
  function toNextPage(): void {
    setPage((prevPage) => prevPage + 1);
    console.log("Page Num: " + page);
  }
  function toLastPage(): void {
    setPage((prevPage) => prevPage - 1);
  }
  function changeUsername(text: string): void {
    setUsername((prevName) => (prevName = text));
  }
  function changePassword(text: string): void {
    setPassword((prevPass) => (prevPass = text));
  }

  // TSX
  return (
    <FormContext.Provider
      value={{
        toNextPage,
        toLastPage,
        page,
        changeUsername,
        changePassword,
        username,
        password,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

export function useFormState() {
  return useContext(FormContext);
}
