import api from "~/server/nocodbApi"; // Assuming your NocoDB API is already set up in a file like 'api/nocodb.js'

export default defineEventHandler(async (event) => {
  try {
    const data = await api.dbViewRow.list(
      "noco", // Project name
      "pvszw82hcq9rw12", // Table identifier
      "mbhi4szeqmjouqo", // View identifier
      "vwtl4d2zhrpvowab", // Another specific identifier (if necessary)
      {
        offset: 0,
        limit: 100, // Fetch up to 100 categories
        where: "", // Adjust filters here if needed
      }
    );

    // Map through the data and return only the relevant fields
    const categories = data.list.map((category) => ({
      id: category.id, // Assuming each category has an 'id'
      nameRo: category["Nume Categorie"], // Romanian name
      nameRu: category["Название категории"], // Russian name
      icon: category["Icons"], // Icon name
    }));

    // Return the mapped list of categories
    return categories;
  } catch (error) {
    console.error("Error fetching categories from NocoDB:", error);
    throw error;
  }
});
