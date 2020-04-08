<template>
    <div id="app">
        <div id="main-wrapper">
            <section id="container">
                <!--header start-->
                <header class="header black-bg">
                    <div class="sidebar-toggle-box">
                        <div
                            class="fa fa-bars tooltips"
                            data-placement="right"
                            data-original-title="Toggle Navigation"
                        ></div>
                    </div>
                    <!--logo start-->
                    <a class="logo">
                        <b>
                            COVID
                            <span>19 Tracker</span>
                        </b>
                    </a>
                    <div class="top-menu">
                        <ul class="nav pull-right top-menu">
                            <li></li>
                        </ul>
                    </div>
                </header>
                <!--header end-->

                <!--main sidebar start-->
                <aside>
                    <div id="sidebar" class="nav-collapse">
                        <!-- sidebar menu start-->
                        <ul class="sidebar-menu" id="nav-accordion">
                            <p class="centered">
                                <a href="#">
                                    <img
                                        src="../src/assets/logo.png"
                                        class="img-circle"
                                        width="80"
                                    />
                                </a>
                            </p>
                            <h5 class="centered">COVID-19</h5>
                            <li class="mt">
                                <a @click="goToHome('/')" class="active">
                                    <i class="fa fa-dashboard"></i>
                                    <span>Dashboard</span>
                                </a>
                            </li>
                            <li class="sub-menu">
                                <a @click="goToHome('/by-date')" href="javascript:;">
                                    <i class="fa fa-desktop"></i>
                                    <span>UI Elements</span>
                                </a>
                            </li>
                        </ul>
                        <!-- sidebar menu end-->
                    </div>
                </aside>
                <!--sidebar end-->

                <!-- main-content -->
                <router-view></router-view>
                <!--main content end-->

                <!--footer start-->
                <footer class="site-footer">
                    <div class="text-center">by @Hasanuzzaman</div>
                </footer>
                <!--footer end-->
            </section>
        </div>
    </div>
</template>

<script>
/* eslint-disabled */
export default {
    name: "App",
    data() {
        return {};
    },
    methods: {
        goToHome(path) {
            this.$router.push(path);
        }
    }
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
