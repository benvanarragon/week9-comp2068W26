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
// file used to make api calls to server at /api/v1/games (GET and POST)
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
  const res: Response = await fetch("http://localhost:4000/api/sushi");
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
