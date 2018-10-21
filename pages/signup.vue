<template>
  <v-stepper v-model="currentStep">
    <v-stepper-header>
      <v-stepper-step
        :complete="currentStep > 1"
        step="1"
      >
        Create Account
      </v-stepper-step>

      <v-divider />

      <v-stepper-step
        :complete="currentStep > 2"
        step="2"
      >
        Verify Email
      </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <create-account-form :advance-to-verify-email-step="advanceToVerifyEmailStep" />
      </v-stepper-content>

      <v-stepper-content step="2">
        <verify-email-form
          :email="email"
          :password="password"
        />
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import CreateAccountForm from '~/components/CreateAccountForm'
import VerifyEmailForm from '~/components/VerifyEmailForm'

export default {
  components: {
    CreateAccountForm,
    VerifyEmailForm
  },

  data() {
    return {
      currentStep: 1,
      email: '',
      password: ''
    }
  },

  methods: {
    advanceToVerifyEmailStep(email, password) {
      this.email = email
      this.password = password
      this.currentStep = 2
    }
  }
}
</script>
