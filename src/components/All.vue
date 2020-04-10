<template>
    <div id="all-country">
        <!-- main-content -->
        <section id="main-content">
            <section class="wrapper">
                <div class="row">
                    <div class="all-data-row-wrapper" v-if="!loading">
                        <el-row class="first-row">
                            <el-col :sm="12" :md="10" :lg="8" class="first-row-left-col">
                                <div class="border-shadow">
                                    <h4 class="fantasy goleft">
                                        <i class="el-icon-document"></i>
                                        Coronavirus Cases-Worldwide
                                    </h4>
                                    <p class="goleft">TOTAL CONFIRMED CASES</p>

                                    <h3 class="goleft">{{worldCases.total_cases}}</h3>
                                    <hr />
                                    <div class style="width:90%;">
                                        <span class="goleft">Recovery rate</span>
                                        <el-progress :percentage="getPercent" :format="format"></el-progress>
                                    </div>

                                    <div class="block-cases">
                                        <div class="grid">
                                            <p>
                                                <i class="color-green el-icon-s-home"></i> Total Recovered
                                            </p>
                                            <p>{{worldCases.total_recovered}}</p>
                                        </div>
                                        <div class="grid">
                                            <p>
                                                <i class="color-red el-icon-warning"></i> Total Deaths
                                            </p>
                                            <p>{{worldCases.total_deaths}}</p>
                                        </div>
                                        <div class="grid">
                                            <p>
                                                <i class="color-yellow el-icon-top"></i> Total New
                                            </p>
                                            <p>{{worldCases.new_cases}}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="border-shadow">
                                    <h4 class="fantasy goleft">
                                        <i class="el-icon-location-outline"></i>
                                        Coronavirus Cases-
                                        {{specCountry.country_name}}
                                    </h4>

                                    <!-- <div class=""> -->

                                    <table class="case-own">
                                        <tr>
                                            <th>CONFIRMED</th>
                                            <th>RECOVERED</th>
                                            <th>DEATHS</th>
                                        </tr>
                                        <tr>
                                            <td>{{specCountry.cases}}</td>
                                            <td>{{specCountry.total_recovered}}</td>
                                            <td>{{specCountry.deaths}}</td>
                                        </tr>
                                    </table>
                                    <div class style="width:90%;">
                                        <p
                                            class="goleft"
                                            style="font-size: 11px;margin-top: 13px;padding-left: 15px;"
                                        >
                                            The ratio of
                                            <span
                                                style="color:blue;"
                                            >Recovery ({{recoveryOwn.recPercent}}%) and Deaths ({{recoveryOwn.deathPercent}}%)</span>
                                            in {{specCountry.country_name}}
                                        </p>
                                    </div>
                                    <table class="case-own-2">
                                        <tr>
                                            <th>
                                                Currently infected
                                                <br />patients
                                            </th>
                                        </tr>
                                        <tr>
                                            <td>
                                                <strong
                                                    style="color: #d12e2e;font-size: 23px;"
                                                >{{specCountry.active_cases}}</strong>
                                            </td>
                                            <td>
                                                <ul class="ul-with-bullet goleft">
                                                    <li class="fstli">
                                                        New Cases
                                                        <span
                                                            style="margin-left:22px;font-weight:bold;"
                                                        >{{specCountry.new_cases}}</span>
                                                    </li>
                                                    <li class="ndli">
                                                        New Deaths
                                                        <span
                                                            style="margin-left:22px;font-weight:bold;"
                                                        >{{specCountry.new_deaths}}</span>
                                                    </li>
                                                </ul>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </el-col>

                            <el-col
                                :sm="12"
                                :md="14"
                                :lg="16"
                                class="border-shadow-right first-row-right-col"
                            >
                                <div>
                                    <h3 class="fantasy">Cases By Country</h3>
                                </div>
                                <el-input
                                    v-model="search"
                                    size="medium"
                                    placeholder="Type country name to search"
                                >
                                    <el-button slot="append" icon="el-icon-search"></el-button>
                                </el-input>
                                <el-table
                                    stripe
                                    height="555"
                                    :data="arr.filter(item => !search || item.country_name.toLowerCase().includes(search.toLowerCase()))"
                                    style="width: 100%"
                                >
                                    <el-table-column label="Country" prop="country_name"></el-table-column>
                                    <el-table-column sortable label="Cases" prop="cases"></el-table-column>
                                    <el-table-column
                                        sortable
                                        label="Recovered"
                                        prop="total_recovered"
                                    ></el-table-column>
                                    <el-table-column align="right" width="108">
                                        <!-- eslint-disable-next-line -->
                                        <template slot-scope="scope" label="Details">
                                            <el-button-group>
                                                <el-button
                                                    size="mini"
                                                    icon="el-icon-view"
                                                    @click="getlatestByCountry(scope.row.country_name)"
                                                ></el-button>
                                                <el-button
                                                    size="mini"
                                                    icon="el-icon-monitor"
                                                    @click="getCasesByCountry(scope.row.country_name)"
                                                ></el-button>
                                            </el-button-group>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </el-col>
                        </el-row>
                    </div>
                    <div v-else>
                        <img src="../assets/ajax-loader.gif" />
                    </div>
                </div>
                <!-- /row -->
            </section>
        </section>
        <!--main content end-->
    </div>
</template>

<script>
/* eslint-disabled */
export default {
    name: "AllCountry",
    data() {
        return {
            arr: [],
            search: "",
            worldCases: {},
            countryflag: null,
            headers: {
                "X-RapidAPI-Key":
                    "d5a7a67247msh00ac5e296fd8222p1fea22jsnf4c137fa39f5",
                "X-RapidAPI-Host": "coronavirus-monitor.p.rapidapi.com",
                "content-type": "text/html; charset=UTF-8",
                server: "RapidAPI-1.1.0",
                vary: "Accept-Encoding",
                connection: "Close"
            },
            specCountry: {},
            loading: false,
            api: "https://coronavirus-monitor.p.rapidapi.com/coronavirus/"
        };
    },
    computed: {
        getPercent() {
            if (Object.values(this.worldCases).length !== 0) {
                let all = parseFloat(
                    this.worldCases.total_recovered.replace(/,/g, "")
                );
                let rec = parseFloat(
                    this.worldCases.total_cases.replace(/,/g, "")
                );
                return parseFloat(((all / rec) * 100).toFixed(2));
            } else {
                return 0;
            }
        },
        recoveryOwn() {
            if (Object.values(this.specCountry).length !== 0) {
                let all = parseFloat(this.specCountry.cases.replace(/,/g, ""));
                let rec = parseFloat(
                    this.specCountry.total_recovered.replace(/,/g, "")
                );
                let deaths = parseFloat(
                    this.specCountry.deaths.replace(/,/g, "")
                );
                let recPercent = ((rec / all) * 100).toFixed(2);
                let deathPercent = ((deaths / all) * 100).toFixed(2);
                return { recPercent, deathPercent };
            } else {
                return "";
            }
        }
    },
    methods: {
        format(percentage) {
            return percentage === 100 ? "Full" : `${percentage}%`;
        },
        getlatestByCountry(country) {
            this.$router.push({
                name: "ByLatest",
                params: { country: country }
            });
        },
        getAllCountry() {
            this.makeRequest("cases_by_country.php");
        },
        getCasesByCountry(country) {
            this.$router.push({
                name: "ByDate",
                params: { country: country }
            });
        },
        getWorldStatus() {
            let api = this.api + "worldstat.php";
            fetch(api, {
                method: "get",
                headers: this.headers
            })
                .then(response => {
                    return response.json();
                })
                .then(json => {
                    this.worldCases = json;
                    this.loading = false;
                })
                .catch(function(error) {
                    this.loading = false;
                    console.log("Request failed", error);
                });
        },
        makeRequest(path) {
            this.loading = true;
            let api = this.api + path;
            fetch(api, {
                method: "get",
                headers: this.headers
            })
                .then(response => {
                    return response.json();
                })
                .then(json => {
                    this.arr = json.countries_stat.filter(data => {
                        return data.country_name !== "";
                    });
                    // console.log(this.arr)
                    if (window.myCountry) {
                        this.getSpecificCountry(window.myCountry);
                    } else {
                        this.getSpecificCountry("Bangladesh");
                    }
                    this.loading = false;
                })
                .catch(function(error) {
                    this.loading = false;
                    console.log("Request failed", error);
                });
        },
        getSpecificCountry(country) {
            let spec = this.arr.filter(item => {
                return item.country_name == country;
            });
            this.specCountry = spec[0];
        },
        getIpLocation() {
            if (!window.myCountry) {
                fetch(
                    "https://api.ipgeolocation.io/ipgeo?apiKey=b8ee58e19922458ba3fe3081e146103f"
                )
                    .then(res => res.json())
                    .then(response => {
                        if (
                            response.country_name &&
                            response.country_name !== ""
                        ) {
                            window.myCountry = response.country_name;
                        }
                    })
                    .catch((data, status) => {
                        window.myCountry = "Bangladesh";
                        console.log("Request failed", data, status);
                    });
            }
        }
    },
    mounted() {
        this.getAllCountry();
        this.getWorldStatus();
        this.getIpLocation();
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
