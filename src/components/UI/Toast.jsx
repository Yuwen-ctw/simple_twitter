import Swal from 'sweetalert2'
import styles from 'assets/styles/components/ui/toast.module.scss'

const Toast = (text, icon) =>
  Swal.mixin({
    html: `<div class=${styles.layout}>${text}<span class=${styles.iconWrapper} data-noti=${icon}></span></div>`,
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
  })

export default Toast
