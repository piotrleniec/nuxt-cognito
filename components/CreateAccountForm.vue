<template>
  <v-form v-model="valid">
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

    <v-btn
      :disabled="!valid"
      color="primary"
      @click="createAccount"
    >
      Submit
    </v-btn>
  </v-form>
</template>

<script>
import { CognitoUserPool } from 'amazon-cognito-identity-js'

export default {
  props: {
    advanceToVerifyEmailStep: {
      type: Function,
      default: () => {}
    }
  },

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
  },

  methods: {
    createAccount() {
      const cognitoUserPool = new CognitoUserPool({
        UserPoolId: process.env.NUXT_ENV_USER_POOL_ID,
        ClientId: process.env.NUXT_ENV_CLIENT_ID
      })

      cognitoUserPool.signUp(
        this.email,
        this.password,
        null,
        null,
        (error, result) => {
          if (error) {
            alert(JSON.stringify(error))
            return
          }

          alert(JSON.stringify(result))
          this.advanceToVerifyEmailStep(this.email)
        }
      )
    }
  }
}
</script>
