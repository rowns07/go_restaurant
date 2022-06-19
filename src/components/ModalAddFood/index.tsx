import { Component, createRef, FormEvent, useRef, useState } from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './styles';
// import Modal from '../Modal';
// import Input from '../Input';
import Modal from '../Modal';

interface ModallAddFoodProps {
  isOpen: boolean;
  onRequestClose: () => void;
  handleAddFood: (food: any) => Promise<void>;
}

function ModalAddFood({ isOpen,onRequestClose }: ModallAddFoodProps) {
  const formRef = useRef<HTMLInputElement>(null);


  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    // const { setIsOpen, handleAddFood } = this.props;
    // handleAddFood(data);
    // setIsOpen();
    // handleCloseNewTransactionModal()
  };

  // const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);

  // function handleOpenNewTransactionModal() {
  //   setIsNewTransactionModalOpen(true);
  // }

  // function handleCloseNewTransactionModal() {
  //   setIsNewTransactionModalOpen(false);
  // }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      >
      <Form onSubmit={handleSubmit}>
        <h1>Novo Prato</h1>
        <input value="image" placeholder="Cole o link aqui"  />

        <input name="name" placeholder="Ex: Moda Italiana" />
        <input name="price" placeholder="Ex: 19.90" />

        <input name="description" placeholder="Descrição" />
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
