/** Verified Unsplash image URLs — all return HTTP 200 */
export const unsplash = (id, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=85`

export const images = {
  hero: unsplash('1517248135467-4c7edcad34c4', 1920),
  about: unsplash('1600891964092-4316c288032e', 1920),

  projects: {
    tastingRoom: unsplash('1414235077428-338989a2e8c0', 1920),
    privateCellar: unsplash('1559339352-11d035aa65de', 1920),
    chefsCounter: unsplash('1600891964092-4316c288032e', 1920),
    midnightBar: unsplash('1517248135467-4c7edcad34c4', 1920),
    gardenTerrace: unsplash('1552566626-52f8b828add9', 1920),
  },

  gallery: {
    salon: unsplash('1544025162-d76694265947', 1920),
    firstCourse: unsplash('1546069901-ba9599a7e63c', 1200),
    composedPlates: unsplash('1565299624946-b28f40a0ae38', 1200),
    cellarLight: unsplash('1559339352-11d035aa65de', 1200),
    nightcap: unsplash('1556910103-1c02745aae4d', 1200),
    thePass: unsplash('1555939594-58d7cb561ad1', 1200),
    detailI: unsplash('1504674900247-0877df9cc836', 800),
    detailII: unsplash('1565299624946-b28f40a0ae38', 800),
    detailIII: unsplash('1556910103-1c02745aae4d', 800),
    detailIV: unsplash('1414235077428-338989a2e8c0', 800),
    detailV: unsplash('1555396273-367ea4eb4db5', 800),
    detailVI: unsplash('1559339352-11d035aa65de', 800),
  },
}
