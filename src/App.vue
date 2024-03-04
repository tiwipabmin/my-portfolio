<template>
  <div>
    <DynamicDialog />
    <Toast />
    <router-view />
  </div>
</template>
<script>
import { usePrimeVue } from 'primevue/config'
// import { mapState, mapActions } from 'vuex'

export default {
  setup: () => ({
    changeToThai: () => {
      const primevue = usePrimeVue()
      primevue.config.locale.dayNames = [
        'อาทิตย์',
        'จันทร์',
        'อังคาร',
        'พุธ',
        'พฤหัสบดี',
        'ศุกร์',
        'เสาร์',
      ]
      primevue.config.locale.dayNamesShort = ['อา.', 'จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.']
      primevue.config.locale.dayNamesMin = ['อา.', 'จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.']
      primevue.config.locale.monthNames = [
        'มกราคม',
        'กุมภาพันธ์',
        'มีนาคม',
        'เมษายน',
        'พฤษภาคม',
        'มิถุนายน',
        'กรกฎาคม',
        'สิงหาคม',
        'กันยายน',
        'ตุลาคม',
        'พฤศจิกายน',
        'ธันวาคม',
      ]
      primevue.config.locale.monthNamesShort = [
        'ม.ค.',
        'ก.พ.',
        'มี.ค.',
        'เม.ย.',
        'พ.ค.',
        'มิ.ย.',
        'ก.ค.',
        'ส.ค.',
        'ก.ย.',
        'ต.ค.',
        'พ.ย.',
        'ธ.ค.',
      ]
      primevue.config.locale.clear = 'ล้าง'
      primevue.config.locale.today = 'วันนี้'
    },
  }),
  mounted() {
    this.changeToThai()
  },
}
</script>

<style>
.p-radiobutton-box.p-highlight .p-radiobutton-icon {
  visibility: hidden;
}
</style>
