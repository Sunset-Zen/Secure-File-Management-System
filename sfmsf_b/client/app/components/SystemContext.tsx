import { ReactNode, createContext, useContext, useState } from "react";

// Declare Shared Global System Variable Types
interface IFormContext {
  toNextPage: () => void;
  toLastPage: () => void;
  changeUsername: (text: string) => void;
  changePassword: (text: string) => void;
  setOfiles: ([]) => void;
  setTfiles: ([]) => void;
  setJfiles: ([]) => void;
  page: number;
  username: string;
  password: string;
  ofiles: any[];
  tfiles: any[];
  jfiles: any[];
}
const SystemContext = createContext<IFormContext>({
  toNextPage: () => {},
  toLastPage: () => {},
  changeUsername: () => {},
  changePassword: () => {},
  setOfiles: () => {},
  setTfiles: () => {},
  setJfiles: () => {},
  page: 1,
  username: "",
  password: "",
  ofiles: [],
  tfiles: [],
  jfiles: [],
});

// Iprops => enables me to pass in children parameters in FormProvider
interface IProps {
  children: ReactNode;
}
export function SystemContextProvider({ children }: IProps) {
  // Attributes || Hook(s)
  const [page, setPage] = useState(1);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [ofiles, setOfiles] = useState<any[]>([]);
  const [tfiles, setTfiles] = useState<any[]>([]);
  const [jfiles, setJfiles] = useState<any[]>([]);

  // Functions || Logic
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
    <SystemContext.Provider
      value={{
        toNextPage,
        toLastPage,
        page,
        changeUsername,
        changePassword,
        username,
        password,
        ofiles,
        setOfiles,
        tfiles,
        setTfiles,
        jfiles,
        setJfiles,
      }}
    >
      {children}
    </SystemContext.Provider>
  );
}

export function useSystemState() {
  return useContext(SystemContext);
}
