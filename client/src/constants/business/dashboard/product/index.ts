export const productCategories: { value: string, label: string, description: string; }[] = [
	{ value: "appetizer", label: "Appetizer", description: "Soups, salads, and starters" },
	{ value: "main_course", label: "Main Course", description: "Main dishes like pasta, steak, or curry" },
	{ value: "dessert", label: "Dessert", description: "Sweet dishes like cakes or ice cream" },
	{ value: "beverage", label: "Beverage", description: "Drinks like coffee, tea, or smoothies" },
	{ value: "side_dish", label: "Side Dish", description: "Small additions like fries or bread" },
	{ value: "combo_meal", label: "Combo Meal", description: "Meals bundled together, e.g., burger with fries" },
	{ value: "kids_menu", label: "Kids’ Menu", description: "Smaller portions suitable for children" },
	{ value: "breakfast", label: "Breakfast", description: "Morning dishes like pancakes or omelets" },
	{ value: "lunch_special", label: "Lunch Special", description: "Special dishes served during lunch hours" },
	{ value: "dinner", label: "Dinner", description: "Evening dining entrees" },
	{ value: "seasonal", label: "Seasonal", description: "Available only during specific times of the year" },
	{ value: "specialty", label: "Specialty", description: "Unique dishes like chef’s specials or local cuisine" },
];

export const productDietaryInformation = [
	{ value: "vegan", label: "Vegan" },
	{ value: "vegetarian", label: "Vegetarian" },
	{ value: "pescatarian", label: "Pescatarian" },
	{ value: "gluten_free", label: "Gluten-Free" },
	{ value: "dairy_free", label: "Dairy-Free" },
	{ value: "nut_free", label: "Nut-Free" },
	{ value: "halal", label: "Halal" },
	{ value: "kosher", label: "Kosher" },
	{ value: "low_carb", label: "Low-Carb" },
	{ value: "low_sodium", label: "Low-Sodium" },
	{ value: "keto_friendly", label: "Keto-Friendly" },
	{ value: "paleo_friendly", label: "Paleo-Friendly" },
];

export const productServingOptions = [
	{ value: "dine_in", label: "Dine-In" },
	{ value: "takeout", label: "Takeout" },
	{ value: "delivery", label: "Delivery" },
	{ value: "catering", label: "Catering" },
	{ value: "buffet", label: "Buffet" },
	{ value: "drive_through", label: "Drive-Through" },
];

export const productPreparationTimes = [
	{ value: 5, label: "5 minutes", description: "Quick ready-to-eat items" },
	{ value: 10, label: "10 minutes", description: "Moderate preparation time" },
	{ value: 15, label: "15 minutes", description: "Standard preparation time" },
	{ value: 20, label: "20 minutes", description: "Requires more cooking effort" },
	{ value: 30, label: "30+ minutes", description: "Slow-cooked meals" },
];

export const productAvailability = {
	timesOfDay: [
		{ value: "breakfast", label: "Breakfast" },
		{ value: "brunch", label: "Brunch" },
		{ value: "lunch", label: "Lunch" },
		{ value: "dinner", label: "Dinner" },
		{ value: "late_night", label: "Late Night" },
	],
	daysOfWeek: [
		{ value: "monday", label: "Monday" },
		{ value: "tuesday", label: "Tuesday" },
		{ value: "wednesday", label: "Wednesday" },
		{ value: "thursday", label: "Thursday" },
		{ value: "friday", label: "Friday" },
		{ value: "saturday", label: "Saturday" },
		{ value: "sunday", label: "Sunday" },
	],
	seasonal: [
		{ value: "summer", label: "Summer Menu" },
		{ value: "winter", label: "Winter Menu" },
		{ value: "holiday", label: "Holiday Specials" },
	],
};

export const productIngredients = [
	"Chicken", "Beef", "Tofu", "Vegetables", "Tomato Sauce", "Soy Sauce",
	"BBQ Sauce", "Cheese", "Bacon", "Mushrooms",
];

export const productSpicinessLevels = [
	{ value: "none", label: "Not Spicy" },
	{ value: "mild", label: "Mild" },
	{ value: "medium", label: "Medium" },
	{ value: "spicy", label: "Spicy" },
	{ value: "extra_spicy", label: "Extra Spicy" },
];

export const productAllergens = [
	"Dairy", "Eggs", "Fish", "Gluten", "Peanuts", "Shellfish", "Soy",
	"Tree Nuts", "Wheat", "Sesame",
];

export const productPackagingOptions = [
	{ value: "eco_friendly", label: "Eco-Friendly", description: "Biodegradable or compostable materials" },
	{ value: "standard", label: "Standard", description: "Plastic or paper containers" },
	{ value: "premium", label: "Premium Packaging", description: "Reusable or higher quality" },
	{ value: "tamper_proof", label: "Tamper-Proof", description: "Secure packaging for delivery" },
];

export const productProductTags = [
	"Signature Dish", "Chef’s Special", "Seasonal", "Limited Edition",
	"Crowd Favorite", "Healthy Choice", "Kid-Friendly", "Local Cuisine",
	"Organic", "Quick Snack", "New Item", "Bestseller",
];

export const productPriceVariations = {
	sizes: ["Small", "Medium", "Large", "Family Size"],
	addOns: ["Extra Cheese", "Double Meat", "Side Salad", "Extra Sauce"],
};

export const productNutritionExample = {
	calories: "250 kcal",
	protein: "10g",
	carbs: "30g",
	fat: "5g",
	sugar: "12g",
};

export const productStockOptions = [
	{ value: "unlimited", label: "Unlimited", description: "Always available" },
	{ value: "specific", label: "Specific Stock", description: "Set a specific quantity" },
	{ value: "out_of_stock", label: "Out of Stock", description: "Currently unavailable" },
];

export const productComboOptions = [
	{ value: "combo_meal", label: "Combo Meal", description: "Pre-defined combos like burger + fries + drink" },
	{ value: "add_ons", label: "Add-Ons", description: "Optional extras like bacon, fries, or drinks" },
];