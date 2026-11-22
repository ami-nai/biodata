<script lang="ts" setup>
import { computed } from 'vue';
import { useBiodataForm } from '~/features/biodata/hooks/useBiodataForm';
import {
  profileCategoryItems,
  maritalStatusItems,
  skinComplexionItems,
  bodyTypeItems,
  bloodGroupItems
} from '~/constants/form-options';
import InputWithLabel from '~/components/ui/InputWithLabel.vue';
import SelectWithLabel from '~/components/ui/SelectWithLabel.vue';

const { biodata, errors } = useBiodataForm();

// Convert inches to feet and inches for display label
const displayHeight = computed(() => {
  const inches = biodata.identity.height;
  const feet = Math.floor(inches / 12);
  const remainingInches = inches % 12;
  return `${feet}'${remainingInches}"`;
});
</script>

<template>
  <div class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Profile Created For -->
      <div>
        <SelectWithLabel
          label="Profile Created For"
          v-model="biodata.identity.created_for"
          :items="profileCategoryItems"
          placeholder="Select who the profile is for"
          :error="errors['created_for']"
        />
        <div v-if="biodata.identity.created_for === 'Others'" class="mt-4">
          <InputWithLabel
            label="Please Specify"
            v-model="biodata.identity.others"
            placeholder="E.g. Uncle, Aunt, Colleague"
          />
        </div>
      </div>

      <!-- Gender -->
      <SelectWithLabel
        label="Gender"
        v-model="biodata.identity.gender"
        :items="['Male', 'Female']"
        placeholder="Select gender"
        :error="errors['gender']"
      />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Full Name -->
      <InputWithLabel
        label="Full Name"
        v-model="biodata.identity.full_name"
        placeholder="Enter your full name"
        :error="errors['full_name']"
      />

      <!-- Nickname / Surname -->
      <InputWithLabel
        label="Nickname / Surname"
        v-model="biodata.identity.surname"
        placeholder="Enter nickname"
        :error="errors['surname']"
      />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Marital Status -->
      <SelectWithLabel
        label="Marital Status"
        v-model="biodata.identity.marital_status"
        :items="maritalStatusItems"
        placeholder="Select marital status"
        :error="errors['marital_status']"
      />

      <!-- Date of Birth -->
      <InputWithLabel
        label="Date of Birth"
        type="date"
        v-model="biodata.identity.dob"
        :error="errors['dob']"
      />
    </div>

    <!-- Height & Weight -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
      <div class="flex flex-col gap-2">
        <label class="text-sm font-medium text-slate-700 font-inter">
          Height: <span class="text-primary font-semibold">{{ displayHeight }}</span>
        </label>
        <USlider
          v-model="biodata.identity.height"
          :min="48"
          :max="84"
          color="primary"
          class="py-2"
        />
      </div>

      <InputWithLabel
        label="Weight (in kg)"
        type="number"
        :model-value="biodata.identity.weight === null ? '' : biodata.identity.weight"
        @update:model-value="val => biodata.identity.weight = val === '' ? null : Number(val)"
        placeholder="Enter weight in kg"
        is-optional
      />
    </div>

    <!-- Complexion & Body Type -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <SelectWithLabel
        label="Skin Complexion"
        v-model="biodata.identity.skin_type"
        :items="skinComplexionItems"
        placeholder="Select skin complexion"
        :error="errors['skin_type']"
      />

      <SelectWithLabel
        label="Body Type"
        v-model="biodata.identity.body_type"
        :items="bodyTypeItems"
        placeholder="Select body type"
        :error="errors['body_type']"
      />
    </div>

    <!-- Blood Group & Mother Tongue -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <SelectWithLabel
        label="Blood Group"
        v-model="biodata.identity.blood_group"
        :items="bloodGroupItems"
        placeholder="Select blood group"
        :error="errors['blood_group']"
      />

      <InputWithLabel
        label="Mother Tongue"
        v-model="biodata.identity.mother_tongue"
        placeholder="E.g. Bengali, English"
        :error="errors['mother_tongue']"
      />
    </div>

    <!-- Contacts -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <InputWithLabel
        label="Contact Number"
        type="tel"
        v-model="biodata.identity.contact_num"
        placeholder="Enter phone number"
        :error="errors['contact_num']"
      />

      <InputWithLabel
        label="WhatsApp Number"
        type="tel"
        v-model="biodata.identity.whatsapp_num"
        placeholder="Enter WhatsApp number"
        :error="errors['whatsapp_num']"
      />
    </div>

    <!-- Children Conditional Fields -->
    <div v-if="biodata.identity.marital_status !== 'Never Married' && biodata.identity.marital_status !== ''" class="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4">
      <div class="flex items-center gap-4">
        <label class="text-sm font-medium text-slate-700 font-inter">Do you have children?</label>
        <URadioGroup
          v-model="biodata.identity.have_children"
          :items="[{ label: 'Yes', value: true }, { label: 'No', value: false }]"
          orientation="horizontal"
        />
      </div>

      <div v-if="biodata.identity.have_children" class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputWithLabel
          label="Number of Children"
          type="number"
          :model-value="biodata.identity.child_count"
          @update:model-value="val => biodata.identity.child_count = Number(val)"
          placeholder="E.g. 1"
          :error="errors['child_count']"
        />
        <InputWithLabel
          label="Child Details (Age, Gender)"
          v-model="biodata.identity.child_details"
          placeholder="Describe your children"
        />
        <InputWithLabel
          label="Who are the children living with?"
          v-model="biodata.identity.child_living_with"
          placeholder="E.g. With me, With ex-spouse"
          class="md:col-span-2"
        />
      </div>
    </div>

    <!-- Legal Cases / Reports -->
    <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4">
      <div class="flex items-center gap-4">
        <label class="text-sm font-medium text-slate-700 font-inter">Do you have any legal cases or reports filed against you?</label>
        <URadioGroup
          v-model="biodata.identity.report_case"
          :items="[{ label: 'Yes', value: true }, { label: 'No', value: false }]"
          orientation="horizontal"
        />
      </div>
      <div v-if="biodata.identity.report_case">
        <InputWithLabel
          label="Please Specify Case Details"
          type="textarea"
          v-model="biodata.identity.case_details"
          placeholder="Explain the legal case situation..."
        />
      </div>
    </div>

    <!-- Debts / Loans -->
    <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4">
      <div class="flex items-center gap-4">
        <label class="text-sm font-medium text-slate-700 font-inter">Do you have any personal debt or financial liabilities?</label>
        <URadioGroup
          v-model="biodata.identity.personal_debt"
          :items="[{ label: 'Yes', value: true }, { label: 'No', value: false }]"
          orientation="horizontal"
        />
      </div>
      <div v-if="biodata.identity.personal_debt">
        <InputWithLabel
          label="Specify Debt Details"
          type="textarea"
          v-model="biodata.identity.debt_details"
          placeholder="E.g. Home loan of 10 Lakh BDT..."
        />
      </div>
    </div>

    <!-- About Me -->
    <InputWithLabel
      label="About Yourself / Write a summary about your character and mindset"
      type="textarea"
      v-model="biodata.identity.about_me"
      placeholder="Write at least 10 characters describing yourself, your values, and life outlook..."
      :error="errors['about_me']"
      :rows="5"
    />

    <!-- Social Links -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <InputWithLabel
        label="Facebook Profile Link"
        v-model="biodata.identity.fb_link"
        placeholder="https://facebook.com/yourprofile"
        is-optional
      />

      <InputWithLabel
        label="Instagram Profile Link"
        v-model="biodata.identity.ig_profile_link"
        placeholder="https://instagram.com/yourusername"
        is-optional
      />
    </div>
  </div>
</template>
