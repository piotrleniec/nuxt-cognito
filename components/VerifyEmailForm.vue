<template>
  <v-form v-model="valid">
    <v-text-field
      v-model="code"
      :rules="codeRules"
      type="number"
      placeholder="Code"
    />

    <v-btn
      :disabled="!valid"
      color="primary"
      @click="verify"
    >
      Submit
    </v-btn>
  </v-form>
</template>

<script>
import {
  CognitoUserPool,
  CognitoUser,
  CookieStorage,
  AuthenticationDetails
} from 'amazon-cognito-identity-js'

export default {
  props: {
    email: {
      type: String,
      default: ''
    },
    password: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      code: '',
      valid: false,
      codeRules: [
        v => !!v || 'is required',
        v => v.length === 6 || 'must have exactly 6 digits'
      ]
    }
  },

  methods: {
    verify() {
      const cognitoUserPool = new CognitoUserPool({
        UserPoolId: process.env.NUXT_ENV_USER_POOL_ID,
        ClientId: process.env.NUXT_ENV_CLIENT_ID
      })
      const cognitoUser = new CognitoUser({
        Username: this.email,
        Pool: cognitoUserPool
      })

      cognitoUser.confirmRegistration(this.code, true, (error, result) => {
        if (error) {
          alert(JSON.stringify(error, null, 2))
          return
        }

        alert(JSON.stringify(result, null, 2))

        const authenticationDetails = new AuthenticationDetails({
          Username: this.email,
          Password: this.password
        })
        cognitoUser.authenticateUser(authenticationDetails, {
          onSuccess: result => {
            cognitoUser.cacheTokens()
            alert(JSON.stringify(result, null, 2))
          },
          onFailure: error => {
            alert(JSON.stringify(error, null, 2))
          }
        })
      })
    }
  }
}
</script>
