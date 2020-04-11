<template>
    <div id="all-country">
        <!-- main-content -->
        <section id="main-content">
            <section class="wrapper">
                <div class="row all-data-row-wrapper" style="padding:26px;">
                    <div v-loading="loading" class="main-container by-latest-container">
                        <!--CUSTOM CHART START -->
                        <div>
                            <h3 class="fantasy">Latest Information of {{country}}</h3>
                        </div>
                        <el-table stripe fit fixed="left" :data="arr" style="width: 100%">
                            <el-table-column label="Record date" prop="record_date"></el-table-column>
                            <el-table-column label="Total cases" prop="total_cases"></el-table-column>
                            <el-table-column label="New cases" prop="new_cases"></el-table-column>
                            <el-table-column label="Active cases" prop="active_cases"></el-table-column>
                            <el-table-column label="total_deaths" prop="total_deaths"></el-table-column>
                            <el-table-column label="New deaths" prop="new_deaths"></el-table-column>
                            <el-table-column label="Total recovered" prop="total_recovered"></el-table-column>
                            <el-table-column label="Cases per 1m" prop="total_cases_per1m"></el-table-column>
                            <el-table-column
                                label="cases 1m/population"
                                prop="total_cases_per_1m_population"
                            ></el-table-column>
                        </el-table>
                    </div>
                </div>
                <!-- /row -->
                <el-row>
                    <el-col :sm="24" :md="12" :lg="12">
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
                                    <td>{{specCountry.total_cases}}</td>
                                    <td>{{specCountry.total_recovered}}</td>
                                    <td>{{specCountry.total_deaths}}</td>
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
                    <el-col :sm="24" :md="12" :lg="12">
                        <div class="border-shadow">
                            <h4 class="fantasy goleft">
                                <i class="el-icon-location-outline"></i>
                                Last 24 hours-
                                {{specCountry.country_name}}
                            </h4>

                            <!-- <div class=""> -->

                            <table class="case-own">
                                <tr>
                                    <th>CONFIRMED</th>
                                    <th>NEW</th>
                                    <th>DEATHS</th>
                                </tr>
                                <tr>
                                    <td>
                                        {{Math.abs(last24.caseStatus)}}
                                        <i
                                            v-if="specCountry.total_cases < statusYesterday.total_cases"
                                            style="color:green;"
                                            class="el-icon-bottom"
                                        ></i>
                                        <i
                                            v-if="specCountry.total_cases > statusYesterday.total_cases"
                                            style="color:red;"
                                            class="el-icon-top"
                                        ></i>
                                        <i
                                            v-if="last24.caseStatus == 0"
                                            class="el-icon-video-pause"
                                        ></i>
                                    </td>
                                    <td>
                                        {{Math.abs(specCountry.new_cases)}}
                                        <i
                                            v-if="specCountry.new_cases < statusYesterday.new_cases"
                                            style="color:green;"
                                            class="el-icon-bottom"
                                        ></i>
                                        <i
                                            v-if="specCountry.new_cases > statusYesterday.new_cases"
                                            style="color:red;"
                                            class="el-icon-top"
                                        ></i>
                                        <i
                                            v-if="last24.newStatus == 0 || last24.newStatus == null"
                                            class="el-icon-video-pause"
                                        ></i>
                                    </td>
                                    <td>
                                        {{Math.abs(specCountry.new_deaths)}}
                                        <i
                                            v-if="specCountry.new_deaths < statusYesterday.new_deaths"
                                            style="color:green;"
                                            class="el-icon-bottom"
                                        ></i>
                                        <i
                                            v-if="specCountry.new_deaths > statusYesterday.new_deaths"
                                            style="color:red;"
                                            class="el-icon-top"
                                        ></i>
                                        <i
                                            v-if="last24.deathStatus == 0"
                                            class="el-icon-video-pause"
                                        ></i>
                                    </td>
                                </tr>
                            </table>
                            <div class style="width:90%;">
                                <p
                                    class="goleft"
                                    style="font-size: 11px;margin-top: 13px;padding-left: 15px;"
                                >
                                    <span
                                        style="color:blue;"
                                    >If those values are empty means todays data is not updated yet</span>
                                </p>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </section>
        </section>
        <!--main content end-->
    </div>
</template>

<script>
/* eslint-disabled */
export default {
    name: "ByLatest",
    data() {
        return {
            arr: [],
            country: "",
            urlImage: "",
            statusYesterday: {},
            tips: false,
            loading: false,
            specCountry: {},
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
    computed: {
        last24() {
            if (
                Object.values(this.specCountry).length !== 0 &&
                Object.values(this.statusYesterday).length !== 0
            ) {
                let caseStatus =
                    parseFloat(this.specCountry.total_cases.replace(/,/g, "")) -
                    parseFloat(
                        this.statusYesterday.total_cases.replace(/,/g, "")
                    );

                let newStatus =
                    parseFloat(this.specCountry.new_cases.replace(/,/g, "")) -
                    parseFloat(
                        this.statusYesterday.new_cases.replace(/,/g, "")
                    );
                let deathStatus =
                    parseFloat(this.specCountry.new_deaths.replace(/,/g, "")) -
                    parseFloat(
                        this.statusYesterday.new_deaths.replace(/,/g, "")
                    );

                return { caseStatus, newStatus, deathStatus };
            } else {
                return "";
            }
        },
        recoveryOwn() {
            if (Object.values(this.specCountry).length !== 0) {
                let all = parseFloat(
                    this.specCountry.total_cases.replace(/,/g, "")
                );
                let rec = parseFloat(
                    this.specCountry.total_recovered.replace(/,/g, "")
                );
                let deaths = parseFloat(
                    this.specCountry.total_deaths.replace(/,/g, "")
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
        getYesterday() {
            let yesterday = new Date(Date.now() - 864e5);
            return `${yesterday.getFullYear()}-${yesterday.getMonth() +
                1}-${yesterday.getDate()}`;
        },
        getLAtestByCountry(country) {
            this.makeRequest("latest_stat_by_country.php?country=" + country);
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
                    this.country = json.country;
                    if (json.stat_by_country) {
                        this.statusYesterday =
                            json.stat_by_country[
                                json.stat_by_country.length - 1
                            ];
                    } else {
                        this.arr = json.latest_stat_by_country;
                        this.specCountry = json.latest_stat_by_country[0];
                    }
                    this.loading = false;
                })
                .catch(function(error) {
                    this.loading = false;
                    console.log("Request failed", error);
                });
        },
        yesterdayHistory(country) {
            this.makeRequest(
                "history_by_particular_country_by_date.php?country=" +
                    country +
                    "&date=" +
                    this.getYesterday()
            );
        }
    },
    mounted() {
        this.getLAtestByCountry(this.$route.params.country);
        this.yesterdayHistory(this.$route.params.country);
    }
};
</script>
<style scoped>
</style>
