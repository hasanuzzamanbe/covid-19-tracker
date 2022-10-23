<template>
    <div id="app">
        <div id="main-wrapper">
            <!--header start-->
            <header class="header black-bg">
                <span
                    id="clock"
                    class="goright"
                >{{this.time.hour+':'+this.time.min+':'+ this.time.sec}}</span>
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
                            <a @click="goToHome" :class="{active: this.$route.path== '/'}">
                                <i class="fa fa-dashboard"></i>
                                <span>Affected Countries</span>
                            </a>
                        </li>
                        <!-- <li class="sub-menu">
                            <a
                                @click="showMyCountryData()"
                                :class="{active: this.$route.path== '/my-country'}"
                                href="javascript:;"
                            >
                                <i class="fa fa-desktop"></i>
                                <span>Show My country history</span>
                            </a>
                        </li> -->
                        <li class="sub-menu">
                            <a @click="getInstruction()" href="javascript:;">
                                <i class="fa fa-desktop"></i>
                                <span>Get A Tips from WHO</span>
                            </a>
                        </li>
                    </ul>
                    <!-- sidebar menu end-->

                    <div class="sidebar-latest">
                        <img v-if="flag" width="70px" :src="flag" />
                        <el-col class="info-response">
                            <hr style="width:30%;" />
                            <span class="info-title-white">
                                <i class="el-icon-warning-outline"></i> Hello !
                            </span>
                            <br />
                            <span v-if="country || state">You are from</span>
                            <span v-if="country || state" class="info-value">{{state}}, {{country}}</span>
                            <span>There are many covid-19 cases in your country which is increasing day by day. Please stay home, wash your hands using an alcohol based rub frequently and not touching your face.</span>
                            <br />
                            <hr style="width:30%;" />
                        </el-col>
                    </div>
                </div>
            </aside>
            <!--sidebar end-->
            <el-dialog :visible.sync="tips">
                <div>
                    <el-image v-if="!loading" style="height: 100%" :src="urlImage"></el-image>
                    <img v-else width="100%" src="./assets/ajax-loader.gif" />
                    <br />
                    <el-button v-loading="loading" @click="getInstruction">Show More</el-button>
                </div>
            </el-dialog>
            <el-dialog visible="true" width="60%">
                <div>
                    <h1 style="word-break: break-word;">❌ Sorry! This project is no longer maintained by the author.</h1>
                    <p>But you can still check the code. This project may help beginners of Vue js.
                        <br/>
                        Visit github: <a href="https://github.com/hasanuzzamanbe/covid-19-tracker">
                            https://github.com/hasanuzzamanbe/covid-19-tracker
                        </a>
                    </p>
                    <p style="float: right;">- Hasanuzzaman</p>
                </div>
            </el-dialog>
            <!-- main-content -->
            <router-view></router-view>
            <!--main content end-->

            <!--footer start-->
            <footer class="site-footer">
                <div class="text-right" id="copyrights">
                    <a target="_blank" href="https://www.hasanuzzaman.com">by @Hasanuzzaman</a>
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
            meImg: require("./assets/me.jpg"),
            urlImage: "",
            time: {},
            country: null,
            state: null,
            flag: null,
            loading: false,
            lastUpdate: null,
            api: "https://coronavirus-monitor.p.rapidapi.com/coronavirus/",
            headers: {
                "X-RapidAPI-Key":
                    "d5a7a67247msh00ac5e296fd8222p1fea22jsnf4c137fa39f5",
                "X-RapidAPI-Host": "coronavirus-monitor.p.rapidapi.com"
            }
        };
    },
    methods: {
        goToHome() {
            const path = `/`;
            if (this.$route.path !== path) this.$router.push(path);
        },
        showMyCountryData() {
            if (this.$route.name !== "GetYourCountry")
                this.$router.push("my-country");
        },
        getInstruction() {
            this.loading = true;
            this.tips = true;
            let insApi = this.api + "random_masks_usage_instructions.php";
            fetch(insApi, {
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
        },
        currentTime() {
            let date = new Date(); /* creating object of Date class */
            let hour = date.getHours();
            let min = date.getMinutes();
            let sec = date.getSeconds();
            this.time = {
                hour,
                min,
                sec
            };
            setTimeout(() => {
                this.currentTime();
            }, 1000);
        }
    },
    mounted() {
        this.currentTime();
        this.$notify({
            dangerouslyUseHTMLString: true,
            title: "Welcome to Covid-19 Tracker!",
            message: `<div style="display: flex;font-family: serif;flex-wrap: inherit;">
                <img style=";border-radius: 17px; margin: 5px 4px 0px -5px; width="70"
                height="70" src="${this.meImg}"/><p>Protect yourself and others from
                infection by washing your hands or using an alcohol based
                rub frequently, not touching your face.</p></div>`,
            position: "bottom-right",
            customClass: "global-notify",
            duration: 8000
        });
    }
};
</script>
<style>
@import "./styles/styles.css";
@import "./styles/responsive.css";
</style>
