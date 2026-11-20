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
  <div class="p-10 bg-white border border-slate-100 shadow-sm max-w-4xl mx-auto rounded-none text-slate-800 font-inter space-y-10 select-none">
    <!-- Centered Typographical Header -->
    <div class="text-center space-y-3 pb-8 border-b border-slate-100">
      <div class="flex flex-col items-center gap-3">
        <!-- Profile photo -->
        <div v-if="data.verification.profile_photo_url" class="w-24 h-24 rounded-full overflow-hidden border border-slate-200 shadow-sm">
          <img :src="data.verification.profile_photo_url" class="w-full h-full object-cover" alt="Profile avatar" />
        </div>
        <h1 class="text-4xl font-light tracking-wide text-slate-900 font-siliguri">
          {{ hasContent(data.identity.full_name) ? data.identity.full_name : 'Your Name' }}
        </h1>
      </div>
      <div class="flex flex-wrap gap-3 justify-center text-xs font-semibold uppercase tracking-wider text-slate-400 font-bodoni">
        <template v-if="data.identity.gender">
          <span>{{ data.identity.gender }}</span><span>&bull;</span>
        </template>
        <template v-if="data.religion.religion">
          <span>{{ data.religion.religion }}</span><span>&bull;</span>
        </template>
        <template v-if="data.identity.height">
          <span>{{ formattedHeight(data.identity.height) }}</span><span>&bull;</span>
        </template>
        <template v-if="data.career.occupation">
          <span>{{ data.career.occupation }}</span>
        </template>
      </div>
    </div>

    <!-- Details Section layout -->
    <div class="space-y-8 font-inter">
      <!-- 1. Profile section -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="md:col-span-1">
          <h3 class="text-xs font-bold uppercase tracking-widest text-slate-400 font-bodoni">Personal Details</h3>
        </div>
        <div class="md:col-span-2 grid grid-cols-2 gap-y-4 gap-x-6 text-sm">
          <div v-if="hasContent(data.identity.surname)">
            <span class="block text-xs text-slate-400">Nickname</span>
            <span class="font-medium text-slate-800">{{ data.identity.surname }}</span>
          </div>
          <div v-if="hasContent(data.identity.marital_status)">
            <span class="block text-xs text-slate-400">Marital Status</span>
            <span class="font-medium text-slate-800">{{ data.identity.marital_status }}</span>
          </div>
          <div v-if="hasContent(data.identity.dob)">
            <span class="block text-xs text-slate-400">Birth Date</span>
            <span class="font-medium text-slate-800">{{ data.identity.dob }}</span>
          </div>
          <div v-if="hasContent(data.identity.skin_type)">
            <span class="block text-xs text-slate-400">Complexion</span>
            <span class="font-medium text-slate-800">{{ data.identity.skin_type }}</span>
          </div>
          <div v-if="hasContent(data.identity.body_type)">
            <span class="block text-xs text-slate-400">Body Type</span>
            <span class="font-medium text-slate-800">{{ data.identity.body_type }}</span>
          </div>
          <div v-if="data.identity.weight !== null && data.identity.weight !== undefined">
            <span class="block text-xs text-slate-400">Weight</span>
            <span class="font-medium text-slate-800">{{ data.identity.weight }} kg</span>
          </div>
          <div v-if="hasContent(data.identity.blood_group)">
            <span class="block text-xs text-slate-400">Blood Group</span>
            <span class="font-medium text-slate-800">{{ data.identity.blood_group }}</span>
          </div>
          <div v-if="hasContent(data.identity.mother_tongue)">
            <span class="block text-xs text-slate-400">Mother Tongue</span>
            <span class="font-medium text-slate-800">{{ data.identity.mother_tongue }}</span>
          </div>
        </div>
      </div>

      <div v-if="hasContent(data.identity.about_me)" class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="md:col-span-1">
          <h3 class="text-xs font-bold uppercase tracking-widest text-slate-400 font-bodoni">About</h3>
        </div>
        <div class="md:col-span-2 text-sm">
          <p class="text-slate-600 italic whitespace-pre-line">{{ data.identity.about_me }}</p>
        </div>
      </div>

      <!-- Divider line -->
      <div class="h-[1px] bg-slate-100"></div>

      <!-- 2. Address / Location section -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="md:col-span-1">
          <h3 class="text-xs font-bold uppercase tracking-widest text-slate-400 font-bodoni">Residency</h3>
        </div>
        <div class="md:col-span-2 space-y-4 text-sm">
          <div>
            <span class="block text-xs text-slate-400">Current Residence</span>
            <span class="font-medium text-slate-800">
              {{ data.residency.current_location.cor }}
              <span v-if="data.residency.current_location.cor === 'Bangladesh' && data.residency.current_location.district">
                - {{ data.residency.current_location.district }}, {{ data.residency.current_location.sub_district }}
              </span>
              <span v-else-if="data.residency.current_location.cor !== 'Bangladesh' && hasContent(data.residency.current_location.city)">
                - {{ data.residency.current_location.city }}
              </span>
            </span>
          </div>
          <div>
            <span class="block text-xs text-slate-400">Permanent Residence</span>
            <span class="font-medium text-slate-800">
              {{ data.residency.permanent_location.cor }}
              <span v-if="data.residency.permanent_location.cor === 'Bangladesh' && data.residency.permanent_location.district">
                - {{ data.residency.permanent_location.district }}, {{ data.residency.permanent_location.sub_district }}
              </span>
              <span v-else-if="data.residency.permanent_location.cor !== 'Bangladesh' && hasContent(data.residency.permanent_location.city)">
                - {{ data.residency.permanent_location.city }}
              </span>
            </span>
          </div>
        </div>
      </div>

      <!-- Divider line -->
      <div class="h-[1px] bg-slate-100"></div>

      <!-- 3. Religion section -->
      <div v-if="data.religion.religion" class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="md:col-span-1">
          <h3 class="text-xs font-bold uppercase tracking-widest text-slate-400 font-bodoni">Religion</h3>
        </div>
        <div class="md:col-span-2 grid grid-cols-2 gap-y-4 gap-x-6 text-sm">
          <div v-if="data.religion.religion === 'Islam' && data.religion.muslim">
            <template v-if="hasContent(data.religion.muslim.sect)">
              <span class="block text-xs text-slate-400">Sect / Madhab</span>
              <span class="font-medium text-slate-800">{{ data.religion.muslim.sect }}<span v-if="data.religion.muslim.madhab"> · {{ data.religion.muslim.madhab }}</span></span>
            </template>
            <template v-else>
              <span class="block text-xs text-slate-400">Religion</span>
              <span class="font-medium text-slate-800">{{ data.religion.religion }}</span>
            </template>
          </div>
          <template v-else-if="data.religion.religion === 'Hinduism' && data.religion.hindu">
            <div v-if="hasContent(data.religion.hindu.caste)">
              <span class="block text-xs text-slate-400">Caste / Gotro</span>
              <span class="font-medium text-slate-800">{{ data.religion.hindu.caste }}<span v-if="data.religion.hindu.gotro"> · {{ data.religion.hindu.gotro }}</span></span>
            </div>
          </template>
          <template v-else-if="data.religion.religion === 'Christianity' && data.religion.christianity">
            <div v-if="hasContent(data.religion.christianity.denomination)">
              <span class="block text-xs text-slate-400">Denomination</span>
              <span class="font-medium text-slate-800">{{ data.religion.christianity.denomination }}</span>
            </div>
          </template>
          <template v-else-if="data.religion.religion === 'Buddhism' && data.religion.buddhism">
            <div v-if="hasContent(data.religion.buddhism.tradition)">
              <span class="block text-xs text-slate-400">Tradition</span>
              <span class="font-medium text-slate-800">{{ data.religion.buddhism.tradition }}</span>
            </div>
          </template>
          <div v-else>
            <span class="block text-xs text-slate-400">Religion</span>
            <span class="font-medium text-slate-800">{{ data.religion.religion }}</span>
          </div>
          <div v-if="data.religion.muslim && hasContent(data.religion.muslim.prayer_frequency)">
            <span class="block text-xs text-slate-400">Prayer</span>
            <span class="font-medium text-slate-800">{{ data.religion.muslim.prayer_frequency }}</span>
          </div>
        </div>
      </div>

      <!-- Divider line -->
      <div class="h-[1px] bg-slate-100"></div>

      <!-- 4. Education entries -->
      <div v-if="data.education.entries?.length" class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="md:col-span-1">
          <h3 class="text-xs font-bold uppercase tracking-widest text-slate-400 font-bodoni">Education</h3>
        </div>
        <div class="md:col-span-2 space-y-4 text-sm">
          <div v-for="(entry, index) in data.education.entries" :key="index" class="space-y-1">
            <div class="flex justify-between font-medium text-slate-800">
              <span>{{ entry.degree }}</span>
              <span class="text-xs text-slate-400 font-normal">{{ entry.completion_year }}</span>
            </div>
            <p class="text-xs text-slate-500 font-medium">{{ entry.institution }} &bull; {{ entry.subject }}<span v-if="entry.result"> &bull; {{ entry.result }}</span></p>
          </div>
        </div>
      </div>

      <!-- Divider line -->
      <div class="h-[1px] bg-slate-100"></div>

      <!-- 5. Career section -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="md:col-span-1">
          <h3 class="text-xs font-bold uppercase tracking-widest text-slate-400 font-bodoni">Career</h3>
        </div>
        <div class="md:col-span-2 grid grid-cols-2 gap-y-4 gap-x-6 text-sm">
          <div v-if="hasContent(data.career.occupation)">
            <span class="block text-xs text-slate-400">Occupation</span>
            <span class="font-medium text-slate-800">{{ data.career.occupation }}</span>
          </div>
          <div v-if="hasContent(data.career.designation)">
            <span class="block text-xs text-slate-400">Designation</span>
            <span class="font-medium text-slate-800">{{ data.career.designation }}</span>
          </div>
          <div v-if="hasContent(data.career.work_location)">
            <span class="block text-xs text-slate-400">Work Type</span>
            <span class="font-medium text-slate-800">{{ data.career.work_location }}</span>
          </div>
          <div v-if="hasContent(data.career.annual_income)">
            <span class="block text-xs text-slate-400">Annual Income</span>
            <span class="font-medium text-slate-800">{{ data.career.annual_income }} {{ data.career.currency }}</span>
          </div>
        </div>
      </div>

      <!-- Divider line -->
      <div class="h-[1px] bg-slate-100"></div>

      <!-- 6. Family section -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="md:col-span-1">
          <h3 class="text-xs font-bold uppercase tracking-widest text-slate-400 font-bodoni">Family</h3>
        </div>
        <div class="md:col-span-2 grid grid-cols-2 gap-y-4 gap-x-6 text-sm">
          <div v-if="hasContent(data.family.father_name)">
            <span class="block text-xs text-slate-400">Father's Name</span>
            <span class="font-medium text-slate-800">{{ data.family.father_name }}<span v-if="data.family.father_alive === false" class="text-red-500 text-xs"> (Deceased)</span></span>
          </div>
          <div v-if="hasContent(data.family.mother_name)">
            <span class="block text-xs text-slate-400">Mother's Name</span>
            <span class="font-medium text-slate-800">{{ data.family.mother_name }}<span v-if="data.family.mother_alive === false" class="text-red-500 text-xs"> (Deceased)</span></span>
          </div>
          <div v-if="hasContent(data.family.type)">
            <span class="block text-xs text-slate-400">Family Type</span>
            <span class="font-medium text-slate-800">{{ data.family.type }}</span>
          </div>
          <div v-if="hasContent(data.family.financial_condition)">
            <span class="block text-xs text-slate-400">Financial Class</span>
            <span class="font-medium text-slate-800">{{ data.family.financial_condition }}</span>
          </div>
        </div>
      </div>

      <!-- Divider line -->
      <div class="h-[1px] bg-slate-100"></div>

      <!-- 7. Partner preference -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="md:col-span-1">
          <h3 class="text-xs font-bold uppercase tracking-widest text-slate-400 font-bodoni">Preferences</h3>
        </div>
        <div class="md:col-span-2 space-y-4 text-sm">
          <div class="grid grid-cols-2 gap-4">
            <div v-if="data.preference.age_range?.length">
              <span class="block text-xs text-slate-400">Age Range</span>
              <span class="font-medium text-slate-800">{{ data.preference.age_range[0] }} - {{ data.preference.age_range[1] }} years</span>
            </div>
            <div v-if="data.preference.height_range?.length">
              <span class="block text-xs text-slate-400">Height Range</span>
              <span class="font-medium text-slate-800">{{ formattedHeight(data.preference.height_range[0]) }} - {{ formattedHeight(data.preference.height_range[1]) }}</span>
            </div>
            <div v-if="hasContent(data.preference.religion)">
              <span class="block text-xs text-slate-400">Religion</span>
              <span class="font-medium text-slate-800">{{ data.preference.religion }}</span>
            </div>
            <div v-if="hasContent(data.preference.min_edu_qualification)">
              <span class="block text-xs text-slate-400">Min Education</span>
              <span class="font-medium text-slate-800">{{ data.preference.min_edu_qualification }}</span>
            </div>
          </div>
          <div v-if="hasContent(data.preference.expected_qualities)" class="text-xs italic text-slate-500 bg-slate-50 p-3 rounded">
            "{{ data.preference.expected_qualities }}"
          </div>
        </div>
      </div>

      <!-- Divider line -->
      <div class="h-[1px] bg-slate-100"></div>

      <!-- 8. Contact section -->
      <div v-if="hasContent(data.identity.contact_num) || hasContent(data.identity.whatsapp_num)" class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="md:col-span-1">
          <h3 class="text-xs font-bold uppercase tracking-widest text-slate-400 font-bodoni">Contact</h3>
        </div>
        <div class="md:col-span-2 grid grid-cols-2 gap-y-4 gap-x-6 text-sm">
          <div v-if="hasContent(data.identity.contact_num)">
            <span class="block text-xs text-slate-400">Contact</span>
            <span class="font-medium text-slate-800">+{{ data.identity.contact_num_country_code }} {{ data.identity.contact_num }}</span>
          </div>
          <div v-if="hasContent(data.identity.whatsapp_num)">
            <span class="block text-xs text-slate-400">WhatsApp</span>
            <span class="font-medium text-slate-800">+{{ data.identity.whatsapp_country_code }} {{ data.identity.whatsapp_num }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>