import api from "~/server/nocodbApi";

export default defineEventHandler(async (event) => {
  try {
    const data = await api.dbViewRow.list(
      "noco",
      "pm6ki25nwijgjda",
      "m1urcj8gi35hvr3",
      "vwkjp1gxgququu7p",
      {
        offset: 0,
        limit: 2,
        where: "",
      }
    );

    if (!data.list || data.list.length === 0) {
      throw new Error("No data found in the response");
    }

    const logo = data.list[0].column1; // Assuming 'column1' is the first column
    const blackLogo = data.list[0].column2; // Assuming 'column2' is the second column

    return { logo, blackLogo }; // Ensure both are returned
  } catch (error) {
    console.error("Error fetching logo from NocoDB:", error);
    throw error;
  }
});
