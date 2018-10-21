<template>
  <v-btn
    color="info"
    @click="signOut"
  >
    Sign Out
  </v-btn>
</template>

<script>
import { CognitoUserPool } from 'amazon-cognito-identity-js'

export default {
  methods: {
    signOut() {
      const cognitoUserPool = new CognitoUserPool({
        UserPoolId: process.env.NUXT_ENV_USER_POOL_ID,
        ClientId: process.env.NUXT_ENV_CLIENT_ID
      })
      const cognitoUser = cognitoUserPool.getCurrentUser()

      if (cognitoUser) {
        cognitoUser.signOut()
      }
    }
  }
}
</script>
