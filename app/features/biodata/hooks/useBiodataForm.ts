import { ref, reactive, watch, computed } from 'vue';
import type { Biodata, SiblingDetail, RelativeDetail, EducationEntry } from '../types/biodata.types';
import {
  identitySchema,
  locationSchema,
  religionSchema,
  educationSchema,
  careerSchema,
  familySchema,
  lifestyleSchema,
  marriageSchema,
  preferenceSchema,
  verificationSchema
} from '../schemas/biodata.schema';

const STORAGE_KEY = 'marriage_biodata_generator_state';

const createDefaultState = (): Biodata => ({
  identity: {
    created_for: '',
    others: '',
    gender: '',
    full_name: '',
    surname: '',
    marital_status: '',
    dob: '',
    height: 60, // 5 ft default
    weight: null,
    skin_type: '',
    body_type: '',
    blood_group: '',
    mother_tongue: '',
    contact_num_country_code: 'BD',
    contact_num: '',
    whatsapp_country_code: 'BD',
    whatsapp_num: '',
    have_children: false,
    child_count: 0,
    child_details: '',
    child_living_with: '',
    report_case: false,
    case_details: '',
    personal_debt: false,
    debt_details: '',
    about_me: '',
    fb_link: '',
    ig_profile_link: '',
  },
  residency: {
    current_location: {
      cor: 'Bangladesh',
      status: '',
      state: '',
      city: '',
      division: '',
      district: '',
      sub_district: '',
      village: '',
      home_address: '',
    },
    permanent_location: {
      cor: 'Bangladesh',
      status: '',
      state: '',
      city: '',
      division: '',
      district: '',
      sub_district: '',
      village: '',
      home_address: '',
      grew_up_in: '',
      willing_to_relocate: '',
    },
  },
  religion: {
    religion: '',
    muslim: {
      religious_value: '',
      sect: '',
      madhab: '',
      mahram_nonmahram: '',
      follows_pir: false,
      prayer_frequency: '',
      fasting_ramadan: '',
      islamic_knowledge: '',
      hajj_performed: '',
      beard_style: '',
      hijab_style: '',
      dress_code: '',
      can_read_quran: '',
      pir_details: '',
      is_converted: false,
      convert_details: '',
    },
    hindu: {
      religious_value: '',
      caste: '',
      gotro: '',
      sampradaya: '',
      sub_caste: '',
      deity_preference: '',
      puja_rituals: '',
      temple_attendance: '',
      dietary: '',
      astrology_importance: '',
      festivals_celebrated: [],
    },
    christianity: {
      religious_value: '',
      denomination: '',
      prayer_frequency: '',
      church_attendance: '',
      church_involvement: [],
      fasting_practice: '',
      missionary_work: '',
    },
    buddhism: {
      religious_value: '',
      tradition: '',
      five_precepts: '',
      meditation_practice: '',
      temple_attendance: '',
      vegetarianism: '',
      retreat_participation: '',
      teacher: '',
      taking_refuge: '',
    },
  },
  education: {
    highest_degree: '',
    entries: [],
  },
  career: {
    occupation: '',
    designation: '',
    work_location: '',
    currency: 'BDT',
    annual_income: null,
    occupation_details: '',
    personal_asset: '',
    vocational_training: false,
    training_details: '',
    professional_certificate: false,
    certification_details: '',
  },
  family: {
    type: '',
    location: '',
    father_name: '',
    father_phone: '',
    father_phone_code: 'BD',
    father_occupation: '',
    father_alive: true,
    mother_name: '',
    mother_phone: '',
    mother_phone_code: 'BD',
    mother_occupation: '',
    mother_alive: true,
    financial_condition: '',
    family_assets: '',
    debt: false,
    debt_details: '',
    siblings: {
      have_siblings: false,
      sibling_nums: 0,
      self_rank: 1,
      siblings_details: [],
    },
    relatives: [],
  },
  lifestyle: {
    lifestyle_expense: null,
    allergic_to: '',
    diet: '',
    smoke: false,
    drink: false,
    chronic_disease: false,
    disabilities: false,
    disease_details: '',
    health_condition: '',
    social_activity: '',
    hobbies: [],
    pets: [],
  },
  marriage: {
    guardian_agreed: '',
    study_after_marriage: '',
    allow_wife_study: '',
    willing_to_do_job: '',
    let_wife_work: '',
    gift_expectation: '',
    willing_to_offer_gifts: '',
    willing_tobe_house_husband: '',
    children_after_marriage: '',
    living_after_marriage: '',
    marriage_plan: '',
    thoughts_on_marriage: '',
    self_and_partner: '',
    relocation_plan: '',
    relocate_with_spouse: '',
    living_together_after_marriage: '',
    marriage_time: '',
  },
  preference: {
    age_range: [18, 50],
    height_range: [48, 84],
    family_type: [],
    marital_status: [],
    partner_with_child: false,
    religion: '',
    preferred_profession: [],
    location: [],
    preferred_location: [],
    not_preferred_location: [],
    preferred_countries: [],
    special_preference: [],
    min_edu_qualification: '',
    complexion_preference: [],
    expected_qualities: '',
    unexpected_qualities: '',
    accept_physically_challenged: false,
  },
  verification: {
    visibility: 'Public',
    payout: '',
    currency: 'BDT',
    profile_photo_url: null,
    album_photo_urls: [],
  },
  selectedTemplate: 'classic',
});

const state = reactive<{
  biodata: Biodata;
  errors: Record<string, string>;
  currentStep: number;
  completedSteps: number[];
}>({
  biodata: createDefaultState(),
  errors: {},
  currentStep: 1,
  completedSteps: [],
});

let isInitialized = false;

const VALID_TEMPLATES = ['classic', 'modern', 'minimal', 'islamic'] as const;

const isPlainObject = (value: any): boolean => value !== null && typeof value === 'object' && !Array.isArray(value);

const deepMerge = <T extends Record<string, any>>(target: T, source: any): T => {
  for (const key of Object.keys(target)) {
    if (!Object.prototype.hasOwnProperty.call(source, key)) continue;
    const sourceValue = source[key];
    if (sourceValue === undefined) continue;
    if (isPlainObject(sourceValue) && isPlainObject(target[key])) {
      deepMerge(target[key], sourceValue);
    } else if (Array.isArray(target[key]) ? Array.isArray(sourceValue) : target[key] === null ? sourceValue === null || typeof sourceValue === 'string' || typeof sourceValue === 'number' : typeof sourceValue === typeof target[key] && !isPlainObject(target[key])) {
      target[key] = sourceValue;
    }
  }
  return target;
};

export const useBiodataForm = () => {
  const initFromStorage = () => {
    if (typeof window === 'undefined' || isInitialized) return;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (isPlainObject(parsed?.biodata)) {
          deepMerge(state.biodata, parsed.biodata);
          if (!VALID_TEMPLATES.includes(state.biodata.selectedTemplate)) {
            state.biodata.selectedTemplate = 'classic';
          }
        }
        if (Number.isInteger(parsed?.currentStep) && parsed.currentStep >= 1 && parsed.currentStep <= 10) {
          state.currentStep = parsed.currentStep;
        }
        if (Array.isArray(parsed?.completedSteps)) {
          state.completedSteps = [...new Set<number>(parsed.completedSteps.filter((step: number) => Number.isInteger(step) && step >= 1 && step <= 10))];
        }
      }
    } catch (e) {
      console.error('Failed to load biodata state:', e);
    }
    isInitialized = true;
  };

  const saveToStorage = () => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          biodata: state.biodata,
          currentStep: state.currentStep,
          completedSteps: state.completedSteps,
        })
      );
    } catch (e) {
      console.error('Failed to save biodata state:', e);
    }
  };

  // Watch for changes and save to storage
  watch(() => state.biodata, saveToStorage, { deep: true });
  watch(() => state.currentStep, saveToStorage);
  watch(() => state.completedSteps, saveToStorage, { deep: true });

  const clearErrors = () => {
    state.errors = {};
  };

  const validateStep = (stepNumber: number): boolean => {
    clearErrors();
    let schema;
    let dataToValidate;

    switch (stepNumber) {
      case 1:
        schema = identitySchema;
        dataToValidate = state.biodata.identity;
        break;
      case 2:
        schema = religionSchema;
        dataToValidate = state.biodata.religion;
        break;
      case 3:
        schema = locationSchema;
        dataToValidate = state.biodata.residency;
        break;
      case 4:
        schema = educationSchema;
        dataToValidate = state.biodata.education;
        break;
      case 5:
        schema = careerSchema;
        dataToValidate = state.biodata.career;
        break;
      case 6:
        schema = familySchema;
        dataToValidate = state.biodata.family;
        break;
      case 7:
        schema = lifestyleSchema;
        dataToValidate = state.biodata.lifestyle;
        break;
      case 8:
        schema = marriageSchema;
        dataToValidate = state.biodata.marriage;
        break;
      case 9:
        schema = preferenceSchema;
        dataToValidate = state.biodata.preference;
        break;
      case 10:
        schema = verificationSchema;
        dataToValidate = state.biodata.verification;
        break;
      default:
        return true;
    }

    try {
      schema.parse(dataToValidate);
      // If success, add to completed steps if not already there
      if (!state.completedSteps.includes(stepNumber)) {
        state.completedSteps.push(stepNumber);
      }
      return true;
    } catch (err: any) {
      const issues = err.issues ?? err.errors ?? [];
      issues.forEach((e: any) => {
        const key = Array.isArray(e.path) ? e.path.join('.') : '';
        if (key) {
          state.errors[key] = e.message;
        }
      });
      // Remove from completed steps if it fails validation
      state.completedSteps = state.completedSteps.filter(s => s !== stepNumber);
      return false;
    }
  };

  const nextStep = () => {
    if (validateStep(state.currentStep)) {
      if (state.currentStep < 10) {
        state.currentStep++;
        return true;
      }
    }
    return false;
  };

  const prevStep = () => {
    if (state.currentStep > 1) {
      clearErrors();
      state.currentStep--;
      return true;
    }
    return false;
  };

  const goToStep = (stepNumber: number) => {
    if (stepNumber >= 1 && stepNumber <= 10) {
      // Validate all previous steps
      let valid = true;
      for (let i = 1; i < stepNumber; i++) {
        if (!validateStep(i)) {
          valid = false;
          state.currentStep = i;
          break;
        }
      }
      if (valid) {
        state.currentStep = stepNumber;
      }
    }
  };

  const resetForm = () => {
    deepMerge(state.biodata, createDefaultState());
    state.completedSteps = [];
    state.currentStep = 1;
    state.errors = {};
    saveToStorage();
  };

  const isStepComplete = (stepNumber: number) => {
    return state.completedSteps.includes(stepNumber);
  };

  const canAccessStep = (stepNumber: number) => {
    if (stepNumber === 1) return true;
    // Accessible if the previous step is complete
    return isStepComplete(stepNumber - 1);
  };

  // Initialize once on use
  if (typeof window !== 'undefined') {
    initFromStorage();
  }

  return {
    biodata: state.biodata,
    errors: computed(() => state.errors),
    currentStep: computed({
      get: () => state.currentStep,
      set: (val) => goToStep(val)
    }),
    completedSteps: computed(() => state.completedSteps),
    validateStep,
    nextStep,
    prevStep,
    goToStep,
    resetForm,
    isStepComplete,
    canAccessStep,
  };
};
