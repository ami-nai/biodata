import { reactive } from "vue";

type EducationBase = {
  institute: string;
  result: string;
  passing_year: string;
};

export type GcseData = EducationBase & {
  certificate_type: string;
  candidate_number: string;
  center_number: string;
  awarding_body: string;
};

export type SecondaryData = EducationBase & {
  subject: string;
};

export type HigherSecondaryData = EducationBase & {
  subject: string;
};

export type GradeTenData = EducationBase & {
  curriculum: string;
  transcript_status: string;
};

export type GradeTwelveData = EducationBase & {
  diploma_type: string;
  cgpa: string;
  sat_act_score: string;
};

export type IbDiplomaData = EducationBase & {
  registration_category: string;
};

export type IbCareerData = EducationBase & {
  career_related_study: string;
  session_number: string;
  personal_code: string;
};

export type QawmiData = EducationBase & {
  subject: string;
};

export type MastersData = EducationBase & {
  subject: string;
  student_status: "Completed" | "Running" | "";
  current_year: string;
};

export type DoctorateData = EducationBase & {
  subject: string;
  research_thesis_title: string;
  status: "Completed" | "Running" | "";
};

export type BachelorData = EducationBase & {
  subject: string;
  student_status: "Completed" | "Running" | "";
  current_year: "1st Year" | "2nd Year" | "3rd Year" | "4th Year" | "5th Year" | "";
};

export type PostDocData = {
  institute: string;
  project_title: string;
  status: "Completed" | "Running" | "";
  department: string;
  pi_mentor: string;
  research_area: string;
  start_date: string;
  end_date: string;
};

export const gcseFormData = reactive<GcseData>({
  institute: "",
  certificate_type: "",
  result: "",
  passing_year: "",
  candidate_number: "",
  center_number: "",
  awarding_body: "",
});

export const gceFormData = reactive<GcseData>({
  institute: "",
  certificate_type: "",
  result: "",
  passing_year: "",
  candidate_number: "",
  center_number: "",
  awarding_body: "",
});

export const dakhilFormData = reactive<SecondaryData>({
  institute: "",
  subject: "",
  result: "",
  passing_year: "",
});

export const alimFormData = reactive<HigherSecondaryData>({
  institute: "",
  subject: "",
  result: "",
  passing_year: "",
});

export const gradeTenFormData = reactive<GradeTenData>({
  institute: "",
  curriculum: "",
  result: "",
  passing_year: "",
  transcript_status: "",
});

export const gradeTwelveFormData = reactive<GradeTwelveData>({
  institute: "",
  diploma_type: "",
  cgpa: "",
  passing_year: "",
  sat_act_score: "",
});

export const diplomaFormData = reactive<IbDiplomaData>({
  institute: "",
  registration_category: "",
  result: "",
  passing_year: "",
});

export const careerFormData = reactive<IbCareerData>({
  institute: "",
  career_related_study: "",
  result: "",
  passing_year: "",
  session_number: "",
  personal_code: "",
});

export const ammahFormData = reactive<QawmiData>({
  institute: "",
  subject: "",
  result: "",
  passing_year: "",
});

export const uliyaFormData = reactive<QawmiData>({
  institute: "",
  subject: "",
  result: "",
  passing_year: "",
});

export const fazilatFormData = reactive<QawmiData>({
  institute: "",
  subject: "",
  result: "",
  passing_year: "",
});

export const takmilFormData = reactive<QawmiData>({
  institute: "",
  subject: "",
  result: "",
  passing_year: "",
});

export const takassusFormData = reactive<QawmiData>({
  institute: "",
  subject: "",
  result: "",
  passing_year: "",
});

export const mastersFormData = reactive<MastersData>({
  institute: "",
  subject: "",
  student_status: "",
  result: "",
  current_year: "",
  passing_year: "",
});

export const doctorateFormData = reactive<DoctorateData>({
  institute: "",
  subject: "",
  research_thesis_title: "",
  status: "",
  result: "",
  passing_year: "",
});

export const secondaryFormData = reactive<SecondaryData>({
  institute: "",
  subject: "",
  result: "",
  passing_year: "",
});

export const higherFormData = reactive<HigherSecondaryData>({
  institute: "",
  subject: "",
  result: "",
  passing_year: "",
});

export const bachelorFormData = reactive<BachelorData>({
  institute: "",
  subject: "",
  student_status: "",
  result: "",
  passing_year: "",
  current_year: "",
});

export const postDocFormData = reactive<PostDocData>({
  institute: "",
  project_title: "",
  status: "",
  department: "",
  pi_mentor: "",
  research_area: "",
  start_date: "",
  end_date: "",
});
