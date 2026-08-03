import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

type ApiHandler = (req: Request) => Promise<NextResponse>;

export function withErrorHandler(handler: ApiHandler): ApiHandler {
  return async (req: Request) => {
    try {
      return await handler(req);
    } catch (error: unknown) {
     
      if (error instanceof ZodError) {
        return NextResponse.json(
          {
            success: false,
            message: 'Validation failed',
            errors: error.flatten().fieldErrors,
          },
          { status: 400 }
        );
      }

    

      // 3. Handle Generic Custom Errors
      if (error instanceof Error) {
        return NextResponse.json(
          {
            success: false,
            message: error.message,
          },
          { status: 400 }
        );
      }

      // 4. Catch-all for unexpected Server Errors
      console.error('Unhandled Internal Server Error:', error);
      return NextResponse.json(
        {
          success: false,
          message: 'Internal server error',
        },
        { status: 500 }
      );
    }
  };
}