import React from "react";
import {
  EmailInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import inputStyles from "./inputEl.module.css";
import { validateEmail } from "../../utils/utils";
import PropTypes from "prop-types";

const InputEl = ({
  type,
  placeholder,
  margin,
  initialValue = "",
  reset,
  setReset,
}) => {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    if (reset) {
      setValue(initialValue);
      setReset(false);
    }
  }, [initialValue, reset, setReset]);

  const onChange = (e) => {
    setValue(e.target.value);
    if (value.length < 2) {
      setError(true);
    } else setError(false);
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
          name={type}
          onChange={onChange}
          value={value}
          placeholder={placeholder}
          icon={icon}
          ref={inputRef}
          onIconClick={onIconClick}
          error={error}
          errorText={"Пожалуйста, введите более 2х символов"}
        />
      </div>
    ) : (
      <div className={styles}>
        <Input
          type={type}
          name={type}
          onChange={onChange}
          value={value}
          placeholder={placeholder}
          error={error}
          errorText={"Пожалуйста, введите более 2х символов"}
        />
      </div>
    );

  return <>{input}</>;
};

InputEl.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  initialValue: PropTypes.string,
  margin: PropTypes.number,
  reset: PropTypes.bool,
  setReset: PropTypes.func,
};
export default InputEl;
