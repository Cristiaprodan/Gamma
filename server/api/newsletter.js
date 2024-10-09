// server/api/newsletter.js
import client from "~/server/db"; // Import the connected db client

export default defineEventHandler(async (event) => {
  try {
    // Parse the request body to get the email
    const body = await readBody(event);
    const email = body.email;

    if (!email) {
      return {
        success: false,
        message: "Email is required",
      };
    }

    // Insert email into the database
    const query = `
      INSERT INTO public."nc_ssxn___Emailuri" ("Emailuri")
      VALUES ($1);
    `;
    await client.query(query, [email]);

    return {
      success: true,
      message: "Email added successfully",
    };
  } catch (error) {
    console.error("Error adding email:", error.message);
    console.error("Full error details:", error.stack);

    return {
      success: false,
      error: error.message || "Failed to add email",
    };
  }
});
