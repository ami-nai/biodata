import { reactive } from "vue";

export type IslamReligionData = {
  sect: string;
  madhab: string;
  hajj_performed: string;
  islamic_knowledge: string;
  beard_style: string;
  hijab_style: string;
  dress_code: string;
  can_read_quran: string;
  follows_pir: boolean;
  pir_details: string;
  convert_details: string;
  is_converted: boolean;
  mahram_nonmahram: string;
};

export type HinduReligionData = {
  sampradaya: string;
  caste: string;
  sub_caste: string;
  gotro: string;
  deity_preference: string;
  temple_attendance: string;
  dietary: string;
  astrology_importance: string;
  festivals_celebrated: string[];
};

export type ChristianReligionData = {
  denomination: string;
  prayer_frequency: string;
  church_attendance: string;
  church_involvement: string[];
  missionary_work: string;
  fasting_practice: string;
};

export type BuddhistReligionData = {
  tradition: string;
  taking_refuge: string;
  five_precepts: string;
  meditation_practice: string;
  temple_attendance: string;
  vegetarianism: string;
  teacher: string;
  retreat_participation: string;
};

export const islamReligion = reactive<IslamReligionData>({
  sect: "",
  madhab: "",
  hajj_performed: "",
  islamic_knowledge: "",
  beard_style: "",
  hijab_style: "",
  dress_code: "",
  can_read_quran: "",
  follows_pir: false,
  pir_details: "",
  convert_details: "",
  is_converted: false,
  mahram_nonmahram: "",
});

export const hinduReligion = reactive<HinduReligionData>({
  sampradaya: "",
  caste: "",
  sub_caste: "",
  gotro: "",
  deity_preference: "",
  temple_attendance: "",
  dietary: "",
  astrology_importance: "",
  festivals_celebrated: [],
});

export const christianReligion = reactive<ChristianReligionData>({
  denomination: "",
  prayer_frequency: "",
  church_attendance: "",
  church_involvement: [],
  missionary_work: "",
  fasting_practice: "",
});

export const buddhistReligion = reactive<BuddhistReligionData>({
  tradition: "",
  taking_refuge: "",
  five_precepts: "",
  meditation_practice: "",
  temple_attendance: "",
  vegetarianism: "",
  teacher: "",
  retreat_participation: "",
});
