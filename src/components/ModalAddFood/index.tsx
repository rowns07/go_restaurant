import { FormHandles } from '@unform/core';
import { FormEvent, useRef, useState } from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import Input from '../Input';
import Modal from '../Modal';
import { Form } from './styles';

interface ModallAddFoodProps {
  isOpen: boolean;
  onRequestClose: () => void;
  handleAddFood: (food: any) => Promise<void>;
}

function ModalAddFood({ isOpen, onRequestClose, handleAddFood }: ModallAddFoodProps) {
  const ref = useRef<FormHandles>(null);
  const [image, setImage] = useState<string>('');
  const [name, setName] = useState<any>('');
  const [price, setPrice] = useState<any>('');
  const [description, setDescription] = useState<any>('');


  function handleSubmit(e: FormEvent<HTMLInputElement>) {
    const data = {
      image,
      name,
      price,
      description,
    }
    handleAddFood(data);
    onRequestClose()
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
    >
      <Form onSubmit={handleSubmit} ref={ref}>
        <h1>Novo Prato</h1>
        <Input name="image"
          placeholder="Cole o link aqui"
          onChange={e => setImage(e.target.value)}
        />
        <Input name="name"
          placeholder="Ex: Moda Italiana"
          onChange={e => setName(e.target.value)}
        />
        <Input name="price"
          placeholder="Ex: 19.90"
          onChange={e => setPrice(e.target.value)}
        />
        <Input name="description"
          placeholder="Descrição"
          onChange={e => setDescription(e.target.value)}
        />

        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalAddFood;
