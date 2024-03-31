"use client";
import React, { useEffect, useState } from "react";
import Main from "../../components/Main";
import { fetchWheel } from "@/sanity";
import { WheelType } from "../../../typings";

export default function Page({ params }: { params: { slug: string } }) {
  // const [wheel, setWheel] = useState<WheelType | null>(null);

  useEffect(() => {
    const slug = params?.slug;

    if (slug) {
      (async () => {
        const wheel = await fetchWheel(slug);
        // setWheel(wheel);
        console.log(wheel);
      })();
    }
  }, [params]);

  return (
    <>
      <Main />
    </>
  );
}
