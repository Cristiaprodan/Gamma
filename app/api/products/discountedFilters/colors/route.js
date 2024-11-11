import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  try {
    const query = `
      WITH discounted_products AS (
        SELECT DISTINCT p.id, p."nc_pka4___Culori_id"
        FROM "nc_pka4__Produse" p
        WHERE p."Pret_Redus" IS NOT NULL 
        AND CAST(p."Pret_Redus" AS NUMERIC) < CAST(p."Pret_Standard" AS NUMERIC)
        AND p."nc_pka4___Culori_id" IS NOT NULL
      )
      SELECT 
        c.id,
        c."Culoare_RO_",
        c."Culoare_RU_",
        c."Cod_Culoare"
      FROM public."nc_pka4___Culori" c
      INNER JOIN discounted_products dp ON c.id = dp."nc_pka4___Culori_id"
      WHERE c."Cod_Culoare" IS NOT NULL
      GROUP BY c.id, c."Culoare_RO_", c."Culoare_RU_", c."Cod_Culoare"
      ORDER BY c.id;
    `;

    const result = await db.query(query);

    return NextResponse.json({
      success: true,
      colors: result.rows,
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch colors",
      },
      { status: 500 }
    );
  }
}
