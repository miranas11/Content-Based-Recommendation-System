const getWeek = (date) => {
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - startOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7);
};

const selectRandomItems = (array, numItems) => {
    const selectedItems = new Set();
    const maxItems = Math.min(numItems, array.length);

    while (selectedItems.size < maxItems) {
        const randomIndex = Math.floor(Math.random() * array.length);
        selectedItems.add(array[randomIndex]);
    }

    return Array.from(selectedItems);
};

module.exports = { getWeek, selectRandomItems };
