<script lang="ts" setup>
import type { Biodata } from '~/features/biodata/types/biodata.types';
import { formattedHeight, hasContent, joinList } from '~/templates/useBiodataFormat';

const props = defineProps({
  data: {
    type: Object as () => Biodata,
    required: true
  }
});
</script>

<template>
  <div class="p-8 bg-white border border-slate-200 shadow-sm max-w-4xl mx-auto rounded-lg text-slate-800 font-inter space-y-8 select-none">
    <!-- Header Summary Block -->
    <div class="flex flex-col md:flex-row gap-6 items-center md:items-start justify-between border-b pb-6 border-slate-200">
      <div class="space-y-2 text-center md:text-left">
        <h1 class="text-3xl font-extrabold tracking-tight text-slate-900 font-siliguri">
          {{ hasContent(data.identity.full_name) ? data.identity.full_name : 'Your Name' }}
        </h1>
        <p class="text-sm font-medium text-slate-500 font-playfair uppercase tracking-wide">
          Biodata summary
        </p>
        <div class="flex flex-wrap gap-x-4 gap-y-1 justify-center md:justify-start text-sm text-slate-600 font-inter">
          <span v-if="data.identity.gender">Gender: {{ data.identity.gender }}</span>
          <span v-if="data.religion.religion">Religion: {{ data.religion.religion }}</span>
          <span v-if="data.identity.height">Height: {{ formattedHeight(data.identity.height) }}</span>
          <span v-if="data.career.occupation">Occupation: {{ data.career.occupation }}</span>
        </div>
      </div>
      <!-- Profile Image -->
      <div v-if="data.verification.profile_photo_url" class="w-28 h-28 rounded-full overflow-hidden border border-slate-300 shadow-inner flex-shrink-0">
        <img :src="data.verification.profile_photo_url" class="w-full h-full object-cover" alt="Profile avatar" />
      </div>
    </div>

    <!-- 1. Identity & Account Details -->
    <div class="space-y-4">
      <h2 class="text-lg font-bold text-slate-900 font-playfair border-b pb-1.5 border-slate-300">
        Personal & Identity Details
      </h2>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm font-inter">
        <div v-if="hasContent(data.identity.surname)">
          <span class="block text-xs font-semibold text-slate-400">Nickname</span>
          <span class="font-medium text-slate-700">{{ data.identity.surname }}</span>
        </div>
        <div v-if="hasContent(data.identity.marital_status)">
          <span class="block text-xs font-semibold text-slate-400">Marital Status</span>
          <span class="font-medium text-slate-700">{{ data.identity.marital_status }}</span>
        </div>
        <div v-if="hasContent(data.identity.dob)">
          <span class="block text-xs font-semibold text-slate-400">Date of Birth</span>
          <span class="font-medium text-slate-700">{{ data.identity.dob }}</span>
        </div>
        <div v-if="hasContent(data.identity.weight)">
          <span class="block text-xs font-semibold text-slate-400">Weight</span>
          <span class="font-medium text-slate-700">{{ data.identity.weight }} kg</span>
        </div>
        <div v-if="hasContent(data.identity.skin_type)">
          <span class="block text-xs font-semibold text-slate-400">Complexion</span>
          <span class="font-medium text-slate-700">{{ data.identity.skin_type }}</span>
        </div>
        <div v-if="hasContent(data.identity.body_type)">
          <span class="block text-xs font-semibold text-slate-400">Body Type</span>
          <span class="font-medium text-slate-700">{{ data.identity.body_type }}</span>
        </div>
        <div v-if="hasContent(data.identity.blood_group)">
          <span class="block text-xs font-semibold text-slate-400">Blood Group</span>
          <span class="font-medium text-slate-700">{{ data.identity.blood_group }}</span>
        </div>
        <div v-if="hasContent(data.identity.mother_tongue)">
          <span class="block text-xs font-semibold text-slate-400">Mother Tongue</span>
          <span class="font-medium text-slate-700">{{ data.identity.mother_tongue }}</span>
        </div>
      </div>
      <div v-if="hasContent(data.identity.about_me)" class="text-sm font-inter bg-slate-50 p-3 rounded border border-slate-100">
        <span class="block text-xs font-semibold text-slate-400 mb-1">About Myself</span>
        <p class="text-slate-600 italic whitespace-pre-line">{{ data.identity.about_me }}</p>
      </div>
    </div>

    <!-- 2. Location & Residency Details -->
    <div class="space-y-4">
      <h2 class="text-lg font-bold text-slate-900 font-playfair border-b pb-1.5 border-slate-300">
        Residency & Address
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm font-inter">
        <div>
          <span class="block font-semibold text-slate-500 mb-1 border-b pb-0.5 border-slate-100 text-xs uppercase">Current Location</span>
          <p class="text-slate-700 font-medium">
            Country: {{ data.residency.current_location.cor }}
            <span v-if="data.residency.current_location.cor === 'Bangladesh' && data.residency.current_location.district">
              <br />District: {{ data.residency.current_location.district }}
              <br />Area: {{ data.residency.current_location.sub_district }}, {{ data.residency.current_location.village }}
            </span>
            <span v-else-if="data.residency.current_location.cor !== 'Bangladesh'">
              <br v-if="hasContent(data.residency.current_location.state) || hasContent(data.residency.current_location.city)" />State/City: {{ data.residency.current_location.state }}, {{ data.residency.current_location.city }}
              <br v-if="hasContent(data.residency.current_location.home_address)" />Address: {{ data.residency.current_location.home_address }}
            </span>
          </p>
        </div>

        <div>
          <span class="block font-semibold text-slate-500 mb-1 border-b pb-0.5 border-slate-100 text-xs uppercase">Permanent Location</span>
          <p class="text-slate-700 font-medium">
            Country: {{ data.residency.permanent_location.cor }}
            <span v-if="data.residency.permanent_location.cor === 'Bangladesh' && data.residency.permanent_location.district">
              <br />District: {{ data.residency.permanent_location.district }}
              <br />Area: {{ data.residency.permanent_location.sub_district }}, {{ data.residency.permanent_location.village }}
            </span>
            <span v-else-if="data.residency.permanent_location.cor !== 'Bangladesh'">
              <br v-if="hasContent(data.residency.permanent_location.state) || hasContent(data.residency.permanent_location.city)" />State/City: {{ data.residency.permanent_location.state }}, {{ data.residency.permanent_location.city }}
              <br v-if="hasContent(data.residency.permanent_location.home_address)" />Address: {{ data.residency.permanent_location.home_address }}
            </span>
          </p>
        </div>
      </div>
    </div>

    <!-- 3. Religion Specific -->
    <div v-if="data.religion.religion" class="space-y-4">
      <h2 class="text-lg font-bold text-slate-900 font-playfair border-b pb-1.5 border-slate-300">
        Religious Values & Practices
      </h2>
      <div v-if="data.religion.religion === 'Islam' && data.religion.muslim" class="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm font-inter">
        <div v-if="hasContent(data.religion.muslim.religious_value)">
          <span class="block text-xs font-semibold text-slate-400">Practice Level</span>
          <span class="font-medium text-slate-700">{{ data.religion.muslim.religious_value }}</span>
        </div>
        <div v-if="hasContent(data.religion.muslim.sect)">
          <span class="block text-xs font-semibold text-slate-400">Sect</span>
          <span class="font-medium text-slate-700">{{ data.religion.muslim.sect }}</span>
        </div>
        <div v-if="hasContent(data.religion.muslim.madhab)">
          <span class="block text-xs font-semibold text-slate-400">Madhab</span>
          <span class="font-medium text-slate-700">{{ data.religion.muslim.madhab }}</span>
        </div>
        <div v-if="hasContent(data.religion.muslim.prayer_frequency)">
          <span class="block text-xs font-semibold text-slate-400">Prayer frequency</span>
          <span class="font-medium text-slate-700">{{ data.religion.muslim.prayer_frequency }}</span>
        </div>
        <div v-if="hasContent(data.religion.muslim.fasting_ramadan)">
          <span class="block text-xs font-semibold text-slate-400">Fasts in Ramadan?</span>
          <span class="font-medium text-slate-700">{{ data.religion.muslim.fasting_ramadan }}</span>
        </div>
        <div v-if="hasContent(data.religion.muslim.can_read_quran)">
          <span class="block text-xs font-semibold text-slate-400">Read Quran?</span>
          <span class="font-medium text-slate-700">{{ data.religion.muslim.can_read_quran }}</span>
        </div>
      </div>

      <div v-else-if="data.religion.religion === 'Hinduism' && data.religion.hindu" class="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm font-inter">
        <div v-if="hasContent(data.religion.hindu.religious_value)">
          <span class="block text-xs font-semibold text-slate-400">Practice Level</span>
          <span class="font-medium text-slate-700">{{ data.religion.hindu.religious_value }}</span>
        </div>
        <div v-if="hasContent(data.religion.hindu.caste)">
          <span class="block text-xs font-semibold text-slate-400">Caste</span>
          <span class="font-medium text-slate-700">{{ data.religion.hindu.caste }}</span>
        </div>
        <div v-if="hasContent(data.religion.hindu.gotro)">
          <span class="block text-xs font-semibold text-slate-400">Gotro</span>
          <span class="font-medium text-slate-700">{{ data.religion.hindu.gotro }}</span>
        </div>
        <div v-if="hasContent(data.religion.hindu.dietary)">
          <span class="block text-xs font-semibold text-slate-400">Diet</span>
          <span class="font-medium text-slate-700">{{ data.religion.hindu.dietary }}</span>
        </div>
        <div v-if="hasContent(data.religion.hindu.deity_preference)">
          <span class="block text-xs font-semibold text-slate-400">Deity Preference</span>
          <span class="font-medium text-slate-700">{{ data.religion.hindu.deity_preference }}</span>
        </div>
        <div v-if="hasContent(data.religion.hindu.puja_rituals)">
          <span class="block text-xs font-semibold text-slate-400">Puja Rituals</span>
          <span class="font-medium text-slate-700">{{ data.religion.hindu.puja_rituals }}</span>
        </div>
      </div>

      <div v-else-if="data.religion.religion === 'Christianity' && data.religion.christianity" class="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm font-inter">
        <div v-if="hasContent(data.religion.christianity.religious_value)">
          <span class="block text-xs font-semibold text-slate-400">Practice Level</span>
          <span class="font-medium text-slate-700">{{ data.religion.christianity.religious_value }}</span>
        </div>
        <div v-if="hasContent(data.religion.christianity.denomination)">
          <span class="block text-xs font-semibold text-slate-400">Denomination</span>
          <span class="font-medium text-slate-700">{{ data.religion.christianity.denomination }}</span>
        </div>
        <div v-if="hasContent(data.religion.christianity.prayer_frequency)">
          <span class="block text-xs font-semibold text-slate-400">Prayer frequency</span>
          <span class="font-medium text-slate-700">{{ data.religion.christianity.prayer_frequency }}</span>
        </div>
        <div v-if="hasContent(data.religion.christianity.church_attendance)">
          <span class="block text-xs font-semibold text-slate-400">Church Attendance</span>
          <span class="font-medium text-slate-700">{{ data.religion.christianity.church_attendance }}</span>
        </div>
        <div v-if="hasContent(data.religion.christianity.fasting_practice)">
          <span class="block text-xs font-semibold text-slate-400">Fasting</span>
          <span class="font-medium text-slate-700">{{ data.religion.christianity.fasting_practice }}</span>
        </div>
      </div>

      <div v-else-if="data.religion.religion === 'Buddhism' && data.religion.buddhism" class="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm font-inter">
        <div v-if="hasContent(data.religion.buddhism.religious_value)">
          <span class="block text-xs font-semibold text-slate-400">Practice Level</span>
          <span class="font-medium text-slate-700">{{ data.religion.buddhism.religious_value }}</span>
        </div>
        <div v-if="hasContent(data.religion.buddhism.tradition)">
          <span class="block text-xs font-semibold text-slate-400">Tradition</span>
          <span class="font-medium text-slate-700">{{ data.religion.buddhism.tradition }}</span>
        </div>
        <div v-if="hasContent(data.religion.buddhism.meditation_practice)">
          <span class="block text-xs font-semibold text-slate-400">Meditation</span>
          <span class="font-medium text-slate-700">{{ data.religion.buddhism.meditation_practice }}</span>
        </div>
        <div v-if="hasContent(data.religion.buddhism.temple_attendance)">
          <span class="block text-xs font-semibold text-slate-400">Temple Attendance</span>
          <span class="font-medium text-slate-700">{{ data.religion.buddhism.temple_attendance }}</span>
        </div>
      </div>
    </div>

    <!-- 4. Education -->
    <div v-if="data.education.entries?.length" class="space-y-4">
      <h2 class="text-lg font-bold text-slate-900 font-playfair border-b pb-1.5 border-slate-300">
        Education Details
      </h2>
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse text-sm font-inter">
          <thead>
            <tr class="bg-slate-100 text-slate-500 font-semibold border-b border-slate-200">
              <th class="p-2 border border-slate-200">Degree / Certificate</th>
              <th class="p-2 border border-slate-200">Institution</th>
              <th class="p-2 border border-slate-200">Subject / Group</th>
              <th class="p-2 border border-slate-200">Year</th>
              <th class="p-2 border border-slate-200">GPA/CGPA</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(entry, index) in data.education.entries" :key="index" class="border-b border-slate-200 text-slate-700">
              <td class="p-2 border border-slate-200 font-medium">{{ entry.degree }}</td>
              <td class="p-2 border border-slate-200">{{ entry.institution }}</td>
              <td class="p-2 border border-slate-200">{{ entry.subject }}</td>
              <td class="p-2 border border-slate-200 text-center">{{ entry.completion_year }}</td>
              <td class="p-2 border border-slate-200 text-center">{{ entry.result || '-' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 5. Career details -->
    <div class="space-y-4">
      <h2 class="text-lg font-bold text-slate-900 font-playfair border-b pb-1.5 border-slate-300">
        Career & Occupation Details
      </h2>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm font-inter">
        <div v-if="hasContent(data.career.occupation)">
          <span class="block text-xs font-semibold text-slate-400">Occupation</span>
          <span class="font-medium text-slate-700">{{ data.career.occupation }}</span>
        </div>
        <div v-if="hasContent(data.career.designation)">
          <span class="block text-xs font-semibold text-slate-400">Designation</span>
          <span class="font-medium text-slate-700">{{ data.career.designation }}</span>
        </div>
        <div v-if="hasContent(data.career.work_location)">
          <span class="block text-xs font-semibold text-slate-400">Work Type</span>
          <span class="font-medium text-slate-700">{{ data.career.work_location }}</span>
        </div>
        <div v-if="hasContent(data.career.annual_income)">
          <span class="block text-xs font-semibold text-slate-400">Annual Income</span>
          <span class="font-medium text-slate-700">{{ data.career.annual_income }} {{ data.career.currency }}</span>
        </div>
      </div>
      <div v-if="hasContent(data.career.personal_asset)" class="text-sm font-inter bg-slate-50 p-3 rounded border border-slate-100">
        <span class="block text-xs font-semibold text-slate-400 mb-1">Personal Assets</span>
        <p class="text-slate-600 whitespace-pre-line">{{ data.career.personal_asset }}</p>
      </div>
    </div>

    <!-- 6. Family details -->
    <div class="space-y-4">
      <h2 class="text-lg font-bold text-slate-900 font-playfair border-b pb-1.5 border-slate-300">
        Family Information
      </h2>
      <div class="grid grid-cols-2 gap-4 text-sm font-inter">
        <div v-if="hasContent(data.family.father_name)">
          <span class="block text-xs font-semibold text-slate-400">Father's Name</span>
          <span class="font-medium text-slate-700">{{ data.family.father_name }}</span>
          <span v-if="data.family.father_alive === false" class="text-red-500 font-semibold text-xs ml-1">(Deceased)</span>
        </div>
        <div v-if="hasContent(data.family.mother_name)">
          <span class="block text-xs font-semibold text-slate-400">Mother's Name</span>
          <span class="font-medium text-slate-700">{{ data.family.mother_name }}</span>
          <span v-if="data.family.mother_alive === false" class="text-red-500 font-semibold text-xs ml-1">(Deceased)</span>
        </div>
        <div v-if="hasContent(data.family.financial_condition)">
          <span class="block text-xs font-semibold text-slate-400">Financial Class</span>
          <span class="font-medium text-slate-700">{{ data.family.financial_condition }}</span>
        </div>
        <div v-if="hasContent(data.family.location)">
          <span class="block text-xs font-semibold text-slate-400">Family Resident District</span>
          <span class="font-medium text-slate-700">{{ data.family.location }}</span>
        </div>
        <div v-if="hasContent(data.family.father_occupation)">
          <span class="block text-xs font-semibold text-slate-400">Father's Occupation</span>
          <span class="font-medium text-slate-700">{{ data.family.father_occupation }}</span>
        </div>
        <div v-if="hasContent(data.family.mother_occupation)">
          <span class="block text-xs font-semibold text-slate-400">Mother's Occupation</span>
          <span class="font-medium text-slate-700">{{ data.family.mother_occupation }}</span>
        </div>
      </div>
      <div v-if="data.family.siblings?.siblings_details?.length" class="text-xs font-inter border-t border-slate-100 pt-3">
        <span class="block text-xs font-semibold text-slate-400 mb-2">Siblings</span>
        <div class="space-y-1.5">
          <div
            v-for="sib in data.family.siblings.siblings_details"
            :key="sib.name"
            class="flex flex-wrap gap-x-1 border-b border-slate-100 pb-1.5 text-slate-600"
          >
            <span class="font-semibold text-slate-700">{{ sib.order }}. {{ sib.name }}</span>
            <span v-if="hasContent(sib.profession)">· {{ sib.profession }}</span>
            <span v-if="hasContent(sib.marital_status)">· {{ sib.marital_status }}</span>
            <span v-if="sib.alive === false" class="text-red-500 font-semibold">· Deceased</span>
            <span v-if="hasContent(sib.spouse_name)">· Spouse: {{ sib.spouse_name }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 6b. Marriage Information -->
    <div class="space-y-4">
      <h2 class="text-lg font-bold text-slate-900 font-playfair border-b pb-1.5 border-slate-300">
        Marriage Related Information
      </h2>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm font-inter">
        <div v-if="hasContent(data.marriage.marriage_time)">
          <span class="block text-xs font-semibold text-slate-400">Expected Time</span>
          <span class="font-medium text-slate-700">{{ data.marriage.marriage_time }}</span>
        </div>
        <div v-if="hasContent(data.marriage.guardian_agreed)">
          <span class="block text-xs font-semibold text-slate-400">Guardian Agreement</span>
          <span class="font-medium text-slate-700">{{ data.marriage.guardian_agreed }}</span>
        </div>
      </div>
      <div v-if="hasContent(data.marriage.thoughts_on_marriage)" class="text-sm font-inter bg-slate-50 p-3 rounded border border-slate-100">
        <span class="block text-xs font-semibold text-slate-400 mb-1">Thoughts on Marriage</span>
        <p class="text-slate-600 whitespace-pre-line">{{ data.marriage.thoughts_on_marriage }}</p>
      </div>
    </div>

    <!-- 6c. Health & Lifestyle -->
    <div class="space-y-4">
      <h2 class="text-lg font-bold text-slate-900 font-playfair border-b pb-1.5 border-slate-300">
        Health & Lifestyle
      </h2>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm font-inter">
        <div v-if="hasContent(data.lifestyle.diet)">
          <span class="block text-xs font-semibold text-slate-400">Diet</span>
          <span class="font-medium text-slate-700">{{ data.lifestyle.diet }}</span>
        </div>
        <div v-if="hasContent(data.lifestyle.smoke)">
          <span class="block text-xs font-semibold text-slate-400">Smokes</span>
          <span class="font-medium text-slate-700">{{ data.lifestyle.smoke ? 'Yes' : 'No' }}</span>
        </div>
        <div v-if="hasContent(data.lifestyle.drink)">
          <span class="block text-xs font-semibold text-slate-400">Drinks</span>
          <span class="font-medium text-slate-700">{{ data.lifestyle.drink ? 'Yes' : 'No' }}</span>
        </div>
        <div v-if="hasContent(data.lifestyle.hobbies)">
          <span class="block text-xs font-semibold text-slate-400">Hobbies</span>
          <span class="font-medium text-slate-700">{{ joinList(data.lifestyle.hobbies) }}</span>
        </div>
        <div v-if="hasContent(data.lifestyle.allergic_to)">
          <span class="block text-xs font-semibold text-slate-400">Allergies</span>
          <span class="font-medium text-slate-700">{{ data.lifestyle.allergic_to }}</span>
        </div>
        <div v-if="hasContent(data.lifestyle.chronic_disease)">
          <span class="block text-xs font-semibold text-slate-400">Chronic Disease</span>
          <span class="font-medium text-slate-700">{{ data.lifestyle.chronic_disease ? data.lifestyle.disease_details : 'None' }}</span>
        </div>
      </div>
    </div>

    <!-- 7. Partner Preferences -->
    <div class="space-y-4">
      <h2 class="text-lg font-bold text-slate-900 font-playfair border-b pb-1.5 border-slate-300">
        Partner Preferences
      </h2>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm font-inter">
        <div v-if="data.preference.age_range?.length">
          <span class="block text-xs font-semibold text-slate-400">Preferred Age</span>
          <span class="font-medium text-slate-700">{{ data.preference.age_range[0] }} - {{ data.preference.age_range[1] }} years</span>
        </div>
        <div v-if="data.preference.height_range?.length">
          <span class="block text-xs font-semibold text-slate-400">Preferred Height</span>
          <span class="font-medium text-slate-700">{{ formattedHeight(data.preference.height_range[0]) }} - {{ formattedHeight(data.preference.height_range[1]) }}</span>
        </div>
        <div v-if="hasContent(data.preference.religion)">
          <span class="block text-xs font-semibold text-slate-400">Religion</span>
          <span class="font-medium text-slate-700">{{ data.preference.religion }}</span>
        </div>
        <div v-if="hasContent(data.preference.min_edu_qualification)">
          <span class="block text-xs font-semibold text-slate-400">Min Education</span>
          <span class="font-medium text-slate-700">{{ data.preference.min_edu_qualification }}</span>
        </div>
        <div v-if="hasContent(data.preference.preferred_profession)">
          <span class="block text-xs font-semibold text-slate-400">Preferred Profession</span>
          <span class="font-medium text-slate-700">{{ joinList(data.preference.preferred_profession) }}</span>
        </div>
      </div>
      <div v-if="hasContent(data.preference.expected_qualities)" class="text-sm font-inter bg-slate-50 p-3 rounded border border-slate-100">
        <span class="block text-xs font-semibold text-slate-400 mb-1">Expected Partner Mindset & Qualities</span>
        <p class="text-slate-600 whitespace-pre-line">{{ data.preference.expected_qualities }}</p>
      </div>
    </div>

    <!-- 8. Contact Information -->
    <div
      v-if="hasContent(data.identity.contact_num) || hasContent(data.identity.whatsapp_num) || hasContent(data.identity.fb_link) || hasContent(data.identity.ig_profile_link)"
      class="space-y-4"
    >
      <h2 class="text-lg font-bold text-slate-900 font-playfair border-b pb-1.5 border-slate-300">
        Contact Information
      </h2>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm font-inter">
        <div v-if="hasContent(data.identity.contact_num)">
          <span class="block text-xs font-semibold text-slate-400">Contact</span>
          <span class="font-medium text-slate-700">+{{ data.identity.contact_num_country_code }} {{ data.identity.contact_num }}</span>
        </div>
        <div v-if="hasContent(data.identity.whatsapp_num)">
          <span class="block text-xs font-semibold text-slate-400">WhatsApp</span>
          <span class="font-medium text-slate-700">+{{ data.identity.whatsapp_country_code }} {{ data.identity.whatsapp_num }}</span>
        </div>
        <div v-if="hasContent(data.identity.fb_link)">
          <span class="block text-xs font-semibold text-slate-400">Facebook</span>
          <span class="font-medium text-slate-700 break-all">{{ data.identity.fb_link }}</span>
        </div>
        <div v-if="hasContent(data.identity.ig_profile_link)">
          <span class="block text-xs font-semibold text-slate-400">Instagram</span>
          <span class="font-medium text-slate-700 break-all">{{ data.identity.ig_profile_link }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
