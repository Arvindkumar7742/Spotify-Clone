import axios from "axios";

export async function getLanguageJsonData(lang) {
  try {
    const response = await axios.get(
      `https://arvindkumar7742.github.io/translation-json/${lang}.json`
    );

    if (!response.data) {
      throw new Error("Unexpected response format");
    }

    return response.data;
  } catch (err) {
    throw new Error("Error in fetching language result.");
  }
}
