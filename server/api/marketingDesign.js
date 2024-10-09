import client from "~/server/db"; // Import the connected db client

// In-memory cache object for marketingDesign
let marketingCache = {
  data: null,
  cacheTime: 0, // Timestamp to track when the cache was last set
};

const cacheDuration = 3600 * 1000; // Cache duration in milliseconds (1 hour)

export default defineEventHandler(async (event) => {
  const NUXT_BASE_URL = process.env.NUXT_BASE_URL || "http://localhost"; // Use environment variable for base URL
  const currentTime = Date.now();

  try {
    // Check if data is cached and still valid
    if (
      marketingCache.data &&
      currentTime - marketingCache.cacheTime < cacheDuration
    ) {
      // If cached data exists and is still valid, return it
      return { success: true, data: marketingCache.data };
    }

    // If no valid cache, query the database
    const query = `
      SELECT *
      FROM public."nc_ssxn___Marketing-Design"
      ORDER BY id ASC;
    `;

    const res = await client.query(query);

    // Process the data to return only full URLs
    const processedData = res.rows.map((row) => {
      // Function to extract full URLs
      const extractFullUrls = (items) => {
        if (!items) return [];
        return items.map((item) => `${NUXT_BASE_URL}/${item.path}`);
      };

      // Update all relevant fields and return only full URLs
      return {
        id: row.id,
        Logo: extractFullUrls(JSON.parse(row.Logo)),
        Bannere_Slider_RO_: extractFullUrls(JSON.parse(row.Bannere_Slider_RO_)),
        Bannere_Slider_RU_: extractFullUrls(JSON.parse(row.Bannere_Slider_RU_)),
        Logo_Black: extractFullUrls(JSON.parse(row.Logo_Black)),
        Banner1_RO_: extractFullUrls(JSON.parse(row.Banner1_RO_)),
        Banner2_RO_: extractFullUrls(JSON.parse(row.Banner2_RO_)),
        Banner3_RO_: extractFullUrls(JSON.parse(row.Banner3_RO_)),
        Banner1_RU_: extractFullUrls(JSON.parse(row.Banner1_RU_)),
        Banner2_RU_: extractFullUrls(JSON.parse(row.Banner2_RU_)),
        Banner3_RU_: extractFullUrls(JSON.parse(row.Banner3_RU_)),
      };
    });

    // Cache the result and set the cache time
    marketingCache.data = processedData;
    marketingCache.cacheTime = currentTime;

    // Return the processed data
    return { success: true, data: processedData };
  } catch (error) {
    console.error("Error fetching marketing design data:", error.message);
    console.error("Full error details:", error.stack);

    // Return the error message in the response to help debug
    return {
      success: false,
      error: error.message || "Failed to fetch marketing design data",
    };
  }
});
