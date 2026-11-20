<script lang="ts" setup>
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
      <label class="text-sm font-medium text-slate-700 font-inter">
        {{ label }}
        <span v-if="!isOptional" class="text-red-500">*</span>
      </label>
      <span v-if="isOptional" class="text-xs text-slate-400 font-inter italic">Optional</span>
    </div>

    <!-- Textarea type -->
    <UTextarea
      v-if="type === 'textarea'"
      :model-value="modelValue"
      @update:model-value="updateValue"
      :placeholder="placeholder"
      :disabled="isDisabled"
      :rows="rows"
      :color="error ? 'error' : 'neutral'"
      class="font-inter w-full min-w-[240px]"
    />

    <!-- Date type (Standard html5 date styled beautifully) -->
    <UInput
      v-else-if="type === 'date'"
      type="date"
      :model-value="modelValue"
      @update:model-value="updateValue"
      :disabled="isDisabled"
      :color="error ? 'error' : 'neutral'"
      class="font-inter w-full min-w-[240px]"
    />

    <!-- Standard Input types -->
    <UInput
      v-else
      :type="type"
      :model-value="modelValue"
      @update:model-value="updateValue"
      :placeholder="placeholder"
      :disabled="isDisabled"
      :color="error ? 'error' : 'neutral'"
      class="font-inter w-full min-w-[240px]"
    />

    <p v-if="error" class="text-xs text-red-500 font-inter mt-0.5">{{ error }}</p>
  </div>
</template>
