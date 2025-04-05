import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";

export default function History() {
  const [searchHistory] = useAtom(searchHistoryAtom); // Get searchHistory from atom
  const [parsedHistory, setParsedHistory] = useState([]);

  useEffect(() => {
    if (searchHistory && Array.isArray(searchHistory)) {
      // Initialize parsedHistory if searchHistory is an array
      const parsed = [];
      searchHistory.forEach((h) => {
        let params = new URLSearchParams(h);
        let entries = params.entries();
        parsed.push(Object.fromEntries(entries));
      });
      setParsedHistory(parsed);
    }
  }, [searchHistory]);

  return (
    <div>
      <h1>Search History</h1>
      {parsedHistory.length > 0 ? (
        <ul>
          {parsedHistory.map((entry, index) => (
            <li key={index}>
              {Object.entries(entry).map(([key, value]) => (
                <div key={key}>
                  <strong>{key}:</strong> {value}
                </div>
              ))}
            </li>
          ))}
        </ul>
      ) : (
        <p>No search history found.</p>
      )}
    </div>
  );
}
