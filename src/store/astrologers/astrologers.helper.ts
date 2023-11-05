export const getUniqueSpecializations = (
  astrologers: { specializations: { id: number; name: string }[] }[],
) => {
  const uniqueSpecializations = astrologers.reduce((uniqueSpecs, user) => {
    user.specializations.forEach((spec) => {
      uniqueSpecs.add(spec);
    });
    return uniqueSpecs;
  }, new Set<{ id: number; name: string }>());

  return Array.from(uniqueSpecializations);
};

export const getUniqueFocuses = (astrologers: { focuses: { id: number; name: string }[] }[]) => {
  const uniqueSpecializations = astrologers.reduce((uniqueSpecs, user) => {
    user.focuses.forEach((spec) => {
      uniqueSpecs.add(spec);
    });
    return uniqueSpecs;
  }, new Set<{ id: number; name: string }>());

  return Array.from(uniqueSpecializations);
};
