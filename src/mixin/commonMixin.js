export default {
    methods: {

        navigate(route) {
            this.$router.push(route).catch(() => {})
        },

        goToHomeIfNotLogged() {
            if (!this.logged) {
                this.navigate("/");
            }
        },



    },


    watch: {



    },
    data: function() {
        return {

        }
    }
}