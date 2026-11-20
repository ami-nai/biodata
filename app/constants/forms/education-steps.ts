import type { TabsItem } from "@nuxt/ui";

export let switchDegree = computed(() => ({
  national: () =>
    [
      { label: "SSC", slot: "ssc" },
      { label: "HSC", slot: "hsc" },
      { label: "Bachelor", slot: "bachelor" },
      { label: "Masters", slot: "masters" },
      { label: "Doctorate", slot: "doctorate" },
      { label: "Post-doctorate", slot: "post_doc" },
    ] satisfies TabsItem[],
  englishVersion: () =>
    [
      { label: "GCSE/O Level", slot: "gcse" },
      { label: "GCE/A Level", slot: "gce" },
      { label: "Bachelor", slot: "bachelor" },
      { label: "Masters", slot: "masters" },
      { label: "Doctorate", slot: "doctorate" },
      { label: "Post-doctorate", slot: "post_doc" },
    ] satisfies TabsItem[],
  ib: () =>
    [
      { label: "Diploma Programme", slot: "diploma" },
      { label: "Career Related Programme", slot: "career" },
      { label: "Bachelor", slot: "bachelor" },
      { label: "Masters", slot: "masters" },
      { label: "Doctorate", slot: "doctorate" },
      { label: "Post-doctorate", slot: "post_doc" },
    ] satisfies TabsItem[],
  alia: () =>
    [
      { label: "Dakhil", slot: "dakhil" },
      { label: "Alim", slot: "alim" },
      { label: "Fazil/Bachelors", slot: "bachelor" },
      { label: "Kamil/Masters", slot: "masters" },
      { label: "Doctorate", slot: "doctorate" },
      { label: "Post-doctorate", slot: "post_doc" },
    ] satisfies TabsItem[],
  american: () =>
    [
      { label: "Grade 10", slot: "grade-10" },
      { label: "Grade 12", slot: "grade-12" },
      { label: "Bachelor", slot: "bachelor" },
      { label: "Masters", slot: "masters" },
      { label: "Doctorate", slot: "doctorate" },
      { label: "Post-doctorate", slot: "post_doc" },
    ] satisfies TabsItem[],
  indian: () =>
    [
      { label: "SSC", slot: "ssc" },
      { label: "HSC", slot: "hsc" },
      { label: "Bachelor", slot: "bachelor" },
      { label: "Masters", slot: "masters" },
      { label: "Doctorate", slot: "doctorate" },
      { label: "Post-doctorate", slot: "post_doc" },
    ] satisfies TabsItem[],

  qawmi: () =>
    [
      { label: "Sanabiya Ammah", slot: "ammah" },
      { label: "Sanabiya Uliya", slot: "uliya" },
      { label: "Fazilat", slot: "fazilat" },
      { label: "Takmil", slot: "takmil" },
      { label: "Takassus", slot: "takassus" },
    ] satisfies TabsItem[],
}));
