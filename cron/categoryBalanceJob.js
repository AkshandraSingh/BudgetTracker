const cron = require('node-cron');
const categoryModel = require('../models/categoryModel');

cron.schedule('0 0 1 * *', async () => { //! After ever one month it reset the categoryAmount
    try {
        const categoriesData = await categoryModel.find();
        for (const category of categoriesData) {
            // Reset categoryAmount to categoryLimit
            category.categoryBalance = category.categoryLimit;
            await category.save();
        }
        console.log('Category amounts reset successfully');
    } catch (error) {
        console.error('Error resetting category amounts:', error);
    }
});

console.log("Category Balance cron job is active")
