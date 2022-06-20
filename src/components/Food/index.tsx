import { FiEdit3, FiTrash } from 'react-icons/fi';

import { useState } from 'react';
import { useFoods } from '../../hooks/useFoods';
import { Ifood } from '../../pages/Dashboard';
import api from '../../services/api';
import { Container } from './styles';

interface FoodProps {
  id?: number;
  foodItem: Ifood;
  handleDelete?: (foodId: Ifood) => Promise<void>;
  handleEditFood: (food: Ifood) => Promise<void>;
}


function Food({handleEditFood, foodItem }: FoodProps) {
  const [isAvailable, setIsAvailable] = useState<boolean>(foodItem.available)
  const { foods, handleDeleteFood, } = useFoods();

  async function toggleAvailable() {
    const selectedFood = { ...foodItem };

    await api.put(`/foods/${selectedFood.id}`, {
      ...foodItem,
      available: !isAvailable,
    });
    setIsAvailable(!isAvailable);
  }

  function EditFood() {
    handleEditFood(foodItem)
  }

  return (
    <>

      <Container available={isAvailable} key={foodItem.id}>
        <header>
          <img src={foodItem.image} alt={foodItem.name} />
        </header>
        <section className="body">
          <h2>{foodItem.name}</h2>
          <p>{foodItem.description}</p>
          <p className="price">
            R$ <b>{foodItem.price}</b>
          </p>
        </section>
        <section className="footer">
          <div className="icon-container">
            <button
              type="button"
              className="icon"
              onClick={EditFood}
              data-testid={`edit-food-${foodItem.id}`}
            >
              <FiEdit3 size={20} />
            </button>

            <button
              type="button"
              className="icon"
              onClick={() => handleDeleteFood(foodItem)}
              data-testid={`remove-food-${foodItem.id}`}
            >
              <FiTrash size={20} />
            </button>
          </div>

          <div className="availability-container">
            <p>{isAvailable ? 'Disponível' : 'Indisponível'}</p>

            <label htmlFor={`available-switch-${foodItem.id}`} className="switch">
              <input
                id={`available-switch-${foodItem.id}`}
                type="checkbox"
                checked={isAvailable}
                onChange={toggleAvailable}
                data-testid={`change-status-food-${foodItem.id}`}
              />
              <span className="slider" />
            </label>
          </div>
        </section>
      </Container>
    </>

  );
};

export default Food;
