import { test } from 'node:test';
import assert from 'node:assert/strict';
import { build } from 'esbuild';

async function loadModule(path) {
  const result = await build({ entryPoints: [path], bundle: true, platform: 'node', format: 'esm', write: false });
  return import(`data:text/javascript;base64,${Buffer.from(result.outputFiles[0].text).toString('base64')}`);
}

test('reset preserves the data shared by form and preview', async () => {
  const { useBiodataForm } = await loadModule('app/features/biodata/hooks/useBiodataForm.ts');
  const form = useBiodataForm();
  const preview = useBiodataForm();
  const identity = form.biodata.identity;
  identity.full_name = 'Example';
  form.biodata.education.entries.push({ degree: 'Example' });
  form.resetForm();
  assert.equal(form.biodata, preview.biodata);
  assert.equal(form.biodata.identity, identity);
  assert.equal(identity.full_name, '');
  assert.deepEqual(form.biodata.education.entries, []);
  identity.full_name = 'Updated';
  assert.equal(useBiodataForm().biodata.identity.full_name, 'Updated');
});

test('required selections and empty photos fail validation', async () => {
  const { religionSchema, verificationSchema, identitySchema } = await loadModule('app/features/biodata/schemas/biodata.schema.ts');
  assert.equal(religionSchema.safeParse({ religion: '' }).success, false);
  assert.equal(religionSchema.safeParse({ religion: 'Islam' }).success, true);
  assert.equal(identitySchema.shape.gender.safeParse('').success, false);
  assert.equal(verificationSchema.safeParse({ visibility: 'Public', profile_photo_url: '' }).success, false);
});

test('malformed drafts cannot replace sections or select nonexistent steps', async () => {
  globalThis.window = {};
  globalThis.localStorage = {
    getItem: () => JSON.stringify({ biodata: { identity: null, education: { entries: {} }, selectedTemplate: 'missing' }, currentStep: 99, completedSteps: ['1', -1, 2, 2] }),
    setItem: () => {},
  };
  const { useBiodataForm } = await loadModule('app/features/biodata/hooks/useBiodataForm.ts');
  const form = useBiodataForm();
  assert.equal(typeof form.biodata.identity, 'object');
  assert.notEqual(form.biodata.identity, null);
  assert.deepEqual(form.biodata.education.entries, []);
  assert.equal(form.currentStep.value, 1);
  assert.deepEqual(form.completedSteps.value, [2]);
  assert.equal(form.biodata.selectedTemplate, 'classic');
  delete globalThis.window;
  delete globalThis.localStorage;
});
