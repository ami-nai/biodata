<script lang="ts" setup>
import { useBiodataForm } from '~/features/biodata/hooks/useBiodataForm';
import IdentityStep from './steps/IdentityStep.vue';
import ReligionStep from './steps/ReligionStep.vue';
import LocationStep from './steps/LocationStep.vue';
import EducationStep from './steps/EducationStep.vue';
import CareerStep from './steps/CareerStep.vue';
import FamilyStep from './steps/FamilyStep.vue';
import LifestyleStep from './steps/LifestyleStep.vue';
import MarriageStep from './steps/MarriageStep.vue';
import PreferenceStep from './steps/PreferenceStep.vue';
import PhotoStep from './steps/PhotoStep.vue';

const {
  currentStep,
  completedSteps,
  errors,
  nextStep,
  prevStep,
  goToStep,
  validateStep,
  isStepComplete,
  canAccessStep,
  resetForm
} = useBiodataForm();

const steps = [
  { serial: 1, label: 'Identity' },
  { serial: 2, label: 'Religion' },
  { serial: 3, label: 'Location' },
  { serial: 4, label: 'Education' },
  { serial: 5, label: 'Career' },
  { serial: 6, label: 'Family' },
  { serial: 7, label: 'Lifestyle' },
  { serial: 8, label: 'Marriage' },
  { serial: 9, label: 'Preference' },
  { serial: 10, label: 'Photos' },
];

const handleNext = () => {
  const success = nextStep();
  if (success && currentStep.value === 10) {
    // Already on the final step, could show congrats
  }
};
</script>

<template>
  <div class="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
    <!-- Stepper indicator -->
    <div class="flex flex-nowrap overflow-x-auto pb-4 gap-2 border-b border-slate-100 scrollbar-thin">
      <button
        v-for="step in steps"
        :key="step.serial"
        @click="goToStep(step.serial)"
        :disabled="!canAccessStep(step.serial)"
        class="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold font-inter transition-all flex-shrink-0 cursor-pointer disabled:cursor-not-allowed"
        :class="[
          currentStep === step.serial
            ? 'bg-primary text-white shadow-sm'
            : isStepComplete(step.serial)
            ? 'bg-green-50 text-green-700 border border-green-200'
            : canAccessStep(step.serial)
            ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            : 'bg-slate-50 text-slate-400 opacity-60'
        ]"
      >
        <span
          class="w-4 h-4 rounded-full flex justify-center items-center text-[10px]"
          :class="[
            currentStep === step.serial
              ? 'bg-white text-primary'
              : isStepComplete(step.serial)
              ? 'bg-green-600 text-white'
              : 'bg-slate-300 text-slate-600'
          ]"
        >
          <UIcon v-if="isStepComplete(step.serial)" name="i-lucide-check" class="w-2.5 h-2.5" />
          <span v-else>{{ step.serial }}</span>
        </span>
        {{ step.label }}
      </button>
    </div>

    <!-- Active step form heading -->
    <div v-if="Object.keys(errors).length" class="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm font-inter">
      <p class="font-semibold mb-1 flex items-center gap-2">
        <UIcon name="i-lucide-alert-circle" class="w-4 h-4" /> Please fix the following before continuing:
      </p>
      <ul class="list-disc list-inside space-y-0.5">
        <li v-for="(message, key) in errors" :key="key as string">{{ message }}</li>
      </ul>
    </div>

    <!-- Active step form heading -->
    <div class="flex justify-between items-center pb-2">
      <h2 class="text-lg font-bold text-slate-800 font-inter">
        {{ currentStep }}. {{ steps[currentStep - 1]?.label }} Details
      </h2>
      <UButton
        variant="ghost"
        color="neutral"
        size="xs"
        icon="i-lucide-refresh-cw"
        @click="resetForm"
        class="font-inter text-xs text-slate-400 hover:text-slate-600"
      >
        Reset Form
      </UButton>
    </div>

    <!-- Render active step form view -->
    <div class="min-h-[300px]">
      <KeepAlive>
        <component
          :is="[
            IdentityStep,
            ReligionStep,
            LocationStep,
            EducationStep,
            CareerStep,
            FamilyStep,
            LifestyleStep,
            MarriageStep,
            PreferenceStep,
            PhotoStep
          ][currentStep - 1]"
        />
      </KeepAlive>
    </div>

    <!-- Wizard Controls Buttons -->
    <div class="flex justify-between items-center border-t border-slate-100 pt-6">
      <UButton
        @click="prevStep"
        :disabled="currentStep === 1"
        icon="i-lucide-arrow-left"
        variant="outline"
        color="neutral"
        class="font-inter"
      >
        Previous
      </UButton>

      <div class="flex gap-2">
        <UButton
          v-if="currentStep < 10"
          @click="handleNext"
          trailing-icon="i-lucide-arrow-right"
          variant="solid"
          color="primary"
          class="font-inter"
        >
          Next Step
        </UButton>
        <UButton
          v-else
          @click="() => validateStep(10)"
          icon="i-lucide-check-circle"
          variant="solid"
          color="success"
          class="font-inter"
        >
          Verify Complete
        </UButton>
      </div>
    </div>
  </div>
</template>
