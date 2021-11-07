import { useState } from "react";
const useFetch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRequest = async (request, method) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(request.url, request.data);
      if (!res.ok) {
        throw new Error("Image Api Error !!");
      }
      const data = await res.json();
      method(data);
      setError(null);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  return { loading, error, fetchRequest };
};

export default useFetch;
