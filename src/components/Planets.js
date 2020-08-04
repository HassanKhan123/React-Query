import React, { useState } from "react";
import { usePaginatedQuery } from "react-query";

import Planet from "./Planet";

const fetchPlanets = async (key, page) => {
  const res = await fetch(`http://swapi.dev/api/planets/?page=${page}`);
  return res.json();
};

function Planets() {
  const [page, setPage] = useState(1);
  const { resolvedData, latestData, status } = usePaginatedQuery(
    ["planets", page],
    fetchPlanets,
    {
      staleTime: 0,
      onSuccess: () => console.log("data fetched"),
    }
  );
  return (
    <div>
      <h2>Planets</h2>
      {status === "loading" && <div>Loading data...</div>}
      {status === "success" && (
        <>
          <button
            onClick={() => setPage((old) => Math.max(old - 1, 1))}
            disabled={page === 1}
          >
            Previous Page
          </button>
          <span>{page}</span>
          <button
            onClick={() =>
              setPage((old) =>
                !latestData || !latestData.next ? old : old + 1
              )
            }
            disabled={!latestData || !latestData.next}
          >
            Next Page Page
          </button>
          <div>
            {resolvedData.results.map((planet) => (
              <Planet planet={planet} key={planet.name} />
            ))}
          </div>
        </>
      )}
      {status === "error" && <div>Error fetching data</div>}
    </div>
  );
}

export default Planets;
