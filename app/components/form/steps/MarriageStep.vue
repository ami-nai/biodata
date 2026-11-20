<script lang="ts" setup>
import { useBiodataForm } from '~/features/biodata/hooks/useBiodataForm';
import InputWithLabel from '~/components/ui/InputWithLabel.vue';
import SelectWithLabel from '~/components/ui/SelectWithLabel.vue';

const { biodata, errors } = useBiodataForm();

const marriageTimes = [
  'As soon as possible',
  'Within 6 months',
  'Within 1 year',
  'Within 2 years',
  'Flexible'
];
</script>

<template>
  <div class="space-y-6">
    <!-- Guardian Agreement -->
    <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
      <label class="text-sm font-medium text-slate-700 font-inter">Do your guardians agree to your marriage?</label>
      <URadioGroup
        v-model="biodata.marriage.guardian_agreed"
        :items="['Yes', 'No', 'They are not aware yet']"
        orientation="horizontal"
      />
    </div>

    <!-- Female Specific Questions -->
    <div v-if="biodata.identity.gender === 'Female'" class="grid grid-cols-1 md:grid-cols-2 gap-6 bg-rose-50/50 p-6 rounded-xl border border-rose-100">
      <div class="flex flex-col gap-2">
        <label class="text-sm font-medium text-slate-700 font-inter">Do you want to study after marriage?</label>
        <URadioGroup
          v-model="biodata.marriage.study_after_marriage"
          :items="['Yes', 'No', 'Depends on situation']"
          orientation="horizontal"
        />
      </div>

      <div class="flex flex-col gap-2">
        <label class="text-sm font-medium text-slate-700 font-inter">Do you want to do a job after marriage?</label>
        <URadioGroup
          v-model="biodata.marriage.willing_to_do_job"
          :items="['Yes', 'No', 'Depends on situation']"
          orientation="horizontal"
        />
      </div>
    </div>

    <!-- Male Specific Questions -->
    <div v-if="biodata.identity.gender === 'Male'" class="grid grid-cols-1 md:grid-cols-2 gap-6 bg-blue-50/50 p-6 rounded-xl border border-blue-100">
      <div class="flex flex-col gap-2">
        <label class="text-sm font-medium text-slate-700 font-inter">Would you allow your wife to study after marriage?</label>
        <URadioGroup
          v-model="biodata.marriage.allow_wife_study"
          :items="['Yes', 'No', 'Depends on situation']"
          orientation="horizontal"
        />
      </div>

      <div class="flex flex-col gap-2">
        <label class="text-sm font-medium text-slate-700 font-inter">Would you let your wife work after marriage?</label>
        <URadioGroup
          v-model="biodata.marriage.let_wife_work"
          :items="['Yes', 'No', 'Depends on situation']"
          orientation="horizontal"
        />
      </div>
    </div>

    <!-- Expected Time for Marriage -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <SelectWithLabel
        label="When do you expect to get married?"
        v-model="biodata.marriage.marriage_time"
        :items="marriageTimes"
        placeholder="Select expected timeframe"
        :error="errors['marriage_time']"
      />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Living Arrangements -->
      <InputWithLabel
        label="Where / How will you live after marriage?"
        type="textarea"
        v-model="biodata.marriage.living_after_marriage"
        placeholder="E.g. Separate flat, with parents in our own home, renting in Dhaka..."
        :rows="3"
      />

      <!-- Gift / Dowry Expectations -->
      <InputWithLabel
        label="Demands or expectations of gifts / dowry?"
        type="textarea"
        v-model="biodata.marriage.gift_expectation"
        placeholder="E.g. No dowry expected, simple Islamic marriage preferred..."
        :rows="3"
      />
    </div>

    <!-- Thoughts on Marriage -->
    <InputWithLabel
      label="Your thoughts on marriage / What does marriage mean to you?"
      type="textarea"
      v-model="biodata.marriage.thoughts_on_marriage"
      placeholder="Write at least 10 characters explaining your views..."
      :error="errors['thoughts_on_marriage']"
      :rows="4"
    />

    <!-- Partner Roles / Life plans -->
    <InputWithLabel
      label="Your life partner roles & future plans"
      type="textarea"
      v-model="biodata.marriage.marriage_plan"
      placeholder="Explain your expectations regarding partner responsibilities and joint plans..."
      is-optional
      :rows="3"
    />
  </div>
</template>
