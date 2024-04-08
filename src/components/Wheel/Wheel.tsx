import React, { useContext, useEffect } from "react";
import Title from "./Title";
import Link from "./Link/Link";
import { fetchWheel } from "../../../sanity/sanity";
import CompetencyCard from "./Competency/CompetencyCard";
import Pie from "./Pie";
import { CompetenciesContext } from "@/context";
import { CompetencyContextType } from "../../../typings";
import NotFound from "../NotFound";

const Wheel: React.FC<{ slug?: string | null | undefined }> = ({ slug }) => {
  const { isFound, dispatch } = useContext(
    CompetenciesContext
  ) as CompetencyContextType;

  useEffect(() => {
    if (slug) {
      (async () => {
        const initialWheel = await fetchWheel(slug || "");
        if (initialWheel) {
          if (!initialWheel.competencies) {
            initialWheel.competencies = [];
          }

          dispatch({
            type: "setState",
            payload: {
              wheel: initialWheel,
              initialWheel,
              isFound: true,
            },
          });
        } else {
          dispatch({
            type: "setState",
            payload: { isFound: false },
          });
        }
      })();
    } else {
      dispatch({
        type: "setState",
        payload: { isFound: true },
      });
    }
  }, [slug, dispatch]);

  return (
    <section className="flex flex-col gap-8 mx-auto px-4 lg:flex lg:h-screen lg:items-center text-center">
      {!isFound && <NotFound />}
      <Title />
      <Link />
      <div className="grid grid-cols-12 gap-4 grow">
        <CompetencyCard />
        <Pie />
      </div>
    </section>
  );
};

export default Wheel;
