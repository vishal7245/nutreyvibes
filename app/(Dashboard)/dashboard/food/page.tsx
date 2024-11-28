'use client';

import { useEffect, useState, useCallback } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
} from '@/components/ui/alert-dialog';
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

interface PaginatedResponse {
  foods: FoodItem[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
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
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const [foodToDelete, setFoodToDelete] = useState<string | null>(null);
  const [editingFood, setEditingFood] = useState<Partial<FoodItem>>(defaultFoodItem);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFoodItems, setFilteredFoodItems] = useState<FoodItem[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 12;


  useEffect(() => {
    setFilteredFoodItems(foodItems);
  }, [foodItems]);

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setCurrentPage(1); // Reset to first page when searching
      fetchFoodItems(1, value);
    }, 300),
    []
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  useEffect(() => {
    fetchFoodItems(currentPage, searchTerm);
  }, [currentPage]);

  const fetchFoodItems = async (page: number, search: string = '') => {
    try {
      // Only show loading state when changing pages, not during search
      if (!search) setIsLoading(true);
      const response = await fetch(
        `/api/food?page=${page}&limit=${itemsPerPage}&search=${encodeURIComponent(search)}`
      );
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setFoodItems(data.foods);
      setFilteredFoodItems(data.foods);
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);
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

  const handleDelete = async () => {
    if (!foodToDelete) return;
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/food/${foodToDelete}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete food item');
      }
  
      setFoodItems(foods => foods.filter(f => f.id !== foodToDelete));
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
    } finally {
      setIsDeleting(false);
      setIsAlertDialogOpen(false);
      setFoodToDelete(null);
    }
  };

  const handleDeleteClick = (id: string) => {
    setFoodToDelete(id);
    setIsAlertDialogOpen(true);
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

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

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
          type="text"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
            }
          }}
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
                  onClick={() => handleDeleteClick(item.id)}
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

      <div className="mt-6 flex justify-center gap-2">
        <Button
          variant="outline"
          onClick={handlePreviousPage}
          disabled={currentPage === 1 || isLoading}
        >
          Previous
        </Button>
        <span className="flex items-center px-4">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="outline"
          onClick={handleNextPage}
          disabled={currentPage === totalPages || isLoading}
        >
          Next
        </Button>
      </div>

      <AlertDialog open={isAlertDialogOpen} onOpenChange={setIsAlertDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this food item? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button onClick={() => setIsAlertDialogOpen(false)}>Cancel</Button>
            <Button 
              onClick={handleDelete} 
              className="ml-2" 
              variant="destructive"
              disabled={isDeleting}
            >
              {isDeleting ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : null}
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {filteredFoodItems.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          {searchTerm ? 'No matching food items found.' : 'No food items found. Add your first food item!'}
        </div>
      )}
    </div>
  );
}