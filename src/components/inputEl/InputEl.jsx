import React from "react";
import {
  EmailInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import inputStyles from "./inputEl.module.css";
import { validateEmail } from "../../utils/utils";

const InputEl = ({ type, placeholder, margin }) => {
  const [value, setValue] = React.useState("");
  const onChange = (e) => {
    setValue(e.target.value);
  };
  const onChangeWithValidation = (e) => {
    setValue(e.target.value);
    if (!validateEmail(e.target.value)) {
      setError(true);
    } else setError(false);
  };
  const [icon, setIcon] = React.useState("HideIcon");
  const inputRef = React.useRef(null);

  const toggleInput = (icon, type) => {
    inputRef.current.type = type;
    setIcon(icon);
  };

  const onIconClick = () => {
    icon === "HideIcon"
      ? toggleInput("ShowIcon", "text")
      : toggleInput("HideIcon", "password");
  };

  const [error, setError] = React.useState(false);

  let styles = `${inputStyles.input} mt-6`;
  if (margin === 0) styles = `${inputStyles.input}`;

  const input =
    type === "email" ? (
      placeholder ? (
        <div className={styles}>
          <Input
            onChange={onChangeWithValidation}
            type={type}
            value={value}
            name={"email"}
            error={error}
            errorText={"Пожалуйста, введите коррекный мейл"}
            placeholder={placeholder}
          />
        </div>
      ) : (
        <div className={styles}>
          <EmailInput onChange={onChange} value={value} name={"email"} />
        </div>
      )
    ) : type === "password" ? (
      <div className={styles}>
        <Input
          type={type}
          onChange={onChange}
          value={value}
          placeholder={placeholder}
          icon={icon}
          ref={inputRef}
          onIconClick={onIconClick}
        />
      </div>
    ) : (
      <div className={styles}>
        <Input
          type={type}
          onChange={onChange}
          value={value}
          placeholder={placeholder}
        />
      </div>
    );

  return <>{input}</>;
};

export default InputEl;
