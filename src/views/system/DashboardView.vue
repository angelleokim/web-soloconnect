<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
import SideNavigation from '@/components/layout/navigation/SideNavigation.vue'
import { ref } from 'vue'
import { useDisplay } from 'vuetify'

// Utilize pre-defined vue functions
const { mobile } = useDisplay()

const isDrawerVisible = ref(mobile.value ? false : true)
</script>

<template>
  <AppLayout
    :is-with-app-bar-nav-icon="true"
    @is-drawer-visible="isDrawerVisible = !isDrawerVisible"
  >
    <template #navigation>
      <SideNavigation :is-drawer-visible="isDrawerVisible"></SideNavigation>
    </template>
    <template #content>
      <v-container>
        <v-row justify="center" align="center">
          <v-col cols="12" sm="6" md="4">
            <v-card class="pa-6" elevation="10">
              <!-- Card Title -->
              <v-card-title class="text-h5 text-center"> User Options </v-card-title>

              <!-- Card Content -->
              <v-card-text class="text-center"> Please select a user type to log in: </v-card-text>

              <!-- Card Actions -->
              <v-card-actions class="justify-center">
                <!-- Customer Login Button -->
                <v-btn color="blue darken-2" class="ma-2" outlined @click="loginAsCustomer">
                  Login as Customer
                </v-btn>

                <!-- Admin Login Button -->
                <v-btn color="red lighten-1" class="ma-2" dark @click="loginAsAdmin">
                  Login as Admin
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </AppLayout>
</template>
