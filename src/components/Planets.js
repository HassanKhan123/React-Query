import React, { useState } from "react";
import { useQuery } from "react-query";

import Planet from "./Planet";

const fetchPlanets = async (key, page) => {
  const res = await fetch(`http://swapi.dev/api/planets/?page=${page}`);
  return res.json();
};

function Planets() {
  const [page, setPage] = useState(1);
  const { data, status } = useQuery(["planets", page], fetchPlanets, {
    staleTime: 0,
    onSuccess: () => console.log("data fetched"),
  });
  console.log(data);
  return (
    <div>
      <h2>Planets</h2>
      <button onClick={() => setPage(1)}>Page 1</button>
      <button onClick={() => setPage(2)}>Page 2</button>
      <button onClick={() => setPage(3)}>Page 3</button>
      {status === "loading" && <div>Loading data...</div>}
      {status === "success" && (
        <div>
          {data.results.map((planet) => (
            <Planet planet={planet} key={planet.name} />
          ))}
        </div>
      )}
      {status === "error" && <div>Error fetching data</div>}
    </div>
  );
}

export default Planets;
