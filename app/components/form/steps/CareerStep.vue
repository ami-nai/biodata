<script lang="ts" setup>
import { computed } from 'vue';
import { useBiodataForm } from '~/features/biodata/hooks/useBiodataForm';
import professions from '~/constants/data/professions.json';
import InputWithLabel from '~/components/ui/InputWithLabel.vue';
import SelectWithLabel from '~/components/ui/SelectWithLabel.vue';

const { biodata, errors } = useBiodataForm();

const workTypes = ['Onsite', 'Remote / Work from Home', 'Hybrid'];
const currencies = ['BDT', 'USD', 'EUR', 'GBP'];

const allDesignations = computed(() => {
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
</script>

<template>
  <div class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Profession/Occupation -->
      <SelectWithLabel
        label="Profession / Occupation"
        v-model="biodata.career.occupation"
        :items="allDesignations"
        :allow-create="true"
        placeholder="Select or search profession"
        :error="errors['occupation']"
      />

      <!-- Designation -->
      <InputWithLabel
        label="Designation / Job Title"
        v-model="biodata.career.designation"
        placeholder="E.g. Senior Software Engineer"
        :error="errors['designation']"
        is-optional
      />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Work Location (Type) -->
      <SelectWithLabel
        label="Work Type"
        v-model="biodata.career.work_location"
        :items="workTypes"
        placeholder="Select work location type"
        :error="errors['work_location']"
      />

      <!-- Annual Income -->
      <div class="flex flex-col gap-1.5 w-full">
        <label class="text-sm font-medium text-slate-700 font-inter">
          Annual Income
          <span class="text-xs text-slate-400 font-inter italic">Optional</span>
        </label>
        <div class="flex gap-2 w-full">
          <UInput
            type="number"
            :model-value="biodata.career.annual_income === null ? '' : biodata.career.annual_income"
            @update:model-value="val => biodata.career.annual_income = val === '' ? null : Number(val)"
            placeholder="E.g. 80000"
            class="flex-1 font-inter min-w-0"
          />
          <USelectMenu
            v-model="biodata.career.currency"
            :items="currencies"
            class="w-24 font-inter"
          />
        </div>
      </div>
    </div>

    <!-- Occupation Details -->
    <InputWithLabel
      label="Occupation Details"
      type="textarea"
      v-model="biodata.career.occupation_details"
      placeholder="Briefly describe your work responsibilities, company details (optional), and daily activities..."
      :rows="4"
    />

    <!-- Personal Assets -->
    <InputWithLabel
      label="Personal Assets"
      type="textarea"
      v-model="biodata.career.personal_asset"
      placeholder="Mention any personal house, flat, land, car, savings, or investments that you own..."
      :rows="3"
    />

    <!-- Vocational Training Conditional Section -->
    <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4">
      <div class="flex items-center gap-4">
        <label class="text-sm font-medium text-slate-700 font-inter">Have you done any vocational training or diploma?</label>
        <URadioGroup
          v-model="biodata.career.vocational_training"
          :items="[{ label: 'Yes', value: true }, { label: 'No', value: false }]"
          orientation="horizontal"
        />
      </div>
      <div v-if="biodata.career.vocational_training">
        <InputWithLabel
          label="Vocational Training details"
          type="textarea"
          v-model="biodata.career.training_details"
          placeholder="E.g. Web Development Diploma from LWS, Graphics Design course..."
        />
      </div>
    </div>

    <!-- Professional Certificate Section -->
    <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4">
      <div class="flex items-center gap-4">
        <label class="text-sm font-medium text-slate-700 font-inter">Do you hold any professional certifications?</label>
        <URadioGroup
          v-model="biodata.career.professional_certificate"
          :items="[{ label: 'Yes', value: true }, { label: 'No', value: false }]"
          orientation="horizontal"
        />
      </div>
      <div v-if="biodata.career.professional_certificate">
        <InputWithLabel
          label="Professional Certification details"
          type="textarea"
          v-model="biodata.career.certification_details"
          placeholder="E.g. CCNA, AWS Solutions Architect, PMP, ACCA..."
        />
      </div>
    </div>
  </div>
</template>
