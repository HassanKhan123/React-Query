import React, { useState } from "react";
import { usePaginatedQuery } from "react-query";

import Person from "./Person";

const fetchPeople = async (key, page) => {
  const res = await fetch(`http://swapi.dev/api/people/?page=${page}`);
  return res.json();
};

function People() {
  const [page, setPage] = useState(1);
  const { resolvedData, latestData, status } = usePaginatedQuery(
    ["people", page],
    fetchPeople,
    {
      staleTime: 0,
      onSuccess: () => console.log("data fetched"),
    }
  );
  return (
    <div>
      <h2>People</h2>
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
            {resolvedData.results.map((person) => (
              <Person person={person} key={person.name} />
            ))}
          </div>
        </>
      )}
      {status === "error" && <div>Error fetching data</div>}
    </div>
  );
}

export default People;
