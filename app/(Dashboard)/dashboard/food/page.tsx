'use client';

import { useEffect, useState, useCallback } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { Loader2, Pencil, Trash } from 'lucide-react';
import debounce from 'lodash/debounce';

interface FoodItem {
  id: string;
  name: string;
  alternateName: string | null;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  calories: number;
  createdAt: string;
  updatedAt: string;
}

const defaultFoodItem = {
  name: '',
  alternateName: '',
  protein: 0,
  carbs: 0,
  fat: 0,
  fiber: 0,
  calories: 0,
};

export default function FoodPage() {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingFood, setEditingFood] = useState<Partial<FoodItem>>(defaultFoodItem);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFoodItems, setFilteredFoodItems] = useState<FoodItem[]>([]);

  useEffect(() => {
    setFilteredFoodItems(foodItems);
  }, [foodItems]);

  const debouncedSearch = useCallback(
    debounce((searchValue: string) => {
      const filtered = foodItems.filter(
        (item) =>
          item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          (item.alternateName?.toLowerCase().includes(searchValue.toLowerCase()))
      );
      setFilteredFoodItems(filtered);
    }, 300),
    [foodItems]
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  useEffect(() => {
    fetchFoodItems();
  }, []);

  const fetchFoodItems = async () => {
    try {
      const response = await fetch('/api/food');
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setFoodItems(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch food items",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!editingFood.name) {
      toast({
        title: "Error",
        description: "Food name is required",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const url = isEditing ? `/api/food/${editingFood.id}` : '/api/food';
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: editingFood.name,
          alternateName: editingFood.alternateName || '',
          protein: Number(editingFood.protein) || 0,
          carbs: Number(editingFood.carbs) || 0,
          fat: Number(editingFood.fat) || 0,
          fiber: Number(editingFood.fiber) || 0,
          calories: Number(editingFood.calories) || 0,
        }),
      });

      if (!response.ok) throw new Error('Failed to save');

      const savedFood = await response.json();

      if (isEditing) {
        setFoodItems(foods => foods.map(f => f.id === savedFood.id ? savedFood : f));
        toast({
          title: "Success",
          description: "Food item updated successfully",
        });
      } else {
        setFoodItems(foods => [savedFood, ...foods]);
        toast({
          title: "Success",
          description: "Food item added successfully",
        });
      }

      handleCloseDialog();
    } catch (error) {
      toast({
        title: "Error",
        description: isEditing ? "Failed to update food item" : "Failed to add food item",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this food item?')) return;

    try {
      const response = await fetch(`/api/food/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete');

      setFoodItems(foods => foods.filter(f => f.id !== id));
      toast({
        title: "Success",
        description: "Food item deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete food item",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (food: FoodItem) => {
    setEditingFood(food);
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingFood(defaultFoodItem);
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-4 w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Food Items</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add Food Item</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{isEditing ? 'Edit Food Item' : 'Add Food Item'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Food Name"
                value={editingFood.name || ''}
                onChange={(e) => setEditingFood({ ...editingFood, name: e.target.value })}
              />
              <Input
                placeholder="Alternate Name"
                value={editingFood.alternateName || ''}
                onChange={(e) => setEditingFood({ ...editingFood, alternateName: e.target.value })}
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="Protein (g/100g)"
                  type="number"
                  value={editingFood.protein || ''}
                  onChange={(e) => setEditingFood({ ...editingFood, protein: parseFloat(e.target.value) })}
                />
                <Input
                  placeholder="Carbs (g/100g)"
                  type="number"
                  value={editingFood.carbs || ''}
                  onChange={(e) => setEditingFood({ ...editingFood, carbs: parseFloat(e.target.value) })}
                />
                <Input
                  placeholder="Fat (g/100g)"
                  type="number"
                  value={editingFood.fat || ''}
                  onChange={(e) => setEditingFood({ ...editingFood, fat: parseFloat(e.target.value) })}
                />
                <Input
                  placeholder="Fiber (g/100g)"
                  type="number"
                  value={editingFood.fiber || ''}
                  onChange={(e) => setEditingFood({ ...editingFood, fiber: parseFloat(e.target.value) })}
                />
              </div>
              <Input
                placeholder="Calories (per 100g)"
                type="number"
                value={editingFood.calories || ''}
                onChange={(e) => setEditingFood({ ...editingFood, calories: parseFloat(e.target.value) })}
              />
              <Button 
                onClick={handleSubmit} 
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : null}
                {isEditing ? 'Update' : 'Save'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mb-4">
        <Input
          placeholder="Search food items..."
          value={searchTerm}
          onChange={handleSearch}
          className="max-w-md"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredFoodItems.map((item) => (
          <div
            key={item.id}
            className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                {item.alternateName && (
                  <p className="text-sm text-gray-500">{item.alternateName}</p>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEdit(item)}
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(item.id)}
                >
                  <Trash className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
              <div>Protein: {item.protein}g</div>
              <div>Carbs: {item.carbs}g</div>
              <div>Fat: {item.fat}g</div>
              <div>Fiber: {item.fiber}g</div>
              <div>Calories: {item.calories}</div>
            </div>
          </div>
        ))}
      </div>

      {filteredFoodItems.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          {searchTerm ? 'No matching food items found.' : 'No food items found. Add your first food item!'}
        </div>
      )}
    </div>
  );
}