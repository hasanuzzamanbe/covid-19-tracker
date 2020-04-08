<template>
    <div id="app">
        <div id="main-wrapper">
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
                            <a href="#" @click="goToHome">
                                <img src="../src/assets/logo.png" class="img-circle" width="80" />
                            </a>
                        </p>
                        <h5 class="centered">COVID-19</h5>
                        <li class="mt">
                            <a @click="goToHome" class="active">
                                <i class="fa fa-dashboard"></i>
                                <span>AFFECTED COUNTRIES</span>
                            </a>
                        </li>
                        <li class="sub-menu">
                            <a @click="getInstruction()" href="javascript:;">
                                <i class="fa fa-desktop"></i>
                                <span>Get A Tips from WHO</span>
                            </a>
                        </li>
                    </ul>
                    <!-- sidebar menu end-->
                </div>
            </aside>
            <!--sidebar end-->
            <el-dialog :visible.sync="tips">
                <div>
                    <el-image v-loading="loading" style="width: 80%; height: 100%" :src="urlImage"></el-image>

                    <br />
                    <el-button v-loading="loading" @click="getInstruction">Show More</el-button>
                </div>
            </el-dialog>
            <!-- main-content -->
            <router-view></router-view>
            <!--main content end-->

            <!--footer start-->
            <footer class="site-footer">
                <div class="text-right" id="copyrights">
                    <a href="https://www.hasanuzzaman.com">by @Hasanuzzaman</a>
                </div>
            </footer>
            <!--footer end-->
        </div>
    </div>
</template>

<script>
/* eslint-disabled */
export default {
    name: "App",
    data() {
        return {
            tips: false,
            urlImage: "",
            loading: false,
            insApi:
                "https://coronavirus-monitor.p.rapidapi.com/coronavirus/random_masks_usage_instructions.php",
            headers: {
                "X-RapidAPI-Key":
                    "d5a7a67247msh00ac5e296fd8222p1fea22jsnf4c137fa39f5",
                "X-RapidAPI-Host": "coronavirus-monitor.p.rapidapi.com",
                "x-rapidapi-version": "1.1.0",
                "transfer-encoding": "chunked",
                vary: "Accept-Encoding",
                connection: "Close"
            }
        };
    },
    methods: {
        goToHome() {
            const path = `/`;
            if (this.$route.path !== path) this.$router.push(path);
        },
        getInstruction() {
            this.loading = true;
            this.tips = true;
            fetch(this.insApi, {
                method: "get",
                headers: this.headers
            })
                .then(response => {
                    return response.blob();
                })
                .then(data => {
                    const urlCreator = window.URL || window.webkitURL;
                    this.urlImage = urlCreator.createObjectURL(data);
                    this.loading = false;
                })
                .catch(function(error) {
                    console.log("Request failed", error);
                    this.loading = false;
                });
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
