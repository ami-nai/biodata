export type MaritalOption = {
  value: string;
  labelKey: string;
};

export const maritalOptions: MaritalOption[] = [
  {
    value: "Never Married",
    labelKey: "profile.find_filters.options.unmarried",
  },
  { value: "Married", labelKey: "profile.find_filters.options.married" },
  { value: "Divorced", labelKey: "profile.find_filters.options.divorced" },
  { value: "Widowed", labelKey: "profile.find_filters.options.widowed" },
];