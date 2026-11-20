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
  <div class="p-8 bg-white border-t-8 border-emerald-600 border-x border-b border-slate-200 shadow-md max-w-4xl mx-auto rounded-lg text-slate-800 font-inter space-y-8 select-none">
    <!-- Islamic Callout or Header Bismillah -->
    <div class="text-center space-y-1 pb-4">
      <div class="text-emerald-700 text-xs font-semibold tracking-widest uppercase font-inter">
        بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
      </div>
      <p class="text-xs text-slate-400 font-medium font-cinzel">In the name of Allah, the Most Gracious, the Most Merciful</p>
    </div>

    <!-- Header Block -->
    <div class="flex flex-col md:flex-row gap-6 items-center md:items-start justify-between border-b pb-6 border-slate-200">
      <div class="space-y-2 text-center md:text-left">
        <h1 class="text-3xl font-extrabold tracking-tight text-emerald-800 font-siliguri">
          {{ hasContent(data.identity.full_name) ? data.identity.full_name : 'Your Name' }}
        </h1>
        <p class="text-xs font-semibold text-emerald-600 uppercase tracking-widest font-cinzel">
          Islamic Marriage Profile
        </p>
        <div class="flex flex-wrap gap-x-4 gap-y-1 justify-center md:justify-start text-sm text-slate-600 font-inter">
          <span v-if="data.identity.gender">Gender: {{ data.identity.gender }}</span>
          <span v-if="data.religion.religion">Religion: {{ data.religion.religion }}</span>
          <span v-if="data.identity.height">Height: {{ formattedHeight(data.identity.height) }}</span>
          <span v-if="data.career.occupation">Occupation: {{ data.career.occupation }}</span>
        </div>
      </div>
      <!-- Profile Image -->
      <div v-if="data.verification.profile_photo_url" class="w-28 h-28 rounded-full overflow-hidden border-2 border-emerald-600/30 shadow-inner flex-shrink-0">
        <img :src="data.verification.profile_photo_url" class="w-full h-full object-cover" alt="Profile avatar" />
      </div>
    </div>

    <!-- Islamic / Muslim Specific Practices Highlight (First Page) -->
    <div v-if="data.religion.religion === 'Islam' && data.religion.muslim" class="bg-emerald-50/50 p-5 rounded-2xl border border-emerald-100 space-y-4">
      <h3 class="text-sm font-bold text-emerald-800 border-b pb-2 border-emerald-100 uppercase tracking-wider flex items-center gap-2">
        <UIcon name="i-lucide-book-open" class="text-emerald-700 w-4 h-4" /> Deen & Religious Values
      </h3>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4 text-xs font-inter">
        <div v-if="hasContent(data.religion.muslim.religious_value)">
          <span class="block text-emerald-600/70 font-semibold mb-0.5">Practice Level</span>
          <span class="font-bold text-slate-700 text-sm">{{ data.religion.muslim.religious_value }}</span>
        </div>
        <div v-if="hasContent(data.religion.muslim.sect)">
          <span class="block text-emerald-600/70 font-semibold mb-0.5">Sect</span>
          <span class="font-bold text-slate-700 text-sm">{{ data.religion.muslim.sect }}</span>
        </div>
        <div v-if="hasContent(data.religion.muslim.madhab)">
          <span class="block text-emerald-600/70 font-semibold mb-0.5">Madhab</span>
          <span class="font-bold text-slate-700 text-sm">{{ data.religion.muslim.madhab }}</span>
        </div>
        <div v-if="hasContent(data.religion.muslim.prayer_frequency)">
          <span class="block text-emerald-600/70 font-semibold mb-0.5">Prayers</span>
          <span class="font-bold text-slate-700 text-sm">{{ data.religion.muslim.prayer_frequency }}</span>
        </div>
        <div v-if="hasContent(data.religion.muslim.fasting_ramadan)">
          <span class="block text-emerald-600/70 font-semibold mb-0.5">Fasting in Ramadan?</span>
          <span class="font-bold text-slate-700 text-sm">{{ data.religion.muslim.fasting_ramadan }}</span>
        </div>
        <div v-if="hasContent(data.religion.muslim.can_read_quran)">
          <span class="block text-emerald-600/70 font-semibold mb-0.5">Can Read Quran?</span>
          <span class="font-bold text-slate-700 text-sm">{{ data.religion.muslim.can_read_quran }}</span>
        </div>
        <div v-if="hasContent(data.religion.muslim.hajj_performed)">
          <span class="block text-emerald-600/70 font-semibold mb-0.5">Hajj</span>
          <span class="font-bold text-slate-700 text-sm">{{ data.religion.muslim.hajj_performed }}</span>
        </div>
        <div v-if="hasContent(data.religion.muslim.mahram_nonmahram)">
          <span class="block text-emerald-600/70 font-semibold mb-0.5">Mahram / Non-Mahram</span>
          <span class="font-bold text-slate-700 text-sm">{{ data.religion.muslim.mahram_nonmahram }}</span>
        </div>
        <div v-if="hasContent(data.religion.muslim.dress_code)">
          <span class="block text-emerald-600/70 font-semibold mb-0.5">Dress Code</span>
          <span class="font-bold text-slate-700 text-sm">{{ data.religion.muslim.dress_code }}</span>
        </div>
        <div
          v-if="data.identity.gender === 'Male' ? hasContent(data.religion.muslim.beard_style) : hasContent(data.religion.muslim.hijab_style)"
        >
          <span class="block text-emerald-600/70 font-semibold mb-0.5">
            {{ data.identity.gender === 'Male' ? 'Beard Style' : 'Hijab Style' }}
          </span>
          <span class="font-bold text-slate-700 text-sm">
            {{ data.identity.gender === 'Male' ? data.religion.muslim.beard_style : data.religion.muslim.hijab_style }}
          </span>
        </div>
        <div v-if="hasContent(data.religion.muslim.islamic_knowledge)">
          <span class="block text-emerald-600/70 font-semibold mb-0.5">Islamic Knowledge</span>
          <span class="font-bold text-slate-700 text-sm">{{ data.religion.muslim.islamic_knowledge }}</span>
        </div>
        <div v-if="hasContent(data.religion.muslim.follows_pir)">
          <span class="block text-emerald-600/70 font-semibold mb-0.5">Follows Pir / Mazar</span>
          <span class="font-bold text-slate-700 text-sm">{{ data.religion.muslim.follows_pir ? 'Yes' : 'No' }}</span>
        </div>
        <div v-if="hasContent(data.religion.muslim.pir_details)">
          <span class="block text-emerald-600/70 font-semibold mb-0.5">Pir / Mazar Details</span>
          <span class="font-bold text-slate-700 text-sm">{{ data.religion.muslim.pir_details }}</span>
        </div>
        <div v-if="hasContent(data.religion.muslim.is_converted)">
          <span class="block text-emerald-600/70 font-semibold mb-0.5">Convert to Islam?</span>
          <span class="font-bold text-slate-700 text-sm">{{ data.religion.muslim.is_converted ? 'Yes' : 'No' }}</span>
        </div>
        <div v-if="hasContent(data.religion.muslim.convert_details)">
          <span class="block text-emerald-600/70 font-semibold mb-0.5">Conversion Details</span>
          <span class="font-bold text-slate-700 text-sm">{{ data.religion.muslim.convert_details }}</span>
        </div>
      </div>
    </div>

    <!-- Personal details -->
    <div class="space-y-4">
      <h2 class="text-lg font-bold text-emerald-800 font-siliguri border-b pb-1.5 border-emerald-100">
        Personal Details
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
        <div v-if="hasContent(data.identity.skin_type)">
          <span class="block text-xs font-semibold text-slate-400">Complexion</span>
          <span class="font-medium text-slate-700">{{ data.identity.skin_type }}</span>
        </div>
        <div v-if="hasContent(data.identity.body_type)">
          <span class="block text-xs font-semibold text-slate-400">Body Type</span>
          <span class="font-medium text-slate-700">{{ data.identity.body_type }}</span>
        </div>
        <div v-if="hasContent(data.identity.weight)">
          <span class="block text-xs font-semibold text-slate-400">Weight</span>
          <span class="font-medium text-slate-700">{{ data.identity.weight }} kg</span>
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

    <!-- Locations -->
    <div class="space-y-4">
      <h2 class="text-lg font-bold text-emerald-800 font-siliguri border-b pb-1.5 border-emerald-100">
        Address Details
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm font-inter">
        <div>
          <span class="block font-semibold text-emerald-600 mb-1 border-b pb-0.5 border-emerald-50 text-xs uppercase">Current Location</span>
          <p class="text-slate-700 font-medium">
            {{ data.residency.current_location.cor }}
            <span v-if="data.residency.current_location.cor === 'Bangladesh' && data.residency.current_location.district">
              <br />District: {{ data.residency.current_location.district }}
              <br />Area: {{ data.residency.current_location.sub_district }}, {{ data.residency.current_location.village }}
            </span>
            <span v-else-if="data.residency.current_location.cor !== 'Bangladesh'">
              <br />State/City: {{ data.residency.current_location.state }}, {{ data.residency.current_location.city }}
              <br />Address: {{ data.residency.current_location.home_address }}
            </span>
          </p>
        </div>
        <div>
          <span class="block font-semibold text-emerald-600 mb-1 border-b pb-0.5 border-emerald-50 text-xs uppercase">Permanent Location</span>
          <p class="text-slate-700 font-medium">
            {{ data.residency.permanent_location.cor }}
            <span v-if="data.residency.permanent_location.cor === 'Bangladesh' && data.residency.permanent_location.district">
              <br />District: {{ data.residency.permanent_location.district }}
              <br />Area: {{ data.residency.permanent_location.sub_district }}, {{ data.residency.permanent_location.village }}
            </span>
            <span v-else-if="data.residency.permanent_location.cor !== 'Bangladesh'">
              <br />State/City: {{ data.residency.permanent_location.state }}, {{ data.residency.permanent_location.city }}
              <br />Address: {{ data.residency.permanent_location.home_address }}
            </span>
          </p>
        </div>
      </div>
    </div>

    <!-- Family Details -->
    <div class="space-y-4">
      <h2 class="text-lg font-bold text-emerald-800 font-siliguri border-b pb-1.5 border-emerald-100">
        Family Information
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-inter">
        <div v-if="hasContent(data.family.type)">
          <span class="block text-xs font-semibold text-slate-400">Family Type</span>
          <span class="font-medium text-slate-700">{{ data.family.type }}</span>
        </div>
        <div v-if="hasContent(data.family.location)">
          <span class="block text-xs font-semibold text-slate-400">Family Resident District</span>
          <span class="font-medium text-slate-700">{{ data.family.location }}</span>
        </div>
        <div v-if="hasContent(data.family.father_name)">
          <span class="block text-xs font-semibold text-slate-400">Father's Name</span>
          <span class="font-medium text-slate-700">
            {{ data.family.father_name }}
            <span v-if="data.family.father_alive === false" class="text-red-500 font-semibold text-xs ml-1">(Deceased)</span>
          </span>
        </div>
        <div v-if="hasContent(data.family.father_occupation)">
          <span class="block text-xs font-semibold text-slate-400">Father's Occupation</span>
          <span class="font-medium text-slate-700">{{ data.family.father_occupation }}</span>
        </div>
        <div v-if="hasContent(data.family.mother_name)">
          <span class="block text-xs font-semibold text-slate-400">Mother's Name</span>
          <span class="font-medium text-slate-700">
            {{ data.family.mother_name }}
            <span v-if="data.family.mother_alive === false" class="text-red-500 font-semibold text-xs ml-1">(Deceased)</span>
          </span>
        </div>
        <div v-if="hasContent(data.family.mother_occupation)">
          <span class="block text-xs font-semibold text-slate-400">Mother's Occupation</span>
          <span class="font-medium text-slate-700">{{ data.family.mother_occupation }}</span>
        </div>
        <div v-if="hasContent(data.family.financial_condition)">
          <span class="block text-xs font-semibold text-slate-400">Financial Class</span>
          <span class="font-medium text-slate-700">{{ data.family.financial_condition }}</span>
        </div>
        <div v-if="hasContent(data.family.financial_condition)">
          <span class="block text-xs font-semibold text-slate-400">Family Assets</span>
          <span class="font-medium text-slate-700">{{ data.family.family_assets || '—' }}</span>
        </div>
      </div>
      <div v-if="data.family.siblings?.siblings_details?.length" class="text-xs font-inter">
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

    <!-- Education -->
    <div v-if="data.education.entries?.length" class="space-y-4">
      <h2 class="text-lg font-bold text-emerald-800 font-siliguri border-b pb-1.5 border-emerald-100">
        Education Details
      </h2>
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse text-sm font-inter">
          <thead>
            <tr class="bg-emerald-50 text-emerald-700 font-semibold border-b border-emerald-100">
              <th class="p-2 border border-emerald-100">Degree / Certificate</th>
              <th class="p-2 border border-emerald-100">Institution</th>
              <th class="p-2 border border-emerald-100">Subject / Group</th>
              <th class="p-2 border border-emerald-100">Year</th>
              <th class="p-2 border border-emerald-100">GPA/CGPA</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(entry, index) in data.education.entries"
              :key="index"
              class="border-b border-slate-200 text-slate-700"
            >
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

    <!-- Career -->
    <div class="space-y-4">
      <h2 class="text-lg font-bold text-emerald-800 font-siliguri border-b pb-1.5 border-emerald-100">
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
      <div v-if="hasContent(data.career.occupation_details)" class="text-sm font-inter bg-slate-50 p-3 rounded border border-slate-100">
        <span class="block text-xs font-semibold text-slate-400 mb-1">Occupation Details</span>
        <p class="text-slate-600 whitespace-pre-line">{{ data.career.occupation_details }}</p>
      </div>
    </div>

    <!-- Marriage Information -->
    <div class="space-y-4">
      <h2 class="text-lg font-bold text-emerald-800 font-siliguri border-b pb-1.5 border-emerald-100">
        Marriage Related Information
      </h2>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm font-inter">
        <div v-if="hasContent(data.marriage.marriage_time)">
          <span class="block text-xs font-semibold text-slate-400">Expected Time</span>
          <span class="font-medium text-slate-700">{{ data.marriage.marriage_time }}</span>
        </div>
        <div v-if="hasContent(data.marriage.thoughts_on_marriage)">
          <span class="block text-xs font-semibold text-slate-400">Thoughts on Marriage</span>
          <span class="font-medium text-slate-700">{{ data.marriage.thoughts_on_marriage }}</span>
        </div>
        <div v-if="hasContent(data.marriage.guardian_agreed)">
          <span class="block text-xs font-semibold text-slate-400">Guardian Agreement</span>
          <span class="font-medium text-slate-700">{{ data.marriage.guardian_agreed }}</span>
        </div>
      </div>
    </div>

    <!-- Lifestyle -->
    <div class="space-y-4">
      <h2 class="text-lg font-bold text-emerald-800 font-siliguri border-b pb-1.5 border-emerald-100">
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

    <!-- Partner Preferences -->
    <div class="space-y-4">
      <h2 class="text-lg font-bold text-emerald-800 font-siliguri border-b pb-1.5 border-emerald-100">
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
          <span class="block text-xs font-semibold text-slate-400">Preferred Religion</span>
          <span class="font-medium text-slate-700">{{ data.preference.religion }}</span>
        </div>
        <div v-if="hasContent(data.preference.min_edu_qualification)">
          <span class="block text-xs font-semibold text-slate-400">Min Education</span>
          <span class="font-medium text-slate-700">{{ data.preference.min_edu_qualification }}</span>
        </div>
      </div>
      <div v-if="hasContent(data.preference.expected_qualities)" class="text-sm font-inter bg-slate-50 p-3 rounded border border-slate-100">
        <span class="block text-xs font-semibold text-slate-400 mb-1">Expected Partner Qualities</span>
        <p class="text-slate-600 whitespace-pre-line">{{ data.preference.expected_qualities }}</p>
      </div>
    </div>

    <!-- Contact & Social -->
    <div v-if="hasContent(data.identity.contact_num) || hasContent(data.identity.whatsapp_num) || hasContent(data.identity.fb_link) || hasContent(data.identity.ig_profile_link)" class="space-y-4">
      <h2 class="text-lg font-bold text-emerald-800 font-siliguri border-b pb-1.5 border-emerald-100">
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