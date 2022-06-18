import { FiEdit3, FiTrash } from 'react-icons/fi';

import { useState } from 'react';
import { useFoods } from '../../hooks/useFoods';
import { Ifood } from '../../pages/Dashboard';
import api from '../../services/api';
import { Container } from './styles';

interface FoodProps {
  id?: number;
  food: Ifood;
  handleDelete?: (foodId: Ifood) => Promise<void>;
  handleEditFood: () => void;
}


function Food({ id, handleDelete, handleEditFood, food }: FoodProps) {
  // const [available, setAvailable] = useState<boolean>(food?.available || true);
  const [isAvailable, setIsAvailable] = useState<boolean>(true)

  const { foods, handleDeleteFood, } = useFoods();

  // useEffect(() => {
  //   setIsAvailable(food?.available || false)
  // }, [])

  async function toggleAvailable() {
    const selectedFood  = food?.id;
    const available = food.available;

    console.log(selectedFood)
    const teste = await api.put(`/foods/${selectedFood}`, {
      ...food,
      available: !isAvailable,
    });

    console.log('SEILA', teste.data);

    setIsAvailable(!available);
    // setAvailable(!isAvailable)
  }

  const [editingFood, setEditingFood] = useState<Ifood>({} as Ifood);

  function EditFood() {
    // setFood(food)

    handleEditFood()
    console.log('CADE', food)
  }

  function testeNovo(){
    console.log('MAIS UM TESTE',food)
  }

  return (
    <>

      {foods && foods.map(foodItem => (
        <Container key={foodItem.id}>
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
                  onClick={testeNovo}
                  data-testid={`change-status-food-${foodItem.id}`}
                />
                <span className="slider" />
              </label>
            </div>
          </section>
        </Container>
      ))}
    </>

  );
};

export default Food;
