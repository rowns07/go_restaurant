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
  handleAddFood: (food1: Ifood) => Promise<void>;
  handleUpdateFood: (food: Ifood) => Promise<void>;
  handleDeleteFood: (food: Ifood) => Promise<void>;
}

const FoodContext = createContext<FoodContextData>({} as FoodContextData)

export function FoodProvider({ children }: FoodProviderProps) {

  const [foods, setFoods] = useState<Ifood[]>([]);

  useEffect(() => {
    async function loadItens() {
      const responseFoods = await api.get<Ifood[]>('foods');
      setFoods(responseFoods.data)
    }
    loadItens()
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

  async function handleUpdateFood(editFood: Ifood) {

    // const updatedFood = {...editFood}

    try {
      const foodUpdated = await api.put<Ifood>(
        `/foods/${editFood.id}`,
        {
          ...editFood
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

  return (
    <FoodContext.Provider value={{ foods, handleAddFood, handleUpdateFood, handleDeleteFood, }}>
      {children}
    </FoodContext.Provider>
  )
}

export function useFoods() {
  const context = useContext(FoodContext)
  return context
}