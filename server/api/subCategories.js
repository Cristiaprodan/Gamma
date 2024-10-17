import pool from '~/server/db';

let cache = {
  subcategories: {},
  cacheTime: 0,
};

const cacheDuration = 3600 * 1000;

export default defineEventHandler(async (event) => {
  const { categoryId } = getQuery(event);
  const currentTime = Date.now();

  if (!categoryId) {
    return {
      success: false,
      error: 'Category ID is required',
    };
  }

  try {
    if (
      cache.subcategories[categoryId] &&
      currentTime - cache.cacheTime < cacheDuration
    ) {
      return { success: true, data: cache.subcategories[categoryId] };
    }

    const subcategoriesQuery = `
      SELECT id, "Nume_SubCategorie_RO", "Nume__SubCategorie_RU", "nc_pka4___Categorii_id", "Images"
      FROM public."nc_pka4___SubCategorii"
      WHERE "nc_pka4___Categorii_id" = $1
      ORDER BY id ASC;
    `;

    const subcategoriesRes = await pool.query(subcategoriesQuery, [categoryId]);
    const subcategories = subcategoriesRes.rows;

    const subcategoryIds = subcategories.map((sub) => sub.id);

    const subSubcategoriesQuery = `
      SELECT id, "Nume_SubSubCategorie_RO", "Nume_SubSubCategorie_RU", "nc_pka4___SubCategorii_id"
      FROM public."nc_pka4___SubSubCategorii"
      WHERE "nc_pka4___SubCategorii_id" = ANY($1::int[])
      ORDER BY id ASC;
    `;

    const subSubcategoriesRes = await pool.query(subSubcategoriesQuery, [
      subcategoryIds,
    ]);
    const subSubcategories = subSubcategoriesRes.rows;

    const baseUrl = process.env.NUXT_BASE_URL;

    const formattedData = subcategories.map((subcategory) => {
      const filteredSubSubcategories = subSubcategories.filter(
        (subSub) => subSub.nc_pka4___SubCategorii_id === subcategory.id
      );

      let images = [];
      if (subcategory.Images) {
        try {
          const parsedImages = JSON.parse(subcategory.Images);
          images = parsedImages.map((img) => `${baseUrl}/${img.path}`);
        } catch (e) {
          console.error(
            'Failed to parse images for subcategory ID',
            subcategory.id
          );
        }
      }

      return {
        id: subcategory.id,
        subcategory_name_ro: subcategory.Nume_SubCategorie_RO,
        subcategory_name_ru: subcategory.Nume__SubCategorie_RU,
        images,
        subSubcategories: filteredSubSubcategories.map((subSub) => ({
          id: subSub.id,
          subsub_name_ro: subSub.Nume_SubSubCategorie_RO,
          subsub_name_ru: subSub.Nume_SubSubCategorie_RU,
        })),
      };
    });

    cache.subcategories[categoryId] = formattedData;
    cache.cacheTime = currentTime;

    return { success: true, data: formattedData };
  } catch (error) {
    console.error(
      'Error fetching subcategories and sub-subcategories:',
      error.message
    );
    console.error('Full error details:', error.stack);

    return {
      success: false,
      error:
        error.message || 'Failed to fetch subcategories and sub-subcategories',
    };
  }
});
