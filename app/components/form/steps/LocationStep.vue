<script lang="ts" setup>
import { ref, computed, watch } from 'vue';
import { useBiodataForm } from '~/features/biodata/hooks/useBiodataForm';
import countryData from '~/constants/data/country.json';
import { districtsByDivision } from '~/constants/division';
import InputWithLabel from '~/components/ui/InputWithLabel.vue';
import SelectWithLabel from '~/components/ui/SelectWithLabel.vue';

const { biodata, errors } = useBiodataForm();

const countries = countryData.countries || [];
const residencyStatuses = ['Citizen', 'Permanent Resident (PR)', 'Student Visa', 'Work Visa', 'Tourist Visa', 'Other'];
const relocationOptions = [
  'Willing to move abroad',
  'Willing to move into another city',
  'Not willing to relocate',
  'Willing to return to home country',
  'Other'
];

const divisions = computed(() => districtsByDivision.map(d => d.division));

const currentDistricts = computed(() => {
  const selectedDiv = biodata.residency.current_location.division;
  const divObj = districtsByDivision.find(d => d.division === selectedDiv);
  return divObj ? divObj.districts : [];
});

const permanentDistricts = computed(() => {
  const selectedDiv = biodata.residency.permanent_location.division;
  const divObj = districtsByDivision.find(d => d.division === selectedDiv);
  return divObj ? divObj.districts : [];
});

// "Same as current location" helper
const sameAsCurrent = ref(false);

const syncPermanentLocation = () => {
  if (sameAsCurrent.value) {
    Object.assign(biodata.residency.permanent_location, {
      cor: biodata.residency.current_location.cor,
      status: biodata.residency.current_location.status,
      state: biodata.residency.current_location.state,
      city: biodata.residency.current_location.city,
      division: biodata.residency.current_location.division,
      district: biodata.residency.current_location.district,
      sub_district: biodata.residency.current_location.sub_district,
      village: biodata.residency.current_location.village,
      home_address: biodata.residency.current_location.home_address,
      grew_up_in: biodata.residency.current_location.cor,
      willing_to_relocate: 'Not willing to relocate',
    });
  }
};

watch(() => sameAsCurrent.value, (newVal) => {
  if (newVal) syncPermanentLocation();
});

watch(() => biodata.residency.current_location, () => {
  if (sameAsCurrent.value) syncPermanentLocation();
}, { deep: true });

// Clear sub-fields when country changes
watch(() => biodata.residency.current_location.cor, (newCor) => {
  if (newCor !== 'Bangladesh') {
    biodata.residency.current_location.division = '';
    biodata.residency.current_location.district = '';
    biodata.residency.current_location.sub_district = '';
    biodata.residency.current_location.village = '';
  } else {
    biodata.residency.current_location.state = '';
    biodata.residency.current_location.city = '';
    biodata.residency.current_location.home_address = '';
  }
});

watch(() => biodata.residency.permanent_location.cor, (newCor) => {
  if (newCor !== 'Bangladesh') {
    biodata.residency.permanent_location.division = '';
    biodata.residency.permanent_location.district = '';
    biodata.residency.permanent_location.sub_district = '';
    biodata.residency.permanent_location.village = '';
  } else {
    biodata.residency.permanent_location.state = '';
    biodata.residency.permanent_location.city = '';
    biodata.residency.permanent_location.home_address = '';
  }
});
</script>

<template>
  <div class="space-y-8">
    <!-- Current Location Section -->
    <div class="space-y-6">
      <h3 class="text-md font-semibold text-slate-700 font-inter border-b pb-2">Current Location & Residency</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectWithLabel
          label="Country of Residence"
          v-model="biodata.residency.current_location.cor"
          :items="countries"
          placeholder="Select country"
          :error="errors['current_location.cor']"
        />

        <SelectWithLabel
          v-if="biodata.residency.current_location.cor !== 'Bangladesh'"
          label="Residency Status"
          v-model="biodata.residency.current_location.status"
          :items="residencyStatuses"
          placeholder="Select status"
          :error="errors['current_location.status']"
        />
      </div>

      <!-- Bangladesh specific division/district layout -->
      <div v-if="biodata.residency.current_location.cor === 'Bangladesh'" class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectWithLabel
          label="Division"
          v-model="biodata.residency.current_location.division"
          :items="divisions"
          placeholder="Select division"
        />

        <SelectWithLabel
          label="District"
          v-model="biodata.residency.current_location.district"
          :items="currentDistricts"
          placeholder="Select district"
          :disabled="!biodata.residency.current_location.division"
        />

        <InputWithLabel
          label="Upazila / Sub-District"
          v-model="biodata.residency.current_location.sub_district"
          placeholder="Enter upazila"
        />

        <InputWithLabel
          label="Village / Area / Post"
          v-model="biodata.residency.current_location.village"
          placeholder="Enter village or post office"
        />
      </div>

      <!-- Abroad specific layout -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputWithLabel
          label="State / Province"
          v-model="biodata.residency.current_location.state"
          placeholder="Enter state"
        />

        <InputWithLabel
          label="City"
          v-model="biodata.residency.current_location.city"
          placeholder="Enter city"
        />

        <InputWithLabel
          label="Home Address Details"
          type="textarea"
          v-model="biodata.residency.current_location.home_address"
          placeholder="Enter street address..."
          class="md:col-span-2"
        />
      </div>
    </div>

    <!-- Permanent Location Section -->
    <div class="space-y-6 pt-4 border-t border-slate-100">
      <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 border-b pb-2">
        <h3 class="text-md font-semibold text-slate-700 font-inter">Permanent Location</h3>
        <UCheckbox
          v-model="sameAsCurrent"
          label="Same as current location"
          class="font-inter text-sm"
        />
      </div>

      <div v-if="!sameAsCurrent" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SelectWithLabel
            label="Country"
            v-model="biodata.residency.permanent_location.cor"
            :items="countries"
            placeholder="Select country"
            :error="errors['permanent_location.cor']"
          />

          <SelectWithLabel
            v-if="biodata.residency.permanent_location.cor !== 'Bangladesh'"
            label="Residency Status"
            v-model="biodata.residency.permanent_location.status"
            :items="residencyStatuses"
            placeholder="Select status"
            :error="errors['permanent_location.status']"
          />
        </div>

        <div v-if="biodata.residency.permanent_location.cor === 'Bangladesh'" class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SelectWithLabel
            label="Division"
            v-model="biodata.residency.permanent_location.division"
            :items="divisions"
            placeholder="Select division"
          />

          <SelectWithLabel
            label="District"
            v-model="biodata.residency.permanent_location.district"
            :items="permanentDistricts"
            placeholder="Select district"
            :disabled="!biodata.residency.permanent_location.division"
          />

          <InputWithLabel
            label="Upazila / Sub-District"
            v-model="biodata.residency.permanent_location.sub_district"
            placeholder="Enter upazila"
          />

          <InputWithLabel
            label="Village / Area / Post"
            v-model="biodata.residency.permanent_location.village"
            placeholder="Enter village or post office"
          />
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputWithLabel
            label="State / Province"
            v-model="biodata.residency.permanent_location.state"
            placeholder="Enter state"
          />

          <InputWithLabel
            label="City"
            v-model="biodata.residency.permanent_location.city"
            placeholder="Enter city"
          />

          <InputWithLabel
            label="Home Address Details"
            type="textarea"
            v-model="biodata.residency.permanent_location.home_address"
            placeholder="Enter street address..."
            class="md:col-span-2"
          />
        </div>
      </div>

      <!-- Additional Permanent Fields -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectWithLabel
          label="Where did you grow up?"
          v-model="biodata.residency.permanent_location.grew_up_in"
          :items="countries"
          placeholder="Select country"
          :error="errors['permanent_location.grew_up_in']"
        />

        <SelectWithLabel
          label="Willingness to Relocate"
          v-model="biodata.residency.permanent_location.willing_to_relocate"
          :items="relocationOptions"
          placeholder="Select option"
          :error="errors['permanent_location.willing_to_relocate']"
        />
      </div>
    </div>
  </div>
</template>
