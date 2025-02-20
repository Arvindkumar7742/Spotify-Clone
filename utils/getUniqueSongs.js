export function reduceUniqueSongs(songs) {
  const uniqueIds = [];
  const uniqueSongs = [];

  for (const song of songs) {
    if (!uniqueIds.includes(song.track.id)) {
      uniqueIds.push(song.track.id);
      uniqueSongs.push(song);
    }
  }

  return uniqueSongs;
}
