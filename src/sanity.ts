import { createClient } from "next-sanity";
import { WheelType } from "../typings";

const config = {
  apiVersion: "2022-03-07",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID as string,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET as string,
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_API_TOKEN as string,
  ignoreBrowserTokenWarning: true
};
const sanity = createClient(config);

const templatesQuery = `*[_type == "wheel" && template == true]{
  title, slug,
    competencies[]->{_key, title, description, value}
}`;

export async function fetchTemplates() {
  try {
    return await sanity.fetch(templatesQuery);
  } catch (error) {
    console.error("Could not fetch templates", error);
  }
}

export async function fetchWheel(slug: string) {
  try {
    return await sanity.fetch(`*[_type == "wheel" && slug.current == $slug]{
      title, slug,
      competencies[]->{_key, title, description, value}
    }[0]`, { slug });
  } catch (error) {
    console.error("Could not fetch wheel", error);
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

    const competencies = await Promise.all(
      wheel.competencies.map(competency =>
        sanity.create({
          _type: "competency",
          title: competency.title,
          description: competency.description,
          value: competency.value,
        })
      )
    );

    const refKeys = competencies.map(competency => ({ _type: 'reference', _ref: competency._id }));

    const wheelWithCompetencies = await sanity
      .patch(response._id)
      .setIfMissing({ competencies: [] })
      .append('competencies', refKeys)
      .commit({ autoGenerateArrayKeys: true });

    return wheelWithCompetencies;

  } catch (error) {
    console.error("Could not create document", error);
  }
}

export async function deleteWheel(slug: string) {
  try {
    const wheel = await sanity.fetch(`*[_type == "wheel" && template != true && slug.current == $slug]{
      _id,
      competencies[]->{_id}
    }[0]`, { slug });

    if (!wheel) {
      console.error("Could not find wheel to delete. Possibly it is a template");
      return;
    }

    await sanity
      .patch(wheel._id)
      .unset(['competencies'])
      .commit();
    const deleteReferencePromises = wheel.competencies.map((competency: { _id: string; }) => sanity.delete(competency._id));
    await Promise.all(deleteReferencePromises);

    await sanity.delete(wheel._id);
  } catch (error) {
    console.error("Could not delete wheel", error);
  }
}