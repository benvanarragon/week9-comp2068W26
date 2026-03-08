"use client"; // 1. Must be a client component for state/events

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateSushi() {
  const router = useRouter();

  // 2. Setup simple state for the two fields
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  // 3. Handle the form submission
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      // 4. Send data to your internal API route
      const response = await fetch("/api/sushi/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          price: parseFloat(price),
        }),
      });

      if (response.ok) {
        // 5. Redirect back to the sushi list on success
        router.push("/sushi");
        router.refresh();
      } else {
        alert("Failed to save sushi");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <main>
      <h1>Sushi Details</h1>
      {/*  Attach the submit handler */}
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label htmlFor="sushiname">Sushi Name: *</label>
          <input
            name="sushiname"
            id="sushiname"
            required
            value={name}
            onChange={(e) => setName(e.target.value)} // Update state as user types
          />
        </fieldset>

        <fieldset>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            step="0.01"
            name="price"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)} // Update state as user types
          />
        </fieldset>

        <button type="submit">Save</button>
      </form>
    </main>
  );
}
