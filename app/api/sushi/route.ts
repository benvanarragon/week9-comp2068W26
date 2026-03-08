// file used to make api calls to server at /api/v1/games (GET and POST)
export async function GET() {
  // make get req to fetch all games from express api
  const res: Response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/sushi`,
  );
  return Response.json(await res.json());
}
