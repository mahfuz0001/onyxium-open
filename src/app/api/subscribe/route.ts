import { createClient } from "@/utils/supabase/client";

export async function POST(req: Request) {
  const supabase = createClient();

  if (req.method === "POST") {
    let email;
    try {
      const body = await req.json();
      email = body.email;
    } catch (error) {
      // console.error("Error parsing request body:", error);
      return new Response(JSON.stringify({ error: "Invalid request body" }), {
        status: 400,
      });
    }

    if (!email) {
      return new Response(JSON.stringify({ error: "Email is required" }), {
        status: 400,
      });
    }

    // console.log("Email:", email);

    try {
      const { data, error } = await supabase
        .from("newsletter")
        .insert([{ email }])
        .select();

      if (error) {
        // console.error("Supabase error:", error);
        return new Response(JSON.stringify({ error: error.details }), {
          status: 500,
        });
      }

      if (!data || data.length === 0) {
        // console.log("Insert response:", data);
        return new Response(JSON.stringify({ error: "Failed to subscribe" }), {
          status: 400,
        });
      }

      return new Response(
        JSON.stringify({ message: "Subscribed successfully" }),
        { status: 200 },
      );
    } catch (error) {
      // console.error("Unexpected error:", error);
      return new Response(JSON.stringify({ error: "Internal Server Error" }), {
        status: 500,
      });
    }
  } else {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
    });
  }
}
