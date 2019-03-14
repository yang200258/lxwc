// components/toast/toast.js
const default_data = {
  visible: false,
  content: '',
  duration: 2000,
  mask: false,
};

let timmer = null

Component({

  data: {
    ...default_data
  },

  methods: {
    handleShow(options) {
      const { duration = 2000 } = options

      this.setData({
        ...options,
        duration,
        visible: true
      })

      if (timmer) clearTimeout(timmer)
      if (duration > 0) {
        timmer = setTimeout(() => {
          this.handleHide()
          timmer = null
        }, duration);
      }
    },

    handleHide() {
      this.setData({
        ...default_data
      })
    }
  }
});

