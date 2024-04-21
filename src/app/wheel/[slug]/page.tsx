import React from "react";
import App from "../../../components/App";

export default function Page({ params }: { params?: { slug?: string } }) {
  const slug = params?.slug;

  return <App slug={slug} />;
}
