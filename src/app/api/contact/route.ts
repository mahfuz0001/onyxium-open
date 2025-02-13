import { createClient } from "@/utils/supabase/client";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const supabase = createClient();

  if (req.method === "POST") {
    let formData;
    try {
      const body = await req.json();
      formData = body.formData;
      // console.log("Form data:", formData);
    } catch (error) {
      // console.error("Error parsing request body:", error);
      return new Response(JSON.stringify({ error: "Invalid request body" }), {
        status: 400,
      });
    }

    if (!formData) {
      return new Response(JSON.stringify({ error: "Invalid request body" }), {
        status: 400,
      });
    }

    // console.log("Data:", formData);

    try {
      const { data, error } = await supabase
        .from("contact")
        .insert([{ ...formData }]);

      if (error) {
        // console.error("Error:", error);
        return new Response(JSON.stringify({ error: error.details }), {
          status: 500,
        });
      }

      return new Response(JSON.stringify({ data }), { status: 200 });
    } catch (error) {
      // console.error("Error:", error);
      return new Response(JSON.stringify({ error: "Internal server error" }), {
        status: 500,
      });
    }
  }

  return new Response(null, { status: 405 });
}
