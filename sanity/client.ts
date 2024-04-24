import { createClient } from "next-sanity";
import { CompetencyType, TemplateWithRandomCompetenciesType, WheelType } from "../types/app";
import { apiVersion, projectId, dataset, token } from "./env";

const sanity = createClient({
  apiVersion: apiVersion as string,
  projectId: projectId as string,
  dataset: dataset as string,
  useCdn: false,
  token: token as string,
  ignoreBrowserTokenWarning: true
});

const templatesQuery = `*[_type == "wheel" && template == true]{
  title, slug,
    competencies[]->{title, description, value, improvement}
}`;

export const fetchTemplates = async (): Promise<TemplateWithRandomCompetenciesType[]> => {
  try {
    return await sanity.fetch(templatesQuery);
  } catch (error) {
    console.error("Could not fetch templates", error);
    throw error;
  }
}

export async function fetchWheel(slug: string) {
  try {
    return await sanity.fetch(`*[_type == "wheel" && slug.current == $slug]{
      _id, template, title, slug,
      competencies[]->{_id, title, description, value, improvement}
    }[0]`, { slug });
  } catch (error) {
    console.error("Could not fetch wheel", error);
    throw error;
  }
}

export async function saveWheel(wheel: WheelType) {
  try {
    const response = await sanity.create({
      _type: "wheel",
      title: wheel.title,
      template: false,
      slug: {
        _type: "slug",
        current: wheel.slug.current,
      },
    });

    return await createCompetenciesAndAppendToWheel(wheel, response._id);
  } catch (error) {
    console.error("Could not create document", error);
    throw error;
  }
}

async function createCompetenciesAndAppendToWheel(wheel: WheelType, wheelId: string) {
  try {
    const competencies = await Promise.all(
      wheel.competencies.map(competency =>
        sanity.create({
          _type: "competency",
          title: competency.title,
          description: competency.description,
          value: competency.value,
          improvement: competency.improvement
        })
      )
    );

    const referenceKeys = competencies.map(competency => ({ _type: 'reference', _ref: competency._id }));
    const wheelWithCompetencies = await sanity
      .patch(wheelId)
      .setIfMissing({ competencies: [] })
      .append('competencies', referenceKeys)
      .commit({ autoGenerateArrayKeys: true });

    return wheelWithCompetencies;
  }
  catch (error) {
    console.error("Could not create competencies", error);
    throw error;
  }
}

export async function updateWheel(wheel: WheelType, savedDocument: WheelType | null) {
  try {
    if (savedDocument?._id) {
      await unsetAndDeleteAllReferences(savedDocument);
      await createCompetenciesAndAppendToWheel(wheel, savedDocument._id);

      if (wheel.title !== savedDocument.title || wheel.slug.current !== savedDocument.slug.current) {
        await sanity
          .patch(savedDocument._id)
          .set({
            title: wheel.title,
            slug: {
              _type: "slug",
              current: wheel.slug.current,
            }
          })
          .commit();
      }

    }
  } catch (error) {
    console.error("Could not update document", error);
    throw error;
  }
}

async function unsetAndDeleteAllReferences(wheel: WheelType) {
  try {
    if (wheel._id) {
      await sanity
        .patch(wheel._id)
        .unset(['competencies'])
        .commit();

      const deleteReferencePromises = wheel.competencies.map((competency: CompetencyType) => {
        if (competency._id) {
          return sanity.delete(competency._id);
        }
      });
      await Promise.all(deleteReferencePromises);
    }
  } catch (error) {
    console.error("Could not unset and delete references", error);
    throw error;
  }
}

export async function deleteWheel(slug: string) {
  try {
    const wheel = await sanity.fetch(`*[_type == "wheel" && template != true && slug.current == $slug]{
      _id, title, slug,
      competencies[]->{_id}
    }[0]`, { slug });

    if (!wheel) {
      console.error("Could not find wheel to delete. Possibly it is a template");
      return;
    }

    await unsetAndDeleteAllReferences(wheel);
    await sanity.delete(wheel._id);
  } catch (error) {
    console.error("Could not delete wheel", error);
    throw error;
  }
}