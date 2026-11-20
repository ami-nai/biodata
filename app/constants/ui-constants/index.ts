import type { NavigationMenuItem, TabsItem } from "@nuxt/ui";

export const publicUserDetails = ref<TabsItem[]>([
  {
    label: "Overview",
    slot: "over",
    icon: "i-lucide-user-round",
  },
  {
    label: "Religion",
    slot: "religion",
    icon: "i-lucide-scroll-text",
  },
  {
    label: "Location",
    slot: "location",
    icon: "i-lucide-map-pin",
  },
  {
    label: "Education",
    slot: "edu",
    icon: "i-lucide-graduation-cap",
  },
  {
    label: "Career",
    slot: "career",
    icon: "i-lucide-briefcase-business",
  },
  {
    label: "Family Details",
    slot: "family",
    icon: "i-lucide-users-round",
  },
  {
    label: "Health & Lifestyle",
    slot: "lifestyle",
    icon: "i-lucide-heart-pulse",
  },
  {
    label: "Marriage Related Info",
    slot: "marriage",
    icon: "i-lucide-gem",
  },
  {
    label: "Partner Preference",
    slot: "partner",
    icon: "i-lucide-heart-handshake",
  },
]);
