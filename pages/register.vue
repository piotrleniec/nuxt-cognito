<template>
  <v-layout
    align-center
    justify-center
  >
    <v-flex xs6>
      <v-card>
        <v-card-title>
          <h1>Create Account</h1>
        </v-card-title>

        <v-form v-model="valid">
          <v-card-text>
            <v-text-field
              v-model="email"
              :rules="emailRules"
              type="email"
              placeholder="Email"
            />

            <v-text-field
              v-model="password"
              :rules="passwordRules"
              type="password"
              placeholder="Password"
            />

            <v-text-field
              v-model="passwordConfirmation"
              :rules="passwordConfirmationRules"
              :error-messages="passwordMatchError"
              type="password"
              placeholder="Confirm Password"
            />
          </v-card-text>

          <v-card-actions>
            <v-btn
              :disabled="!valid"
              color="primary"
            >
              Submit
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      passwordConfirmation: '',
      valid: false,
      emailRules: [
        v => !!v || 'is required',
        v => /^.+@.+$/.test(this.email) || 'invalid format'
      ],
      passwordRules: [
        v => !!v || 'is required',
        v => v.length >= 6 || 'must have at least 6 characters'
      ],
      passwordConfirmationRules: [v => !!v || 'is required']
    }
  },
  computed: {
    passwordMatchError() {
      if (this.password === this.passwordConfirmation) return ''

      return "doesn't match the password"
    }
  }
}
</script>
