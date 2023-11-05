type Item = { id: number; name: string };

function getUniqueItems<T>(astrologers: { [key: string]: T[] }[], key: string): Item[] {
  const uniqueItems = new Set<string>();

  for (const astrologer of astrologers) {
    for (const item of astrologer[key]) {
      uniqueItems.add(JSON.stringify(item));
    }
  }

  return Array.from(uniqueItems).map<Item>((item) => JSON.parse(item));
}

export const getUniqueSpecializations = (astrologers: { specializations: Item[] }[]) => {
  return getUniqueItems(astrologers, 'specializations');
};

export const getUniqueFocuses = (astrologers: { focuses: Item[] }[]) => {
  return getUniqueItems(astrologers, 'focuses');
};

export const sortingByStatus = (
  a: { user_id: number; status: string },
  b: { user_id: number; status: string },
  modifier: 1 | -1,
) => {
  if (a.status === 'online' && b.status === 'offline') {
    return 1 * modifier;
  }
  if (a.status === 'offline' && b.status === 'online') {
    return -1 * modifier;
  }

  return b.user_id - a.user_id;
};

export const sortingByRating = (a: { rating: number }, b: { rating: number }, modifier: 1 | -1) => {
  return (a.rating - b.rating) * modifier;
};

export const sortingByPrice = (
  a: { chat_offers: { type: string; price: number }[] },
  b: { chat_offers: { type: string; price: number }[] },
  modifier: 1 | -1,
) => {
  const findOnlineChat = (chat: { type: string }) => chat.type === 'online';

  const aPrice = a.chat_offers.find(findOnlineChat)?.price || 0;
  const bPrice = b.chat_offers.find(findOnlineChat)?.price || 0;

  return (aPrice - bPrice) * modifier;
};
