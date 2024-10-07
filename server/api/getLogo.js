import api from "~/server/nocodbApi"; // Assuming your NocoDB API is initialized

export default defineEventHandler(async (event) => {
  try {
    const data = await api.dbViewRow.list(
      "noco", // Project name
      "pm6ki25nwijgjda", // Table slug or identifier
      "m1urcj8gi35hvr3", // Another identifier (if needed for filtering)
      "vwkjp1gxgququu7p", // View ID
      {
        offset: 0,
        limit: 10, // Fetch only one row
        where: "",
      }
    );

    // Assuming the field is cvdhh4nrs88ygdx
    return data.list[0]; // Assuming first row contains the logo
  } catch (error) {
    console.error("Error fetching logo from NocoDB:", error);
    throw error;
  }
});
