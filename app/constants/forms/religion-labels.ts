/**
 * Religion Labels Configuration
 * This file contains the display labels for each religion type.
 * Labels are organized in groups for display in the profile view.
 */

export type ReligionLabelField = {
  key: string; // The key from the database schema
  label: string; // The display label
  isArray?: boolean; // Whether the field is an array (will be rendered as comma-separated)
  format?: (value: any, gender?: string, data?: any) => string; // Optional formatter function
  getLabel?: (gender?: string) => string; // Optional dynamic label generator
};

export type ReligionLabelGroup = {
  fields: ReligionLabelField[];
};

export type ReligionLabelsConfig = {
  [religion: string]: ReligionLabelGroup[];
};

export const religionLabels: ReligionLabelsConfig = {
  Islam: [
    {
      fields: [
        { key: "religion", label: "profile.religion_details.religion" },
        { key: "religious_value", label: "profile.religion_details.religious_views" },
        { key: "sect", label: "profile.religion_details.sect" },
        { key: "prayer_frequency", label: "profile.religion_details.prayer_frequency" },
      ],
    },
    {
      fields: [
        {
          key: "gender_based_style",
          label: "profile.religion_details.beard_style",
          format: (_value: any, gender?: string, data?: any) => {
            return gender === "Male" ? data?.beard_style : data?.hijab_style;
          },
          getLabel: (gender?: string) =>
            gender === "Male" ? "profile.religion_details.beard_style" : "profile.religion_details.hijab_style",
        },
        { key: "mahram_nonmahram", label: "profile.religion_details.mahram_nonmahram" },
        { key: "can_read_quran", label: "profile.religion_details.read_quran" },
        {
          key: "follows_pir",
          label: "profile.religion_details.follows_pir",
          format: (value: any) => (value === false ? "common.no" : "common.yes"),
        },
      ],
    },
    {
      fields: [
        {
          key: "pir_details",
          label: "profile.religion_details.pir_thoughts",
          format: (value: any) => (value ? value : "common.na"),
        },
        { key: "dress_code", label: "profile.religion_details.dress_code" },
        {
          key: "is_converted",
          label: "profile.religion_details.converted",
          format: (value: any) => (value === false ? "common.no" : "common.yes"),
        },
        {
          key: "convert_details",
          label: "profile.religion_details.conversion_reason",
          format: (value: any) => (value ? value : "common.na"),
        },
      ],
    },
  ],
  Hindu: [
    {
      fields: [
        { key: "caste", label: "profile.religion_details.caste" },
        { key: "sampradaya", label: "profile.religion_details.sampradaya" },
        { key: "deity_preference", label: "profile.religion_details.deity" },
        { key: "puja_rituals", label: "profile.religion_details.puja" },
      ],
    },
    {
      fields: [
        { key: "temple_attendance", label: "profile.religion_details.temple" },
        { key: "dietary", label: "profile.religion_details.dietary" },
        {
          key: "astrology_importance",
          label: "profile.religion_details.astrology",
        },
        {
          key: "festivals_celebrated",
          label: "profile.religion_details.festivals",
          isArray: true,
        },
      ],
    },
  ],
  Buddhists: [
    {
      fields: [
        { key: "tradition", label: "profile.religion_details.tradition" },
        { key: "five_precepts", label: "profile.religion_details.five_precepts" },
        { key: "meditation_practice", label: "profile.religion_details.meditation" },
      ],
    },
    {
      fields: [
        { key: "temple_attendance", label: "profile.religion_details.temple" },
        { key: "religious_value", label: "profile.religion_details.religious_views" },
        { key: "vegetarianism", label: "profile.religion_details.vegetarianism" },
      ],
    },
    {
      fields: [
        { key: "retreat_participation", label: "profile.religion_details.retreat" },
        { key: "teacher", label: "profile.religion_details.teacher" },
        { key: "taking_refuge", label: "profile.religion_details.refuge" },
      ],
    },
  ],
  Christian: [
    {
      fields: [
        { key: "religion", label: "profile.religion_details.religion" },
        { key: "religious_value", label: "profile.religion_details.religious_views" },
        { key: "denomination", label: "profile.religion_details.denomination" },
        { key: "prayer_frequency", label: "profile.religion_details.prayer_frequency" },
      ],
    },
    {
      fields: [
        { key: "church_attendance", label: "profile.religion_details.church_attendance" },
        {
          key: "church_involvement",
          label: "profile.religion_details.church_involvement",
          isArray: true,
        },
        { key: "fasting_practice", label: "profile.religion_details.fasting" },
        { key: "missionary_work", label: "profile.religion_details.missionary" },
      ],
    },
  ],
};

/**
 * Formats an array value as a comma-separated string
 */
export function formatArrayValue(value: any): string {
  if (!value || !Array.isArray(value)) {
    return "common.na";
  }
  return value.join(", ");
}

/**
 * Gets the display value for a field, applying formatting if needed
 */
export function getFieldValue(
  field: ReligionLabelField,
  data: any,
  gender?: string,
): any {
  // Handle array fields - format as comma-separated
  if (field.isArray) {
    const value = data?.[field.key];
    return formatArrayValue(value);
  }

  // Handle custom format functions
  if (field.format) {
    return field.format(data?.[field.key], gender, data);
  }

  return data?.[field.key];
}

/**
 * Gets the display label for a field, handling dynamic labels (like gender-based)
 */
export function getFieldLabel(
  field: ReligionLabelField,
  gender?: string,
): string {
  if (field.getLabel) {
    return field.getLabel(gender);
  }
  return field.label;
}
