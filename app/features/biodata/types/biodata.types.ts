export interface IdentityInfo {
  created_for: string;
  others?: string;
  gender: 'Male' | 'Female' | '';
  full_name: string;
  surname: string;
  marital_status: string;
  dob: string; // ISO format
  height: number; // inches
  weight: number | null; // kg
  skin_type: string;
  body_type: string;
  blood_group: string;
  mother_tongue: string;
  contact_num_country_code: string;
  contact_num: string;
  whatsapp_country_code: string;
  whatsapp_num: string;
  have_children: boolean;
  child_count: number;
  child_details: string;
  child_living_with: string;
  report_case: boolean;
  case_details: string;
  personal_debt: boolean;
  debt_details: string;
  about_me: string;
  fb_link?: string;
  ig_profile_link?: string;
}

export interface ResidencyInfo {
  current_location: {
    cor: string; // country of residence
    status: string;
    state: string;
    city: string;
    division: string;
    district: string;
    sub_district: string;
    village: string;
    home_address: string;
  };
  permanent_location: {
    cor: string;
    status: string;
    state: string;
    city: string;
    division: string;
    district: string;
    sub_district: string;
    village: string;
    home_address: string;
    grew_up_in: string;
    willing_to_relocate: string;
  };
}

export interface MuslimInfo {
  religious_value: string;
  sect: string;
  madhab: string;
  mahram_nonmahram: string;
  follows_pir: boolean;
  prayer_frequency: string;
  fasting_ramadan: string;
  islamic_knowledge: string;
  hajj_performed: string;
  beard_style: string;
  hijab_style: string;
  dress_code: string;
  can_read_quran: string;
  pir_details: string;
  is_converted: boolean;
  convert_details: string;
}

export interface HinduInfo {
  religious_value: string;
  caste: string;
  gotro: string;
  sampradaya: string;
  sub_caste: string;
  deity_preference: string;
  puja_rituals: string;
  temple_attendance: string;
  dietary: string;
  astrology_importance: string;
  festivals_celebrated: string[];
}

export interface ChristianInfo {
  religious_value: string;
  denomination: string;
  prayer_frequency: string;
  church_attendance: string;
  church_involvement: string[];
  fasting_practice: string;
  missionary_work: string;
}

export interface BuddhistInfo {
  religious_value: string;
  tradition: string;
  five_precepts: string;
  meditation_practice: string;
  temple_attendance: string;
  vegetarianism: string;
  retreat_participation: string;
  teacher: string;
  taking_refuge: string;
}

export interface ReligionInfo {
  religion: 'Islam' | 'Hinduism' | 'Christianity' | 'Buddhism' | '';
  muslim?: MuslimInfo;
  hindu?: HinduInfo;
  christianity?: ChristianInfo;
  buddhism?: BuddhistInfo;
}

export interface EducationEntry {
  id?: string;
  degree: string;
  completion_year: string;
  institution: string;
  subject: string;
  result: string;
  curriculum: string;
}

export interface EducationInfo {
  highest_degree: string;
  entries: EducationEntry[];
}

export interface CareerInfo {
  occupation: string;
  designation: string;
  work_location: string; // Onsite, Remote, Hybrid
  currency: string;
  annual_income: number | null;
  occupation_details: string;
  personal_asset: string;
  vocational_training: boolean;
  training_details: string;
  professional_certificate: boolean;
  certification_details: string;
}

export interface SiblingDetail {
  order: number;
  name: string;
  profession: string;
  marital_status: string;
  alive: boolean;
  gender: 'male' | 'female';
  spouse_name: string;
  spouse_profession: string;
}

export interface RelativeDetail {
  name: string;
  profession: string;
  relationship: string;
  phone_number: string;
}

export interface FamilyDetails {
  type: string;
  location: string;
  father_name: string;
  father_phone: string;
  father_phone_code: string;
  father_occupation: string;
  father_alive: boolean;
  mother_name: string;
  mother_phone: string;
  mother_phone_code: string;
  mother_occupation: string;
  mother_alive: boolean;
  financial_condition: string;
  family_assets: string;
  debt: boolean;
  debt_details: string;
  siblings: {
    have_siblings: boolean;
    sibling_nums: number;
    self_rank: number;
    siblings_details: SiblingDetail[];
  };
  relatives: RelativeDetail[];
}

export interface LifestyleInfo {
  lifestyle_expense: number | null;
  allergic_to: string;
  diet: string;
  smoke: boolean;
  drink: boolean;
  chronic_disease: boolean;
  disabilities: boolean;
  disease_details: string;
  health_condition: string;
  social_activity: string;
  hobbies: string[];
  pets: string[];
}

export interface MarriageInfo {
  guardian_agreed: string;
  study_after_marriage: string;
  allow_wife_study: string;
  willing_to_do_job: string;
  let_wife_work: string;
  gift_expectation: string;
  willing_to_offer_gifts: string;
  willing_tobe_house_husband: string;
  children_after_marriage: string;
  living_after_marriage: string;
  marriage_plan: string;
  thoughts_on_marriage: string;
  self_and_partner: string;
  relocation_plan: string;
  relocate_with_spouse: string;
  living_together_after_marriage: string;
  marriage_time: string;
}

export interface PartnerPreference {
  age_range: number[]; // [min, max]
  height_range: number[]; // [min, max]
  family_type: string[];
  marital_status: string[];
  partner_with_child: boolean;
  religion: string;
  preferred_profession: string[];
  location: string[];
  preferred_location: string[];
  not_preferred_location: string[];
  preferred_countries: string[];
  special_preference: string[];
  min_edu_qualification: string;
  complexion_preference: string[];
  expected_qualities: string;
  unexpected_qualities: string;
  accept_physically_challenged: boolean;
}

export interface VerificationInfo {
  visibility: string;
  payout: string;
  currency: string;
  profile_photo_url: string | null;
  album_photo_urls: string[];
}

export interface Biodata {
  identity: IdentityInfo;
  residency: ResidencyInfo;
  religion: ReligionInfo;
  education: EducationInfo;
  career: CareerInfo;
  family: FamilyDetails;
  lifestyle: LifestyleInfo;
  marriage: MarriageInfo;
  preference: PartnerPreference;
  verification: VerificationInfo;
  selectedTemplate: 'classic' | 'modern' | 'minimal' | 'islamic';
}
