export type ReligionOption = {
  value: string;
  labelKey: string;
};

export const religionOptions: ReligionOption[] = [
  { value: "Islam", labelKey: "profile.find_filters.options.islam" },
  { value: "Hinduism", labelKey: "profile.find_filters.options.hindu" },
  {
    value: "Christianity",
    labelKey: "profile.find_filters.options.christian",
  },
  { value: "Buddhism", labelKey: "profile.find_filters.options.buddhism" },
];
