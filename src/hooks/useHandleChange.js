import { useState } from "react";

export default function useHandleChange() {
  const [value, setValue] = useState("");

  const onChangeVal = (e) => {
    setValue(e.target.value);
  };

  return { value, setValue, onChangeVal };
}
