import { useEffect, useState } from 'react';
import { createClient, SanityClient } from "next-sanity";

export default function useSanityClient(): SanityClient | null {
  const [client, setClient] = useState<SanityClient | null>(null);

  useEffect(() => {
    setClient(createClient({
      apiVersion: "2024-03-27",
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID as string,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET as string,
      useCdn: true,
    }));
  }, []);

  return client;
}