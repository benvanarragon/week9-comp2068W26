import { Sushi } from "../types/sushi";

async function getSushi(): Promise<Sushi[]> {
  // use router to call server api
  const res: Response = await fetch(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/sushi`,
  );
  if (!res.ok) {
    throw new Error("Failed to fetch sushi");
  }

  // response is ok, so convert json to array of Game objects
  const sushi: Sushi[] = await res.json();
  return sushi;
}

//Sushis has to be named something different otherwise there is a conflict with the @types import
export default async function Sushis() {
  // fetch data
  const sushi = await getSushi();

  return (
    <main>
      <h1>Our Sushi</h1>
      <ul>
        {sushi.map((sushi) => (
          <li key={sushi._id} className="card">
            {"Roll: " + sushi.name}
            <br />
            {"Price: $" + sushi.price}
            <hr />
          </li>
        ))}
      </ul>
    </main>
  );
}
