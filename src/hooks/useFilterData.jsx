import { useState, useEffect } from "react";

export function useFilterData(data, property, filter) {
  const [values, setValues] = useState([]);

  useEffect(() => {
    if (data && property && filter)
      setValues(data.filter((item) => item[property] === filter));
    else setValues(data);
  }, [property, filter]);

  return values;
}
