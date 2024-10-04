import api from "~/server/nocodbApi";

const Linkedfild = "cdxo0a7c2bhq3i7";

function getSubCategoryData(recordId) {
  if (!recordId) {
    console.error("recordId is not defined");
    return Promise.reject(new Error("recordId is not defined"));
  }

  return api
    .get(
      `/api/v2/tables/mbhi4szeqmjouqo/links/${Linkedfild}/records/${recordId}`
    )
    .then(function (data) {
      console.log(data);
      return data; // Return data to be used by the caller
    })
    .catch(function (error) {
      console.error("Error fetching subcategories:", error);
      throw error;
    });
}

export default getSubCategoryData;
