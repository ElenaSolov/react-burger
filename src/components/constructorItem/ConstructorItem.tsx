import React, { FunctionComponent, useRef } from "react";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  deleteFromOrder,
  decreaseIngredient,
} from "../../services/actions/actions";
import constructorItemStyles from "./constructorItem.module.css";
import { useSelector, useDispatch } from "../../services/hooks";
import { useDrag, useDrop } from "react-dnd";
import { IIngredient, IOrderedIngredient } from "../../services/types/data";

interface IConstructorItemProps {
  index: number;
  ingredient: IIngredient;
  moveItem: (a: number, b: number) => void;
}
const ConstructorItem: FunctionComponent<IConstructorItemProps> = ({
  index,
  ingredient,
  moveItem,
}) => {
  const orderedIngredients = useSelector(
    (store) => store.order.orderedIngredients
  );
  const dispatch = useDispatch();

  const handleDeleteClick = (index: number) => {
    const count = orderedIngredients.filter(
      (i) => i._id === ingredient._id
    ).length;
    if (count < 2) {
      dispatch(deleteFromOrder(ingredient));
    } else {
      dispatch(decreaseIngredient(index));
    }
  };
  const [, dropRef] = useDrop({
    accept: "ingredient",
    hover(item: IOrderedIngredient, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      if (clientOffset === null) return;
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      if (item.start === "constructor") {
        moveItem(dragIndex, hoverIndex);
        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        item.index = hoverIndex;
      } else return;
    },
  });
  const [, dragRef] = useDrag({
    type: "ingredient",
    item: { ...ingredient, start: "constructor", index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const ref = useRef<HTMLLIElement>(null);
  dragRef(dropRef(ref));
  return (
    <li ref={ref} className={`${constructorItemStyles.item} ml-8 mr-4 mb-4`}>
      <span className={constructorItemStyles.dragIcon}>
        <DragIcon type="primary" />
      </span>
      <ConstructorElement
        isLocked={false}
        text={`${ingredient.name}`}
        price={ingredient.price}
        thumbnail={`${ingredient.image}`}
        handleClose={() => handleDeleteClick(index)}
      />
    </li>
  );
};

export default ConstructorItem;
