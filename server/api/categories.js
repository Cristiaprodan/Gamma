// server/api/categories.js
import client from "~/server/db"; // Import the connected db client

// In-memory cache object
let cache = {
  categories: null,
  cacheTime: 0, // Timestamp to track when the cache was last set
};

const cacheDuration = 3600 * 1000; // Cache duration in milliseconds (1 hour)

export default defineEventHandler(async (event) => {
  const currentTime = Date.now();

  try {
    // Check if data is cached and still valid
    if (cache.categories && currentTime - cache.cacheTime < cacheDuration) {
      // If cached data exists and is still valid, return it
      return { success: true, data: cache.categories };
    }

    // If no valid cache, query the database
    const query = `
      SELECT *
      FROM public."nc_pka4___Categorii"
      ORDER BY id ASC;
    `;

    const res = await client.query(query);

    // Cache the result and set the cache time
    cache.categories = res.rows;
    cache.cacheTime = currentTime;

    // Return the fresh data
    return { success: true, data: res.rows };
  } catch (error) {
    console.error("Error fetching categories:", error.message);
    console.error("Full error details:", error.stack);

    // Return the error message in the response to help debug
    return {
      success: false,
      error: error.message || "Failed to fetch categories",
    };
  }
});
