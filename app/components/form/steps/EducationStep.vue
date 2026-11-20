<script lang="ts" setup>
import { computed } from 'vue';
import { useBiodataForm } from '~/features/biodata/hooks/useBiodataForm';
import { educationItems } from '~/constants/form-options';
import InputWithLabel from '~/components/ui/InputWithLabel.vue';
import SelectWithLabel from '~/components/ui/SelectWithLabel.vue';

const { biodata, errors } = useBiodataForm();

const yearOptions = computed(() => {
  const currentYear = new Date().getFullYear();
  const years: string[] = ['Running'];
  for (let year = currentYear; year >= 1950; year--) {
    years.push(year.toString());
  }
  return years;
});

const addEducationEntry = () => {
  biodata.education.entries.push({
    degree: '',
    completion_year: '',
    institution: '',
    subject: '',
    result: '',
    curriculum: '',
  });
};

const removeEducationEntry = (index: number) => {
  biodata.education.entries.splice(index, 1);
};

// Initialize with one empty entry if list is empty
if (biodata.education.entries.length === 0) {
  addEducationEntry();
}
</script>

<template>
  <div class="space-y-6">
    <UAlert
      icon="i-lucide-info"
      description="Double-check your education entries. Accurate details help make your biodata look trustworthy."
      color="primary"
      variant="subtle"
      class="font-inter"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <SelectWithLabel
        label="Highest Educational Qualification"
        v-model="biodata.education.highest_degree"
        :items="educationItems"
        placeholder="Select highest qualification"
        :error="errors['highest_degree']"
      />
    </div>

    <div class="space-y-6">
      <div v-for="(entry, index) in biodata.education.entries" :key="index" class="bg-slate-50 p-6 rounded-xl border border-slate-200 relative space-y-4">
        <!-- Step Header -->
        <div class="flex justify-between items-center border-b border-slate-200 pb-3">
          <span class="text-sm font-semibold text-slate-700 font-inter">Education Level {{ index + 1 }}</span>
          <UButton
            v-if="biodata.education.entries.length > 1"
            icon="i-lucide-trash"
            color="error"
            variant="ghost"
            size="sm"
            @click="removeEducationEntry(index)"
          >
            Remove
          </UButton>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputWithLabel
            label="Degree / Certificate Name"
            v-model="entry.degree"
            placeholder="E.g. SSC, B.Sc. in CSE"
            :error="errors[`entries.${index}.degree`]"
          />

          <SelectWithLabel
            label="Completion Year"
            v-model="entry.completion_year"
            :items="yearOptions"
            placeholder="Select year"
            :error="errors[`entries.${index}.completion_year`]"
          />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputWithLabel
            label="Institution / Board / University"
            v-model="entry.institution"
            placeholder="E.g. Dhaka University"
            :error="errors[`entries.${index}.institution`]"
          />

          <InputWithLabel
            label="Group / Subject / Major"
            v-model="entry.subject"
            placeholder="E.g. Science, Computer Science"
            :error="errors[`entries.${index}.subject`]"
          />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputWithLabel
            label="Result / GPA / CGPA"
            v-model="entry.result"
            placeholder="E.g. GPA 5.00, CGPA 3.82"
            is-optional
          />

          <InputWithLabel
            label="Curriculum"
            v-model="entry.curriculum"
            placeholder="E.g. National, British (Edexcel/CIE), IB"
            is-optional
          />
        </div>
      </div>

      <div class="flex justify-start">
        <UButton
          icon="i-lucide-plus"
          variant="outline"
          color="primary"
          @click="addEducationEntry"
          class="font-inter"
        >
          Add Another Education Level
        </UButton>
      </div>

      <!-- General entries validation error message -->
      <p v-if="errors['entries']" class="text-sm text-red-500 font-inter mt-2">{{ errors['entries'] }}</p>
    </div>
  </div>
</template>
