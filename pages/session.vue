<template>
  <div>
    <p v-if="username">You are signed in as <strong>{{ username }}</strong>.</p>
    <p v-else>You are not signed in.</p>

    <sign-out-button />
  </div>
</template>

<script>
import { CognitoUserPool } from 'amazon-cognito-identity-js'
import SignOutButton from '~/components/SignOutButton'

export default {
  components: {
    SignOutButton
  },

  data() {
    return { username: '' }
  },

  mounted() {
    const cognitoUserPool = new CognitoUserPool({
      UserPoolId: process.env.NUXT_ENV_USER_POOL_ID,
      ClientId: process.env.NUXT_ENV_CLIENT_ID
    })
    const cognitoUser = cognitoUserPool.getCurrentUser()

    if (cognitoUser) {
      this.username = cognitoUser.username
    }
  }
}
</script>
