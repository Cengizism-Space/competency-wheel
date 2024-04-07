import { useState, useEffect, useContext } from 'react';
import { fetchWheel } from '../../sanity/sanity';
import { CompetenciesContext } from '@/context';
import { CompetencyContextType } from '../../typings';

const useFetchWheel = (slug: string | null | undefined) => {
  const { dispatch } = useContext(CompetenciesContext) as CompetencyContextType;

  useEffect(() => {
    if (slug) {
      (async () => {
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
              isFound: true
            },
          });
        } else {
          dispatch({
            type: "setState",
            payload: { isFound: false },
          })
        }
      })();
    }
  }, [slug, dispatch]);
};

export default useFetchWheel;