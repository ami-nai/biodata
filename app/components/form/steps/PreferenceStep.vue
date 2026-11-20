<script lang="ts" setup>
import { computed } from 'vue';
import { useBiodataForm } from '~/features/biodata/hooks/useBiodataForm';
import { skinComplexionItems, maritalStatusItems, educationItems } from '~/constants/form-options';
import countryData from '~/constants/data/country.json';
import { allDistricts } from '~/constants/districts';
import professions from '~/constants/data/professions.json';
import InputWithLabel from '~/components/ui/InputWithLabel.vue';
import SelectWithLabel from '~/components/ui/SelectWithLabel.vue';

const { biodata, errors } = useBiodataForm();

const countries = countryData.countries || [];
const locationTypes = ['Any', 'All 64 Districts', 'Specific District', 'All Except Some Districts', 'Abroad Citizen'];
const religionsList = ['Islam', 'Hinduism', 'Christianity', 'Buddhism', 'Any'];

const allProfessionDesignations = computed(() => {
  const list: string[] = [];
  professions.forEach((p: any) => {
    if (p.designations) {
      p.designations.forEach((d: string) => {
        if (!list.includes(d)) {
          list.push(d);
        }
      });
    }
  });
  return list.sort();
});

// Format range for display
const formatHeight = (inches: number) => {
  const feet = Math.floor(inches / 12);
  const remainingInches = inches % 12;
  return `${feet}'${remainingInches}"`;
};
</script>

<template>
  <div class="space-y-6">
    <!-- Age & Height Range Sliders -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="flex flex-col gap-2">
        <label class="text-sm font-medium text-slate-700 font-inter">
          Partner Age Range: <span class="text-primary font-semibold">{{ biodata.preference.age_range[0] }} - {{ biodata.preference.age_range[1] }} years</span>
        </label>
        <USlider
          v-model="biodata.preference.age_range"
          :min="18"
          :max="70"
          color="primary"
          class="py-2"
        />
      </div>

      <div class="flex flex-col gap-2">
        <label class="text-sm font-medium text-slate-700 font-inter">
          Partner Height Range: <span class="text-primary font-semibold">{{ formatHeight(biodata.preference.height_range[0]) }} - {{ formatHeight(biodata.preference.height_range[1]) }}</span>
        </label>
        <USlider
          v-model="biodata.preference.height_range"
          :min="48"
          :max="84"
          color="primary"
          class="py-2"
        />
      </div>
    </div>

    <!-- Religion & Marital Status -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <SelectWithLabel
        label="Preferred Religion"
        v-model="biodata.preference.religion"
        :items="religionsList"
        placeholder="Select preferred religion"
        :error="errors['religion']"
      />

      <SelectWithLabel
        label="Acceptable Marital Status(es)"
        v-model="biodata.preference.marital_status"
        :items="maritalStatusItems"
        :multiple="true"
        placeholder="Select acceptable marital status"
      />
    </div>

    <!-- Education & Profession -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <SelectWithLabel
        label="Minimum Educational Qualification"
        v-model="biodata.preference.min_edu_qualification"
        :items="educationItems"
        placeholder="Select minimum qualification"
        :error="errors['min_edu_qualification']"
      />

      <SelectWithLabel
        label="Preferred Profession(s)"
        v-model="biodata.preference.preferred_profession"
        :items="allProfessionDesignations"
        :multiple="true"
        placeholder="Select professions"
      />
    </div>

    <!-- Complexion & Children -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <SelectWithLabel
        label="Complexion Preference"
        v-model="biodata.preference.complexion_preference"
        :items="skinComplexionItems"
        :multiple="true"
        placeholder="Select acceptable complexions"
      />

      <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center justify-between">
        <label class="text-sm font-medium text-slate-700 font-inter">Accept partner with children?</label>
        <URadioGroup
          v-model="biodata.preference.partner_with_child"
          :items="[{ label: 'Yes', value: true }, { label: 'No', value: false }]"
          orientation="horizontal"
        />
      </div>
    </div>

    <!-- Location Type Selection -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <SelectWithLabel
        label="Location Type Preference"
        v-model="biodata.preference.location"
        :items="locationTypes"
        :multiple="true"
        placeholder="Select location types"
        :error="errors['location']"
      />
    </div>

    <!-- Location Context Specific Selection -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <SelectWithLabel
        v-if="biodata.preference.location.includes('Specific District')"
        label="Preferred Districts"
        v-model="biodata.preference.preferred_location"
        :items="allDistricts"
        :multiple="true"
        placeholder="Select districts"
      />

      <SelectWithLabel
        v-if="biodata.preference.location.includes('All Except Some Districts')"
        label="Excluded Districts"
        v-model="biodata.preference.not_preferred_location"
        :items="allDistricts"
        :multiple="true"
        placeholder="Select districts to exclude"
      />

      <SelectWithLabel
        v-if="biodata.preference.location.includes('Abroad Citizen')"
        label="Preferred Countries"
        v-model="biodata.preference.preferred_countries"
        :items="countries"
        :multiple="true"
        placeholder="Select countries"
      />
    </div>

    <!-- Physical challenges -->
    <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center justify-between">
      <label class="text-sm font-medium text-slate-700 font-inter">Are you willing to accept a physically challenged partner?</label>
      <URadioGroup
        v-model="biodata.preference.accept_physically_challenged"
        :items="[{ label: 'Yes', value: true }, { label: 'No', value: false }]"
        orientation="horizontal"
      />
    </div>

    <!-- Qualities (Textareas) -->
    <InputWithLabel
      label="Expected Qualities in Partner"
      type="textarea"
      v-model="biodata.preference.expected_qualities"
      placeholder="Describe the character, behavior, lifestyle, and mindset you expect in your spouse..."
      :error="errors['expected_qualities']"
      :rows="4"
    />

    <InputWithLabel
      label="Dealbreakers / Qualities you do NOT want in partner"
      type="textarea"
      v-model="biodata.preference.unexpected_qualities"
      placeholder="Mention qualities, habits, or mindsets that you consider dealbreakers..."
      is-optional
      :rows="3"
    />
  </div>
</template>
