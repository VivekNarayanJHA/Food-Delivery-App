const MenuItem = require('../models/MenuItem');
const Restaurant = require('../models/Restaurant');

// Add a new menu item
const addMenuItem = async (req, res) => {
  const { name, price } = req.body;
  try {
    const restaurant = await Restaurant.findOne({ user: req.user.id });
    if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });

    const menuItem = new MenuItem({ name, price, restaurant: restaurant._id });
    await menuItem.save();

    restaurant.menu.push(menuItem._id);
    await restaurant.save();

    res.status(201).json(menuItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a menu item
const updateMenuItem = async (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;
  try {
    const menuItem = await MenuItem.findByIdAndUpdate(id, { name, price }, { new: true });
    if (!menuItem) return res.status(404).json({ message: 'Menu item not found' });
    res.json(menuItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a menu item
const deleteMenuItem = async (req, res) => {
  const { id } = req.params;
  try {
    const menuItem = await MenuItem.findByIdAndDelete(id);
    if (!menuItem) return res.status(404).json({ message: 'Menu item not found' });

    // Remove menu item from the restaurant's menu
    const restaurant = await Restaurant.findOne({ user: req.user.id });
    restaurant.menu = restaurant.menu.filter(item => item.toString() !== id);
    await restaurant.save();

    res.json({ message: 'Menu item deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all menu items for a restaurant
const getMenu = async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({ user: req.user.id }).populate('menu');
    if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });
    res.json(restaurant.menu);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { addMenuItem, updateMenuItem, deleteMenuItem, getMenu };