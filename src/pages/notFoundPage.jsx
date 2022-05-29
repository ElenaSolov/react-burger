import React from "react";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router-dom";
import notFoundStyles from "./pages.module.css";

function NotFoundPage() {
  const navigate = useNavigate();
  const goHome = () => {
    navigate("/");
  };
  return (
    <section className={notFoundStyles.notFoundSection}>
      <h1 className={notFoundStyles.notFoundTitle}>404</h1>
      <p className="text text_type_main-large mb-20">Страница не найдена</p>
      <Button type="primary" size="medium" onClick={goHome}>
        Вернуться на главную страницу
      </Button>
    </section>
  );
}

export default NotFoundPage;
