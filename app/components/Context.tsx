import React, { ReactNode, createContext, useContext, useState } from "react";

const PageContext = createContext({});

interface IProps {
  children: ReactNode;
}

export function Context({ children }: IProps) {
  const [page, setPage] = useState(0);
  function onHandleNext() {
    setPage((prevPage) => prevPage + 1);
  }
  function onHandleBack() {
    setPage((prevPage) => prevPage - 1);
  }
  return (
    <PageContext.Provider value={{ onHandleNext, onHandleBack, page }}>
      {children}
    </PageContext.Provider>
  );
}

export function useFormState() {
  return useContext(PageContext);
}
