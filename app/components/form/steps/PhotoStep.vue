<script lang="ts" setup>
import { ref } from 'vue';
import { useBiodataForm } from '~/features/biodata/hooks/useBiodataForm';
import SelectWithLabel from '~/components/ui/SelectWithLabel.vue';

const { biodata, errors } = useBiodataForm();

const MAX_SIZE_MB = 2;
const MAX_FILE_SIZE = MAX_SIZE_MB * 1024 * 1024;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

const fileError = ref('');
const albumError = ref('');
const profileInputRef = ref<HTMLInputElement | null>(null);
const albumInputRef = ref<HTMLInputElement | null>(null);

const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

const handleProfileUpload = async (event: Event) => {
  fileError.value = '';
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  if (file) {
    if (!ALLOWED_TYPES.includes(file.type)) {
      fileError.value = 'Please upload a JPEG, PNG, or WebP image.';
    } else if (file.size > MAX_FILE_SIZE) {
      fileError.value = `Image is too large. Maximum size allowed is ${MAX_SIZE_MB}MB.`;
    } else {
      try {
        const base64 = await convertToBase64(file);
        biodata.verification.profile_photo_url = base64;
      } catch (e) {
        console.error('Failed to convert profile picture:', e);
        fileError.value = 'Failed to process image file.';
      }
    }
  }

  if (profileInputRef.value) {
    profileInputRef.value.value = '';
  }
};

const removeProfilePhoto = () => {
  biodata.verification.profile_photo_url = null;
  fileError.value = '';
  if (profileInputRef.value) {
    profileInputRef.value.value = '';
  }
};

const handleAlbumUpload = async (event: Event) => {
  albumError.value = '';
  const target = event.target as HTMLInputElement;
  const files = target.files;

  if (!files || files.length === 0) return;

  const currentTotal = biodata.verification.album_photo_urls.length;
  if (currentTotal + files.length > 3) {
    albumError.value = 'Maximum of 3 album photos allowed.';
  } else {
    let valid = true;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!ALLOWED_TYPES.includes(file.type)) {
        albumError.value = 'Please upload JPEG, PNG, or WebP images only.';
        valid = false;
        break;
      }
      if (file.size > MAX_FILE_SIZE) {
        albumError.value = `One of the files is too large. Max size is ${MAX_SIZE_MB}MB.`;
        valid = false;
        break;
      }
    }
    if (valid) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        try {
          const base64 = await convertToBase64(file);
          biodata.verification.album_photo_urls.push(base64);
        } catch (e) {
          console.error('Failed to convert album picture:', e);
          albumError.value = 'Failed to process one or more images.';
        }
      }
    }
  }

  if (albumInputRef.value) {
    albumInputRef.value.value = '';
  }
};

const removeAlbumPhoto = (index: number) => {
  biodata.verification.album_photo_urls.splice(index, 1);
  albumError.value = '';
};

const visibilityOptions = ['Public', 'Private (Registered Users Only)', 'Premium Members Only'];
</script>

<template>
  <div class="space-y-6">
    <UAlert
      icon="i-lucide-shield-alert"
      description="Photos will be handled according to your privacy settings. We recommend uploading high-quality photos for better response."
      color="primary"
      variant="subtle"
      class="font-inter"
    />

    <!-- Profile Photo Upload -->
    <div class="space-y-3 bg-slate-50 p-6 rounded-xl border border-slate-200">
      <label class="text-sm font-semibold text-slate-700 font-inter block">
        Profile Photo 
      </label>
      
      <div class="flex flex-col sm:flex-row items-center gap-6">
        <!-- Photo Preview Circle -->
        <div class="w-32 h-32 rounded-full overflow-hidden border-2 border-slate-300 bg-slate-200 flex justify-center items-center flex-shrink-0 relative group">
          <img
            v-if="biodata.verification.profile_photo_url"
            :src="biodata.verification.profile_photo_url"
            class="w-full h-full object-cover"
            alt="Profile Preview"
          />
          <UIcon
            v-else
            name="i-lucide-user"
            class="w-12 h-12 text-slate-400"
          />
          <button
            v-if="biodata.verification.profile_photo_url"
            type="button"
            @click="removeProfilePhoto"
            class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex justify-center items-center text-white"
          >
            <UIcon name="i-lucide-trash-2" class="w-6 h-6" />
          </button>
        </div>

        <!-- Upload Button Controls -->
        <div class="flex-1 space-y-2 text-center sm:text-left">
          <UButton
            v-if="!biodata.verification.profile_photo_url"
            type="button"
            icon="i-lucide-camera"
            variant="solid"
            color="primary"
            class="relative overflow-hidden font-inter"
          >
            Upload Photo
            <input
              ref="profileInputRef"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              class="absolute inset-0 opacity-0 cursor-pointer"
              @change="handleProfileUpload"
            />
          </UButton>
          <div v-else class="text-sm text-slate-500 font-inter">
            Photo uploaded. Hover over the image to delete and upload a new one.
          </div>
          <p class="text-xs text-slate-400 font-inter">Supports JPEG, PNG, or WebP. Max 2MB.</p>
          <p v-if="fileError || errors['profile_photo_url']" class="text-xs text-red-500 font-inter font-medium mt-1">
            {{ fileError || errors['profile_photo_url'] }}
          </p>
        </div>
      </div>
    </div>

    <!-- Album Photos Upload (Up to 3) -->
    <div class="space-y-4 bg-slate-50 p-6 rounded-xl border border-slate-200">
      <div class="flex justify-between items-center">
        <label class="text-sm font-semibold text-slate-700 font-inter">
          Album Photos
          <span class="text-xs text-slate-400 font-inter italic">Optional</span>
        </label>
        <span class="text-xs text-slate-400 font-inter font-medium">
          {{ biodata.verification.album_photo_urls.length }} / 3 uploaded
        </span>
      </div>

      <div class="flex flex-wrap gap-4 items-center">
        <!-- Previews -->
        <div
          v-for="(url, index) in biodata.verification.album_photo_urls"
          :key="index"
          class="w-24 h-24 rounded-lg overflow-hidden border border-slate-300 relative group flex-shrink-0"
        >
          <img :src="url" class="w-full h-full object-cover" alt="Album photo" />
          <button
            type="button"
            @click="removeAlbumPhoto(index)"
            class="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity flex justify-center items-center"
          >
            <UIcon name="i-lucide-x" class="w-3 h-3" />
          </button>
        </div>

        <!-- Add button -->
        <UButton
          v-if="biodata.verification.album_photo_urls.length < 3"
          type="button"
          icon="i-lucide-image-plus"
          variant="outline"
          color="neutral"
          class="w-24 h-24 rounded-lg border-dashed border-2 flex flex-col justify-center items-center relative gap-1 p-0"
        >
          <span class="text-xs text-slate-500 font-inter">Add Photos</span>
          <input
            ref="albumInputRef"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            class="absolute inset-0 opacity-0 cursor-pointer"
            @change="handleAlbumUpload"
          />
        </UButton>
      </div>

      <p v-if="albumError" class="text-xs text-red-500 font-inter font-medium mt-1">{{ albumError }}</p>
      <p class="text-xs text-slate-400 font-inter">Upload up to 3 additional gallery photos. Max 2MB each.</p>
    </div>

    <!-- Visibility & Payout -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
      <SelectWithLabel
        label="Profile Visibility Setting"
        v-model="biodata.verification.visibility"
        :items="visibilityOptions"
        placeholder="Select visibility level"
        :error="errors['visibility']"
      />
    </div>
  </div>
</template>
