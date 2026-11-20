<script lang="ts" setup>
import { useBiodataForm } from '~/features/biodata/hooks/useBiodataForm';
import { familyType } from '~/constants/forms/select-data';
import { maritalStatusItems } from '~/constants/form-options';
import InputWithLabel from '~/components/ui/InputWithLabel.vue';
import SelectWithLabel from '~/components/ui/SelectWithLabel.vue';

const { biodata, errors } = useBiodataForm();

// Financial status options
const financialStatuses = ['Upper Class', 'Upper Middle Class', 'Middle Class', 'Lower Middle Class', 'Lower Class'];
const rankOptions = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

const addSibling = () => {
  biodata.family.siblings.siblings_details.push({
    order: biodata.family.siblings.siblings_details.length + 1,
    name: '',
    profession: '',
    marital_status: 'Never Married',
    alive: true,
    gender: 'male',
    spouse_name: '',
    spouse_profession: '',
  });
  biodata.family.siblings.sibling_nums = biodata.family.siblings.siblings_details.length;
};

const removeSibling = (index: number) => {
  biodata.family.siblings.siblings_details.splice(index, 1);
  biodata.family.siblings.sibling_nums = biodata.family.siblings.siblings_details.length;
  // Recalculate orders
  biodata.family.siblings.siblings_details.forEach((s, idx) => s.order = idx + 1);
};

const addRelative = () => {
  biodata.family.relatives.push({
    name: '',
    profession: '',
    relationship: '',
    phone_number: '',
  });
};

const removeRelative = (index: number) => {
  biodata.family.relatives.splice(index, 1);
};
</script>

<template>
  <div class="space-y-8">
    <!-- Family Core Info -->
    <div class="space-y-6">
      <h3 class="text-md font-semibold text-slate-700 font-inter border-b pb-2">Family Information</h3>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectWithLabel
          label="Family Type"
          v-model="biodata.family.type"
          :items="familyType"
          placeholder="Select family type"
          :error="errors['type']"
        />

        <InputWithLabel
          label="Family Location / District"
          v-model="biodata.family.location"
          placeholder="E.g. Dhaka, Khulna"
          is-optional
        />
      </div>
    </div>

    <!-- Father's Info -->
    <div class="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-4">
      <div class="flex justify-between items-center border-b border-slate-200 pb-3">
        <span class="text-sm font-semibold text-slate-700 font-inter">Father's Information</span>
        <div class="flex items-center gap-2">
          <label class="text-xs text-slate-500 font-inter">Is Father Alive?</label>
          <URadioGroup
            v-model="biodata.family.father_alive"
            :items="[{ label: 'Yes', value: true }, { label: 'No', value: false }]"
            orientation="horizontal"
          />
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputWithLabel
          label="Father's Name"
          v-model="biodata.family.father_name"
          placeholder="Enter father's name"
          :error="errors['father_name']"
          :is-optional="!biodata.family.father_alive"
        />

        <InputWithLabel
          v-if="biodata.family.father_alive"
          label="Father's Phone Number"
          v-model="biodata.family.father_phone"
          placeholder="Enter father's phone number"
        />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputWithLabel
          label="Father's Occupation"
          v-model="biodata.family.father_occupation"
          placeholder="E.g. Retired Govt. Service Officer"
          is-optional
        />
      </div>
    </div>

    <!-- Mother's Info -->
    <div class="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-4">
      <div class="flex justify-between items-center border-b border-slate-200 pb-3">
        <span class="text-sm font-semibold text-slate-700 font-inter">Mother's Information</span>
        <div class="flex items-center gap-2">
          <label class="text-xs text-slate-500 font-inter">Is Mother Alive?</label>
          <URadioGroup
            v-model="biodata.family.mother_alive"
            :items="[{ label: 'Yes', value: true }, { label: 'No', value: false }]"
            orientation="horizontal"
          />
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputWithLabel
          label="Mother's Name"
          v-model="biodata.family.mother_name"
          placeholder="Enter mother's name"
          :error="errors['mother_name']"
          :is-optional="!biodata.family.mother_alive"
        />

        <InputWithLabel
          v-if="biodata.family.mother_alive"
          label="Mother's Phone Number"
          v-model="biodata.family.mother_phone"
          placeholder="Enter mother's phone number"
        />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputWithLabel
          label="Mother's Occupation"
          v-model="biodata.family.mother_occupation"
          placeholder="E.g. Homemaker, School Teacher"
          is-optional
        />
      </div>
    </div>

    <!-- Sibling Info -->
    <div class="space-y-4">
      <div class="flex items-center gap-4 border-b border-slate-200 pb-3">
        <label class="text-sm font-semibold text-slate-700 font-inter">Do you have siblings?</label>
        <URadioGroup
          v-model="biodata.family.siblings.have_siblings"
          :items="[{ label: 'Yes', value: true }, { label: 'No', value: false }]"
          orientation="horizontal"
        />
      </div>

      <div v-if="biodata.family.siblings.have_siblings" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SelectWithLabel
            label="Your rank among siblings"
            v-model="biodata.family.siblings.self_rank"
            :items="rankOptions"
            @update:model-value="val => biodata.family.siblings.self_rank = Number(val)"
            placeholder="Select order of birth"
          />
        </div>

        <div v-for="(sibling, index) in biodata.family.siblings.siblings_details" :key="index" class="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4">
          <div class="flex justify-between items-center border-b border-slate-100 pb-2">
            <span class="text-xs font-semibold text-slate-600 font-inter">Sibling {{ index + 1 }}</span>
            <UButton
              icon="i-lucide-trash"
              color="error"
              variant="ghost"
              size="xs"
              @click="removeSibling(index)"
            >
              Remove Sibling
            </UButton>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InputWithLabel
              label="Name"
              v-model="sibling.name"
              placeholder="Enter name"
            />

            <SelectWithLabel
              label="Gender"
              v-model="sibling.gender"
              :items="['male', 'female']"
              placeholder="Select gender"
            />

            <SelectWithLabel
              label="Marital Status"
              v-model="sibling.marital_status"
              :items="maritalStatusItems"
              placeholder="Select status"
            />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputWithLabel
              label="Profession / Occupation"
              v-model="sibling.profession"
              placeholder="E.g. Student, Banker"
            />

            <div class="flex items-center gap-2">
              <label class="text-xs text-slate-500 font-inter">Alive?</label>
              <URadioGroup
                v-model="sibling.alive"
                :items="[{ label: 'Yes', value: true }, { label: 'No', value: false }]"
                orientation="horizontal"
              />
            </div>
          </div>

          <!-- Spouse Conditional fields -->
          <div v-if="sibling.marital_status === 'Married'" class="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-3 rounded-lg border border-slate-100">
            <InputWithLabel
              label="Spouse Name"
              v-model="sibling.spouse_name"
              placeholder="Enter spouse name"
            />
            <InputWithLabel
              label="Spouse Profession"
              v-model="sibling.spouse_profession"
              placeholder="Enter spouse occupation"
            />
          </div>
        </div>

        <div class="flex justify-start">
          <UButton
            icon="i-lucide-plus"
            variant="outline"
            color="primary"
            size="sm"
            @click="addSibling"
            class="font-inter"
          >
            Add Sibling
          </UButton>
        </div>
      </div>
    </div>

    <!-- Financial Status & Assets -->
    <div class="space-y-6 pt-4 border-t border-slate-100">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectWithLabel
          label="Financial Class Status"
          v-model="biodata.family.financial_condition"
          :items="financialStatuses"
          placeholder="Select status class"
          :error="errors['financial_condition']"
        />

        <InputWithLabel
          label="Family Assets Details"
          type="textarea"
          v-model="biodata.family.family_assets"
          placeholder="E.g. Family owns a 3-story house in Mirpur, 10 Bighas of agricultural land in Jessore..."
        />
      </div>

      <!-- Family Debts -->
      <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4">
        <div class="flex items-center gap-4">
          <label class="text-sm font-medium text-slate-700 font-inter">Does your family have any active loans or debts?</label>
          <URadioGroup
            v-model="biodata.family.debt"
            :items="[{ label: 'Yes', value: true }, { label: 'No', value: false }]"
            orientation="horizontal"
          />
        </div>
        <div v-if="biodata.family.debt">
          <InputWithLabel
            label="Provide Debt / Loan details"
            type="textarea"
            v-model="biodata.family.debt_details"
            placeholder="Describe the loan amount and repayment details..."
          />
        </div>
      </div>
    </div>

    <!-- Relatives (Maternal/Paternal uncles & aunts) -->
    <div class="space-y-4 pt-4 border-t border-slate-100">
      <h4 class="text-sm font-semibold text-slate-700 font-inter">Notable Relatives & Professional Standings (Mama, Khalas, Chachas, Fupus)</h4>

      <div v-for="(relative, index) in biodata.family.relatives" :key="index" class="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4">
        <div class="flex justify-between items-center border-b border-slate-100 pb-2">
          <span class="text-xs font-semibold text-slate-600 font-inter">Relative {{ index + 1 }}</span>
          <UButton
            icon="i-lucide-trash"
            color="error"
            variant="ghost"
            size="xs"
            @click="removeRelative(index)"
          >
            Remove Relative
          </UButton>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputWithLabel
            label="Relative Name"
            v-model="relative.name"
            placeholder="Enter name"
          />

          <InputWithLabel
            label="Relationship"
            v-model="relative.relationship"
            placeholder="E.g. Paternal Uncle (Chacha), Maternal Uncle (Mama)"
          />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputWithLabel
            label="Profession / Status"
            v-model="relative.profession"
            placeholder="E.g. Joint Secretary, Businessman, Doctor"
          />

          <InputWithLabel
            label="Contact Phone (Optional)"
            v-model="relative.phone_number"
            placeholder="Enter phone number"
          />
        </div>
      </div>

      <div class="flex justify-start">
        <UButton
          icon="i-lucide-plus"
          variant="outline"
          color="primary"
          size="sm"
          @click="addRelative"
          class="font-inter"
        >
          Add Relative Info
        </UButton>
      </div>
    </div>
  </div>
</template>
