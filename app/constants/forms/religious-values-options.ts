export type ReligiousValueOption = {
  value: string;
  labelKey: string;
};

export const religiousValueOptions: ReligiousValueOption[] = [
  { value: "Very Practicing", labelKey: "onboarding.very_practicing" },
  { value: "Practicing", labelKey: "onboarding.practicing" },
  { value: "Moderate", labelKey: "onboarding.moderate" },
  { value: "Not Practicing", labelKey: "onboarding.not_practicing" },
];
