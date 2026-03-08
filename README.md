`npm install degit`

`degit https://github.com/benvanarragon/week8-comp2068W26`

`npm install`

====================
LAB 04 = SOLUTION
====================

`/auth/register/page.tsx`

```tsx
"use client";

import { useState } from "react";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log({ name, email, password });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto mt-10 p-6 border rounded"
    >
      <h2 className="text-xl font-bold mb-4">Register</h2>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full mb-3 p-2 border rounded"
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mb-3 p-2 border rounded"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
      />

      <button className="w-full bg-blue-600 text-white p-2 rounded">
        Register
      </button>
    </form>
  );
}
```

`/auth/login/page.tsx`

```tsx
"use client";

import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto mt-10 p-6 border rounded"
    >
      <h2 className="text-xl font-bold mb-4">Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mb-3 p-2 border rounded"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
      />

      <button className="w-full bg-green-600 text-white p-2 rounded">
        Login
      </button>
    </form>
  );
}
```

ADD THE FOLLOWING TWO SECTIONS TO THE `/components/navbar.tsx`

```tsx
<li>
          <Link href="/auth/register" className="hover:text-gray-300">
            Register
          </Link>
        </li>
        <li>
          <Link href="/auth/login" className="hover:text-gray-300">
            Login
          </Link>
        </li>
```

==========================
END OF LAB 04
==========================

App Demo

· Let’s continue with our first react app, now completed from Lab w/all components as an SPA

· We’re going to incorporate some props and array mapping

Using Props

· We’re going to try using a React prop to pass a value to a component, which can then display this value

· On our About page, we want to show sushi restaurants in a set of cards. We can create a resusable card component, then pass different data to each instance.

· Each card shares the same structure but displays unique data

· With props we can pass 1 or more values to a child component.

· In React, the props functions like our input params in .net. We can either display a prop value directly or use to it to do some other function (like query a datasource)

· We’ll build a simple resturant child component, then inject a series of these into our About page

· Create components/restaurant.tsx then add to about/page.tsx:

=======================

`components/restaurant.tsx`

```tsx
// define Restaurant type
type RestaurantProps = {
  name: string;
  yearFounded: number;
};

// props act as input params whenver this component is rendered
export default function Restaurant({ name, yearFounded }: RestaurantProps) {
  return (
    <article className="card">
      <h3>{name}</h3>
      <p>Founded: {yearFounded}</p>
    </article>
  );
}
```

=======================

`about/page.tsx`

```jsx
import Restaurant from "../components/restaurant";

<section>
  <h2>Sushi Restaurants</h2>
  <Restaurant name="Sushi Chef" yearFounded={2000} />
  <Restaurant name="Diamond Sushi" yearFounded={1999} />
  <Restaurant name="SushiTime" yearFounded={2013} />
</section>;
```

==================
Now we can add styles from LMS, then apply a className="card" to <article> element of Member fn JSX

`global.css`

==================

```css
h2 {
  font-weight: bold;
  margin-bottom: 5px;
  font-size: x-large;
}

h3 {
  font-weight: bold;
  margin-bottom: 5px;
  font-size: large;
}

.card {
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  max-width: 24rem;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -4px rgba(0, 0, 0, 0.1);
  background-color: #332f2f;
  margin: 1rem;
}
```

==============================

Using the Fetch API + array.map()

· The Fetch API is widely used in JS dev – it lets us make HTTP GET / POST calls to external sites, usually APIs so we can include external data

· Let’s run our API on 4000 then try using fetch to make a GET call, convert all the JSON to JSX, then render to browser

· We want to separate the API calls from the data structure from the front-end page components, so we’ll use an MVC style structure

==============================

Change PORT TO 4000 in our API app

=====

`app/types/sushi.ts`

```ts
export interface Sushi {
  _id: string;
  name: string;
  price: number;
}
```

`/app/api/sushi/route.ts`

```ts
// file used to make api calls to server at /api/sushi (GET and POST)
export async function GET() {
  // make get req to fetch all games from express api
  const res: Response = await fetch("http://localhost:4000/api/sushi");
  return Response.json(await res.json());
}
```

`/app/sushi/page.tsx`

```tsx
import { Sushi } from "../types/sushi";

async function getSushi(): Promise<Sushi[]> {
  // use router to call server api
  const res: Response = await fetch("http://localhost:3000/api/sushi");
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
          <li key={sushi._id}>
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
```

## Lesson 8 Notes: Props, Fetch, Array.map()

We've used props to pass values between the About parent and Publisher child components.

Games are now retried from the server API using fetch().

================

CREATE `.env.local` in the ROOT of the next.js project

ADD THE FOLLOWING VARS

`NEXT_PUBLIC_SERVER_URL=http://localhost:4000`
`NEXT_PUBLIC_CLIENT_URL=http://localhost:3000`

THEN IN `app/sushi/page.tsx` replace

```tsx
const res: Response = await fetch(
  `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/sushi`,
);
```

AND IN `app/api/sushi/route.ts` replace

```ts
const res: Response = await fetch(
  `${process.env.NEXT_PUBLIC_SERVER_URL}/api/sushi`,
);
```

==================

RESTART YOUR SERVER, .ENV VARS WILL RELOAD

=================

INSIDE OF `/sushi/page.tsx`

add the className="card" to the <li> element

```tsx
<li key={sushi._id} className="card">
  {"Roll: " + sushi.name}
  <br />
  {"Price: $" + sushi.price}
  <hr />
</li>
```

=================
ADD GET ROUTES FOR SUSHI BY ID

=================
We want to click a card post title and load the full document on a new page, passing the post id as part of the url

· Next allows us to define a dynamic URL section / parameter using [id]

· We’ll create a separate route for /games/[id] for GET (one), PUT, DELETE,

· First we need a GET one method in server API

· Create [id] folder under `api/sushi/[id]`/, then route.ts inside

```ts
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
```

then weneed a page to display the fetch under `/sushi/[id]/page.tsx`

```tsx
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
```

NOW ADD A BUTTON FROM MAIN SUSHI PAGE TO VIEW EACH BY ID

=======================

```tsx
import Link from "next/link";

...

<h3>{"Roll: " + sushi.name}</h3>
            <br />
            <Link href={`/sushi/${sushi._id}`}>
              <button>View Details</button>
            </Link>
```

================

COMMIT HERE

============
