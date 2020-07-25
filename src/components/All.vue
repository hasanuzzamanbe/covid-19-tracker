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
                                    <div class="gocenter" style="width:90%;">
                                        <span>Recovery rate</span>
                                        <el-progress :percentage="getPercent" :format="format"></el-progress>
                                    </div>
                                    <div class style="width:90%;">
                                        <p
                                            class="goleft"
                                            style="font-size: 11px;margin-top: 13px;padding-left: 15px;"
                                        >
                                            The ratio of
                                            <span
                                                style="color:blue;"
                                            >Recovery ({{getPercent}}%) and Deaths ({{deathPercent}}%)</span>
                                            in worldwide
                                        </p>
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
                            </el-col>

                            <el-col :sm="12" :md="14" :lg="16" class="first-row-right-col">
                                <div class="border-shadow-right">
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
                                        class="case-all-table"
                                        stripe
                                        height="260"
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
                                        <el-table-column sortable label="Deaths" prop="deaths"></el-table-column>
                                        <el-table-column
                                            sortable
                                            label="New Deaths"
                                            prop="new_deaths"
                                        ></el-table-column>
                                        <el-table-column align="right" width="70">
                                            <!-- eslint-disable-next-line -->
                                            <template slot-scope="scope" label="Details">
                                                <!-- <el-button-group> -->
                                                <el-button
                                                    size="mini"
                                                    type="primary"
                                                    plain
                                                    icon="el-icon-view"
                                                    @click="goToDetails(scope.row.country_name,'ByLatest')"
                                                ></el-button>
                                                <!-- eslint-disable-next-line -->
                                                <!-- <el-button
                                                    size="mini"
                                                    type="warning"
                                                    plain
                                                    icon="el-icon-monitor"
                                                    @click="goToDetails(scope.row.country_name, 'ByDate')"
                                                ></el-button>
                                                </el-button-group>-->
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :sm="24" :md="24" :lg="8">
                                <div class="border-shadow">
                                    <el-dropdown
                                        @command="command"
                                        style="float:right;"
                                        trigger="click"
                                    >
                                        <span style="margin-bottom:23px;" class="el-dropdown-link">
                                            Others Top
                                            <i class="el-icon-arrow-down el-icon--right"></i>
                                        </span>
                                        <el-dropdown-menu slot="dropdown">
                                            <el-dropdown-item
                                                v-for="(item,i) in topCountry"
                                                :command="item.country_name"
                                                :key="i"
                                            >{{item.country_name}}</el-dropdown-item>
                                        </el-dropdown-menu>
                                    </el-dropdown>
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
                                    <table class="countryQueryTable case-own-2">
                                        <tr>
                                            <th>
                                                Currently infected
                                                <br />patients
                                            </th>
                                        </tr>
                                        <tr>
                                            <td>
                                                <strong
                                                    style="color: #d12e2e; padding-left:22px; font-size: 23px;"
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
                            <el-col :sm="24" :md="24" :lg="16">
                                <div style="min-height:300px;" class="border-shadow">
                                    <canvas v-if="!mapLoading" style="max-height:300px;" id="covidChartWorld"></canvas>
                                    <h1 v-else style="text-align:center;" >Loading...</h1>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                    <div v-else>
                        <img src="../assets/ajax-loader.gif" />
                    </div>
                </div>
                <el-row v-show="!mapLoading" style="margin-top:20px;" :gutter="20">
                    <div style="margin-left:22px;">
                        <h4 class="fantasy">{{this.selectedCountry}} flow chart</h4>
                        <el-dropdown @command="command" trigger="click">
                            <span style="margin-bottom:23px;" class="el-dropdown-link">
                                Others Top
                                <i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item
                                    v-for="(item,i) in topCountry"
                                    :command="item.country_name"
                                    :key="i"
                                >{{item.country_name}}</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                    <el-col style="margin-bottom: 20px;" :sm="24" :md="24" :lg="12">
                        <canvas v-show="!mapLoading" style="height:500px" id="covidChartTotal"></canvas>
                    </el-col>
                    <el-col :sm="24" :md="24" :lg="12">
                        <canvas v-show="!mapLoading" style="height:500px" id="covidChartDeath"></canvas>
                    </el-col>
                </el-row>
            </section>
        </section>
        <!--main content end-->
    </div>
</template>

<script>
import Chart from "chart.js";
/* eslint-disabled */
export default {
    name: "AllCountry",
    data() {
        return {
            arr: [],
            mapLoading: false,
            selectedCountry: "Bangladesh",
            topCountry: [],
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
            countryWiseHeaders: {
                "X-RapidAPI-Key":
                    "d5a7a67247msh00ac5e296fd8222p1fea22jsnf4c137fa39f5",
                "X-RapidAPI-Host": "coronavirus-map.p.rapidapi.com",
                "content-type": "text/html; charset=UTF-8",
                useQueryString: true
            },
            specCountry: {},
            chartData: {
                keys: [],
                values: [],
                deaths: []
            },
            chartDataWorld: {
                keys: [],
                values: []
            },
            chart: {
                covidChartWorld: null,
                covidChartTotal: null,
                covidChartDeath: null
            },
            loading: false,
            api: "https://coronavirus-monitor.p.rapidapi.com/coronavirus/"
        };
    },
    computed: {
        getPercent() {
            if (Object.values(this.worldCases).length !== 0) {
                let rec = parseFloat(
                    this.worldCases.total_recovered.replace(/,/g, "")
                );
                let all = parseFloat(
                    this.worldCases.total_cases.replace(/,/g, "")
                );
                return parseFloat(((rec / all) * 100).toFixed(2));
            } else {
                return 0;
            }
        },
        deathPercent() {
            if (Object.values(this.worldCases).length !== 0) {
                let death = parseFloat(
                    this.worldCases.total_deaths.replace(/,/g, "")
                );
                let all = parseFloat(
                    this.worldCases.total_cases.replace(/,/g, "")
                );
                return parseFloat(((death / all) * 100).toFixed(2));
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
        goToDetails(country, route) {
            this.$router.push({
                name: route,
                params: { country: country }
            });
        },
        getAllCountry() {
            this.makeRequest("cases_by_country.php");
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
                    this.arr.slice(0, 15).map(item => {
                        this.topCountry.push(item);
                    });
                    this.topCountry.push({ country_name: "Bangladesh" });
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
        command(country) {
            this.chart.covidChartTotal.destroy();
            this.chart.covidChartDeath.destroy();
            this.selectedCountry = country;
            this.getSpecificCountry(country);
            this.getCreateChart(country);
        },
        createChart(id, keys, value, name, color) {
            var canvas = document.getElementById(id);
            var ctx = canvas.getContext("2d");
            /*eslint-disable-next-line*/
            this.chart[id] = new Chart(ctx, {
                // The type of chart we want to create
                type: "line",
                // The data for our dataset
                data: {
                    labels: keys,
                    datasets: [
                        {
                            label: `${name}`,
                            backgroundColor: color,
                            borderColor: "#e91e635c",
                            pointRadius: 5,
                            data: value
                        }
                    ]
                },
                options: {}
            });
        },
        getCreateChart(country) {
            this.chartData.keys = [];
            this.chartData.values = [];
            this.chartData.deaths = [];
            this.mapLoading = true;
            fetch(
                "https://coronavirus-map.p.rapidapi.com/v1/spots/month?region=" +
                    country,
                {
                    method: "get",
                    headers: this.countryWiseHeaders
                }
            )
                .then(response => {
                    return response.json();
                })
                .then(json => {
                    for (let [key, value] of Object.entries(json.data)) {
                        this.chartData.keys.unshift(key);
                        this.chartData.values.unshift(value.total_cases);
                        this.chartData.deaths.unshift(value.deaths);
                    }
                    this.createChart(
                        "covidChartTotal",
                        this.chartData.keys,
                        this.chartData.values,
                        "total case",
                        "rgba(237, 116, 9, 0.25)"
                    );
                    this.createChart(
                        "covidChartDeath",
                        this.chartData.keys,
                        this.chartData.deaths,
                        "death",
                        "rgba(237, 9, 120, 0.25)"
                    );
                    this.mapLoading = false;
                });
        },
        getCreateWorlsChart() {
            this.mapLoading = true;
            fetch("https://coronavirus-map.p.rapidapi.com/v1/spots/summary", {
                method: "get",
                headers: this.countryWiseHeaders
            })
                .then(response => {
                    return response.json();
                })
                .then(json => {
                    for (let [key, value] of Object.entries(json.data)) {
                        this.chartDataWorld.keys.unshift(key);
                        this.chartDataWorld.values.unshift(
                            value.recovery_ratio
                        );
                    }
                    this.createChart(
                        "covidChartWorld",
                        this.chartDataWorld.keys,
                        this.chartDataWorld.values,
                        "World Recovery",
                        "rgba(74, 140, 209, 0.25)"
                    );
                    this.mapLoading = false;
                });
        }
    },
    mounted() {
        this.getAllCountry();
        this.getWorldStatus();
        this.getCreateChart("Bangladesh");
        this.getCreateWorlsChart();
    }
};
</script>
<style>
#covidChartTotal,
#covidChartDeath {
    border: 1px solid #e3eaff;
    border-radius: 13px;
    padding: 12px;
}

@media screen and (max-width: 1200px) and (min-width: 890px) {
    .countryQueryTable {
        float: right;
        margin-top: -136px;
    }
}
</style>