<template>
  <v-dialog v-model="dialog" max-width="400">
    <v-card>
      <v-card-title class="text-h5 text-text">
        Confirmação
      </v-card-title>
      <v-card-text class="text-text">
        {{ message }}
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="grey-darken-1" text @click="cancel">
          Cancelar
        </v-btn>
        <v-btn color="error" text @click="confirm">
          Confirmar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ConfirmDialog',
  props: {
    // Controla a visibilidade do diálogo
    modelValue: {
      type: Boolean,
      required: true,
    },
    message: {
      type: String,
      default: 'Tem certeza que deseja realizar esta ação?',
    },
  },
  computed: {
    dialog: {
      get() {
        return this.modelValue;
      },
      set(val) {
        this.$emit('update:modelValue', val); // Emite evento para atualizar a prop modelValue no pai
      },
    },
  },
  methods: {
    // Método chamado ao clicar em "Cancelar"
    cancel() {
      this.dialog = false; 
      this.$emit('confirmed', false); 
    },
    // Método chamado ao clicar em "Confirmar"
    confirm() {
      this.dialog = false;
      this.$emit('confirmed', true); 
    },
  },
};
</script>

<style scoped>

</style>
