<script lang="ts" setup>
import { useId } from 'vue';
import DateParts from './DateParts.vue';
const inputId = useId();
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  modelValue: {
    type: [String, Number],
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: '',
  },
  isOptional: {
    type: Boolean,
    default: false,
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: '',
  },
  rows: {
    type: Number,
    default: 3,
  },
});

const emit = defineEmits(['update:modelValue']);

const updateValue = (val: any) => {
  emit('update:modelValue', props.type === 'number' ? (val === '' || val == null ? null : Number(val)) : val);
};
</script>

<template>
  <div class="flex flex-col gap-1.5 w-full">
    <div class="flex justify-between items-center">
      <label :for="inputId" class="text-sm font-medium text-slate-700 font-inter">
        {{ label }}
        
      </label>
      <span v-if="isOptional" class="text-xs text-slate-400 font-inter italic">Optional</span>
    </div>

    <!-- Textarea type -->
    <UTextarea
      :id="inputId"
      :aria-invalid="!!error"
      :aria-describedby="error ? `${inputId}-error` : undefined"
      v-if="type === 'textarea'"
      :model-value="modelValue"
      @update:model-value="updateValue"
      :placeholder="placeholder"
      :disabled="isDisabled"
      :rows="rows"
      :color="error ? 'error' : 'neutral'"
      class="font-inter w-full min-w-0"
    />

    <!-- Date type (Standard html5 date styled beautifully) -->
    <DateParts v-else-if="type === 'date'" :id="inputId" :model-value="String(modelValue || '')" :disabled="isDisabled" @update:model-value="updateValue" />

    <!-- Standard Input types -->
    <UInput
      :id="inputId"
      :aria-invalid="!!error"
      :aria-describedby="error ? `${inputId}-error` : undefined"
      v-else
      :type="type"
      :model-value="modelValue"
      @update:model-value="updateValue"
      :placeholder="placeholder"
      :disabled="isDisabled"
      :color="error ? 'error' : 'neutral'"
      class="font-inter w-full min-w-0"
    />

    <p :id="`${inputId}-error`" v-if="error" class="text-xs text-red-500 font-inter mt-0.5">{{ error }}</p>
  </div>
</template>
