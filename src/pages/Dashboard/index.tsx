
import { useState } from 'react';
import Food from '../../components/Food';
import Header from '../../components/Header';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';
import { useFoods } from '../../hooks/useFoods';
import { FoodsContainer } from './styles';

export interface Ifood {
  id: number;
  name: string;
  description: string;
  price: string;
  available: boolean;
  image: string;
}

const Dashboard = (): JSX.Element => {

  const { foods, handleAddFood, handleDeleteFood, handleUpdateFood } = useFoods();

  const [editingFood, setEditingFood] = useState<Ifood>({} as Ifood);
  const [modalOpen, setModalOpen] = useState<boolean>();
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  }

  const toggleEditModal = () => {

    setEditModalOpen(!editModalOpen);
  }

  const handleEditFood = (food: Ifood) => {
    setEditingFood(food)
    setEditModalOpen(true)
  }

  function teste(food: Ifood) {
    console.log('CHAMANDO FUNCAO TESTE', food);
    handleEditFood(food)
  }

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {
          foods.map(food2 => (
            <Food
              key={food2.id}
              food={food2}
              handleDelete={handleDeleteFood}
              handleEditFood={() => teste(food2)}
            />
          ))}
      </FoodsContainer>
    </>
  );
};

export default Dashboard;
