import { FormEvent, useRef, useState } from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import { FormHandles } from '@unform/core';
import { useFoods } from '../../hooks/useFoods';
import { Ifood } from '../../pages/Dashboard';
import Input from '../Input';
import Modal from '../Modal';
import { Form } from './style';

interface ModalEditFoodProps {
  isOpen: boolean;
  onRequestClose: () => void;
  editingFood: Ifood;
  handleUpdateFood: (food: Ifood) => Promise<void>;

}

function ModalEditFood({ isOpen, onRequestClose, editingFood }: ModalEditFoodProps) {
  const formRef = useRef<FormHandles>(null);
  const { handleUpdateFood } = useFoods();
  const [image, setImage] = useState<string>(editingFood.price);
  const [name, setName] = useState<string>(editingFood.name);
  const [price, setPrice] = useState<string>(editingFood.price);
  const [description, setDescription] = useState<string>(editingFood.description);

  function handleSubmit(e: FormEvent) {

    const data: Ifood = {
      id: editingFood.id,
      image: image ?? editingFood.image,
      name: name ?? editingFood.name,
      price: price ?? editingFood.price,
      description: description ?? editingFood.description,
      available: editingFood.available
    }

    handleUpdateFood(data);
    onRequestClose();

  };


  return (
    <Modal isOpen={isOpen}
      onRequestClose={onRequestClose}>
      <Form
        ref={formRef}
        onSubmit={handleSubmit}
        initialData={editingFood}>

        <h1>Editar Prato</h1>
        <Input
          name="image"
          placeholder="Cole o link aqui"
          onChange={e => setImage(e.target.value)}
          // value={image}
        />
        <Input name='name'
          placeholder="Ex: Moda Italiana"
          onChange={e => setName(e.target.value)}
          // value={name}
        />
        <Input name="price"
          placeholder="Ex: 19.90"
          onChange={e => setPrice(e.target.value)}
          // value={price}
        />
        <Input name="description"
          placeholder="Descrição"
          onChange={e => setDescription(e.target.value)}
          // value={description}
        />

        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar Prato</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
  // }
};

export default ModalEditFood;
