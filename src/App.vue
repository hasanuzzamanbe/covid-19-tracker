<template>
    <div id="app">
        <div id="main-wrapper">
            <!--header start-->
            <header class="header black-bg">
                <span id="clock" class="goright">{{this.time.hour+':'+this.time.min+':'+ this.time.sec}}</span>
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
                        <li class="sub-menu">
                            <a
                                @click="showMyCountryData()"
                                :class="{active: this.$route.path== '/my-country'}"
                                href="javascript:;"
                            >
                                <i class="fa fa-desktop"></i>
                                <span>Show My country details</span>
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

                    <div class="sidebar-latest" v-if="lastUpdate">
                        <h3 style="color:white;">Your Country Latest</h3>
                        <el-col class="info-response">
                            <hr style="width:30%;" />
                            <span class="info-title-white">Country:</span>
                            <span class="info-value">{{lastUpdate.country_name}}</span>
                            <br />
                            <span class="info-title-white">Total Cases:</span>
                            <span class="info-value">{{lastUpdate.total_cases}}</span>
                            <br />
                            <span class="info-title-white">New Cases:</span>
                            <span class="info-value">{{lastUpdate.new_cases || 'update soon'}}</span>
                            <br />
                            <span class="info-title-white">Active Cases:</span>
                            <span class="info-value">{{lastUpdate.active_cases}}</span>
                            <br />
                            <span class="info-title-white">Total Death:</span>
                            <span class="info-value">{{lastUpdate.total_deaths}}</span>
                            <br />
                            <span class="info-title-white">New Death:</span>
                            <span class="info-value">{{lastUpdate.new_deaths || 'update soon'}}</span>
                            <br />
                            <span class="info-title-white">Recovered:</span>
                            <span class="info-value">{{lastUpdate.total_recovered}}</span>
                            <br />
                            <span class="info-title-white">Criticals:</span>
                            <span class="info-value">{{lastUpdate.serious_critical}}</span>
                            <br />
                            <span class="info-title-white">Cases per 1M:</span>
                            <span class="info-value">{{lastUpdate.total_cases_per1m}}</span>
                            <br />
                        </el-col>
                    </div>
                </div>
            </aside>
            <!--sidebar end-->
            <el-dialog :visible.sync="tips">
                <div>
                    <el-image v-if="!loading" style="width: 80%; height: 100%" :src="urlImage"></el-image>
                    <img v-else width="100%" src="./assets/ajax-loader.gif" />
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
            time: {},
            country: null,
            loading: false,
            lastUpdate: null,
            api: "https://coronavirus-monitor.p.rapidapi.com/coronavirus/",
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
        showMyCountryData() {
            if (this.$route.path !== "/my-country")
                this.$router.push("my-country");
        },
        getIpLocation() {
            fetch("https://extreme-ip-lookup.com/json/")
                .then(res => res.json())
                .then(response => {
                    if (response.country && response.country !== "") {
                        this.getLAtestByCountry(response.country);
                        console.log(response.country)
                    }
                })
                .catch((data, status) => {
                    console.log("Request failed", data, status);
                });
        },
        getLAtestByCountry(country) {
            let path = "latest_stat_by_country.php?country=" + country;
            fetch(this.api + path, {
                method: "get",
                headers: this.headers
            })
                .then(response => {
                    return response.json();
                })
                .then(json => {
                    this.lastUpdate = json.latest_stat_by_country[0];
                    console.log(this.lastUpdate)
                })
                .catch(function(error) {
                    console.log("Request failed", error);
                });
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
            var date = new Date(); /* creating object of Date class */
            var hour = date.getHours();
            var min = date.getMinutes();
            var sec = date.getSeconds();
            this.time = {
                hour,
                min,
                sec,
            }
            setTimeout(()=> {
                this.currentTime();
            }, 1000); /* setting timer */
        }
    },
    mounted() {
        this.getIpLocation();
        this.currentTime();
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
