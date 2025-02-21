'use client'
import { useState, useEffect, useMemo, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { Loader2, Download, Trash, Plus, Edit } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Combobox } from "@/components/ui/combobox";


import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import React from 'react';

const DEFAULT_MEALS = [
  { name: 'Early Morning', time: '08:00', selected: true, items: [], comment: '' },
  { name: 'BreakFast', time: '10:00', selected: true, items: [], comment: '' },
  { name: 'Mid Morning', time: '12:00', selected: true, items: [], comment: '' },
  { name: 'Lunch', time: '14:00', selected: true, items: [], comment: '' },
  { name: 'Evening', time: '16:00', selected: true, items: [], comment: '' },
  { name: 'Late Evening', time: '18:00', selected: true, items: [], comment: '' },
  { name: 'Dinner', time: '20:00', selected: true, items: [], comment: '' },
  { name: 'Post Dinner', time: '22:00', selected: true, items: [], comment: '' },
];

const UNITS = ['piece', 'tbsp', 'gm', 'kg', 'ml', 'l', 'cup', 'oz', 'pinch'];

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

interface MealItem {
  id?: string;
  foodId: string;
  quantity: number;
  unit: string;
  food?: FoodItem;
}

interface Meal {
  name: string;
  time: string;
  selected: boolean;
  items: MealItem[];
  comment?: string;
  customFoods?: string; 
}

export default function Dashboard() {
  const [dietPlans, setDietPlans] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [meals, setMeals] = useState<Meal[]>(
    DEFAULT_MEALS.map(m => ({ ...m, selected: true, items: [] }))
  );
  const [planName, setPlanName] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [unit, setUnit] = useState('piece');
  const [addingToMeal, setAddingToMeal] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingPlan, setEditingPlan] = useState<any | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deletingPlanId, setDeletingPlanId] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isNameAlertOpen, setIsNameAlertOpen] = useState(false);
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);
  const [alertDialogContent, setAlertDialogContent] = useState({ title: '', description: '' });
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [foodPage, setFoodPage] = useState(1);
  const [totalFoodPages, setTotalFoodPages] = useState(1);
  const [selectedFood, setSelectedFood] = useState<string>('');
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);

  

  const filteredFoodItems = foodItems;

  useEffect(() => {
    fetchDietPlans();
  }, []);


  const handleCustomFoodChange = (index: number, customFoods: string) => {
    setMeals(prevMeals => {
      const newMeals = [...prevMeals];
      newMeals[index] = {
        ...newMeals[index],
        customFoods: customFoods,
        selected: !!(customFoods?.trim() || newMeals[index].items.length > 0)
      };
      return newMeals;
    });
  };


  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchFoodItems(searchTerm);
    }, 300); // Debounce search for better performance
  
    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  const handleTimeChange = (index: number, newTime: string) => {
    setMeals(prevMeals => {
      const newMeals = [...prevMeals];
      newMeals[index].time = newTime;
      return newMeals;
    });
  };

  const handleCommentChange = (index: number, comment: string) => {
    setMeals(prevMeals => {
      const newMeals = [...prevMeals];
      newMeals[index].comment = comment;
      return newMeals;
    });
  };


  const handleDownload = () => {
    setIsDownloading(true);
    try {
      const doc = new jsPDF();
    const selectedMeals = meals.filter(meal => meal.selected);
  
    // Set background color
    const applyBackground = () => {
      doc.setFillColor(236, 252, 203);
      doc.rect(0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight(), 'F');
    };
    applyBackground();
  
    // Add logo - using a more reliable approach
    try {
      const logo = new Image();
      logo.src = '/NutreyVibes-removebg-preview.png'; // Replace with your logo path
      const logoWidth = 113;
      const logoHeight = 35;
      const pageWidth = doc.internal.pageSize.getWidth();
      const logoX = (pageWidth - logoWidth) / 2;
      
      // Wait for image to load before adding to PDF
      logo.onload = () => {
        doc.addImage(logo, 'PNG', logoX, 10, logoWidth, logoHeight);
        
        // Continue with the rest of the PDF generation
        generatePDFContent();
      };
  
      logo.onerror = () => {
        // Continue without logo if image fails to load
        console.warn('Failed to load logo, continuing without it');
        generatePDFContent();
      };
    } catch (error) {
      console.error('Error adding logo:', error);
      generatePDFContent();
    }
  
    function generatePDFContent() {
      // Add title
      doc.setFontSize(16);
      doc.text(`Diet Plan: ${planName || 'Untitled Plan'}`, 14, 60);
      doc.setFontSize(12);
  
      let yPos = 70;
  
      selectedMeals.forEach((meal) => {
        // Add meal name and time
        doc.setFont("Helvetica", 'bold');
        doc.text(`${meal.name} - ${meal.time}`, 14, yPos);
        doc.setFont("Helvetica", 'normal');
        yPos += 10;
        if (meal.comment) {
          doc.setFont("Helvetica", 'italic');
          doc.setFontSize(10);
          doc.text(`Note: ${meal.comment}`, 14, yPos);
          doc.setFontSize(12);
          doc.setFont("Helvetica", 'normal');
        }

        if (meal.customFoods) {
          doc.setFont("Helvetica", 'normal');
          doc.setFontSize(10);
          doc.text(`Diet: ${meal.customFoods}`, 14, yPos);
          yPos += 10;
        }
        
        if (meal.items.length > 0) {
          // Create table for food items
          autoTable(doc, {
            startY: yPos + 5,
            head: [['Food Item', 'Quantity', 'Unit']],
            body: meal.items.map(item => [
              item.food?.name || '',
              item.quantity.toString(),
              item.unit
            ]),
            margin: { left: 14 },
            theme: 'grid',
            headStyles: { fillColor: [77, 124, 15] },
          });
          
          yPos = (doc as any).lastAutoTable.finalY + 15;
        } else {
          yPos += 15;
        }
  
        if (yPos > 250) {
          doc.addPage();
          applyBackground();
          yPos = 20;
        }
      });
  
      doc.save(`${planName || 'diet-plan'}.pdf`);
    }
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: "Error",
        description: "Failed to generate PDF",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const fetchDietPlans = async () => {
    setIsLoading(true);
    try {
      console.log('Fetching diet plans...');
      const response = await fetch('/api/diet-plans');
      
      if (!response.ok) {
        console.error('Response not ok:', response.status, response.statusText);
        throw new Error(`Failed to fetch diet plans: ${response.statusText}`);
      }
      
      const data = await response.json();
        console.log('Fetched diet plans:', data);
        setDietPlans(data);
      } catch (error) {
        console.error('Error fetching diet plans:', error);
        toast({
          title: "Error",
          description: "Failed to fetch diet plans",
          variant: "destructive",
        });
        // Set empty array to prevent loading state from being stuck
        setDietPlans([]);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchFoodItems = async (searchQuery = '') => {
      try {
        console.log('Fetching food items with search:', searchQuery);
        const response = await fetch(`/api/food/search?search=${encodeURIComponent(searchQuery)}`);
        
        if (!response.ok) {
          console.error('Response not ok:', response.status, response.statusText);
          throw new Error('Failed to fetch food items');
        }
        
        const data = await response.json();
        console.log('Fetched food items:', data.foods?.length || 0, 'items');
        setFoodItems(data.foods || []);
      } catch (error) {
        console.error('Error fetching food items:', error);
        toast({
          title: "Error",
          description: "Failed to fetch food items",
          variant: "destructive",
        });
      }
    };

  const handleSave = async () => {
    if (!planName.trim()) {
      setIsNameAlertOpen(true);
      return;
    }
  
    const selectedMeals = meals.filter(meal => meal.selected);
    if (selectedMeals.length === 0) {
      setAlertDialogContent({
        title: "Error",
        description: "Please select at least one meal"
      });
      setAlertDialogOpen(true);
      return;
    }
  
    // Check if any selected meal has no items
    const emptyMeals = selectedMeals.filter(meal => meal.items.length === 0 && !meal.customFoods?.trim());
    if (emptyMeals.length > 0) {
      setAlertDialogContent({
        title: "Error",
        description: `Please add food items or custom foods to: ${emptyMeals.map(m => m.name).join(', ')}`
      });
      setAlertDialogOpen(true);
      return;
    }
    
    setIsSaving(true);
    try {
      const response = await fetch('/api/diet-plans', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: planName,
          meals: selectedMeals.map(meal => ({
            ...meal,
            customFoods: meal.customFoods || null // Include customFoods field
          })),
        }),
      });
  
      if (!response.ok) throw new Error('Failed to save diet plan');
  
      const savedPlan = await response.json();
      setDietPlans(plans => [savedPlan, ...plans]);
      setAlertDialogContent({
        title: "Success",
        description: "Diet plan saved successfully"
      });
      setAlertDialogOpen(true);
      setIsDialogOpen(false);
    } catch (error) {
      setAlertDialogContent({
        title: "Error",
        description: "Failed to save diet plan"
      });
      setAlertDialogOpen(true);
    } finally {
      setIsSaving(false);
    }
  };

  const generateDefaultPlanName = () => {
    const today = new Date();
    return `Diet Plan - ${today.toLocaleDateString()}`;
  };

  const handleOpenDialog = () => {
    setEditingPlan(null);
    setPlanName(generateDefaultPlanName());
    setMeals(DEFAULT_MEALS.map(m => ({ ...m, selected: false, items: [] })));
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    setDeletingPlanId(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!deletingPlanId) return;
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/diet-plans/${deletingPlanId}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) throw new Error('Failed to delete diet plan');
  
      setDietPlans(plans => plans.filter(plan => plan.id !== deletingPlanId));
      toast({
        title: "Success",
        description: "Diet plan deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete diet plan",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);
      setDeletingPlanId(null);
    }
  };

  const dialogContentStyle = "max-h-[80vh] overflow-y-auto";

  const handleEditPlan = async (plan: any) => {
    try {
      const response = await fetch(`/api/diet-plans/${plan.id}`);
      if (!response.ok) throw new Error('Failed to fetch plan details');
      const fullPlan = await response.json();
      
      console.log('Fetched plan details:', fullPlan); // Debug log
      
      setEditingPlan(fullPlan);
      setPlanName(fullPlan.name);
      
      const newMeals = DEFAULT_MEALS.map(defaultMeal => {
        const existingMeal = fullPlan.meals.find((m: any) => m.name === defaultMeal.name);
        console.log(`Mapping meal ${defaultMeal.name}:`, existingMeal); // Debug log
        
        return {
          name: defaultMeal.name,
          time: existingMeal?.time || defaultMeal.time,
          comment: existingMeal?.comment || '',
          customFoods: existingMeal?.customFoods || '',
          selected: !!existingMeal,
          items: existingMeal?.items || [],
        };
      });
      
      console.log('Mapped meals:', newMeals); // Debug log
      setMeals(newMeals);
      setIsDialogOpen(true);
    } catch (error) {
      console.error('Error fetching plan details:', error);
      toast({
        title: "Error",
        description: "Failed to load diet plan details",
        variant: "destructive",
      });
    }
  };
  
  const handleUpdatePlan = async () => {
    if (!editingPlan) return;
    if (!planName.trim()) {
      return toast({
        title: "Missing Information",
        description: "Please enter a diet plan name",
        variant: "destructive",
      });
    }

    setIsUpdating(true);
    try {
      console.log('Sending update with meals:', meals.filter(meal => meal.selected)); // Debug log

      const response = await fetch(`/api/diet-plans/${editingPlan.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: planName,
          meals: meals.filter(meal => meal.selected).map(meal => ({
            name: meal.name,
            time: meal.time,
            comment: meal.comment || null,
            customFoods: meal.customFoods || null,
            items: meal.items.map(item => ({
              quantity: item.quantity,
              unit: item.unit,
              foodId: item.foodId,
            })),
          })),
        }),
      });

      if (!response.ok) throw new Error('Failed to update diet plan');

      const updatedPlan = await response.json();
      console.log('Updated plan:', updatedPlan); // Debug log

      // Fetch all diet plans again to ensure we have the latest data
      await fetchDietPlans();
      
      toast({
        title: "Success",
        description: "Diet plan updated successfully",
      });
      
      // Reset form
      setEditingPlan(null);
      setPlanName('');
      setMeals(DEFAULT_MEALS.map(m => ({ ...m, selected: true, items: [] })));
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error updating plan:', error);
      toast({
        title: "Error",
        description: "Failed to update diet plan",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleAddFoodToMeal = (mealName: string) => {
    if (!selectedFood) {
      toast({
        title: "Error",
        description: "Please select a food item",
        variant: "destructive",
      });
      return;
    }
  
    if (!quantity || parseFloat(quantity) <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid quantity",
        variant: "destructive",
      });
      return;
    }
  
    const mealIndex = meals.findIndex(meal => meal.name === mealName);
    if (mealIndex === -1) return;
  
    const food = foodItems.find(item => item.id === selectedFood);
    if (!food) return;
  
    const newMeals = [...meals];
    newMeals[mealIndex].items.push({
      foodId: selectedFood,
      quantity: parseFloat(quantity),
      unit,
      food,
    });

    newMeals[mealIndex].selected = true;

  
    setMeals(newMeals);
    setAddingToMeal(null);
    
    // Reset form
    setSelectedFood('');
    setQuantity('1');
    setUnit('piece');
    setSearchTerm('');
  
    toast({
      title: "Success",
      description: "Food item added successfully",
    });
  };

  const handleRemoveFoodItem = (mealIndex: number, itemIndex: number) => {
    const newMeals = [...meals];
    newMeals[mealIndex].items.splice(itemIndex, 1);
    
    newMeals[mealIndex].selected = !!(newMeals[mealIndex].items.length > 0 || newMeals[mealIndex].customFoods?.trim());
    
    setMeals(newMeals);
  };

  const searchFoodItems = async (searchQuery: string) => {
    try {
      const response = await fetch(`/api/food/search?search=${encodeURIComponent(searchQuery)}`);
      if (!response.ok) throw new Error('Failed to search food items');
      const data = await response.json();
      setFoodItems(data.foods || []);
    } catch (error) {
      console.error('Error searching food items:', error);
      toast({
        title: "Error",
        description: "Failed to search food items",
        variant: "destructive",
      });
    }
  };

  // Initial food items load
  useEffect(() => {
    searchFoodItems('');
  }, []);

  const memoizedComboboxOptions = (foodItems: FoodItem[]) => 
    foodItems.map(food => ({
      value: food.id,
      label: food.name
    }));

    const handleMealSelectionChange = useCallback((index: number, checked: boolean) => {
      setMeals(prevMeals => {
        const newMeals = [...prevMeals];
        newMeals[index].selected = checked;
        return newMeals;
      });
    }, []);
  
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Diet Plans</h1>
          <Button onClick={handleOpenDialog}>Create Diet Plan</Button>
        </div>

        {/* Create/Edit Diet Plan Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className={dialogContentStyle}>
            <DialogHeader>
              <DialogTitle>{editingPlan ? 'Edit Diet Plan' : 'Create Diet Plan'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <Input
                placeholder="Diet Plan Name"
                value={planName}
                onChange={(e) => setPlanName(e.target.value)}
                className="max-w-md mb-6"
              />

              {/* Meals List */}
              <div className="space-y-4">
                {meals.map((meal, index) => (
                  <div key={meal.name} className="border rounded-lg p-4">
                    <div className="flex items-center gap-4 mb-4">
                    <Checkbox
                      checked={meal.selected}
                      onCheckedChange={(checked) => handleMealSelectionChange(index, checked as boolean)}
                    />
                      <div className="flex-1">
                        <h3 className="font-semibold">{meal.name}</h3>
                        <Input
                          type="time"
                          value={meal.time}
                          onChange={(e) => handleTimeChange(index, e.target.value)}
                          className="mt-1 w-32"
                        />
                      </div>
                    </div>

                    {meal.selected && (   
                      <>  
                      <div className="mb-4">
                      <textarea
                        placeholder="Add notes for this meal..."
                        value={meal.comment || ''}
                        onChange={(e) => handleCommentChange(index, e.target.value)}
                        className="w-full p-2 border rounded-md min-h-[60px] text-sm"
                      />
                    </div>
        
                    {/* Custom Foods textarea - Make sure this is visible and properly bound */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-2">
                        Custom Foods
                      </label>
                      <textarea
                        placeholder="Enter custom foods here..."
                        value={meal.customFoods || ''} // Make sure this is properly bound
                        onChange={(e) => handleCustomFoodChange(index, e.target.value)}
                        className="w-full p-2 border rounded-md min-h-[60px] text-sm"
                      />
                    </div>
                    </>
                    )}

                    {meal.selected && (
                      <>
                        {/* Food Items List */}
                        <div className="space-y-2 mb-4">
                          {meal.items.map((item, itemIndex) => (
                            <div key={itemIndex} className="flex items-center justify-between bg-gray-100 p-2 rounded">
                              <span>{item.food?.name}</span>
                              <div className="flex items-center gap-4">
                                <span className="text-gray-600">
                                  {item.quantity} {item.unit}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleRemoveFoodItem(index, itemIndex)}
                                >
                                  <Trash className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Add Food Dialog */}
                        <Dialog open={addingToMeal === meal.name} onOpenChange={(open) => !open && setAddingToMeal(null)}>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => setAddingToMeal(meal.name)}
                            >
                              <Plus className="w-4 h-4 mr-2" /> Add Food Item
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="w-[95vw] max-w-[95vw] sm:max-w-[600px] md:max-w-[700px] max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Add Food to {meal.name}</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 mt-4">
                            <Combobox
                              options={memoizedComboboxOptions(foodItems)}
                              value={selectedFood}
                              onValueChange={setSelectedFood}
                              placeholder="Select Food Item"
                              searchPlaceholder="Search food items..."
                              emptyText="No food items found."
                              className="w-full"
                              onSearch={(query) => {
                                const debounceTimer = setTimeout(() => {
                                  fetchFoodItems(query)
                                }, 300)
                                return () => clearTimeout(debounceTimer)
                              }}
                            />

                              {selectedFood && (
                                <div className="mt-4 p-4 border rounded-lg">
                                  <h4 className="font-semibold mb-2">Nutritional Information</h4>
                                  {(() => {
                                    const selectedFoodItem = foodItems.find(f => f.id === selectedFood)
                                    return selectedFoodItem ? (
                                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                                        <p>Protein: {selectedFoodItem.protein}g</p>
                                        <p>Carbs: {selectedFoodItem.carbs}g</p>
                                        <p>Fat: {selectedFoodItem.fat}g</p>
                                        <p>Fiber: {selectedFoodItem.fiber}g</p>
                                        <p>Calories: {selectedFoodItem.calories}</p>
                                      </div>
                                    ) : null
                                  })()}
                                </div>
                              )}

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Input
                                  type="number"
                                  placeholder="Quantity"
                                  value={quantity}
                                  onChange={(e) => setQuantity(e.target.value)}
                                />
                                <Select
                                  value={unit}
                                  onValueChange={setUnit}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Unit" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {UNITS.map((u) => (
                                      <SelectItem key={u} value={u}>
                                        {u}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>

                              <Button 
                                className="w-full" 
                                onClick={() => handleAddFoodToMeal(meal.name)}
                              >
                                Add Food Item
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </>
                    )}
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mt-6">
              <Button 
                  onClick={editingPlan ? handleUpdatePlan : handleSave}
                  disabled={isUpdating || isSaving}
                >
                  {isUpdating || isSaving ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      {editingPlan ? 'Updating...' : 'Saving...'}
                    </>
                  ) : (
                    editingPlan ? 'Update Diet Plan' : 'Save Diet Plan'
                  )}
                </Button>
                <Button 
                    variant="outline" 
                    onClick={handleDownload}
                    disabled={isDownloading}
                  >
                    {isDownloading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Downloading...
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4 mr-2" /> Download PDF
                      </>
                    )}
                  </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Saved Diet Plans List */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {dietPlans.map((plan: any) => (
            <div key={plan.id} className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-semibold">{plan.name}</h3>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditPlan(plan)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(plan.id)}
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                Created: {new Date(plan.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>

        {isLoading && (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
        )}
      </div>
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the diet plan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                'Delete'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog open={isNameAlertOpen} onOpenChange={setIsNameAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Missing Information</AlertDialogTitle>
            <AlertDialogDescription>
              Please enter a diet plan name to continue.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setIsNameAlertOpen(false)}>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog open={alertDialogOpen} onOpenChange={setAlertDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{alertDialogContent.title}</AlertDialogTitle>
            <AlertDialogDescription>
              {alertDialogContent.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setAlertDialogOpen(false)}>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}