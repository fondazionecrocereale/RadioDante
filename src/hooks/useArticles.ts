"use client";

import { useState, useEffect } from "react";
import { Article, FetchState } from "@/types/article";

const API_URL = process.env.NODE_ENV === "development" 
  ? "http://localhost:8080/api/v1/articles" 
  : "https://dantexxi-api-uega.onrender.com/v1/articles";

export function useArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [state, setState] = useState<FetchState>("initial");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      setState("loading");
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          setState("fail");
          setError(`HTTP error! status: ${response.status}`);
          return;
        }
        const data = await response.json();
        setArticles(data);
        setState("success");
      } catch (err) {
        console.error("Failed to fetch articles:", err);
        setState("error");
        setError(err instanceof Error ? err.message : "Unknown error");
      }
    };

    fetchArticles();
  }, []);

  return { articles, state, error };
}
