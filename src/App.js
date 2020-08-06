import React, { useState } from "react";
import "./tailwind.output.css";
import useSWR from "swr";

import Record from "./Record";

const fetcher = (url) => fetch(url).then((r) => r.json());

function App() {
  const [state, setState] = useState({
    rating: null,
    year: null,
  });

  const { data, error } = useSWR("/.netlify/functions/node-fetch", fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <section className="container mx-auto">
      <label>
        Rating
        <input
          type="number"
          onChange={(e) => setState({ ...state, rating: e.target.value })}
        />
      </label>
      <label>
        Year
        <input
          type="number"
          onChange={(e) => setState({ ...state, year: e.target.value })}
        />
      </label>
      {data.records.map((r) => (
        <Record data={r} state={state} />
      ))}
    </section>
  );
}

export default App;
