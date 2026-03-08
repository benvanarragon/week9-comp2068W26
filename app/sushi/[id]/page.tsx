import { Sushi } from "../../types/sushi";

// call route which calls api to fetch game data
async function getSushi(id: string): Promise<Sushi> {
  const res: Response = await fetch(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/sushi/${id}`,
  );
  if (!res.ok) {
    throw new Error("Could not fetch sushi");
  }
  return res.json();
}

export default async function SushiDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // try to fetch sushi before rendering output
  const { id } = await params;

  try {
    const sushi = await getSushi(id);

    return (
      <main>
        <h1>Sushi Details</h1>
        <article className="card">
          <h3>{sushi.name}</h3>
          <p>{sushi.price}</p>
        </article>
      </main>
    );
  } catch (Error) {
    return (
      <main>
        <h1>Sushi Not Found</h1>
      </main>
    );
  }
}
