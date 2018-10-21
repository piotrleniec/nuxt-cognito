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

        <v-card-text>
          <v-form>
            <v-text-field
              type="email"
              placeholder="Email"
            />

            <v-text-field
              type="password"
              placeholder="Password"
            />

            <v-text-field
              type="password"
              placeholder="Confirm Password"
            />
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-btn color="primary">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>
