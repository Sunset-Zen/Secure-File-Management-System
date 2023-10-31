import { ReactNode, createContext, useContext, useState } from "react";

// Declare Types
interface IFormContext {
  toNextPage: () => void;
  toLastPage: () => void;
  page: number;
}

const FormContext = createContext<IFormContext>({
  toNextPage: () => {},
  toLastPage: () => {},
  page: 1,
});

// Iprops => enables me to pass in children parameters in FormProvider
interface IProps {
  children: ReactNode;
}

export function FormProvider({ children }: IProps) {
  // Attributes | Hook(s)
  const [page, setPage] = useState(1);

  // Functions
  function toNextPage(): void {
    setPage((prevPage) => prevPage + 1);
    console.log("Page Num: " + page);
  }
  function toLastPage(): void {
    setPage((prevPage) => prevPage - 1);
  }

  // TSX
  return (
    <FormContext.Provider value={{ toNextPage, toLastPage, page }}>
      {children}
    </FormContext.Provider>
  );
}

export function useFormState() {
  return useContext(FormContext);
}
