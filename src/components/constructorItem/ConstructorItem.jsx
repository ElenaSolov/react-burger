import React, {useRef} from 'react';
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { deleteFromOrder, decreaseIngredient } from "../../services/actions/actions.js";
import constructorItemStyles from "./constructorItem.module.css";
import { useSelector, useDispatch } from 'react-redux';
import { useDrag, useDrop } from "react-dnd";
import propTypesConfig from "../../utils/propTypesConfig";
import PropTypes from "prop-types";

const ConstructorItem = ({index, ingredient, moveItem}) => {

  const orderedIngredients = useSelector(store => store.order.orderedIngredients);
  const dispatch = useDispatch();

  const handleClose = (e, index) => {
    const ingredient = orderedIngredients.find(i => i.name === e.target.closest('.constructor-element').querySelector('.constructor-element__text').textContent);
    const count = orderedIngredients.filter(i => i._id === ingredient._id).length;
      if(count<2){
        dispatch(deleteFromOrder(ingredient));
      } else {
        dispatch(decreaseIngredient(index));
      }
  }
  const [, dropRef] = useDrop({
    accept: 'ingredient',
    hover(item, monitor) {
      if (!ref.current) {
          return
      }
      const dragIndex = item.index
      const hoverIndex = index
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      // Determine mouse position
      const clientOffset = monitor.getClientOffset()
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      // Time to actually perform the action
      if(item.start === 'constructor'){
      moveItem(dragIndex, hoverIndex)
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
      } else return;

    },
    })
  const [{isDragging}, dragRef] = useDrag({
    type: 'ingredient',
    item: {...ingredient, start: 'constructor', index},
    collect: monitor => ({
                isDragging: monitor.isDragging()
      }),
    });
  const ref = useRef(null);
  const dragDropRef = dragRef(dropRef(ref))
  return (
    !isDragging &&<li ref={dragDropRef}
      className={`${constructorItemStyles.item} ml-8 mr-4 mb-4`}>
      <span className={constructorItemStyles.dragIcon}><DragIcon type='primary' /></span>
      <ConstructorElement
        isLocked={false}
        text={`${ingredient.name}`}
        price={`${ingredient.price}`}
        thumbnail={`${ingredient.image}`}
        handleClose={(e)=>handleClose(e, index)}
      />
  </li>)
}

ConstructorItem.propTypes = {
  index: PropTypes.number.isRequired,
  ingredient: PropTypes.shape(propTypesConfig).isRequired,
  moveItem: PropTypes.func.isRequired
};

export default ConstructorItem;