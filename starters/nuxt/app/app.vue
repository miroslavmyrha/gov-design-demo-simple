<script setup lang="ts">
import { GovButton, GovCard, GovContainer, GovFormControl, GovFormInput, GovFormLabel, GovIcon, GovThemeSwitch } from '@gov-design-system-ce/vue'
</script>

<template>
  <GovContainer>
    <h1>Gov Design System CE: Nuxt starter</h1>

    <p>
      If the button below is styled, the icon renders, and the theme switch works, the design system is wired up correctly. The page is rendered on the
      server and hydrated without a single mismatch.
    </p>

    <GovThemeSwitch />

    <!-- The heading goes in the `headline` slot, not `title`. -->
    <GovCard>
      <h2 slot="headline">A card</h2>
      <p>Cards, buttons, inputs, and icons: enough to prove styles, tokens, fonts, and icon assets all resolve.</p>
    </GovCard>

    <!-- Inputs get their label from GovFormControl + GovFormLabel.
         GovFormInput has no `label` prop; `identifier` ties them together. -->
    <GovFormControl>
      <GovFormLabel identifier="name">Your name</GovFormLabel>
      <GovFormInput identifier="name" placeholder="Jan Novák" />
    </GovFormControl>

    <GovButton type="solid" color="primary" size="m">
      Submit
      <GovIcon slot="icon-end" name="chevron-right" />
    </GovButton>
  </GovContainer>
</template>
