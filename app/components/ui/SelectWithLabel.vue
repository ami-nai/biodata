<script lang="ts" setup>
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  modelValue: {
    type: [String, Number, Array],
    default: '',
  },
  items: {
    type: Array as () => any[],
    default: () => [],
  },
  placeholder: {
    type: String,
    default: 'Select option',
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
  multiple: {
    type: Boolean,
    default: false,
  },
  allowCreate: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:modelValue']);

const updateValue = (val: any) => {
  emit('update:modelValue', val);
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

    <!-- Nuxt UI Select Menu for premium search/create/multiselect experiences -->
    <USelectMenu
      :model-value="modelValue"
      @update:model-value="updateValue"
      @create="(value: string) => updateValue(multiple ? [...(Array.isArray(modelValue) ? modelValue : []), value] : value)"
      :items="items"
      :placeholder="placeholder"
      :disabled="isDisabled"
      :multiple="multiple"
      :create-item="allowCreate"
      :color="error ? 'error' : 'neutral'"
      class="font-inter w-full min-w-[240px]"
    />

    <p v-if="error" class="text-xs text-red-500 font-inter mt-0.5">{{ error }}</p>
  </div>
</template>
