import preloaderStyles from "./preloader.module.css";
import img from "../../images/burger_icon.svg";

const PreLoader = () => {
  return (
    <div className={preloaderStyles.imgContainer}>
      <img className={preloaderStyles.img} src={img} alt="Иконка бургера" />
    </div>
  );
};

export default PreLoader;
