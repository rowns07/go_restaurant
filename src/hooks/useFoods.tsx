import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import api from "../services/api";

interface Ifood {
  id: number;
  name: string;
  description: string;
  price: string;
  available: boolean;
  image: string;
}

interface FoodProviderProps {
  children: ReactNode;
}

interface FoodContextData {
  foods: Ifood[];
  handleAddFood: (food1:Ifood) => Promise<void>;
  handleUpdateFood:() => void;
  handleDeleteFood: (food:Ifood) => Promise<void>;
  // handleSelectedFood: (food:Ifood) => Promise<void>;
}

const FoodContext = createContext<FoodContextData>({} as FoodContextData)

export function FoodProvider({ children }: FoodProviderProps) {

  const [foods, setFoods] = useState<Ifood[]>([]);
  const [editingFood, setEditingFood] = useState<Ifood>({} as Ifood);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [food, setFood] = useState<Ifood>();

  useEffect(() => {

    api.get<Ifood[]>('foods').then(response =>{ 
      console.log(response.data)
      setFoods(response.data)
    })
  }, [])

  async function handleAddFood(food: Ifood) {
    try {
      const response = await api.post('/foods', {
        ...food,
        available: true,
      });

      setFoods([
        ...foods,
        response.data
      ]);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdateFood() {

    const updatedFood = [...foods]
    try {
      const foodUpdated = await api.put<Ifood>(
        `/foods/${editingFood.id}`,
        {
          ...editingFood,
          ...updatedFood
        },
      );

      const foodsUpdated = foods.map(f =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data,
      );

      setFoods(foodsUpdated);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDeleteFood(food: Ifood) {
    await api.delete(`/foods/${food.id}`);

    const foodsFiltered = foods.filter(response => response.id !== food.id);

    setFoods(foodsFiltered)

  }

  //  function handleSelectedFood(food:Ifood){
  //    api.get(`'foods/${food.id}'`).then(response =>{
  //     console.log(response.data)
  //     setFood(response.data)
  //   })
  // }

  const handleEditFood = (food: Ifood) => {
    setEditingFood(food)
    setEditModalOpen(true)
  }

  return (
    <FoodContext.Provider value={{ foods, handleAddFood, handleUpdateFood, handleDeleteFood,  }}>
      {children}
    </FoodContext.Provider>
  )
}

export function useFoods() {
  const context = useContext(FoodContext)
  return context
}