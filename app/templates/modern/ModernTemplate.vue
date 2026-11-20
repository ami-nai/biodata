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
  <div class="p-8 bg-slate-50 border border-slate-200 shadow-lg max-w-4xl mx-auto rounded-2xl text-slate-800 font-inter space-y-6 select-none">
    <!-- Header Block with Curved Badge design -->
    <div class="bg-gradient-to-r from-primary to-blue-600 text-white rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
      <div class="space-y-2 text-center md:text-left">
        <span class="inline-block bg-white/20 text-white text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
          Profile CV
        </span>
        <h1 class="text-3xl font-extrabold tracking-tight font-siliguri">
          {{ hasContent(data.identity.full_name) ? data.identity.full_name : 'Your Name' }}
        </h1>
        <div class="flex flex-wrap gap-x-4 gap-y-1 justify-center md:justify-start text-sm text-white/80 font-medium">
          <span v-if="data.identity.gender">Gender: {{ data.identity.gender }}</span>
          <span v-if="data.religion.religion">Religion: {{ data.religion.religion }}</span>
          <span v-if="data.identity.height">Height: {{ formattedHeight(data.identity.height) }}</span>
          <span v-if="data.career.occupation">Occupation: {{ data.career.occupation }}</span>
        </div>
      </div>
      <!-- Avatar with shadow ring -->
      <div v-if="data.verification.profile_photo_url" class="w-24 h-24 rounded-full overflow-hidden border-4 border-white/30 shadow-lg flex-shrink-0">
        <img :src="data.verification.profile_photo_url" class="w-full h-full object-cover" alt="Profile avatar" />
      </div>
    </div>

    <!-- Main Grid Layout -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

      <!-- Left Column - Identity & Location -->
      <div class="space-y-6">
        <!-- Personal details card -->
        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 class="text-sm font-bold text-slate-900 border-b pb-2 border-slate-100 uppercase tracking-wider flex items-center gap-2">
            <UIcon name="i-lucide-user" class="text-primary w-4 h-4" /> Personal Information
          </h3>
          <div class="grid grid-cols-2 gap-4 text-xs font-inter">
            <div v-if="hasContent(data.identity.surname)">
              <span class="block text-slate-400 font-semibold mb-0.5">Nickname</span>
              <span class="font-bold text-slate-700 text-sm">{{ data.identity.surname }}</span>
            </div>
            <div v-if="hasContent(data.identity.marital_status)">
              <span class="block text-slate-400 font-semibold mb-0.5">Marital Status</span>
              <span class="font-bold text-slate-700 text-sm">{{ data.identity.marital_status }}</span>
            </div>
            <div v-if="hasContent(data.identity.dob)">
              <span class="block text-slate-400 font-semibold mb-0.5">DOB</span>
              <span class="font-bold text-slate-700 text-sm">{{ data.identity.dob }}</span>
            </div>
            <div v-if="hasContent(data.identity.weight)">
              <span class="block text-slate-400 font-semibold mb-0.5">Weight</span>
              <span class="font-bold text-slate-700 text-sm">{{ data.identity.weight }} kg</span>
            </div>
            <div v-if="hasContent(data.identity.skin_type)">
              <span class="block text-slate-400 font-semibold mb-0.5">Complexion</span>
              <span class="font-bold text-slate-700 text-sm">{{ data.identity.skin_type }}</span>
            </div>
            <div v-if="hasContent(data.identity.body_type)">
              <span class="block text-slate-400 font-semibold mb-0.5">Body Type</span>
              <span class="font-bold text-slate-700 text-sm">{{ data.identity.body_type }}</span>
            </div>
            <div v-if="hasContent(data.identity.blood_group)">
              <span class="block text-slate-400 font-semibold mb-0.5">Blood Group</span>
              <span class="font-bold text-slate-700 text-sm">{{ data.identity.blood_group }}</span>
            </div>
            <div v-if="hasContent(data.identity.mother_tongue)">
              <span class="block text-slate-400 font-semibold mb-0.5">Mother Tongue</span>
              <span class="font-bold text-slate-700 text-sm">{{ data.identity.mother_tongue }}</span>
            </div>
          </div>
          <div v-if="hasContent(data.identity.about_me)" class="text-xs font-inter bg-slate-50 p-3 rounded-xl border border-slate-100">
            <span class="block font-bold text-slate-500 mb-1">About Myself</span>
            <p class="text-slate-600 italic whitespace-pre-line">{{ data.identity.about_me }}</p>
          </div>
        </div>

        <!-- Location card -->
        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 class="text-sm font-bold text-slate-900 border-b pb-2 border-slate-100 uppercase tracking-wider flex items-center gap-2">
            <UIcon name="i-lucide-map-pin" class="text-primary w-4 h-4" /> Residency details
          </h3>
          <div class="space-y-3 text-xs font-inter">
            <div>
              <span class="block text-slate-400 font-semibold mb-0.5">Current Address</span>
              <span class="font-bold text-slate-700 text-sm">
                {{ data.residency.current_location.cor }}
                <span v-if="data.residency.current_location.district">
                  ({{ data.residency.current_location.district }})
                </span>
                <span v-if="data.residency.current_location.cor !== 'Bangladesh' && data.residency.current_location.city">
                  - {{ data.residency.current_location.city }}
                </span>
              </span>
            </div>
            <div>
              <span class="block text-slate-400 font-semibold mb-0.5">Permanent Address</span>
              <span class="font-bold text-slate-700 text-sm">
                {{ data.residency.permanent_location.cor }}
                <span v-if="data.residency.permanent_location.district">
                  ({{ data.residency.permanent_location.district }})
                </span>
                <span v-if="data.residency.permanent_location.cor !== 'Bangladesh' && data.residency.permanent_location.city">
                  - {{ data.residency.permanent_location.city }}
                </span>
              </span>
            </div>
          </div>
        </div>

        <!-- Religion card -->
        <div v-if="data.religion.religion" class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 class="text-sm font-bold text-slate-900 border-b pb-2 border-slate-100 uppercase tracking-wider flex items-center gap-2">
            <UIcon name="i-lucide-moon-star" class="text-primary w-4 h-4" /> Religious Values
          </h3>
          <div class="grid grid-cols-2 gap-4 text-xs font-inter">
            <template v-if="data.religion.religion === 'Islam' && data.religion.muslim">
              <div v-if="hasContent(data.religion.muslim.religious_value)">
                <span class="block text-slate-400 font-semibold mb-0.5">Practice Level</span>
                <span class="font-bold text-slate-700 text-sm">{{ data.religion.muslim.religious_value }}</span>
              </div>
              <div v-if="hasContent(data.religion.muslim.sect)">
                <span class="block text-slate-400 font-semibold mb-0.5">Sect</span>
                <span class="font-bold text-slate-700 text-sm">{{ data.religion.muslim.sect }}</span>
              </div>
              <div v-if="hasContent(data.religion.muslim.prayer_frequency)">
                <span class="block text-slate-400 font-semibold mb-0.5">Prayer</span>
                <span class="font-bold text-slate-700 text-sm">{{ data.religion.muslim.prayer_frequency }}</span>
              </div>
              <div v-if="hasContent(data.religion.muslim.fasting_ramadan)">
                <span class="block text-slate-400 font-semibold mb-0.5">Fasting</span>
                <span class="font-bold text-slate-700 text-sm">{{ data.religion.muslim.fasting_ramadan }}</span>
              </div>
              <div v-if="hasContent(data.religion.muslim.hajj_performed)">
                <span class="block text-slate-400 font-semibold mb-0.5">Hajj</span>
                <span class="font-bold text-slate-700 text-sm">{{ data.religion.muslim.hajj_performed }}</span>
              </div>
            </template>
            <template v-else-if="data.religion.religion === 'Hinduism' && data.religion.hindu">
              <div v-if="hasContent(data.religion.hindu.caste)">
                <span class="block text-slate-400 font-semibold mb-0.5">Caste</span>
                <span class="font-bold text-slate-700 text-sm">{{ data.religion.hindu.caste }}</span>
              </div>
              <div v-if="hasContent(data.religion.hindu.gotro)">
                <span class="block text-slate-400 font-semibold mb-0.5">Gotro</span>
                <span class="font-bold text-slate-700 text-sm">{{ data.religion.hindu.gotro }}</span>
              </div>
              <div v-if="hasContent(data.religion.hindu.puja_rituals)">
                <span class="block text-slate-400 font-semibold mb-0.5">Puja Rituals</span>
                <span class="font-bold text-slate-700 text-sm">{{ data.religion.hindu.puja_rituals }}</span>
              </div>
            </template>
            <template v-else-if="data.religion.religion === 'Christianity' && data.religion.christianity">
              <div v-if="hasContent(data.religion.christianity.denomination)">
                <span class="block text-slate-400 font-semibold mb-0.5">Denomination</span>
                <span class="font-bold text-slate-700 text-sm">{{ data.religion.christianity.denomination }}</span>
              </div>
              <div v-if="hasContent(data.religion.christianity.church_attendance)">
                <span class="block text-slate-400 font-semibold mb-0.5">Church Attendance</span>
                <span class="font-bold text-slate-700 text-sm">{{ data.religion.christianity.church_attendance }}</span>
              </div>
            </template>
            <template v-else-if="data.religion.religion === 'Buddhism' && data.religion.buddhism">
              <div v-if="hasContent(data.religion.buddhism.tradition)">
                <span class="block text-slate-400 font-semibold mb-0.5">Tradition</span>
                <span class="font-bold text-slate-700 text-sm">{{ data.religion.buddhism.tradition }}</span>
              </div>
              <div v-if="hasContent(data.religion.buddhism.meditation_practice)">
                <span class="block text-slate-400 font-semibold mb-0.5">Meditation</span>
                <span class="font-bold text-slate-700 text-sm">{{ data.religion.buddhism.meditation_practice }}</span>
              </div>
            </template>
          </div>
        </div>
      </div>

      <!-- Right Column - Education & Occupation -->
      <div class="space-y-6">
        <!-- Career info card -->
        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 class="text-sm font-bold text-slate-900 border-b pb-2 border-slate-100 uppercase tracking-wider flex items-center gap-2">
            <UIcon name="i-lucide-briefcase" class="text-primary w-4 h-4" /> Career details
          </h3>
          <div class="grid grid-cols-2 gap-4 text-xs font-inter">
            <div v-if="hasContent(data.career.occupation)">
              <span class="block text-slate-400 font-semibold mb-0.5">Occupation</span>
              <span class="font-bold text-slate-700 text-sm">{{ data.career.occupation }}</span>
            </div>
            <div v-if="hasContent(data.career.designation)">
              <span class="block text-slate-400 font-semibold mb-0.5">Designation</span>
              <span class="font-bold text-slate-700 text-sm">{{ data.career.designation }}</span>
            </div>
            <div v-if="hasContent(data.career.work_location)">
              <span class="block text-slate-400 font-semibold mb-0.5">Work Type</span>
              <span class="font-bold text-slate-700 text-sm">{{ data.career.work_location }}</span>
            </div>
            <div v-if="hasContent(data.career.annual_income)">
              <span class="block text-slate-400 font-semibold mb-0.5">Annual Income</span>
              <span class="font-bold text-slate-700 text-sm">{{ data.career.annual_income }} {{ data.career.currency }}</span>
            </div>
          </div>
        </div>

        <!-- Family short summary card -->
        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 class="text-sm font-bold text-slate-900 border-b pb-2 border-slate-100 uppercase tracking-wider flex items-center gap-2">
            <UIcon name="i-lucide-users" class="text-primary w-4 h-4" /> Family details
          </h3>
          <div class="grid grid-cols-2 gap-4 text-xs font-inter">
            <div v-if="hasContent(data.family.father_name)">
              <span class="block text-slate-400 font-semibold mb-0.5">Father's Name</span>
              <span class="font-bold text-slate-700 text-sm">{{ data.family.father_name }}<span v-if="data.family.father_alive === false" class="text-red-500 text-xs"> (Deceased)</span></span>
            </div>
            <div v-if="hasContent(data.family.mother_name)">
              <span class="block text-slate-400 font-semibold mb-0.5">Mother's Name</span>
              <span class="font-bold text-slate-700 text-sm">{{ data.family.mother_name }}<span v-if="data.family.mother_alive === false" class="text-red-500 text-xs"> (Deceased)</span></span>
            </div>
            <div v-if="hasContent(data.family.type)">
              <span class="block text-slate-400 font-semibold mb-0.5">Family Type</span>
              <span class="font-bold text-slate-700 text-sm">{{ data.family.type }}</span>
            </div>
            <div v-if="hasContent(data.family.financial_condition)">
              <span class="block text-slate-400 font-semibold mb-0.5">Financial Class</span>
              <span class="font-bold text-slate-700 text-sm">{{ data.family.financial_condition }}</span>
            </div>
          </div>
          <div v-if="data.family.siblings?.siblings_details?.length" class="text-xs font-inter border-t border-slate-100 pt-3">
            <span class="block text-slate-400 font-semibold mb-1">Siblings</span>
            <div class="space-y-1">
              <div v-for="sib in data.family.siblings.siblings_details" :key="sib.name" class="flex flex-wrap gap-x-1 text-slate-600">
                <span class="font-bold text-slate-700">{{ sib.order }}. {{ sib.name }}</span>
                <span v-if="hasContent(sib.profession)">· {{ sib.profession }}</span>
                <span v-if="hasContent(sib.marital_status)">· {{ sib.marital_status }}</span>
                <span v-if="sib.alive === false" class="text-red-500 font-semibold">· Deceased</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Lifestyle card -->
        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 class="text-sm font-bold text-slate-900 border-b pb-2 border-slate-100 uppercase tracking-wider flex items-center gap-2">
            <UIcon name="i-lucide-heart-pulse" class="text-primary w-4 h-4" /> Health & Lifestyle
          </h3>
          <div class="grid grid-cols-2 gap-4 text-xs font-inter">
            <div v-if="hasContent(data.lifestyle.diet)">
              <span class="block text-slate-400 font-semibold mb-0.5">Diet</span>
              <span class="font-bold text-slate-700 text-sm">{{ data.lifestyle.diet }}</span>
            </div>
            <div v-if="hasContent(data.lifestyle.smoke)">
              <span class="block text-slate-400 font-semibold mb-0.5">Smokes</span>
              <span class="font-bold text-slate-700 text-sm">{{ data.lifestyle.smoke ? 'Yes' : 'No' }}</span>
            </div>
            <div v-if="hasContent(data.lifestyle.drink)">
              <span class="block text-slate-400 font-semibold mb-0.5">Drinks</span>
              <span class="font-bold text-slate-700 text-sm">{{ data.lifestyle.drink ? 'Yes' : 'No' }}</span>
            </div>
            <div v-if="hasContent(data.lifestyle.hobbies)">
              <span class="block text-slate-400 font-semibold mb-0.5">Hobbies</span>
              <span class="font-bold text-slate-700 text-sm">{{ joinList(data.lifestyle.hobbies) }}</span>
            </div>
          </div>
        </div>

        <!-- Marriage card -->
        <div v-if="hasContent(data.marriage.marriage_time) || hasContent(data.marriage.thoughts_on_marriage) || hasContent(data.marriage.guardian_agreed)" class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 class="text-sm font-bold text-slate-900 border-b pb-2 border-slate-100 uppercase tracking-wider flex items-center gap-2">
            <UIcon name="i-lucide-heart" class="text-primary w-4 h-4" /> Marriage Information
          </h3>
          <div class="grid grid-cols-2 gap-4 text-xs font-inter">
            <div v-if="hasContent(data.marriage.marriage_time)">
              <span class="block text-slate-400 font-semibold mb-0.5">Expected Time</span>
              <span class="font-bold text-slate-700 text-sm">{{ data.marriage.marriage_time }}</span>
            </div>
            <div v-if="hasContent(data.marriage.guardian_agreed)">
              <span class="block text-slate-400 font-semibold mb-0.5">Guardian Agreement</span>
              <span class="font-bold text-slate-700 text-sm">{{ data.marriage.guardian_agreed }}</span>
            </div>
          </div>
          <div v-if="hasContent(data.marriage.thoughts_on_marriage)" class="text-xs font-inter bg-slate-50 p-3 rounded-xl border border-slate-100 mt-2">
            <span class="block font-bold text-slate-500 mb-1">Thoughts on Marriage</span>
            <p class="text-slate-600 italic whitespace-pre-line">{{ data.marriage.thoughts_on_marriage }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Education card block (full width) -->
    <div v-if="data.education.entries?.length" class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
      <h3 class="text-sm font-bold text-slate-900 border-b pb-2 border-slate-100 uppercase tracking-wider flex items-center gap-2">
        <UIcon name="i-lucide-graduation-cap" class="text-primary w-4 h-4" /> Educational History
      </h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div
          v-for="(entry, index) in data.education.entries"
          :key="index"
          class="p-4 rounded-xl border border-slate-100 bg-slate-50 flex flex-col justify-between gap-1 text-xs font-inter"
        >
          <div>
            <h4 class="font-bold text-sm text-slate-800">{{ entry.degree }}</h4>
            <p class="text-slate-500 font-medium mt-0.5">{{ entry.institution }}</p>
            <p class="text-slate-400 font-medium mt-0.5">Subject: {{ entry.subject }}</p>
          </div>
          <div class="flex justify-between items-center mt-3 pt-2 border-t border-slate-200/60 font-semibold text-slate-600">
            <span>Year: {{ entry.completion_year }}</span>
            <span v-if="entry.result">Result: {{ entry.result }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Partner preference card block -->
    <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
      <h3 class="text-sm font-bold text-slate-900 border-b pb-2 border-slate-100 uppercase tracking-wider flex items-center gap-2">
        <UIcon name="i-lucide-heart-handshake" class="text-primary w-4 h-4" /> Ideal Partner Preferences
      </h3>
      <div class="grid grid-cols-2 gap-4 text-xs font-inter">
        <div v-if="data.preference.age_range?.length">
          <span class="block text-slate-400 font-semibold mb-0.5">Preferred Age</span>
          <span class="font-bold text-slate-700 text-sm">{{ data.preference.age_range[0] }} - {{ data.preference.age_range[1] }} years</span>
        </div>
        <div v-if="data.preference.height_range?.length">
          <span class="block text-slate-400 font-semibold mb-0.5">Preferred Height</span>
          <span class="font-bold text-slate-700 text-sm">{{ formattedHeight(data.preference.height_range[0]) }} - {{ formattedHeight(data.preference.height_range[1]) }}</span>
        </div>
        <div v-if="hasContent(data.preference.religion)">
          <span class="block text-slate-400 font-semibold mb-0.5">Preferred Religion</span>
          <span class="font-bold text-slate-700 text-sm">{{ data.preference.religion }}</span>
        </div>
        <div v-if="hasContent(data.preference.min_edu_qualification)">
          <span class="block text-slate-400 font-semibold mb-0.5">Min Education</span>
          <span class="font-bold text-slate-700 text-sm">{{ data.preference.min_edu_qualification }}</span>
        </div>
        <div v-if="hasContent(data.preference.preferred_profession)">
          <span class="block text-slate-400 font-semibold mb-0.5">Preferred Profession</span>
          <span class="font-bold text-slate-700 text-sm">{{ joinList(data.preference.preferred_profession) }}</span>
        </div>
      </div>
      <div v-if="hasContent(data.preference.expected_qualities)" class="text-xs font-inter bg-slate-50 p-3 rounded-xl border border-slate-100 mt-2">
        <span class="block font-bold text-slate-500 mb-1">Expected Qualities</span>
        <p class="text-slate-600 italic whitespace-pre-line">{{ data.preference.expected_qualities }}</p>
      </div>
    </div>

    <!-- Contact card -->
    <div v-if="hasContent(data.identity.contact_num) || hasContent(data.identity.whatsapp_num)" class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
      <h3 class="text-sm font-bold text-slate-900 border-b pb-2 border-slate-100 uppercase tracking-wider flex items-center gap-2">
        <UIcon name="i-lucide-phone" class="text-primary w-4 h-4" /> Contact Information
      </h3>
      <div class="grid grid-cols-2 gap-4 text-xs font-inter">
        <div v-if="hasContent(data.identity.contact_num)">
          <span class="block text-slate-400 font-semibold mb-0.5">Contact</span>
          <span class="font-bold text-slate-700 text-sm">+{{ data.identity.contact_num_country_code }} {{ data.identity.contact_num }}</span>
        </div>
        <div v-if="hasContent(data.identity.whatsapp_num)">
          <span class="block text-slate-400 font-semibold mb-0.5">WhatsApp</span>
          <span class="font-bold text-slate-700 text-sm">+{{ data.identity.whatsapp_country_code }} {{ data.identity.whatsapp_num }}</span>
        </div>
      </div>
    </div>
  </div>
</template>