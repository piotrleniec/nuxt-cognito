<template>
  <div>
    <v-btn
      :disabled="!idToken"
      color="error"
      @click="callExpressEndpoint"
    >
      Call Express Endpoint
    </v-btn>

    <pre v-if="decodedIdToken">
{{ JSON.stringify(decodedIdToken, null, 4) }}
    </pre>
  </div>
</template>

<script>
import { CognitoUserPool } from 'amazon-cognito-identity-js'

export default {
  data() {
    return {
      idToken: null,
      decodedIdToken: null
    }
  },

  mounted() {
    const cognitoUserPool = new CognitoUserPool({
      UserPoolId: process.env.NUXT_ENV_USER_POOL_ID,
      ClientId: process.env.NUXT_ENV_CLIENT_ID
    })
    const cognitoUser = cognitoUserPool.getCurrentUser()

    if (cognitoUser) {
      cognitoUser.getSession((error, session) => {
        this.idToken = session.getIdToken().getJwtToken()
      })
    }
  },

  methods: {
    callExpressEndpoint() {
      this.$axios
        .post('/express/jwtEndpoint', { idToken: this.idToken })
        .then(response => {
          this.decodedIdToken = response.data.decodedIdToken
        })
    }
  }
}
</script>
