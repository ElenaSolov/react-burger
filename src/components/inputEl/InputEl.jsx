import React from "react";
import {
  EmailInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import inputStyles from "./inputEl.module.css";

const InputEl = ({ type, placeholder }) => {
  const [value, setValue] = React.useState("");
  const onChange = (e) => {
    setValue(e.target.value);
  };
  const input =
    type === "email" ? (
      placeholder ? (
        <div className={`${inputStyles.input} mt-6`}>
          <Input
            onChange={onChange}
            value={value}
            name={"email"}
            placeholder={placeholder}
          />
        </div>
      ) : (
        <div className={`${inputStyles.input} mt-6`}>
          <EmailInput onChange={onChange} value={value} name={"email"} />
        </div>
      )
    ) : (
      <div className={`${inputStyles.input} mt-6`}>
        <Input
          type="password"
          onChange={onChange}
          value={value}
          placeholder={placeholder}
        />
      </div>
    );

  return <>{input}</>;
};

export default InputEl;
