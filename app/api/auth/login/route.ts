import { NextResponse } from "next/server";
import { withErrorHandler } from "@/lib/error/api-wrapper";
import { loginSchema } from "@/lib/validator/login";

export const POST = withErrorHandler(async (req: Request) => {
  const body = await req.json();

  const validationResult = loginSchema.safeParse(body);

  if (!validationResult.success) {
    return NextResponse.json(
      {
        message: "Validation failed",
        errors: validationResult.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  const { phone } = validationResult.data;

  return NextResponse.json(
     { success: true, 
        message: "Login successful", 
        data: {
            "phone":phone

     }},
    { status: 200 }
  );
});

