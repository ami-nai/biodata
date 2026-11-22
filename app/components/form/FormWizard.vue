<script lang="ts" setup>
import { ref, nextTick } from 'vue';
import { documentConfig } from '~/config/product';
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
  resetForm,
  saveStatus
} = useBiodataForm();

const emit = defineEmits(['preview']);
const steps = documentConfig.steps.map((label, index) => ({ serial: index + 1, label }));
const stepListOpen = ref(false);
const resetOpen = ref(false);
const heading = ref<HTMLElement>();
const focusHeading = () => nextTick(() => { heading.value?.focus(); heading.value?.scrollIntoView({ block: 'start', behavior: 'instant' }); });
const handleNext = () => {
  if (currentStep.value < steps.length) {
    nextStep();
  } else if (validateStep(10)) {
    emit('preview');
  }
  focusHeading();
};
const selectStep = (step: number) => { goToStep(step); stepListOpen.value = false; focusHeading(); };
const startOver = () => { resetForm(); resetOpen.value = false; stepListOpen.value = false; focusHeading(); };
</script>

<template>
  <div class="form-editor">
    <div class="step-heading">
      <div class="flex items-center justify-between gap-3">
        <p class="eyebrow">Step {{ currentStep }} of {{ steps.length }}</p>
        <UButton variant="ghost" color="neutral" @click="stepListOpen = true" aria-label="View all steps">All steps <UIcon name="i-lucide-list" /></UButton>
      </div>
      <h1 ref="heading" tabindex="-1">{{ steps[currentStep - 1]?.label }}</h1>
      <div class="step-progress" role="progressbar" :aria-valuenow="currentStep" :aria-valuemax="steps.length" aria-valuemin="1" aria-label="Form progress"><span :style="{ width: `${currentStep / steps.length * 100}%` }" /></div>
      <div class="form-guidance"><span>All fields are required unless marked Optional.</span><span role="status">{{ saveStatus }}</span></div>
    </div>
    <div v-if="Object.keys(errors).length" class="error-summary" role="alert">
      <p class="font-semibold">A few details need your attention.</p>
      <p>{{ Object.keys(errors).length }} fields need a check. Follow the messages below.</p>
    </div>
    <div class="step-fields">
      <KeepAlive><component :is="[IdentityStep, ReligionStep, LocationStep, EducationStep, CareerStep, FamilyStep, LifestyleStep, MarriageStep, PreferenceStep, PhotoStep][currentStep - 1]" /></KeepAlive>
    </div>
    <nav class="form-actions" aria-label="Form navigation">
      <UButton variant="ghost" color="neutral" :disabled="currentStep === 1" @click="prevStep(); focusHeading()">Back</UButton>
      <UButton variant="outline" color="neutral" @click="emit('preview')">Preview</UButton>
      <UButton @click="handleNext">{{ currentStep === steps.length ? 'Review' : 'Next' }} <UIcon name="i-lucide-arrow-right" /></UButton>
    </nav>
    <USlideover v-model:open="stepListOpen" title="Your document" description="Pick a step to return to. Complete earlier steps to unlock the next." side="right">
      <template #body><ol class="step-list"><li v-for="step in steps" :key="step.serial"><button :aria-current="currentStep === step.serial ? 'step' : undefined" :disabled="!canAccessStep(step.serial)" @click="selectStep(step.serial)"><span>{{ String(step.serial).padStart(2, '0') }}</span>{{ step.label }}<UIcon v-if="isStepComplete(step.serial)" name="i-lucide-check" class="ml-auto" /></button></li></ol></template>
      <template #footer><UButton variant="ghost" color="neutral" @click="resetOpen = true">Start over…</UButton></template>
    </USlideover>
    <UModal v-model:open="resetOpen" title="Clear this draft?" description="All your details and photos will be removed from this browser. This cannot be undone.">
      <template #footer><UButton color="neutral" variant="outline" @click="resetOpen = false">Keep editing</UButton><UButton color="error" @click="startOver">Clear draft</UButton></template>
    </UModal>
  </div>
</template>
