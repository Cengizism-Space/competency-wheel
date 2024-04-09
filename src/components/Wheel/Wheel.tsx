import React, { useContext, useEffect, useState } from "react";
import Title from "./Title";
import Link from "./Link/Link";
import { fetchWheel } from "../../../sanity/sanity";
import CompetencyCard from "./Competency/CompetencyCard";
import Pie from "./Pie";
import { CompetenciesContext } from "@/context";
import { CompetencyContextType } from "../../../typings";
import Announcer from "../Commons/Announcer";

const fetchAndDispatchWheel = async (slug: string, dispatch: Function) => {
  const initialWheel = await fetchWheel(slug);
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
};

const Wheel: React.FC<{ slug?: string | null | undefined }> = ({ slug }) => {
  const { isFound, dispatch } = useContext(
    CompetenciesContext
  ) as CompetencyContextType;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch({
      type: "setState",
      payload: { isFound: slug ? false : true },
    });

    if (slug) {
      fetchAndDispatchWheel(slug, dispatch);
    }

    setIsLoading(false);
  }, [slug, dispatch]);

  return (
    <>
      {isLoading && <Announcer>Loading the wheel..</Announcer>}
      {!isLoading && !isFound && (
        <Announcer>
          Wheel not found!{" "}
          <a href="/" className="hover:text-slate-900">
            Create a new wheel
          </a>
        </Announcer>
      )}
      <section className="flex flex-col gap-8 mx-auto px-4 lg:flex lg:h-screen lg:items-center text-center">
        <Title />
        <Link />
        <div className="grid grid-cols-12 gap-4 grow">
          <CompetencyCard />
          <Pie />
        </div>
      </section>
    </>
  );
};

export default Wheel;
