<script lang="ts" setup>
import { useBiodataForm } from '~/features/biodata/hooks/useBiodataForm';
import InputWithLabel from '~/components/ui/InputWithLabel.vue';
import SelectWithLabel from '~/components/ui/SelectWithLabel.vue';

const { biodata, errors } = useBiodataForm();

const diets = [
  'Bengali Regular (Fish/Meat)',
  'Vegetarian',
  'Vegan',
  'Eggetarian'
];

const hobbiesList = [
  'Reading',
  'Gardening',
  'Prayer',
  'Recite Quran',
  'Helping Others',
  'Traveling',
  'Cycling',
  'Cooking',
  'Sports',
  'eSports',
  'Others'
];

const petsList = [
  'No pet',
  'Cat',
  'Dog',
  'Birds',
  'Cows',
  'Goat',
  'Rat',
  'Others'
];
</script>

<template>
  <div class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Diet -->
      <SelectWithLabel
        label="Diet Preference"
        v-model="biodata.lifestyle.diet"
        :items="diets"
        placeholder="Select diet preference"
        :error="errors['diet']"
      />

      <!-- Allergic To -->
      <InputWithLabel
        label="Allergic To"
        v-model="biodata.lifestyle.allergic_to"
        placeholder="E.g. Prawns, Peanuts, Pollens"
        is-optional
      />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Hobbies (Multi Select Menu) -->
      <SelectWithLabel
        label="Hobbies & Interests"
        v-model="biodata.lifestyle.hobbies"
        :items="hobbiesList"
        :multiple="true"
        placeholder="Select your hobbies"
        is-optional
      />

      <!-- Pets -->
      <SelectWithLabel
        label="Pets"
        v-model="biodata.lifestyle.pets"
        :items="petsList"
        :multiple="true"
        placeholder="Select your pets"
        is-optional
      />
    </div>

    <!-- Smoke & Drink -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center justify-between">
        <label class="text-sm font-medium text-slate-700 font-inter">Do you smoke?</label>
        <URadioGroup
          v-model="biodata.lifestyle.smoke"
          :items="[{ label: 'Yes', value: true }, { label: 'No', value: false }]"
          orientation="horizontal"
        />
      </div>

      <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center justify-between">
        <label class="text-sm font-medium text-slate-700 font-inter">Do you consume alcohol / drugs?</label>
        <URadioGroup
          v-model="biodata.lifestyle.drink"
          :items="[{ label: 'Yes', value: true }, { label: 'No', value: false }]"
          orientation="horizontal"
        />
      </div>
    </div>

    <!-- Disabilities -->
    <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4">
      <div class="flex items-center gap-4">
        <label class="text-sm font-medium text-slate-700 font-inter">Do you have any physical disabilities?</label>
        <URadioGroup
          v-model="biodata.lifestyle.disabilities"
          :items="[{ label: 'Yes', value: true }, { label: 'No', value: false }]"
          orientation="horizontal"
        />
      </div>
      <div v-if="biodata.lifestyle.disabilities">
        <InputWithLabel
          label="Describe disability details"
          type="textarea"
          v-model="biodata.lifestyle.health_condition"
          placeholder="E.g. Impaired vision in left eye, limp in leg..."
        />
      </div>
    </div>

    <!-- Chronic Disease -->
    <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4">
      <div class="flex items-center gap-4">
        <label class="text-sm font-medium text-slate-700 font-inter">Do you suffer from any chronic diseases?</label>
        <URadioGroup
          v-model="biodata.lifestyle.chronic_disease"
          :items="[{ label: 'Yes', value: true }, { label: 'No', value: false }]"
          orientation="horizontal"
        />
      </div>
      <div v-if="biodata.lifestyle.chronic_disease">
        <InputWithLabel
          label="Specify Disease Details"
          type="textarea"
          v-model="biodata.lifestyle.disease_details"
          placeholder="E.g. Asthma, Type-2 Diabetes..."
        />
      </div>
    </div>

    <!-- Social Activity -->
    <InputWithLabel
      label="Social Activity & Volunteering"
      type="textarea"
      v-model="biodata.lifestyle.social_activity"
      placeholder="Describe any social work, community groups, or volunteer work you participate in..."
      is-optional
      :rows="3"
    />
  </div>
</template>
