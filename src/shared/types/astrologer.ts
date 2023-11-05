type Focus = {
  id: number;
  name: string;
};

type Language = {
  code: string;
  name: string;
  native_name: string;
};

type Specialization = {
  id: number;
  name: string;
};

type ChatOffer = {
  type: string;
  price: number;
  limit: number;
  limit_is_exhausted: boolean;
  offer: null;
  trial_minutes: number;
};

type Subscription = {
  type: string;
};

type Video = {
  src: string | null;
};

type Certificate = {
  src: string;
};

export type Astrologer = {
  id: string;
  name: string;
  astrology_type: string;
  image: string;
  image_mini: string;
  slogan: string;
  description: string;
  description_experience: string;
  rating: number;
  experience: number;
  feedback_count: number;
  review_count: number;
  total_orders: number;
  sort_order: number;
  joined_time: number;
  focuses: Focus[];
  languages: Language[];
  specializations: Specialization[];
  certificates: Certificate[];
  offers: never[];
  video: Video;
  user_id: number;
  supply_type: {
    id: number;
    type: string;
  };
  chat_offers: ChatOffer[];
  subscription: Subscription;
  is_personal: boolean;
  is_followed: boolean;
  status: string;
};
