import { z } from 'zod';

export const identitySchema = z.object({
  created_for: z.string().min(1, 'Please select who the profile is created for'),
  others: z.string().optional(),
  gender: z.enum(['Male', 'Female'], { error: 'Please select gender' }),
  full_name: z.string().min(2, 'Name must be at least 2 characters'),
  surname: z.string().min(2, 'Nickname must be at least 2 characters'),
  marital_status: z.string().min(1, 'Please select marital status'),
  dob: z.string().min(1, 'Date of birth is required'),
  height: z.number().min(36, 'Height must be valid').max(108),
  weight: z.number().nullable(),
  skin_type: z.string().min(1, 'Please select skin complexion'),
  body_type: z.string().min(1, 'Please select body type'),
  blood_group: z.string().min(1, 'Please select blood group'),
  mother_tongue: z.string().min(2, 'Mother tongue is required'),
  contact_num_country_code: z.string().default('BD'),
  contact_num: z.string().min(6, 'Please enter a valid phone number'),
  whatsapp_country_code: z.string().default('BD'),
  whatsapp_num: z.string().min(6, 'Please enter a valid WhatsApp number'),
  have_children: z.boolean(),
  child_count: z.number().default(0),
  child_details: z.string().default(''),
  child_living_with: z.string().default(''),
  report_case: z.boolean().default(false),
  case_details: z.string().default(''),
  personal_debt: z.boolean().default(false),
  debt_details: z.string().default(''),
  about_me: z.string().min(10, 'About me description must be at least 10 characters'),
  fb_link: z.string().optional(),
  ig_profile_link: z.string().optional(),
}).refine((data) => {
  if (data.marital_status !== 'Never Married' && data.have_children) {
    return data.child_count > 0;
  }
  return true;
}, {
  message: "Please enter the number of children",
  path: ["child_count"]
});

export const locationSchema = z.object({
  current_location: z.object({
    cor: z.string().min(1, 'Country of residence is required'),
    status: z.string().default(''),
    state: z.string().optional(),
    city: z.string().optional(),
    division: z.string().optional(),
    district: z.string().optional(),
    sub_district: z.string().optional(),
    village: z.string().optional(),
    home_address: z.string().optional(),
  }).refine((loc) => loc.cor === 'Bangladesh' || (loc.status && loc.status.trim() !== ''), {
    message: 'Please select residency status',
    path: ['status'],
  }),
  permanent_location: z.object({
    cor: z.string().min(1, 'Country of residence is required'),
    status: z.string().default(''),
    state: z.string().optional(),
    city: z.string().optional(),
    division: z.string().optional(),
    district: z.string().optional(),
    sub_district: z.string().optional(),
    village: z.string().optional(),
    home_address: z.string().optional(),
    grew_up_in: z.string().min(1, 'Please select country you grew up in'),
    willing_to_relocate: z.string().min(1, 'Please select willingness to relocate'),
  }).refine((loc) => loc.cor === 'Bangladesh' || (loc.status && loc.status.trim() !== ''), {
    message: 'Please select residency status',
    path: ['status'],
  }),
});

export const religionSchema = z.object({
  religion: z.enum(['Islam', 'Hinduism', 'Christianity', 'Buddhism'], { error: 'Please select religion' }),
  muslim: z.object({
    religious_value: z.string().optional(),
    sect: z.string().optional(),
    madhab: z.string().optional(),
    mahram_nonmahram: z.string().optional(),
    follows_pir: z.boolean().default(false),
    prayer_frequency: z.string().optional(),
    fasting_ramadan: z.string().optional(),
    islamic_knowledge: z.string().optional(),
    hajj_performed: z.string().optional(),
    beard_style: z.string().optional(),
    hijab_style: z.string().optional(),
    dress_code: z.string().optional(),
    can_read_quran: z.string().optional(),
    pir_details: z.string().default(''),
    is_converted: z.boolean().default(false),
    convert_details: z.string().default(''),
  }).optional(),
  hindu: z.object({
    religious_value: z.string().optional(),
    caste: z.string().optional(),
    gotro: z.string().optional(),
    sampradaya: z.string().optional(),
    sub_caste: z.string().optional(),
    deity_preference: z.string().optional(),
    puja_rituals: z.string().optional(),
    temple_attendance: z.string().optional(),
    dietary: z.string().optional(),
    astrology_importance: z.string().optional(),
    festivals_celebrated: z.array(z.string()).default([]),
  }).optional(),
  christianity: z.object({
    religious_value: z.string().optional(),
    denomination: z.string().optional(),
    prayer_frequency: z.string().optional(),
    church_attendance: z.string().optional(),
    church_involvement: z.array(z.string()).default([]),
    fasting_practice: z.string().optional(),
    missionary_work: z.string().optional(),
  }).optional(),
  buddhism: z.object({
    religious_value: z.string().optional(),
    tradition: z.string().optional(),
    five_precepts: z.string().optional(),
    meditation_practice: z.string().optional(),
    temple_attendance: z.string().optional(),
    vegetarianism: z.string().optional(),
    retreat_participation: z.string().optional(),
    teacher: z.string().optional(),
    taking_refuge: z.string().optional(),
  }).optional(),
});

export const educationSchema = z.object({
  highest_degree: z.string().min(1, 'Please select highest education degree'),
  entries: z.array(
    z.object({
      degree: z.string().min(1, 'Degree name is required'),
      completion_year: z.string().min(1, 'Completion year is required'),
      institution: z.string().min(1, 'Institution is required'),
      subject: z.string().min(1, 'Subject/Group is required'),
      result: z.string().optional().default(''),
      curriculum: z.string().optional().default(''),
    })
  ).min(1, 'Please add at least one education entry'),
});

export const careerSchema = z.object({
  occupation: z.string().min(1, 'Profession is required'),
  designation: z.string().optional(),
  work_location: z.string().min(1, 'Work type is required'),
  currency: z.string().default('BDT'),
  annual_income: z.number().nullable(),
  occupation_details: z.string().default(''),
  personal_asset: z.string().default(''),
  vocational_training: z.boolean().default(false),
  training_details: z.string().default(''),
  professional_certificate: z.boolean().default(false),
  certification_details: z.string().default(''),
});

export const familySchema = z.object({
  type: z.string().min(1, 'Family type is required'),
  location: z.string().optional(),
  father_name: z.string().min(2, 'Father name is required'),
  father_phone: z.string().optional(),
  father_phone_code: z.string().default('BD'),
  father_occupation: z.string().default(''),
  father_alive: z.boolean().default(true),
  mother_name: z.string().min(2, 'Mother name is required'),
  mother_phone: z.string().optional(),
  mother_phone_code: z.string().default('BD'),
  mother_occupation: z.string().default(''),
  mother_alive: z.boolean().default(true),
  financial_condition: z.string().min(1, 'Financial condition is required'),
  family_assets: z.string().default(''),
  debt: z.boolean().default(false),
  debt_details: z.string().default(''),
  siblings: z.object({
    have_siblings: z.boolean().default(false),
    sibling_nums: z.number().default(0),
    self_rank: z.number().default(1),
    siblings_details: z.array(
      z.object({
        order: z.number(),
        name: z.string().min(1, 'Name is required'),
        profession: z.string().default(''),
        marital_status: z.string().default(''),
        alive: z.boolean().default(true),
        gender: z.enum(['male', 'female']),
        spouse_name: z.string().default(''),
        spouse_profession: z.string().default(''),
      })
    ).default([]),
  }),
  relatives: z.array(
    z.object({
      name: z.string().min(1, 'Relative name is required'),
      profession: z.string().default(''),
      relationship: z.string().min(1, 'Relationship is required'),
      phone_number: z.string().default(''),
    })
  ).default([]),
});

export const lifestyleSchema = z.object({
  lifestyle_expense: z.number().nullable(),
  allergic_to: z.string().default(''),
  diet: z.string().min(1, 'Diet preference is required'),
  smoke: z.boolean().default(false),
  drink: z.boolean().default(false),
  chronic_disease: z.boolean().default(false),
  disabilities: z.boolean().default(false),
  disease_details: z.string().default(''),
  health_condition: z.string().default(''),
  social_activity: z.string().default(''),
  hobbies: z.array(z.string()).default([]),
  pets: z.array(z.string()).default([]),
});

export const marriageSchema = z.object({
  guardian_agreed: z.string().min(1, 'Please select guardian agreement'),
  study_after_marriage: z.string().optional(),
  allow_wife_study: z.string().optional(),
  willing_to_do_job: z.string().optional(),
  let_wife_work: z.string().optional(),
  gift_expectation: z.string().default(''),
  willing_to_offer_gifts: z.string().default(''),
  willing_tobe_house_husband: z.string().default(''),
  children_after_marriage: z.string().default(''),
  living_after_marriage: z.string().default(''),
  marriage_plan: z.string().default(''),
  thoughts_on_marriage: z.string().min(10, 'Thoughts on marriage must be at least 10 characters'),
  self_and_partner: z.string().default(''),
  relocation_plan: z.string().default(''),
  relocate_with_spouse: z.string().default(''),
  living_together_after_marriage: z.string().default(''),
  marriage_time: z.string().min(1, 'Please select expected marriage time'),
});

export const preferenceSchema = z.object({
  age_range: z.array(z.number()).min(2),
  height_range: z.array(z.number()).min(2),
  family_type: z.array(z.string()).default([]),
  marital_status: z.array(z.string()).default([]),
  partner_with_child: z.boolean().default(false),
  religion: z.string().min(1, 'Partner religion preference is required'),
  preferred_profession: z.array(z.string()).default([]),
  location: z.array(z.string()).min(1, 'Please select location preference'),
  preferred_location: z.array(z.string()).default([]),
  not_preferred_location: z.array(z.string()).default([]),
  preferred_countries: z.array(z.string()).default([]),
  special_preference: z.array(z.string()).default([]),
  min_edu_qualification: z.string().min(1, 'Please select minimum educational qualification'),
  complexion_preference: z.array(z.string()).default([]),
  expected_qualities: z.string().min(10, 'Expected qualities must be at least 10 characters'),
  unexpected_qualities: z.string().default(''),
  accept_physically_challenged: z.boolean().default(false),
});

export const verificationSchema = z.object({
  visibility: z.string().min(1, 'Visibility setting is required'),
  payout: z.string().default(''),
  currency: z.string().default('BDT'),
  profile_photo_url: z.string().nullable().refine(val => !!val?.trim(), 'Profile photo is required'),
  album_photo_urls: z.array(z.string()).default([]),
});
