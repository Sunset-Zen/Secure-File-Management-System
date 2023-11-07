import { useFormState } from "./FormContext";
import { FileMenu } from "./FileMenu";
import Form from "./Form";

export function FormStep() {
  // Attributes | Hook(s)
  const { page } = useFormState();

  switch (page) {
    case 1:
      return <Form />;
    case 2:
      return <FileMenu />;
  }
}
