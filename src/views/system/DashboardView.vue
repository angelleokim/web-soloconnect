<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
import SideNavigation from '@/components/layout/navigation/SideNavigation.vue'
import { ref } from 'vue'
import { useDisplay } from 'vuetify'


// Utilize pre-defined vue functions
const { mobile } = useDisplay()

const isDrawerVisible = ref(mobile.value ? false : true)
</script>

<script>
import { supabase } from '@/utils/supabase';
import { useRouter } from 'vue-router';

export default {
  name: 'UserLogin',
  setup() {
    const router = useRouter();

    const loginAsCustomer = async () => {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', 1);
      if (error) {
        console.error('Error fetching user:', error);
      } else {
        console.log(data[0].id);
        localStorage.setItem('userId', data[0].id);
        router.push('/shop'); // Navigate to shop route
      }
    };

    const loginAsAdmin = async () => {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', 2);
      if (error) {
        console.error('Error fetching user:', error);
      } else {
        console.log(data[0].id);
        localStorage.setItem('userId', data[0].id);
        router.push('/dashboard'); // Navigate to dashboard route
      }
    };

    return {
      loginAsCustomer,
      loginAsAdmin,
    };
  },
};
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
          <v-col cols="12" sm="8" md="6">
            <v-card class="pa-6 rounded-lg" elevation="12" color="yellow-darken-3">
              <!-- Card Title -->
              <v-card-title class="text-h4 text-center font-weight-bold"> Welcome! </v-card-title>

              <!-- Divider for separation -->
              <v-divider></v-divider>

              <!-- Card Content -->
              <v-card-text class="text-center mt-4">
                <p class="text-subtitle-1 mb-4">Choose your login type to proceed.</p>
                <v-icon size="48" color="blue darken-2">mdi-account</v-icon>
              </v-card-text>

              <!-- Card Actions -->
              <v-card-actions class="justify-center mt-4">
                <!-- Customer Login Button -->
                <v-btn
                  color="blue darken-3"
                  class="ma-2 px-6 py-3 text-uppercase font-weight-bold"
                  large
                  rounded
                  elevation="2"
                  @click="loginAsCustomer"
                >
                  Login as Customer
                </v-btn>

                <!-- Admin Login Button -->
                <v-btn
                  color="red accent-3"
                  class="ma-2 px-6 py-3 text-uppercase font-weight-bold"
                  large
                  rounded
                  dark
                  elevation="2"
                  @click="loginAsAdmin"
                >
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
