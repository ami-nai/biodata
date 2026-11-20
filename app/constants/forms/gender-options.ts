export type GenderOption = {
  value: string;
  labelKey: string;
};

export const genderOptions: GenderOption[] = [
  { value: "Male", labelKey: "profile.find_filters.options.male" },
  { value: "Female", labelKey: "profile.find_filters.options.female" },
];
