/**
 * Education Labels Configuration
 * This file contains the display labels for each education type.
 * Labels are organized by education degree type.
 */

export type EducationLabelField = {
  key: string; // The key from the database schema
  label: string; // The display label
  format?: (value: any) => string; // Optional formatter function
};

export type EducationLabelsConfig = {
  [educationType: string]: {
    title?: string; // Optional custom title for the education type
    fields: EducationLabelField[];
  };
};

export const educationLabels: EducationLabelsConfig = {
  // Secondary Certificate (SSC, Alim, Indian SSC)
  secondary_certificate: {
    title: "profile.education_levels.secondary_certificate",
    fields: [
      { key: "institute", label: "profile.education_details.institute" },
      { key: "subject", label: "profile.education_details.subject" },
      { key: "result", label: "profile.education_details.result" },
      { key: "passing_year", label: "profile.education_details.passing_year" },
      { key: "subject", label: "profile.education_details.subject" },
    ],
  },
  // Higher Secondary (HSC, Indian HSC)
  higher_secondary: {
    title: "profile.education_levels.higher_secondary",
    fields: [
      { key: "institute", label: "profile.education_details.institute" },
      { key: "subject", label: "profile.education_details.subject" },
      { key: "result", label: "profile.education_details.result" },
      { key: "passing_year", label: "profile.education_details.passing_year" },
      { key: "subject", label: "profile.education_details.subject" },
    ],
  },
  // GCSE (General Certificate of Secondary Education)
  gcse: {
    title: "profile.education_levels.gcse",
    fields: [
      { key: "institute", label: "profile.education_details.institute" },
      {
        key: "certificate_type",
        label: "profile.education_details.certificate_type",
      },
      { key: "result", label: "profile.education_details.result" },
      { key: "passing_year", label: "profile.education_details.passing_year" },
      {
        key: "candidate_number",
        label: "profile.education_details.candidate_number",
      },
      {
        key: "center_number",
        label: "profile.education_details.center_number",
      },
      {
        key: "awarding_body",
        label: "profile.education_details.awarding_body",
      },
    ],
  },
  // GCE (General Certificate of Education)
  gce: {
    title: "profile.education_levels.gce",
    fields: [
      { key: "institute", label: "profile.education_details.institute" },
      {
        key: "certificate_type",
        label: "profile.education_details.certificate_type",
      },
      { key: "result", label: "profile.education_details.result" },
      { key: "passing_year", label: "profile.education_details.passing_year" },
      {
        key: "candidate_number",
        label: "profile.education_details.candidate_number",
      },
      {
        key: "center_number",
        label: "profile.education_details.center_number",
      },
      {
        key: "awarding_body",
        label: "profile.education_details.awarding_body",
      },
    ],
  },
  // IB Diploma
  ib_diploma: {
    title: "profile.education_levels.ib_diploma",
    fields: [
      { key: "institute", label: "profile.education_details.institute" },
      {
        key: "registration_category",
        label: "profile.education_details.registration_category",
      },
      { key: "result", label: "profile.education_details.result" },
      { key: "passing_year", label: "profile.education_details.passing_year" },
    ],
  },
  // IB Career
  ib_career: {
    title: "profile.education_levels.ib_career",
    fields: [
      { key: "institute", label: "profile.education_details.institute" },
      {
        key: "career_related_study",
        label: "profile.education_details.career_related_study",
      },
      { key: "result", label: "profile.education_details.result" },
      { key: "passing_year", label: "profile.education_details.passing_year" },
      {
        key: "session_number",
        label: "profile.education_details.session_number",
      },
      {
        key: "personal_code",
        label: "profile.education_details.personal_code",
      },
    ],
  },
  // Grade 10
  grade_ten: {
    title: "profile.education_levels.grade_ten",
    fields: [
      { key: "institute", label: "profile.education_details.institute" },
      { key: "curriculum", label: "profile.education_details.curriculum" },
      { key: "result", label: "profile.education_details.result" },
      { key: "passing_year", label: "profile.education_details.passing_year" },
      {
        key: "transcript_status",
        label: "profile.education_details.transcript_status",
      },
    ],
  },
  // Grade 12
  grade_twelve: {
    title: "profile.education_levels.grade_twelve",
    fields: [
      { key: "institute", label: "profile.education_details.institute" },
      { key: "diploma_type", label: "profile.education_details.diploma_type" },
      { key: "cgpa", label: "profile.education_details.cgpa" },
      { key: "passing_year", label: "profile.education_details.passing_year" },
      {
        key: "sat_act_score",
        label: "profile.education_details.sat_act_score",
      },
    ],
  },
  // Diploma (IB Diploma is the current model)
  diploma: {
    title: "profile.education_levels.diploma",
    fields: [
      { key: "institute", label: "profile.education_details.institute" },
      {
        key: "registration_category",
        label: "profile.education_details.registration_category",
      },
      { key: "result", label: "profile.education_details.result" },
      { key: "passing_year", label: "profile.education_details.passing_year" },
    ],
  },
  // Bachelor
  bachelor: {
    title: "profile.education_levels.bachelor",
    fields: [
      { key: "institute", label: "profile.education_details.institute" },
      { key: "subject", label: "profile.education_details.subject" },
      { key: "result", label: "profile.education_details.result" },
      { key: "passing_year", label: "profile.education_details.passing_year" },
      {
        key: "current_year",
        label: "profile.education_details.current_year",
        format: (v) => v || "common.na",
      },
      {
        key: "student_status",
        label: "profile.education_details.student_status",
      },
    ],
  },
  // Masters
  masters: {
    title: "profile.education_levels.masters",
    fields: [
      { key: "institute", label: "profile.education_details.institute" },
      { key: "subject", label: "profile.education_details.subject" },
      { key: "result", label: "profile.education_details.result" },
      { key: "passing_year", label: "profile.education_details.passing_year" },
      {
        key: "current_year",
        label: "profile.education_details.current_year",
        format: (v) => v || "common.na",
      },
      {
        key: "student_status",
        label: "profile.education_details.student_status",
      },
    ],
  },
  // Doctorate
  doctorate: {
    title: "profile.education_levels.doctorate",
    fields: [
      { key: "institute", label: "profile.education_details.institute" },
      { key: "subject", label: "profile.education_details.subject" },
      {
        key: "research_thesis_title",
        label: "profile.education_details.research_thesis_title",
      },
      { key: "result", label: "profile.education_details.achievement" },
      { key: "passing_year", label: "profile.education_details.passing_year" },
      { key: "status", label: "profile.education_details.status" },
    ],
  },
  // Post Doctorate
  post_doctorate: {
    title: "profile.education_levels.post_doctorate",
    fields: [
      { key: "institute", label: "profile.education_details.institute" },
      { key: "department", label: "profile.education_details.department" },
      {
        key: "research_area",
        label: "profile.education_details.research_area",
      },
      { key: "pi_mentor", label: "profile.education_details.pi_mentor" },
      {
        key: "project_title",
        label: "profile.education_details.project_title",
      },
      { key: "status", label: "profile.education_details.status" },
      { key: "start_date", label: "profile.education_details.start_date" },
      { key: "end_date", label: "profile.education_details.end_date" },
    ],
  },
};

/**
 * Gets the display title for an education type
 */
export function getEducationTitle(educationType: string): string {
  return (
    educationLabels[educationType]?.title || formatEducationType(educationType)
  );
}

/**
 * Formats education type key to a readable title
 */
export function formatEducationType(type: string): string {
  return type
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Gets the field configuration for an education type
 */
export function getEducationFields(
  educationType: string,
): EducationLabelField[] {
  return educationLabels[educationType]?.fields || getDefaultFields();
}

/**
 * Default fields for unknown education types - UPDATED for simplified education_entries schema
 */
export function getDefaultFields(): EducationLabelField[] {
  return [
    { key: "institution", label: "profile.education.institution" },
    { key: "subject", label: "profile.education.subject" },
    { key: "result", label: "profile.education.result" },
    { key: "completion_year", label: "profile.education.completion_year" },
  ];
}

/**
 * Gets the display value for a field, applying formatting if needed
 */
export function getEducationFieldValue(
  field: EducationLabelField,
  data: any,
): any {
  const value = data?.[field.key];
  if (field.format) {
    return field.format(value);
  }
  return value;
}

/**
 * Renders education data with labels for display
 */
export function renderEducationFields(
  educationType: string,
  data: any,
): { label: string; value: any }[] {
  const fields = getEducationFields(educationType);
  return fields.map((field) => ({
    label: field.label,
    value: getEducationFieldValue(field, data),
  }));
}
