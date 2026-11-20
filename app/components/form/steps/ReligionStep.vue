<script lang="ts" setup>
import { useBiodataForm } from '~/features/biodata/hooks/useBiodataForm';
import InputWithLabel from '~/components/ui/InputWithLabel.vue';
import SelectWithLabel from '~/components/ui/SelectWithLabel.vue';

const { biodata, errors } = useBiodataForm();

// Ensure sub-objects are initialized
if (!biodata.religion.muslim) {
  biodata.religion.muslim = {
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
  };
}

if (!biodata.religion.hindu) {
  biodata.religion.hindu = {
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
  };
}

if (!biodata.religion.christianity) {
  biodata.religion.christianity = {
    religious_value: '',
    denomination: '',
    prayer_frequency: '',
    church_attendance: '',
    church_involvement: [],
    fasting_practice: '',
    missionary_work: '',
  };
}

if (!biodata.religion.buddhism) {
  biodata.religion.buddhism = {
    religious_value: '',
    tradition: '',
    five_precepts: '',
    meditation_practice: '',
    temple_attendance: '',
    vegetarianism: '',
    retreat_participation: '',
    teacher: '',
    taking_refuge: '',
  };
}

const religions = ['Islam', 'Hinduism', 'Christianity', 'Buddhism'];
const religiousValues = ['Very Practicing', 'Practicing', 'Moderate', 'Not Practicing'];
</script>

<template>
  <div class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Religion Dropdown -->
      <SelectWithLabel
        label="Religion"
        v-model="biodata.religion.religion"
        :items="religions"
        placeholder="Select religion"
        :error="errors['religion']"
      />
    </div>

    <!-- Muslim Form -->
    <div v-if="biodata.religion.religion === 'Islam' && biodata.religion.muslim" class="space-y-6">
      <h3 class="text-md font-semibold text-slate-700 font-inter border-b pb-2">Islamic Information</h3>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectWithLabel
          label="Religious Practice Value"
          v-model="biodata.religion.muslim.religious_value"
          :items="religiousValues"
          placeholder="Select practice level"
        />

        <SelectWithLabel
          label="Sect"
          v-model="biodata.religion.muslim.sect"
          :items="['Sunni', 'Shia', 'Ahmadiyya', 'Other']"
          placeholder="Select sect"
        />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectWithLabel
          v-if="biodata.religion.muslim.sect === 'Sunni'"
          label="Madhab"
          v-model="biodata.religion.muslim.madhab"
          :items="['Hanafi', 'Shafi\'i', 'Maliki', 'Hanbali', 'Ahle Hadith']"
          placeholder="Select madhab"
        />

        <SelectWithLabel
          label="Do you maintain Mahram/Non-Mahram?"
          v-model="biodata.religion.muslim.mahram_nonmahram"
          :items="['Yes, fully', 'Yes, partially', 'No']"
          placeholder="Select option"
        />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectWithLabel
          label="Prayer Frequency"
          v-model="biodata.religion.muslim.prayer_frequency"
          :items="['Daily (5 times)', 'Sometimes', 'Only Friday (Jummah)', 'Never']"
          placeholder="Select frequency"
        />

        <SelectWithLabel
          label="Do you fast in Ramadan?"
          v-model="biodata.religion.muslim.fasting_ramadan"
          :items="['Yes, all', 'Yes, partially', 'No']"
          placeholder="Select option"
        />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectWithLabel
          label="Can you read the Quran?"
          v-model="biodata.religion.muslim.can_read_quran"
          :items="['Yes, with Tajweed', 'Yes, basic reading', 'No']"
          placeholder="Select option"
        />

        <SelectWithLabel
          label="Have you performed Hajj/Umrah?"
          v-model="biodata.religion.muslim.hajj_performed"
          :items="['Yes, Hajj & Umrah', 'Yes, Umrah only', 'No, but planning', 'No']"
          placeholder="Select option"
        />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Conditional Gender Styles -->
        <InputWithLabel
          v-if="biodata.identity.gender === 'Male'"
          label="Beard Style"
          v-model="biodata.religion.muslim.beard_style"
          placeholder="E.g. Long beard, French cut, Clean shaven"
        />

        <InputWithLabel
          v-if="biodata.identity.gender === 'Female'"
          label="Hijab / Niqab Style"
          v-model="biodata.religion.muslim.hijab_style"
          placeholder="E.g. Niqab, Hijab only, Do not wear"
        />

        <InputWithLabel
          label="Daily Dress Code Outside Home"
          v-model="biodata.religion.muslim.dress_code"
          placeholder="E.g. Punjabi & Payjama, Pant-Shirt, Abaya/Borka"
        />
      </div>

      <InputWithLabel
        label="Islamic Knowledge / Education details"
        type="textarea"
        v-model="biodata.religion.muslim.islamic_knowledge"
        placeholder="Briefly describe your religious studies or islamic books you read..."
      />

      <!-- converted muslim -->
      <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4">
        <div class="flex items-center gap-4">
          <label class="text-sm font-medium text-slate-700 font-inter">Are you a convert/revert to Islam?</label>
          <URadioGroup
            v-model="biodata.religion.muslim.is_converted"
            :items="[{ label: 'Yes', value: true }, { label: 'No', value: false }]"
            orientation="horizontal"
          />
        </div>
        <div v-if="biodata.religion.muslim.is_converted">
          <InputWithLabel
            label="Provide conversion details (previous religion, family reaction)"
            type="textarea"
            v-model="biodata.religion.muslim.convert_details"
            placeholder="Describe your transition details..."
          />
        </div>
      </div>

      <!-- Majar/Pir followers -->
      <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4">
        <div class="flex items-center gap-4">
          <label class="text-sm font-medium text-slate-700 font-inter">Do you follow any specific Pir, Majar, or Sufi order?</label>
          <URadioGroup
            v-model="biodata.religion.muslim.follows_pir"
            :items="[{ label: 'Yes', value: true }, { label: 'No', value: false }]"
            orientation="horizontal"
          />
        </div>
        <div v-if="biodata.religion.muslim.follows_pir">
          <InputWithLabel
            label="Specify Pir/Majar thoughts and details"
            type="textarea"
            v-model="biodata.religion.muslim.pir_details"
            placeholder="Describe your views on majar and pir orders..."
          />
        </div>
      </div>
    </div>

    <!-- Hindu Form -->
    <div v-if="biodata.religion.religion === 'Hinduism' && biodata.religion.hindu" class="space-y-6">
      <h3 class="text-md font-semibold text-slate-700 font-inter border-b pb-2">Hinduism Information</h3>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectWithLabel
          label="Religious Value"
          v-model="biodata.religion.hindu.religious_value"
          :items="religiousValues"
          placeholder="Select practice level"
        />

        <InputWithLabel
          label="Caste"
          v-model="biodata.religion.hindu.caste"
          placeholder="E.g. Brahmin, Kshatriya, Kayastha"
        />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputWithLabel
          label="Gotro"
          v-model="biodata.religion.hindu.gotro"
          placeholder="E.g. Kashyap, Shandilya"
        />

        <InputWithLabel
          label="Sampradaya / Sect"
          v-model="biodata.religion.hindu.sampradaya"
          placeholder="E.g. Vaishnavism, Shaivism, Shaktism"
        />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputWithLabel
          label="Deity Preference (Ishta Devata)"
          v-model="biodata.religion.hindu.deity_preference"
          placeholder="E.g. Krishna, Shiva, Durga"
        />

        <SelectWithLabel
          label="Temple Attendance Frequency"
          v-model="biodata.religion.hindu.temple_attendance"
          :items="['Daily', 'Weekly', 'During festivals', 'Rarely', 'Never']"
          placeholder="Select frequency"
        />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectWithLabel
          label="Diet Preference"
          v-model="biodata.religion.hindu.dietary"
          :items="['Vegetarian (No onion/garlic)', 'Vegetarian (Standard)', 'Non-Vegetarian']"
          placeholder="Select option"
        />

        <SelectWithLabel
          label="Importance of Astrology / Kundali Matching"
          v-model="biodata.religion.hindu.astrology_importance"
          :items="['Very Important', 'Somewhat Important', 'Not Important']"
          placeholder="Select importance"
        />
      </div>
    </div>

    <!-- Christian Form -->
    <div v-if="biodata.religion.religion === 'Christianity' && biodata.religion.christianity" class="space-y-6">
      <h3 class="text-md font-semibold text-slate-700 font-inter border-b pb-2">Christianity Information</h3>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectWithLabel
          label="Religious Value"
          v-model="biodata.religion.christianity.religious_value"
          :items="religiousValues"
          placeholder="Select practice level"
        />

        <InputWithLabel
          label="Denomination / Church Affiliation"
          v-model="biodata.religion.christianity.denomination"
          placeholder="E.g. Catholic, Baptist, Anglican, Pentecostal"
        />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectWithLabel
          label="Prayer Frequency"
          v-model="biodata.religion.christianity.prayer_frequency"
          :items="['Multiple times a day', 'Daily', 'Occasionally', 'Never']"
          placeholder="Select frequency"
        />

        <SelectWithLabel
          label="Church Attendance"
          v-model="biodata.religion.christianity.church_attendance"
          :items="['Weekly', 'Bi-weekly', 'Monthly', 'Only on Holidays', 'Never']"
          placeholder="Select frequency"
        />
      </div>
    </div>

    <!-- Buddhist Form -->
    <div v-if="biodata.religion.religion === 'Buddhism' && biodata.religion.buddhism" class="space-y-6">
      <h3 class="text-md font-semibold text-slate-700 font-inter border-b pb-2">Buddhism Information</h3>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectWithLabel
          label="Religious Value"
          v-model="biodata.religion.buddhism.religious_value"
          :items="religiousValues"
          placeholder="Select practice level"
        />

        <InputWithLabel
          label="Tradition / School"
          v-model="biodata.religion.buddhism.tradition"
          placeholder="E.g. Theravada, Mahayana, Vajrayana"
        />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectWithLabel
          label="Meditation Practice"
          v-model="biodata.religion.buddhism.meditation_practice"
          :items="['Daily', 'Regularly', 'Occasionally', 'Never']"
          placeholder="Select option"
        />

        <SelectWithLabel
          label="Temple Attendance"
          v-model="biodata.religion.buddhism.temple_attendance"
          :items="['On Uposatha days', 'Weekly', 'Monthly', 'On Festivals only', 'Never']"
          placeholder="Select option"
        />
      </div>
    </div>
  </div>
</template>
