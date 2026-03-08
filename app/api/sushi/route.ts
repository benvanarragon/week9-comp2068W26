// file used to make api calls to server at /api/v1/games (GET and POST)
export async function GET() {
  // make get req to fetch all games from express api
  const res: Response = await fetch("http://localhost:4000/api/v1/games");
  return Response.json(await res.json());
}
