<template>
  <v-layout
    align-center
    justify-center
  >
    <v-flex xs6>
      <v-card>
        <v-card-title>
          <h1>Verify Email</h1>
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
              v-model="code"
              :rules="codeRules"
              type="number"
              placeholder="Code"
            />
          </v-card-text>

          <v-card-actions>
            <v-btn
              :disabled="!valid"
              color="primary"
              @click="verify"
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
import { CognitoUserPool, CognitoUser } from 'amazon-cognito-identity-js'

export default {
  data() {
    return {
      email: '',
      code: '',
      valid: true,
      emailRules: [
        v => !!v || 'is required',
        v => /^.+@.+$/.test(this.email) || 'invalid format'
      ],
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
          alert(JSON.stringify(error))
          return
        }

        alert(JSON.stringify(result))
      })
    }
  }
}
</script>
