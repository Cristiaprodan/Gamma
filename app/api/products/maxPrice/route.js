import { NextResponse } from "next/server";
import db from "@/lib/db";
import { cache } from "@/lib/redis/cache";

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const showBestsellers = url.searchParams.get("bestsellers") === "true";
    const showDiscounted = url.searchParams.get("discounted") === "true";
    const colorId = url.searchParams.get("color");
    const brandId = url.searchParams.get("brand");
    const categoryId = url.searchParams.get("categoryId");
    const subCategoryId = url.searchParams.get("subCategoryId");
    const subSubCategoryId = url.searchParams.get("subSubCategoryId");

    const cacheKey = `max_price:${showBestsellers}:${showDiscounted}:${
      colorId || ""
    }:${brandId || ""}:${categoryId || ""}:${subCategoryId || ""}:${
      subSubCategoryId || ""
    }:${new URLSearchParams(url.searchParams).toString()}`;

    let maxPrice = await cache.get(cacheKey);
    if (maxPrice !== null) {
      return NextResponse.json({
        success: true,
        maxPrice,
      });
    }

    let conditions = [];
    const params = [];

    conditions.push(`"Nume_Produs_RO" IS NOT NULL`);

    if (categoryId) {
      conditions.push(`
        EXISTS (
          SELECT 1 
          FROM "nc_pka4___SubSubCategorii" ssc
          JOIN "nc_pka4___SubCategorii" sc ON ssc."nc_pka4___SubCategorii_id" = sc.id
          JOIN "nc_pka4___Categorii" c ON sc."nc_pka4___Categorii_id" = c.id
          WHERE ssc.id = "nc_pka4___SubSubCategorii_id"
          AND c.id = $${params.length + 1}
        )
      `);
      params.push(categoryId);
    }

    if (subCategoryId) {
      conditions.push(`
        EXISTS (
          SELECT 1 
          FROM "nc_pka4___SubSubCategorii" ssc
          JOIN "nc_pka4___SubCategorii" sc ON ssc."nc_pka4___SubCategorii_id" = sc.id
          WHERE ssc.id = "nc_pka4___SubSubCategorii_id"
          AND sc.id = $${params.length + 1}
        )
      `);
      params.push(subCategoryId);
    }

    if (subSubCategoryId) {
      conditions.push(`"nc_pka4___SubSubCategorii_id" = $${params.length + 1}`);
      params.push(subSubCategoryId);
    }

    if (showBestsellers) {
      conditions.push(`"Bestselling" = true`);
    }

    if (showDiscounted) {
      conditions.push(`
        "Pret_Redus" IS NOT NULL 
        AND CAST("Pret_Redus" AS NUMERIC) < CAST("Pret_Standard" AS NUMERIC)
      `);
    }

    const attributeFilters = {};
    for (const [key, value] of url.searchParams.entries()) {
      if (key.startsWith("attr_") && value !== "all") {
        const attrId = key.replace("attr_", "");
        attributeFilters[attrId] = value;
      }
    }

    Object.entries(attributeFilters).forEach(([attrId, value]) => {
      if (value !== "all") {
        conditions.push(`
          ("nc_pka4__Atribute_id" = $${params.length + 1} 
          AND "Valoare_Atribut" = $${params.length + 2})
        `);
        params.push(parseInt(attrId), value);
      }
    });

    if (colorId) {
      conditions.push(`"nc_pka4___Culori_id" = $${params.length + 1}`);
      params.push(parseInt(colorId));
    }

    if (brandId) {
      conditions.push(`"nc_pka4___Branduri_id" = $${params.length + 1}`);
      params.push(parseInt(brandId));
    }

    const whereClause =
      conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

    const query = `
      SELECT CEIL(MAX(CAST("Pret_Standard" AS NUMERIC))) as max_price
      FROM public."nc_pka4__Produse"
      ${whereClause}
    `;

    const result = await db.query(query, params);
    maxPrice = parseInt(result.rows[0].max_price) || 50000;

    await cache.set(cacheKey, maxPrice, 3600);

    return NextResponse.json({
      success: true,
      maxPrice,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch max price",
      },
      { status: 500 }
    );
  }
}
