export type ProfileCreatedForOption = {
  value: string;
  labelKey: string;
};

export const profileCreatedForOptions: ProfileCreatedForOption[] = [
  { value: "Self", labelKey: "onboarding.self" },
  { value: "Son", labelKey: "onboarding.son" },
  { value: "Daughter", labelKey: "onboarding.daughter" },
  { value: "Brother", labelKey: "onboarding.brother" },
  { value: "Sister", labelKey: "onboarding.sister" },
  { value: "Relative", labelKey: "onboarding.relative" },
  { value: "Friend", labelKey: "onboarding.friend" },
  { value: "Guardian", labelKey: "onboarding.guardian" },
  { value: "Media Client", labelKey: "onboarding.media_client" },
  { value: "Others", labelKey: "onboarding.other" },
];
