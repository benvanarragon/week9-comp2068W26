// GET: /api/sushi/:id => fetch single sushi
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  // read id from url params
  const { id } = await params;

  // call get with id on server api
  const res: Response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/sushi/${id}`,
  );

  // error handle
  if (!res.ok) throw new Error("Failed to fetch sushi");

  // return game in json
  return Response.json(await res.json());
}
