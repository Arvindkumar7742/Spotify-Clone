export function getCombinedList(
  playlists,
  artists,
  activeCategory,
  langJsonData
) {
  let combinedList;
  if (activeCategory === langJsonData["all"]) {
    combinedList = [...playlists, ...artists];
    for (let i = combinedList.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [combinedList[i], combinedList[j]] = [combinedList[j], combinedList[i]];
    }
    return combinedList;
  } else if (activeCategory === langJsonData["artists"]) {
    combinedList = artists;
  } else {
    combinedList = playlists;
  }
  return combinedList;
}
